"use client";

import categories from "@ts/categories";
import { toTitleCase } from "@utils/Text";
import Link from "next/link";
import * as Styles from "./style.css";
import { useMemo, useState } from "react";
import MoreButton from "@components/ui/Button/More";
import MediaHoverOverlay from "@components/ui/Media/HoverOverlay/HoverOverlay";
import { useWorksInfiniteQuery } from "@controllers/work/query";
import { WorkCategory } from "@domain/work";
import FloatingButton, {
  FloatingButtonContainer,
} from "@components/ui/Button/FloatingButton/FloatingButton";
import { useRouter } from "nextjs-toploader/app";

const WorkPageClient = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<
    WorkCategory | "EVERYTHING"
  >("EVERYTHING");

  const {
    data: works,
    fetchNextPage,
    hasNextPage,
  } = useWorksInfiniteQuery({
    mode: "category",
    category: selectedCategory,
  });

  const categoryGroups = useMemo(
    () =>
      Array.from(
        { length: Math.ceil(categories.length / 4) },
        (_, i) =>
          categories.slice(i * 4, i * 4 + 4) as (WorkCategory | "EVERYTHING")[],
      ),
    [],
  );

  return (
    <>
      <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
        <div className={Styles.CategoryContainer}>
          {categoryGroups.map((group, idx) => (
            <div
              key={`WORK_CATEGORY_GROUP_${idx}`}
              className={Styles.CategoryGroup}
            >
              {group.map((category) => (
                <label
                  key={`WORK_CATEGORY_${category}`}
                  className={Styles.Category}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    className={Styles.CategoryInput}
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                  />
                  <p>{toTitleCase(category)}</p>
                </label>
              ))}
            </div>
          ))}
        </div>
        <div className={Styles.WorkItemsContainer}>
          {works?.pages
            ?.flatMap((page) => page.items)
            .map((item) => (
              <Link
                key={`WORK_ITEM_${item.slug}`}
                className={Styles.WorkItem}
                href={`/work/${item.slug}`}
              >
                <MediaHoverOverlay
                  media={item.thumbnail!}
                  className={Styles.WorkItemMedia}
                >
                  <div className={Styles.WorkItemMediaOverlay}>
                    <p>{item.summary}</p>
                  </div>
                </MediaHoverOverlay>
                <p className={Styles.WorkItemText}>{item.title}</p>
              </Link>
            ))}
        </div>
        <div className={Styles.MoreButtonContainer}>
          {hasNextPage && <MoreButton onClick={() => fetchNextPage()} />}
        </div>
      </div>
      <FloatingButtonContainer>
        <FloatingButton
          type="ADD"
          onClick={() => router.push("/admin/work")}
          text="Create New Work"
        />
      </FloatingButtonContainer>
    </>
  );
};

export default WorkPageClient;
