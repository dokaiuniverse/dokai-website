import * as Styles from "./style.css";
import MediaHoverOverlay from "@components/ui/Media/HoverOverlay/HoverOverlay";
import useCareerWorkModal from "@components/modal/CareerWork/useCareerWork";
import { ProjectCard } from "@domain/careers";
import { useSession } from "@lib/auth/useSession";
import PlusSVG from "@assets/icons/plus.svg";

const CareerDetailProjects = ({
  email,
  projects,
  editable,
}: {
  email: string;
  projects: ProjectCard[];
  editable?: boolean;
}) => {
  const { openModal } = useCareerWorkModal();
  const { me } = useSession();

  const isEditableProject =
    me?.role === "admin" || (me?.role === "staff" && me?.email === email);

  return (
    <div className={`${Styles.Container} ${editable ? Styles.FakeLayout : ""}`}>
      <p className={Styles.Title}>work</p>
      <div className={Styles.Content}>
        {projects.map((project, idx) => (
          <button
            key={`WORKS_${idx}`}
            className={Styles.Item}
            onClick={() => openModal(project.id)}
          >
            <MediaHoverOverlay
              media={project.thumbnail}
              className={Styles.ItemMedia}
            >
              <div className={Styles.ItemOverlay}>
                <p>{project.title}</p>
              </div>
            </MediaHoverOverlay>
          </button>
        ))}
        {isEditableProject && (
          <button className={Styles.AddButton} onClick={() => openModal("new")}>
            <PlusSVG className={Styles.AddButtonIcon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CareerDetailProjects;
