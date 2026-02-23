import PlusSVG from "@assets/icons/plus.svg";
import EditSVG from "@assets/icons/edit.svg";
import SaveSVG from "@assets/icons/save.svg";
import TrashSVG from "@assets/icons/trash.svg";
import * as Styles from "./style.css";

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
      {type === "EDIT" && <EditSVG className={Styles.ButtonIcon} />}
      {type === "ADD" && <PlusSVG className={Styles.ButtonIcon} />}
      {type === "REMOVE" && <TrashSVG className={Styles.ButtonIcon} />}
      {type === "SAVE" && <SaveSVG className={Styles.ButtonIcon} />}
      <div className={Styles.ButtonText}>{text ?? type}</div>
    </button>
  );
};

export default FloatingButton;
