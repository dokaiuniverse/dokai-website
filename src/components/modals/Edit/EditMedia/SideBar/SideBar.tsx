import MediaCard from "@components/ui/Media/MediaCard/MediaCard";
import { MediaSource } from "@domain/media";
import * as Styles from "./style.css";
import TrashSVG from "@assets/icons/trash.svg";
import PlusSVG from "@assets/icons/plus.svg";

const SideBar = ({
  medias,
  deleteMedia,
  selectedIndex,
  setSelectedIndex,
}: {
  medias: { id: number; media: MediaSource }[];
  deleteMedia: (id: number) => void;
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
}) => {
  console.log(medias);
  return (
    <div className={Styles.Scroll}>
      {medias.map((media, i) => (
        <div
          key={media.id}
          className={Styles.MediaContainer}
          onClick={() => setSelectedIndex(i)}
          data-selected={selectedIndex === i}
        >
          <MediaCard
            media={media.media}
            className={Styles.Media}
            blockInteractive
            useAlternative
          />
          <button
            className={Styles.DeleteButton}
            onClick={() => deleteMedia(media.id)}
          >
            <TrashSVG className={Styles.DeleteButtonIcon} />
          </button>
        </div>
      ))}
      <label className={Styles.AddButonContainer}>
        <button
          onClick={() => setSelectedIndex(-1)}
          className={Styles.AddButton}
        >
          <PlusSVG className={Styles.AddButtonIcon} />
        </button>
      </label>
    </div>
  );
};

export default SideBar;
