import { useState } from "react";
import { useSessionRole } from "@controllers/auth/session";
import { useFormContext } from "react-hook-form";
import type { ProfileFormInput } from "./career";
import EditPublished from "@components/ui/Edit/EditPublished/EditPublished";
import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import * as Styles from "./style.css";
import { fetchProfileCheckEmail } from "@controllers/careers/fetch";

const CareerEditInfo = () => {
  const role = useSessionRole();
  const form = useFormContext<ProfileFormInput>();
  const emailEditable = role === "admin";

  const {
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = form;

  const [checkState, setCheckState] = useState<"idle" | "checking" | "ok">(
    "idle",
  );

  const handleCheckEmail = async () => {
    if (!emailEditable) return;

    const raw = getValues("email") ?? "";
    const nextEmail = raw.trim();

    if (!nextEmail) {
      setError("email", { type: "manual", message: "Email is required" });
      setCheckState("idle");
      return;
    }

    // 형식 검증(간단 버전) — 너 이미 zod 쓰면 거기에 맡겨도 됨
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail);
    if (!isValidEmail) {
      setError("email", { type: "manual", message: "Invalid email" });
      setCheckState("idle");
      return;
    }

    setCheckState("checking");

    try {
      const result = await fetchProfileCheckEmail(nextEmail);

      if (!result.ok) {
        setError("email", {
          type: "manual",
          message: result.message ?? "This email is already in use",
        });
        setCheckState("idle");
        return;
      }

      clearErrors("email");
      setCheckState("ok");
    } catch {
      setError("email", { type: "manual", message: "Email check failed" });
      setCheckState("idle");
    }
  };

  const buttonText =
    checkState === "checking"
      ? "Checking..."
      : checkState === "ok"
        ? "Checked"
        : "Check";

  const buttonDisabled =
    !emailEditable || checkState !== "idle" || !!errors.email;

  return (
    <section className={Styles.EditInfoContainer}>
      <div className={Styles.EditInfoEmailContainer /* 있으면 */}>
        <TitleInput
          title="Email"
          form={form}
          name="email"
          disabled={!emailEditable}
          onChange={() => setCheckState("idle")}
        />
        <button
          type="button"
          onClick={handleCheckEmail}
          disabled={buttonDisabled}
          className={Styles.EditInfoEmailButton}
        >
          {buttonText}
        </button>
      </div>

      <TitleInput title="Name" form={form} name="name" />
      <TitleInput title="Role" form={form} name="role" />
      <EditPublished form={form} name="isPublished" />
    </section>
  );
};

export default CareerEditInfo;
