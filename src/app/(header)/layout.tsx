import * as Styles from "./style.css";
import HeaderShell from "./HeaderShell";

const HeaderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={Styles.Layout}>
      <HeaderShell />
      <div className={Styles.Content}>{children}</div>
    </div>
  );
};

export default HeaderLayout;
