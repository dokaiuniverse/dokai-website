import * as Styles from "./style.css";
import PlusSVG from "@assets/icons/plus.svg";

const AddButton = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button className={`${Styles.Button} ${className}`} onClick={onClick}>
      <PlusSVG className={Styles.ButtonIcon} />
    </button>
  );
};

export default AddButton;
