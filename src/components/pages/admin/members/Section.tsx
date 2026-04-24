"use client";

import { useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import * as Styles from "./style.css";
import RemoveButton from "@components/ui/Edit/RemoveButton/RemoveButton";

import { useAppMutation, useAppQuery } from "@controllers/common";
import { careersQueriesClient } from "@controllers/careers/query.client";
import { careersMutations } from "@controllers/careers/mutation";
import { useModalStackStore } from "@stores/modalStackStore";

type Role = "admin" | "staff";

type MemberFormItem = {
  memberId: string;
  email: string;
  role: Role;
};

type FormValues = {
  members: MemberFormItem[];
};

const tmpId = () =>
  `tmp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

const normEmail = (s: string) => s.trim().toLowerCase();

function diffMembers(initial: MemberFormItem[], current: MemberFormItem[]) {
  const initMap = new Map(initial.map((m) => [m.memberId, m]));
  const curMap = new Map(current.map((m) => [m.memberId, m]));

  const created = current.filter((m) => m.memberId.startsWith("tmp_"));
  const updated: MemberFormItem[] = [];
  const deleted: string[] = [];

  for (const cur of current) {
    if (cur.memberId.startsWith("tmp_")) continue;
    const prev = initMap.get(cur.memberId);
    if (!prev) continue;

    if (
      normEmail(prev.email) !== normEmail(cur.email) ||
      prev.role !== cur.role
    ) {
      updated.push(cur);
    }
  }

  for (const prev of initial) {
    if (!curMap.has(prev.memberId)) deleted.push(prev.memberId);
  }

  return { created, updated, deleted };
}

const MembersSection = () => {
  const { push } = useModalStackStore();
  const memberListQuery = careersQueriesClient.memberList();
  const { data: memberList } = useAppQuery(memberListQuery);

  const items = useMemo(() => memberList?.items ?? [], [memberList]);

  const { mutateAsync: updateMemberList } = useAppMutation(
    careersMutations.updateMemberList(),
  );

  const form = useForm<FormValues>({
    defaultValues: { members: [] },
    mode: "onBlur",
  });

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = form;

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "members",
    keyName: "_key",
  });

  useEffect(() => {
    const next: MemberFormItem[] = items.map((x) => ({
      memberId: x.id, // ✅ 서버 uuid
      email: x.email ?? "",
      role: (x.role ?? "staff") as Role,
    }));

    reset({ members: next });
    replace(next);
  }, [items, reset, replace]);

  const handleAddMember = () => {
    append({ memberId: tmpId(), email: "", role: "staff" });
  };

  const handleDeleteMember = (index: number) => {
    remove(index);
  };

  const handleSave = handleSubmit(async (values) => {
    const initial: MemberFormItem[] = items.map((x) => ({
      memberId: x.id,
      email: x.email ?? "",
      role: (x.role ?? "staff") as Role,
    }));

    const current: MemberFormItem[] = (values.members ?? []).map((m) => ({
      memberId: m.memberId,
      email: m.email.trim(),
      role: m.role,
    }));

    const { created, updated, deleted } = diffMembers(initial, current);

    if (!created.length && !updated.length && !deleted.length) return;

    push("API", {
      title: "Updating members",
      onFetch: async () =>
        updateMemberList({
          created: created.map((m) => ({
            email: normEmail(m.email),
            role: m.role,
          })),
          updated: updated.map((m) => ({
            id: m.memberId,
            email: normEmail(m.email),
            role: m.role,
          })),
          deleted,
        }),
    });
  });

  return (
    <div className={Styles.Section}>
      <div className={Styles.SectionHeader}>
        <div>
          <p className={Styles.SectionTitle}>Members</p>
          <p className={Styles.SectionSub}>
            Add / delete / change role. Email can be edited. Updates use member
            id.
          </p>
        </div>

        <div className={Styles.SectionActions}>
          <button
            type="button"
            className={Styles.SecondaryButton}
            onClick={handleAddMember}
          >
            Add member
          </button>
          <button
            type="button"
            className={Styles.PrimaryButton}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>

      <div className={Styles.MemberBlock}>
        <p className={Styles.BlockTitle}>Member List</p>

        <div className={Styles.MemberList}>
          {fields.map((field, idx) => (
            <div key={field._key} className={Styles.MemberRow}>
              <div className={Styles.DragHandlePlaceholder} />

              <input
                className={Styles.MemberInput}
                placeholder="Email"
                {...register(`members.${idx}.email` as const, {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
              />

              <select
                className={Styles.MemberSelect}
                {...register(`members.${idx}.role` as const)}
              >
                <option value="staff">staff</option>
                <option value="admin">admin</option>
              </select>

              <RemoveButton
                className={Styles.DeleteButton}
                onClick={() => handleDeleteMember(idx)}
              />
            </div>
          ))}
        </div>

        {errors.members?.map?.((e, i) =>
          e?.email?.message ? (
            <p key={`MEMBER_ERR_${i}`} className={Styles.ErrorText}>
              {e.email.message}
            </p>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default MembersSection;
