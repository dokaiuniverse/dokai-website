import { useMemo } from "react";
import * as Styles from "./style.css";
import { Credit, Work } from "@domain/work";
import StructuredText from "@components/ui/Edit/StructuredText/StructuredText";

type CreditItem =
  | { type: "team"; value: string }
  | { type: "role"; value: string }
  | { type: "name"; value: string[] }
  | { type: "divider"; value: true };

const CLASS_BY_TYPE: Record<CreditItem["type"], string> = {
  team: Styles.CreditsTeamCell,
  role: Styles.CreditsRoleCell,
  name: Styles.CreditsNameCell,
  divider: Styles.CreditsDivider,
};

const workCreditsSpec = {
  levels: [
    { labelKey: "team", childrenKey: "members" },
    { labelKey: "role", childrenKey: "names" },
  ],
};

const WorkDetailCredits = ({
  work,
  editable,
  updateWork,
}: {
  work: Work;
  editable?: boolean;
  updateWork?: (updater: (work: Work) => Work) => void;
}) => {
  const creditItems = useMemo(() => {
    return work.credits
      .flatMap((credit, idx, arr) => {
        const rows: (CreditItem | { type: "divider"; value: boolean })[] = [
          { type: "team", value: credit.team },
          ...credit.members.flatMap((member) => {
            return [
              { type: "role", value: member.role },
              { type: "name", value: member.names },
            ] as const;
          }),
          { type: "divider", value: idx < arr.length - 1 },
        ];

        return rows;
      })
      .filter(
        (item): item is CreditItem =>
          item.type !== "divider" || item.value === true,
      );
  }, [work.credits]);

  const setCredits = (credits: Credit[]) => {
    updateWork?.((prev) => ({ ...prev, credits }));
  };

  return (
    <div className={Styles.Container}>
      <p className={Styles.Title}>ProjectCredits</p>

      <StructuredText
        data={work.credits}
        spec={workCreditsSpec}
        onUpdate={setCredits}
        editable={editable}
        className={Styles.ListContainer}
      >
        <div className={Styles.ListGrid}>
          {creditItems.map((item, idx) => (
            <div
              key={`WORK_CREDITS_${idx}`}
              className={CLASS_BY_TYPE[item.type]}
            >
              {item.type === "team" || item.type === "role" ? (
                <p>{item.value}</p>
              ) : item.type === "name" ? (
                item.value.map((name, idx2) => (
                  <p key={`WORK_CREDITS_NAME_${idx}_${idx2}`}>{name}</p>
                ))
              ) : null}
            </div>
          ))}
        </div>
      </StructuredText>
    </div>
  );
};

export default WorkDetailCredits;
