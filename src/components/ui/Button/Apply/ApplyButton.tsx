import * as Styles from "./style.css";

const ApplyButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button type="button" className={Styles.Button} onClick={onClick}>
      Apply
    </button>
  );
};

export default ApplyButton;
