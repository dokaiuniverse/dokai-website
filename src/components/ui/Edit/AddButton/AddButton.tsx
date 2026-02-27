import * as Styles from "./style.css";
import PlusSVG from "@assets/icons/plus.svg";

const AddButton = ({
  onClick,
  className,
  type = "button",
}: {
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button
      className={`${Styles.Button} ${className}`}
      onClick={onClick}
      type={type}
    >
      <PlusSVG className={Styles.ButtonIcon} />
    </button>
  );
};

export default AddButton;
