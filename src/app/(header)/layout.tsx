import * as Styles from "./style.css";
import Header from "@components/layout/Header/Header";

const HeaderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={Styles.Layout}>
      <Header />
      <div className={Styles.Content}>{children}</div>
    </div>
  );
};

export default HeaderLayout;
