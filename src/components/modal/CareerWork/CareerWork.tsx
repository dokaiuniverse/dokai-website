import MediaCard from "@components/ui/Media/MediaCard";
import { useCareerWorkQuery } from "./query";
import * as Styles from "./style.css";
import useLockBodyScroll from "@hooks/useLockBodyScroll";

const CareerWorkModal = ({ modalData }: { modalData: string }) => {
  useLockBodyScroll(true);

  const careerWorkId = modalData;

  const { data: careerWork, isLoading } = useCareerWorkQuery(careerWorkId);
  const { title, content, medias } = careerWork ?? {};

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={Styles.Container}>
      <p className={Styles.Title}>{title}</p>
      <div className={Styles.Content}>
        {content?.map((item) => (
          <div key={item.name} className={Styles.ContentItem}>
            <p className={Styles.ContentItemName}>{item.name}</p>
            <p className={Styles.ContentItemValue}>{item.value}</p>
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
