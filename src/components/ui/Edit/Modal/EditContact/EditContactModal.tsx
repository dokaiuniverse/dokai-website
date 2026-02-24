import { useEffect, useMemo, useState } from "react";
import EditModalLayout from "../Layout";
import * as Styles from "./style.css";
import type { ContactLink } from "@domain/careers";
import InstagramSVG from "@assets/social/Instagram.svg";
import XSVG from "@assets/social/X.svg";
import FacebookSVG from "@assets/social/Facebook.svg";
import LinkedInSVG from "@assets/social/LinkedIn.svg";
import BehanceSVG from "@assets/social/Behance.svg";
import EmailSVG from "@assets/social/Email.svg";
import URLSVG from "@assets/icons/url.svg";

type ContactType =
  | "Instagram"
  | "X"
  | "Facebook"
  | "LinkedIn"
  | "Behance"
  | "Email"
  | "Other";

type ContactMeta = {
  type: ContactType;
  title?: string; // Other 제외 타이틀 표시용
  prefix: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  valuePlaceholder: string;
  allowCustomHref?: boolean; // Other만 true
  allowCustomTitle?: boolean; // Other만 true
};

const CONTACTS: readonly ContactMeta[] = [
  {
    type: "Instagram",
    title: "Instagram",
    prefix: "https://www.instagram.com/",
    icon: InstagramSVG,
    valuePlaceholder: "Instagram ID",
  },
  {
    type: "X",
    title: "X",
    prefix: "https://x.com/",
    icon: XSVG,
    valuePlaceholder: "X ID",
  },
  {
    type: "Facebook",
    title: "Facebook",
    prefix: "https://www.facebook.com/",
    icon: FacebookSVG,
    valuePlaceholder: "Facebook ID",
  },
  {
    type: "LinkedIn",
    title: "LinkedIn",
    prefix: "https://www.linkedin.com/in/",
    icon: LinkedInSVG,
    valuePlaceholder: "LinkedIn ID",
  },
  {
    type: "Behance",
    title: "Behance",
    prefix: "https://www.behance.net/",
    icon: BehanceSVG,
    valuePlaceholder: "Behance ID",
  },
  {
    type: "Email",
    title: "Email",
    prefix: "mailto:",
    icon: EmailSVG,
    valuePlaceholder: "email@example.com",
  },
  {
    type: "Other",
    prefix: "",
    icon: URLSVG,
    valuePlaceholder: "value (optional)",
    allowCustomHref: true,
    allowCustomTitle: true,
  },
] as const;

const isContactType = (v: string): v is ContactType =>
  (CONTACTS as readonly ContactMeta[]).some((c) => c.type === v);

const getMetaByType = (type: ContactType) =>
  CONTACTS.find((c) => c.type === type)!;

function normalizeValue(v: string) {
  return v.trim();
}

function buildHref(meta: ContactMeta, value: string, customHref: string) {
  if (meta.allowCustomHref) return customHref.trim();
  const v = normalizeValue(value);
  return v ? `${meta.prefix}${v}` : meta.prefix; // value 없으면 prefix만(원하면 ""로 바꿔도 됨)
}

export default function EditContactModal({
  open,
  onClose,
  initial,
  applyContact,
  deleteContact,
}: {
  open: boolean;
  onClose: () => void;
  initial: ContactLink;
  applyContact: (contact: ContactLink) => void;
  deleteContact: () => void;
}) {
  const [type, setType] = useState<ContactType>("Instagram");

  const [value, setValue] = useState("");
  const [customHref, setCustomHref] = useState("");
  const [customTitle, setCustomTitle] = useState("");

  const meta = useMemo(() => getMetaByType(type), [type]);

  const href = useMemo(
    () => buildHref(meta, value, customHref),
    [meta, value, customHref],
  );

  useEffect(() => {
    if (!initial) return;

    const initialType: ContactType = isContactType(initial.name)
      ? (initial.name as ContactType)
      : "Other";

    //eslint-disable-next-line react-hooks/exhaustive-deps
    setType(initialType);
    setValue(initial.value ?? "");

    if (initialType === "Other") {
      setCustomHref(initial.href ?? "");
      setCustomTitle(initial.name ?? "");
    } else {
      // non-Other는 title 고정이라 customTitle은 비워둠
      setCustomHref(""); // 혹시 이전 상태 남지 않게
      setCustomTitle("");
    }
  }, [initial]);

  const onClickIcon = (nextType: ContactType) => {
    setType(nextType);

    // 타입 바뀔 때 Other 전용 필드 정리(원하면 유지해도 됨)
    if (nextType !== "Other") {
      setCustomHref("");
      setCustomTitle("");
    }
  };

  const onSave = () => {
    const next: ContactLink = {
      // Other 제외: name은 타입 타이틀로 고정
      name: meta.allowCustomTitle
        ? customTitle.trim() || "Other"
        : (meta.title ?? meta.type),
      value: normalizeValue(value),
      href,
    };

    applyContact(next);
    onClose();
  };

  const onCancel = () => onClose();

  const Icon = meta.icon;

  return (
    <EditModalLayout
      title="Contact"
      open={open}
      onClose={onClose}
      className={Styles.Container}
      maxWidth="24rem"
    >
      <div className={Styles.IconTable}>
        {CONTACTS.map((c) => {
          const ActiveIcon = c.icon;
          const active = c.type === type;

          return (
            <button
              key={c.type}
              type="button"
              onClick={() => onClickIcon(c.type)}
              className={Styles.IconBtn}
              data-active={active}
              aria-label={c.type}
            >
              <ActiveIcon className={Styles.Icon} />
            </button>
          );
        })}
      </div>
      <div className={Styles.Content}>
        {/* Other 제외: 타이틀 띄우기 */}
        {!meta.allowCustomTitle && (
          <div className={Styles.Title}>
            <Icon className={Styles.TitleIcon} />
            <span>{meta.title ?? meta.type}</span>
          </div>
        )}

        {/* Other면 타이틀 입력 허용 */}
        {meta.allowCustomTitle && (
          <label className={Styles.Field}>
            <div className={Styles.Label}>Title</div>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Title"
            />
          </label>
        )}

        {/* value: id/email */}
        <label className={Styles.Field}>
          <div className={Styles.Label}>Value</div>
          <input
            type={type === "Email" ? "email" : "text"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={meta.valuePlaceholder}
            autoComplete={type === "Email" ? "email" : "off"}
            className={Styles.Input}
          />
        </label>

        {/* href: Other만 수정 가능, 그 외 disabled */}
        <label className={Styles.Field}>
          <div className={Styles.Label}>URL</div>

          {meta.allowCustomHref ? (
            <input
              type="text"
              value={customHref}
              onChange={(e) => setCustomHref(e.target.value)}
              placeholder="https://example.com"
              className={Styles.Input}
            />
          ) : (
            <input type="text" value={href} disabled className={Styles.Input} />
          )}
        </label>
      </div>

      <div className={Styles.ButtonContainer}>
        <button
          type="button"
          onClick={deleteContact}
          className={Styles.CancelButton}
        >
          Delete
        </button>
        <span style={{ flexGrow: "1" }} />
        <button
          type="button"
          onClick={onCancel}
          className={Styles.CancelButton}
        >
          Cancel
        </button>
        <button type="button" onClick={onSave} className={Styles.ApplyButton}>
          Save
        </button>
      </div>
    </EditModalLayout>
  );
}
