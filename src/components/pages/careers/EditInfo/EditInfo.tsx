import { useFormContext } from "react-hook-form";
import { ProfileFormInput } from "../../../../app/(admin)/admin/(edit)/careers/page-client";
import { useEffect, useRef, useState } from "react";
import * as Styles from "./style.css";

const InputError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <p className={Styles.InputError}>{message}</p>;
};

const EditInfoSection = ({ emailEditable }: { emailEditable: boolean }) => {
  const {
    register,
    trigger,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<ProfileFormInput>();

  const email = (watch("email") ?? "").trim();

  const verifiedEmailRef = useRef<string | null>(null);
  const [checkState, setCheckState] = useState<
    "idle" | "checking" | "verified"
  >("idle");

  useEffect(() => {
    if (verifiedEmailRef.current && email !== verifiedEmailRef.current) {
      verifiedEmailRef.current = null;
      setCheckState("idle");
    }
  }, [email]);

  const checkEmail = async () => {
    const ok = await trigger("email");
    if (!ok) {
      setCheckState("idle");
      verifiedEmailRef.current = null;
      return;
    }

    if (verifiedEmailRef.current === email) {
      setCheckState("verified");
      return;
    }

    const setEmailError = (message: string) => {
      setError("email", {
        type: "manual",
        message,
      });
      setCheckState("idle");
      verifiedEmailRef.current = null;
    };

    setCheckState("checking");
    try {
      const res = await fetch(
        `/api/check-email?email=${encodeURIComponent(email)}`,
      );
      if (!res.ok) throw new Error("request failed");

      const data = (await res.json()) as { available: boolean };

      if (!data.available) {
        setEmailError("already exists");
        return;
      }

      clearErrors("email");
      verifiedEmailRef.current = email;
      setCheckState("verified");
    } catch {
      setEmailError("failed to check. try again");
    }
  };

  const ButtonStateText =
    checkState === "verified"
      ? "Verified"
      : checkState === "checking"
        ? "Checking..."
        : "Check";

  const rhf = (name: keyof ProfileFormInput) => ({
    ...register(name),
    onFocus: () => clearErrors(name),
  });

  return (
    <section className={Styles.Container}>
      <label className={Styles.InputContainer}>
        <p className={Styles.InputTitle}>Email</p>
        <div className={Styles.InputColumn}>
          <input
            className={Styles.Input}
            placeholder="email"
            {...rhf("email")}
            disabled={!emailEditable}
          />
          {emailEditable && (
            <button
              type="button"
              onClick={checkEmail}
              disabled={checkState === "checking"}
              className={Styles.InputButton}
            >
              {ButtonStateText}
            </button>
          )}
        </div>
        <InputError message={errors.email?.message} />
      </label>

      <label className={Styles.InputContainer}>
        <p className={Styles.InputTitle}>Name</p>
        <input className={Styles.Input} placeholder="name" {...rhf("name")} />
        <InputError message={errors.name?.message} />
      </label>

      <label className={Styles.InputContainer}>
        <p className={Styles.InputTitle}>Role</p>
        <input className={Styles.Input} placeholder="role" {...rhf("role")} />
        <InputError message={errors.role?.message} />
      </label>

      <label className={Styles.ToggleContainer}>
        <div className={Styles.ToggleText}>
          <p className={Styles.ToggleTitle}>Public</p>
          <p className={Styles.ToggleDesc}>
            Publish this page so anyone can view it.
          </p>
        </div>

        <div className={Styles.ToggleWrapper}>
          <input
            type="checkbox"
            {...register("isPublished")}
            className={Styles.ToggleInput}
          />
          <span className={Styles.Toggle} />
        </div>
      </label>
    </section>
  );
};

export default EditInfoSection;
