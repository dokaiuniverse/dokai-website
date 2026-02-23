import { useSearchParams } from "next/navigation";
import * as Styles from "./style.css";
import { useRouter } from "nextjs-toploader/app";
import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import { useEffect, useMemo, useState } from "react";
import useLockBodyScroll from "@hooks/useLockBodyScroll";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import CrossSVG from "@assets/icons/cross.svg";
import { Project, ProjectContent } from "@domain/careers";
import z from "zod";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MediaSource } from "@domain/media";
import PlusSVG from "@assets/icons/plus.svg";
import { useModalStackStore } from "@stores/modalStackStore";
import {
  fetchProjectCreate,
  fetchProjectDelete,
  fetchProjectUpdate,
} from "@controllers/careers/fetch";
import { useProjectDetailQuery } from "@controllers/careers/query";
import EditButton from "@components/ui/Edit/EditButton/EditButton";
import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import ErrorText from "@components/ui/Edit/ErrorText/ErrorText";
import EditMediaList from "@components/ui/Edit/EditMediaList/EditMediaList";
import EditSingleMedia from "@components/ui/Edit/EditSingleMedia/EditSingleMedia";
import EditPublished from "@components/ui/Edit/EditPublished/EditPublished";
import FloatingButton from "@components/ui/Edit/FloatingButton/FloatingButton";
import { useSession } from "@lib/auth/useSession";

const TRANSITION_DURATION = 200;

const schema = z
  .object({
    isPublished: z.boolean(),
    title: z.string().min(1, "Title is required"),
    thumbnail: z.unknown().nullable(),
    contents: z.array(z.unknown().nullable()),
    medias: z.array(z.unknown().nullable()),
  })
  .superRefine((v, ctx) => {
    // ✅ thumbnail 필수
    if (v.thumbnail == null) {
      ctx.addIssue({
        code: "custom",
        path: ["thumbnail"],
        message: "Thumbnail is required",
      });
    }

    // ✅ contents 최소 1개 (null/undefined/빈문자 제거 기준)
    const contentsCount = v.contents.filter(
      (x) => x != null && x !== "",
    ).length;
    if (contentsCount < 1) {
      ctx.addIssue({
        code: "custom",
        path: ["contents"],
        message: "Add at least 1 content section",
      });
    }

    // ✅ medias 최소 1개
    const mediasCount = v.medias.filter((x) => x != null && x !== "").length;
    if (mediasCount < 1) {
      ctx.addIssue({
        code: "custom",
        path: ["medias"],
        message: "Add at least 1 media",
      });
    }
  });

export type ProjectFormInput = z.input<typeof schema>;

type Props = {
  ownerEmail: string;
  onClose: () => void;
};

const initialProject: Project = {
  id: "",
  title: "",
  thumbnail: null,
  contents: [],
  medias: [],
};

