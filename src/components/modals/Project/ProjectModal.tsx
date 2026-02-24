import { useSearchParams } from "next/navigation";
import * as Styles from "./style.css";
import { useRouter } from "nextjs-toploader/app";
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
import PrivateMark from "@components/ui/PrivateMark/PrivateMark";
import EditModeToggle from "@components/ui/Edit/EditModeToggle/EditModeToggle";
import ProjectModalView from "./View";
import ErrorComponent from "@components/ui/Status/Error";
import LoadingComponent from "@components/ui/Status/Loading";
import AddButton from "@components/ui/Edit/AddButton/AddButton";
import { useSessionOwner } from "@controllers/auth/session";

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
    if (v.thumbnail == null) {
      ctx.addIssue({
        code: "custom",
        path: ["thumbnail"],
        message: "Thumbnail is required",
      });
    }

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

const initialProject: Project & { isPublished: boolean } = {
  id: "",
  title: "",
  thumbnail: null,
  contents: [],
  medias: [],
  isPublished: false,
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
            <EditButton
              onClick={() => handleEditContent(idx)}
              className={Styles.ContentEditButton}
            />
          </div>
        ))}
        <AddButton onClick={handleCreateContent} />

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
  const isOwner = useSessionOwner(ownerEmail);
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawId = searchParams.get("project");
  const [mode, setMode] = useState<"EDIT" | "VIEW">(
    rawId === "new" ? "EDIT" : "VIEW",
  );

  const [isVisible, setIsVisible] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(
    rawId === "new" ? null : rawId!,
  );
  const { push } = useModalStackStore();
  useLockBodyScroll(true);

  const {
    data: fetchedProject,
    isLoading,
    isError,
  } = useProjectDetailQuery(projectId);

  const form = useForm<ProjectFormInput>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: initialProject,
  });

  const isPublished = form.watch("isPublished");
  const formValues = useWatch({ control: form.control });

  const projectForView = useMemo(() => formValues as Project, [formValues]);

  const isEditableProject = !isLoading && !isError && isOwner;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      router.back();
    }, TRANSITION_DURATION);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setIsVisible(true)),
      );
    }, 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (fetchedProject) {
      form.reset({
        isPublished: !!fetchedProject?.isPublished,
        ...fetchedProject?.data,
      });
    }
  }, [fetchedProject]);

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
            <EditModeToggle mode={mode} setMode={setMode} />
          )}

          {isEditableProject && (
            <PrivateMark
              isPrivate={!isPublished}
              className={Styles.PrivateMark}
            />
          )}
          <button onClick={handleClose} className={Styles.CloseButton}>
            <CrossSVG className={Styles.CloseButtonIcon} />
          </button>
        </div>
        {isLoading ? (
          <LoadingComponent useText="Loading..." />
        ) : isError ? (
          <ErrorComponent errorText="Unknown Project" />
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
