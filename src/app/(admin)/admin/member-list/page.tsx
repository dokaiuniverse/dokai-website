"use client";

import PlusSVG from "@assets/icons/plus.svg";
import TrashSVG from "@assets/icons/trash.svg";
import * as Styles from "./style.css";
import { adminQueriesClient } from "@controllers/admin/query.client";
import { adminMutations } from "@controllers/admin/mutation";
import { useAppMutation, useAppQuery } from "@controllers/common";
import { Role } from "@lib/auth/types";
import { useState } from "react";
import LoadingComponent from "@components/ui/Status/Loading";

const MemberListPage = () => {
  const { data, isLoading: isLoadingQuery } = useAppQuery(
    adminQueriesClient.members(),
  );
  const { mutateAsync: mutateChangeRole, isPending: isPendingChangeRole } =
    useAppMutation(adminMutations.changeRole());
  const { mutateAsync: mutateAddMember, isPending: isPendingAddMember } =
    useAppMutation(adminMutations.addMember());
  const { mutateAsync: mutateDeleteMember, isPending: isPendingDeleteMember } =
    useAppMutation(adminMutations.deleteMember());
  const [isOpenAddMember, setIsOpenAddMember] = useState(false);

  const isLoading =
    isLoadingQuery ||
    isPendingChangeRole ||
    isPendingAddMember ||
    isPendingDeleteMember;

  const members = data?.items ?? [];

  return (
    <div className={Styles.Layout}>
      <div className={Styles.Container}>
        <div className={Styles.Header}>
          <p className={Styles.HeaderTitle}>Member List</p>
          <button
            onClick={() => setIsOpenAddMember((prev) => !prev)}
            className={Styles.HeaderAddButton}
          >
            <PlusSVG className={Styles.HeaderAddButtonIcon} />
            <p className={Styles.HeaderAddButtonText}>Add Member</p>
          </button>
        </div>

        {isOpenAddMember && (
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const fd = new FormData(e.currentTarget);
              const email = String(fd.get("email") ?? "").trim();
              const role = String(fd.get("role") ?? "").trim() as Role;

              if (!email || !role) return;

              mutateAddMember({ email, role });
            }}
            className={Styles.AddMemberForm}
          >
            <input type="text" name="email" className={Styles.AddMemberInput} />

            <select
              name="role"
              defaultValue=""
              className={Styles.AddMemberSelect}
            >
              <option value="admin" className={Styles.AddMemberSelectOption}>
                admin
              </option>
              <option value="staff" className={Styles.AddMemberSelectOption}>
                staff
              </option>
            </select>

            <button type="submit" className={Styles.AddMemberButton}>
              Add Member
            </button>
          </form>
        )}

        <div className={Styles.Content}>
          {members.map((member) => (
            <div className={Styles.Member} key={member.email}>
              <p className={Styles.MemberEmail}>{member.email}</p>
              <div className={Styles.MemberContent}>
                <form
                  className={Styles.MemberRoleForm}
                  onSubmit={async (e) => {
                    e.preventDefault();

                    const el = e.currentTarget;
                    const submitter = (e.nativeEvent as SubmitEvent)
                      .submitter as HTMLInputElement | HTMLButtonElement | null;

                    const role = submitter?.getAttribute("value") ?? ""; // 또는 submitter?.value

                    if (role != member.role) {
                      await mutateChangeRole({
                        email: member.email,
                        role: role as Role,
                      });
                    }

                    el.reset();
                  }}
                >
                  <label className={Styles.MemberRole}>
                    <p>{member.role}</p>
                    <input type="checkbox" className={Styles.MemberRoleInput} />
                  </label>

                  <span className={Styles.MemberRoleSelectBox}>
                    <input
                      className={Styles.MemberRoleSelectButton}
                      type="submit"
                      name="role"
                      value="admin"
                    />
                    <input
                      className={Styles.MemberRoleSelectButton}
                      type="submit"
                      name="role"
                      value="staff"
                    />
                  </span>
                </form>
                <button
                  onClick={() => mutateDeleteMember(member.email)}
                  className={Styles.MemberDeleteButton}
                >
                  <TrashSVG className={Styles.MemberDeleteButtonIcon} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isLoading && (
        <div className={Styles.LoadingOverlay}>
          <LoadingComponent useText className={Styles.LoadingOverlayContent} />
        </div>
      )}
    </div>
  );
};

export default MemberListPage;