const ProjectModalView = ({ project }: { project: Project }) => {
  return (
    <div className={Styles.Container}>
      <p className={Styles.Title}>{project?.title}</p>
      <div className={Styles.Content}>
        {project?.contents?.map((item) => (
          <div key={item.name} className={Styles.ContentItem}>
            <p className={Styles.ContentItemName}>{item.name}</p>
            {item.type === "TEXT" ? (
              <p className={Styles.ContentItemText}>{item.value}</p>
            ) : (
              <ul className={Styles.ContentItemList}>
                {item.value.map((value, index) => (
                  <li key={index} className={Styles.ContentItemListItem}>
                    {value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className={Styles.MediaContainer}>
        {project?.medias?.map((media, index) => (
          <MediaCard
            key={`CAREER_WORK_MEDIA_${index}`}
            media={media}
            className={Styles.Media}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectModalEdit = () => {
  const form = useFormContext<ProjectFormInput>();
  const {
    watch,
    clearErrors,
    setValue,
    formState: { errors },
  } = form;

  const thumbnail = watch("thumbnail") as MediaSource;
  const contents = watch("contents") as ProjectContent[];
  const medias = watch("medias") as MediaSource[];

  const { push } = useModalStackStore();

  const handleEditContent = (idx: number) => {
    push("EDIT_PROJECT_CONTENT", {
      initial: contents[idx],
      applyContent: (content) => {
        setValue(
          "contents",
          contents.map((c, i) => (i === idx ? content : c)),
        );
      },
    });
  };

  const handleCreateContent = () => {
    clearErrors("contents");
    push("EDIT_PROJECT_CONTENT", {
      initial: {
        name: "",
        type: "TEXT",
        value: "",
      },
      applyContent: (content) => {
        setValue("contents", [...contents, content]);
      },
    });
  };

  return (
    <div className={Styles.Container}>
      <div className={Styles.ThumbnailEditContainer}>
        <ErrorText message={errors.thumbnail?.message} />
        <EditSingleMedia
          media={thumbnail}
          onClick={() => clearErrors("thumbnail")}
          className={Styles.MediaContainer}
          applyMedia={(media) => {
            setValue("thumbnail", media);
          }}
          blockedTypes={["VIDEO"]}
        />
      </div>
      <div className={Styles.InfoEditContainer}>
        <TitleInput
          title="Title"
          placeholder="Enter title"
          form={form}
          name="title"
          className={Styles.TitleEditContainer}
        />
        <EditPublished
          form={form}
          name="isPublished"
          className={Styles.PublishedEditContainer}
        />
      </div>
      <div className={Styles.Content}>
        {contents.map((item, idx) => (
          <div key={item.name} className={Styles.ContentItem}>
            <p className={Styles.ContentItemName}>{item.name ?? "Name..."}</p>
            {item.type === "TEXT" ? (
              <p className={Styles.ContentItemText}>
                {item.value ?? "Text..."}
              </p>
            ) : (
              <ul className={Styles.ContentItemList}>
                {item.value.map((value, index) => (
                  <li key={index} className={Styles.ContentItemListItem}>
                    {value}
                  </li>
                ))}
                {item.value.length === 0 && (
                  <li className={Styles.ContentItemListItem}>Item...</li>
                )}
              </ul>
            )}
            <EditButton
              onClick={() => handleEditContent(idx)}
              className={Styles.ContentEditButton}
            />
          </div>
        ))}
        <button
          className={Styles.ContentAddButton}
          onClick={handleCreateContent}
        >
          <PlusSVG className={Styles.ButtonIcon} />
        </button>

        <ErrorText message={errors.contents?.message} />
      </div>
      <div className={Styles.EditMediaContainer}>
        <ErrorText message={errors.medias?.message} />
        <EditMediaList
          medias={medias}
          onClick={() => clearErrors("medias")}
          className={Styles.MediaContainer}
          applyMedias={(medias) => {
            setValue("medias", medias);
          }}
        />
      </div>
    </div>
  );
};

const ProjectModal = ({ ownerEmail, onClose }: Props) => {
  const { me } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawId = searchParams.get("project");
  const [mode, setMode] = useState(rawId === "new" ? "EDIT" : "VIEW");

  const [isVisible, setIsVisible] = useState(false);

  const { push } = useModalStackStore();

  const isEditableProject =
    me?.role === "admin" || (me?.role === "staff" && me?.email === ownerEmail);

  //error
  useLockBodyScroll(true);

  useEffect(() => {
    const t = setTimeout(() => {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setIsVisible(true)),
      );
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      router.back();
    }, TRANSITION_DURATION);
  };

  const [projectId, setProjectId] = useState<string | null>(
    rawId === "new" ? null : rawId!,
    // "1",
  );

  const { data: fetchedProject } = useProjectDetailQuery(projectId);
  console.log(fetchedProject);

  const form = useForm<ProjectFormInput>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      ...initialProject,
      ...{
        isPublished: !!fetchedProject?.isPublished,
        ...fetchedProject?.data,
      },
    },
  });

  useEffect(() => {
    if (fetchedProject) {
      form.reset({
        ...initialProject,
        ...{
          isPublished: !!fetchedProject?.isPublished,
          ...fetchedProject?.data,
        },
      });
    }
  }, [fetchedProject]);

  const formValues = useWatch({ control: form.control });

  const projectForView = useMemo(() => {
    // formValues가 아직 비어있을 수 있으니 fallback을 섞어줌
    return {
      ...initialProject,
      ...fetchedProject,
      ...formValues,
    } as Project;
  }, [formValues, fetchedProject]);

  const handleSave = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;
    if (projectId) {
      push("API", {
        title: "Update Project",
        onFetch: () => {
          const { isPublished, ...rest } = schema.parse(formValues);

          return fetchProjectUpdate({
            id: projectId,
            isPublished,
            data: rest as Omit<Project, "id">,
          });
        },
        doneText: "Update Project Success",
        loadingText: "Updating Project...",
        onConfirm: () => {
          router.replace(`?project=${projectId}`);
          handleClose();
        },
      });
    } else {
      push("API", {
        title: "Create Project",
        onFetch: () => {
          const { isPublished, ...rest } = schema.parse(formValues);

          return fetchProjectCreate({
            ownerEmail,
            isPublished,
            data: rest as Omit<Project, "id">,
          });
        },
        doneText: "Create Project Success",
        loadingText: "Creating Project...",
        onSuccess: (data) => {
          console.log(1, data);
          setProjectId(data.id);
        },
        onConfirm: () => {
          router.replace(`?project=${projectId}`);
          handleClose();
        },
      });
    }
  };

  const handleRemove = () => {
    push("API", {
      title: "Remove Project",
      onFetch: () => {
        return fetchProjectDelete(projectId!);
      },
      doneText: "Remove Project Success",
      loadingText: "Removing Project...",
      onConfirm: () => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.delete("project");
        router.replace(`?${searchParams.toString()}`);
        handleClose();
      },
    });
  };

  return (
    <div
      className={Styles.Overlay({ isVisible: isVisible })}
      style={assignInlineVars({
        [Styles.TransitionDurationVar]: `${TRANSITION_DURATION}ms`,
      })}
      onMouseDown={handleClose}
    >
      <div
        className={Styles.Layout({ isVisible: isVisible })}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={Styles.Header}>
          {isEditableProject && (
            <label className={Styles.EditToggleContainer}>
              <p className={Styles.EditToggleTitle}>Edit</p>
              <input
                type="checkbox"
                checked={mode === "EDIT"}
                onChange={(e) => {
                  setMode(e.target.checked ? "EDIT" : "VIEW");
                }}
                className={Styles.EditToggleInput}
              />
              <span className={Styles.EditToggle} />
            </label>
          )}
          <button onClick={handleClose} className={Styles.CloseButton}>
            <CrossSVG className={Styles.CloseButtonIcon} />
          </button>
        </div>
        {!rawId ? (
          <div>unknown project</div>
        ) : mode === "VIEW" ? (
          <ProjectModalView project={projectForView} />
        ) : (
          <FormProvider {...form}>
            <ProjectModalEdit />
          </FormProvider>
        )}
        {isEditableProject && (
          <div className={Styles.FloatingButtonContainer}>
            <FloatingButton
              type="SAVE"
              text="Save Project"
              onClick={handleSave}
            />
            {projectId && (
              <FloatingButton
                type="REMOVE"
                text="Remove Project"
                onClick={handleRemove}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
