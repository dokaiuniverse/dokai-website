import * as Styles from "./style.css";

const CancelButton = ({
  onClick,
  isRight,
}: {
  onClick: () => void;
  isRight?: boolean;
}) => {
  return (
    <button
      type="button"
      className={Styles.Button({ isRight })}
      onClick={onClick}
    >
      Cancel
    </button>
  );
};

export default CancelButton;
