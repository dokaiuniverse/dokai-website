import { Controller, useFormContext } from "react-hook-form";
import { ProfileFormInput } from "../../../../app/(admin)/admin/(edit)/careers/page-client";
import { useEffect, useRef, useState } from "react";
import * as Styles from "./style.css";
import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import { MediaSource } from "@domain/media";
import EditSVG from "@assets/icons/edit.svg";
import PlusSVG from "@assets/icons/plus.svg";
import Link from "next/link";
import { EditableInner } from "@components/ui/Edit/Editable/Editable";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function ContentEditableField({ name }: { name: "bio" }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { control, clearErrors, getFieldState } =
    useFormContext<ProfileFormInput>();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <div>
          <div
            ref={ref}
            contentEditable
            suppressContentEditableWarning
            onFocus={() => clearErrors(name)}
            onInput={(e) => {
              const text = e.currentTarget.textContent ?? "";
              field.onChange(text); // ✅ RHF에 반영
            }}
            onBlur={field.onBlur}
            // RHF 값이 바뀌었을 때 DOM에 반영(필요시)
            dangerouslySetInnerHTML={{ __html: escapeHtml(field.value) }}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
              minHeight: 80,
            }}
          />
          <p>{getFieldState(name).error?.message}</p>
        </div>
      )}
    />
  );
}

const EditProfileSection = () => {
  const {
    register,
    trigger,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormContext<ProfileFormInput>();

  const avatar = watch("avatar") as MediaSource;

  const bio = watch("bio");
  console.log(bio);

  return (
    <section className={Styles.Container}>
      {/* <div>
        {avatar ? (
          <>
            <MediaCard media={avatar} />
            <button>
              <EditSVG />
            </button>
          </>
        ) : (
          <button
            className={Styles.MediaAddButton}
            // onClick={() => setOpenEditModal(true)}
          >
            <PlusSVG className={Styles.MediaAddButtonIcon} />
          </button>
        )}
      </div>
      <div>
        <EditableInner
          mode="RICH"
          value={bio}
          onChange={(value) => {
            setValue("bio", value);
          }}
          placeholder="Write your bio"
        />
        <div>
          {watch("contacts")?.map((contact, idx) => (
            <div key={`CAREERS_DETAIL_${idx}`} className={Styles.ContactItem}>
              <span className={Styles.ContactName}>{contact.name}</span>
              <Link href={contact.href} className={Styles.ContactValue}>
                {contact.value}
              </Link>
              <button
                className={Styles.ContactEditButton}
                // onClick={() => {
                //   setSelectedIndex(idx);
                //   setOpenContactModal(true);
                // }}
              >
                <EditSVG />
              </button>
            </div>
          ))}
          <button>
            <PlusSVG />
          </button>
        </div>
      </div> */}
    </section>
  );
};

export default EditProfileSection;
