import * as Styles from "./style.css";
import CareersDetailPageClient from "./page-client";

const CareersDetailPageServer = ({ email }: { email: string }) => {
  return (
    <div className={`${Styles.Container} `}>
      <CareersDetailPageClient email={email} />
    </div>
  );
};

export default CareersDetailPageServer;
