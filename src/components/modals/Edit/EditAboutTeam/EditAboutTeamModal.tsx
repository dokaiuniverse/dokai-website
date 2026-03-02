import { useEffect } from "react";
import * as Styles from "./style.css";
import ModalLayout from "@components/modals/ModalLayout";

import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import DeleteButton from "@components/ui/Button/Delete/DeleteButton";
import CancelButton from "@components/ui/Button/Cancel/CancelButton";
import ApplyButton from "@components/ui/Button/Apply/ApplyButton";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";
import CrossSVG from "@assets/icons/cross.svg";

import { aboutTeamSchema } from "@components/pages/about/about";

type FormValues = z.infer<typeof aboutTeamSchema>;

const EditAboutTeamModal = ({
  initial,
  applyTeam,
  deleteTeam,
  isOpen,
  closeModal,
  requestCloseModal,
}: {
  initial?: { role: string; names: string[] };
  applyTeam: (next: { role: string; names: string[] }) => void;
  deleteTeam?: () => void;
  isOpen: boolean;
  closeModal: () => void;
  requestCloseModal: () => void;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(aboutTeamSchema),
    defaultValues: {
      role: "",
      names: [],
    },
    mode: "onBlur",
  });

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const names = useWatch({ control, name: "names" }) ?? [];

  useEffect(() => {
    reset({
      role: initial?.role ?? "",
      names: initial?.names?.length ? initial.names : [],
    });
  }, [initial, reset]);

  const addName = (name: string) => {
    const next = [...names, name];
    setValue("names", next, { shouldDirty: true, shouldValidate: true });
  };

  const removeName = (idx: number) => {
    const next = names.filter((_, i) => i !== idx);
    setValue("names", next, { shouldDirty: true, shouldValidate: true });
  };

  const handleCancel = () => requestCloseModal();

  const handleApply = handleSubmit((data) => {
    applyTeam({
      role: data.role.trim(),
      names: data.names.map((n) => n.trim()).filter(Boolean),
    });
    requestCloseModal();
  });

  const handleDelete = () => {
    deleteTeam?.();
    requestCloseModal();
  };

  return (
    <ModalLayout
      title="Team"
      isOpen={isOpen}
      onClose={closeModal}
      className={Styles.Container}
      maxWidth="32rem"
    >
      <div className={Styles.Content}>
        <TitleInput
          form={form}
          name={"role"}
          placeholder={"Role"}
          title="Role"
        />

        <div className={Styles.ValuesContainer}>
          <p className={Styles.ValuesTitle}>Names</p>

          <div className={Styles.NameList}>
            {names.map((name, idx) => (
              <div key={`TEAM_NAME_${idx}`} className={Styles.NameItem}>
                <p className={Styles.NameText}>{name}</p>
                <button
                  type="button"
                  onClick={() => removeName(idx)}
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
              const el = e.currentTarget;
              const fd = new FormData(el);
              const name = String(fd.get("name") ?? "").trim();
              if (!name) return;

              addName(name);
              el.reset();
            }}
            className={Styles.MemberAddForm}
          >
            <input type="text" name="name" className={Styles.MemberInput} />
            <AddButton type="submit" className={Styles.MemberAddButton} />
          </form>

          <ErrorText
            message={
              (errors.names?.message as string) ||
              (errors.names?.root?.message as string)
            }
          />
        </div>
      </div>

      <div className={Styles.ButtonContainer}>
        {deleteTeam && <DeleteButton onClick={handleDelete} />}
        <CancelButton onClick={handleCancel} isRight />
        <ApplyButton onClick={handleApply} />
      </div>
    </ModalLayout>
  );
};

export default EditAboutTeamModal;
