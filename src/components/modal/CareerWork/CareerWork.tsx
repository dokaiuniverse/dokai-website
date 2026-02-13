import MediaCard from "@components/ui/Media/MediaCard";
import { useCareerWorkQuery } from "./query";
import * as Styles from "./style.css";
import useLockBodyScroll from "@hooks/useLockBodyScroll";
import useIsPastSentinel from "@hooks/useIsPastSentinel";
import { vars } from "@styles/theme.css";
import { useEffect, useRef, useState } from "react";
import { disconnect } from "process";
import useElementRect from "@hooks/useElementRect";

const CareerWorkModal = ({ modalData }: { modalData: string }) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const careerWorkId = modalData;

  const { data: careerWork, isLoading } = useCareerWorkQuery(careerWorkId);

  const { height, elementRef: titleRef } = useElementRect<HTMLParagraphElement>(
    {
      deps: [isLoading],
    },
  );
  const { title, content, medias } = careerWork ?? {};

  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // sentinel이 viewport 위로 사라지면 sticky가 top에 붙기 시작한 상태
        console.log(entry);
        setStuck(!entry.isIntersecting);
      },
      {
        root: null, // viewport 기준
        threshold: [1],
        // top:0 라인을 기준으로 붙는 경우 보통 0으로 충분
      },
    );

    console.log("observe");
    io.observe(el);
    return () => {
      console.log("disconnect");
      io.disconnect();
    };
  }, [isLoading]);

  useEffect(() => {
    if (stuck) return;
    contentRef.current?.scrollTo({
      top: 0,
    });
  }, [stuck]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={Styles.Container}>
      <div ref={sentinelRef} style={{ height: 1 }} />
      <p
        ref={titleRef}
        data-stuck={stuck}
        className={Styles.Title}
        style={{
          gridRow: "2",
        }}
      >
        {title}
      </p>
      <div
        className={Styles.Content}
        data-stuck={stuck}
        ref={contentRef}
        style={
          {
            ["--title-height"]: `${height}px`,
          } as React.CSSProperties
        }
      >
        {stuck && <p className={Styles.ContentTitle}>{title}</p>}
        {content?.map((item) => (
          <div key={item.name} className={Styles.ContentItem}>
            <p className={Styles.ContentItemName}>{item.name}</p>
            {item.type === "TEXT" && (
              <p className={Styles.ContentItemText}>{item.value}</p>
            )}
            {item.type === "LIST" && (
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
        {medias?.map((media, index) => (
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

export default CareerWorkModal;
