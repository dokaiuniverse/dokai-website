import { useEffect } from "react";
import * as Styles from "./style.css";
import ModalLayout from "@components/modals/ModalLayout";

import { z } from "zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import DeleteButton from "@components/ui/Button/Delete/DeleteButton";
import CancelButton from "@components/ui/Button/Cancel/CancelButton";
import ApplyButton from "@components/ui/Button/Apply/ApplyButton";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";
import RemoveButton from "@components/ui/Edit/RemoveButton/RemoveButton";
import { creditSchema } from "@components/pages/work/work";
import { WorkCredit } from "@domain/work";
import CrossSVG from "@assets/icons/cross.svg";

type FormValues = z.infer<typeof creditSchema>;

const DEFAULT_MEMBER = { role: "", names: [] };

const EditCreditModal = ({
  initial,
  applyCredit,
  deleteCredit,
  isOpen,
  closeModal,
  requestCloseModal,
}: {
  initial?: WorkCredit;
  applyCredit: (next: WorkCredit) => void;
  deleteCredit?: () => void;
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(creditSchema),
    defaultValues: {
      team: "",
      members: [DEFAULT_MEMBER],
    },
    mode: "onBlur",
  });

  const {
    control,
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const membersFA = useFieldArray({
    control,
    name: "members",
  });

  const members = useWatch({ control, name: "members" }) ?? [DEFAULT_MEMBER];

  useEffect(() => {
    reset({
      team: initial?.team ?? "",
      members: initial?.members?.length
        ? initial.members.map((m) => ({
            role: m.role ?? "",
            names: m.names,
          }))
        : [DEFAULT_MEMBER],
    });
    membersFA.replace(
      initial?.members?.length
        ? initial.members.map((m) => ({
            role: m.role ?? "",
            names: m.names,
          }))
        : [DEFAULT_MEMBER],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial, reset]);

  // --- members 조작 ---
  const addMember = () => {
    membersFA.append(DEFAULT_MEMBER);
  };

  const removeMember = (idx: number) => {
    if (membersFA.fields.length <= 1) {
      membersFA.replace([DEFAULT_MEMBER]);
      return;
    }
    membersFA.remove(idx);
  };

  const removeName = (memberIdx: number, nameIdx: number) => {
    const current = members?.[memberIdx]?.names;
    const next = current.filter((_, i) => i !== nameIdx);
    setValue(`members.${memberIdx}.names`, next, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleCancel = () => {
    requestCloseModal();
  };

  const handleApply = handleSubmit((data) => {
    applyCredit({
      team: data.team.trim(),
      members: data.members.map((m) => ({
        role: m.role.trim(),
        names: m.names.map((n) => n.trim()).filter(Boolean),
      })),
    });
    requestCloseModal();
  });

  const handleDelete = () => {
    deleteCredit?.();
    requestCloseModal();
  };

  return (
    <ModalLayout
      title="Credit"
      isOpen={isOpen}
      onClose={closeModal}
      className={Styles.Container}
      maxWidth="32rem"
    >
      <div className={Styles.Content}>
        <TitleInput
          form={form}
          name={"team"}
          placeholder={"Team"}
          title="Team"
        />

        <div className={Styles.ValuesContainer}>
          <p className={Styles.ValuesTitle}>Members</p>

          <div className={Styles.MembersList}>
            {membersFA.fields.map((field, memberIdx) => {
              const names = members?.[memberIdx]?.names ?? [""];

              return (
                <div key={field.id} className={Styles.RoleContainer}>
                  <p className={Styles.ValuesTitle}>Role {memberIdx + 1}</p>

                  <div className={Styles.ValueRow}>
                    <label className={Styles.ValueLabel}>
                      <input
                        className={Styles.ValueInput}
                        placeholder="Role"
                        {...register(`members.${memberIdx}.role` as const)}
                      />
                      <RemoveButton
                        onClick={() => removeMember(memberIdx)}
                        className={Styles.ValueRemoveButton}
                      />
                    </label>
                    <ErrorText
                      message={
                        errors.members?.[memberIdx]?.role?.message as string
                      }
                    />
                  </div>

                  <div className={Styles.ValuesContainer}>
                    <p className={Styles.ValuesTitle}>Names</p>

                    <div className={Styles.NameList}>
                      {names.map((name, nameIdx) => (
                        <div
                          key={`MEMBER_${memberIdx}_NAME_${nameIdx}`}
                          className={Styles.NameItem}
                        >
                          <p className={Styles.NameText}>{name}</p>
                          <button
                            onClick={() => removeName(memberIdx, nameIdx)}
                            className={Styles.NameRemoveButton}
                          >
                            <CrossSVG className={Styles.NameRemoveButtonIcon} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.currentTarget;
                        const fd = new FormData(form);
                        const name = fd.get("name") as string;
                        if (!name) return;
                        const current = members?.[memberIdx]?.names ?? [""];
                        setValue(
                          `members.${memberIdx}.names` as const,
                          [...current, name],
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          },
                        );
                        form.reset();
                      }}
                      className={Styles.MemberAddForm}
                    >
                      <input
                        type="text"
                        name="name"
                        className={Styles.MemberInput}
                      />
                      <AddButton
                        type="submit"
                        className={Styles.MemberAddButton}
                      />
                    </form>
                    <ErrorText
                      message={
                        errors.members?.[memberIdx]?.names?.message ||
                        errors.members?.[memberIdx]?.names?.root?.message
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <AddButton onClick={addMember} />
          <ErrorText message={errors.members?.root?.message} />
        </div>
      </div>

      <div className={Styles.ButtonContainer}>
        {deleteCredit && <DeleteButton onClick={handleDelete} />}
        <CancelButton onClick={handleCancel} isRight />
        <ApplyButton onClick={handleApply} />
      </div>
    </ModalLayout>
  );
};

export default EditCreditModal;
