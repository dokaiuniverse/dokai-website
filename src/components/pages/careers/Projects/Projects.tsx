import * as Styles from "./style.css";
import MediaHoverOverlay from "@components/ui/Media/HoverOverlay/HoverOverlay";
import { ProjectCard } from "@domain/careers";
import { useSession } from "@lib/auth/useSession";
import PlusSVG from "@assets/icons/plus.svg";
import { useRouter } from "nextjs-toploader/app";
import { useQueryClient } from "@tanstack/react-query";
import { fetchProjectDetail } from "@controllers/careers/fetch";
import { queryOptions } from "@controllers/common";

const CareerDetailProjects = ({
  email,
  projects,
  editable,
}: {
  email: string;
  projects: ProjectCard[];
  editable?: boolean;
}) => {
  const router = useRouter();
  const qc = useQueryClient();
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
            onClick={async () => {
              void qc.prefetchQuery({
                queryKey: ["project", project.id],
                queryFn: () => fetchProjectDetail(project.id),
                ...queryOptions,
              });
              router.push(`?project=${project.id}`, { scroll: false });
            }}
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
          <button
            className={Styles.AddButton}
            onClick={() => {
              router.push("?project=new", { scroll: false });
            }}
          >
            <PlusSVG className={Styles.AddButtonIcon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CareerDetailProjects;
