import StructuredText from "@components/ui/Edit/StructuredText/StructuredText";
import * as Styles from "./style.css";
import { ProfileDetail } from "@domain/careers";

const experienceSpec = { levels: [], leafUsesDash: true };

const CareerDetailExperiences = ({
  experiences,
  editable,
  updateProfile,
}: {
  experiences: string[];
  editable?: boolean;
  updateProfile?: (updater: (profile: ProfileDetail) => ProfileDetail) => void;
}) => {
  const setExperiences = (experiences: string[]) => {
    updateProfile?.((prev) => ({ ...prev, experiences }));
  };

  return (
    <div className={Styles.Container}>
      <p className={Styles.Title}>
        Experience <wbr />
        Credentials <wbr />
        Profile
      </p>
      <StructuredText
        data={experiences}
        spec={experienceSpec}
        onUpdate={setExperiences}
        editable={editable}
        className={Styles.ListContainer}
        placeholder={"- 2026 tmp1\n- 2026 tmp2\n- 2026 tmp3..."}
      >
        <div className={Styles.List}>
          {experiences.map((experience, idx) => (
            <p key={`EXPERIENCES_${idx}`}>{experience}</p>
          ))}
        </div>
      </StructuredText>
    </div>
  );
};

export default CareerDetailExperiences;
