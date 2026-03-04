import PlusSVG from "@assets/icons/plus.svg";
import EditSVG from "@assets/icons/edit.svg";
import SaveSVG from "@assets/icons/save.svg";
import TrashSVG from "@assets/icons/trash.svg";
import * as Styles from "./style.css";
import { authQueriesClient } from "@controllers/auth/query.client";
import { useAppQuery } from "@controllers/common";
import { Role } from "@lib/auth/types";

const FloatingButton = ({
  type,
  text,
  className,
  onClick,
}: {
  type: "EDIT" | "ADD" | "REMOVE" | "SAVE";
  text?: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button className={`${Styles.Button} ${className}`} onClick={onClick}>
      {type === "EDIT" ? (
        <EditSVG className={Styles.ButtonIcon} />
      ) : type === "ADD" ? (
        <PlusSVG className={Styles.ButtonIcon} />
      ) : type === "REMOVE" ? (
        <TrashSVG className={Styles.ButtonIcon} />
      ) : (
        <SaveSVG className={Styles.ButtonIcon} />
      )}
      <div className={Styles.ButtonText}>{text ?? type}</div>
    </button>
  );
};

export const FloatingButtonContainer = ({
  children,
  className,
  role,
  email,
}: {
  children?: React.ReactNode;
  className?: string;
  role?: Role[];
  email?: string;
}) => {
  const { data: session } = useAppQuery(authQueriesClient.sessionStatus());

  if (
    !session ||
    (role && !role.includes(session.role)) ||
    (email && session.role === "staff" && session.email !== email)
  )
    return null;

  return <div className={`${Styles.Container} ${className}`}>{children}</div>;
};

export default FloatingButton;
