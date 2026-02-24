import * as Styles from "./style.css";
import { useEffect, useState } from "react";
import SearchResult from "./Result";
import SearchHeader from "./Header";
import SearchInput from "./Input";
import { createPortal } from "react-dom";
import useLockBodyScroll from "@hooks/useLockBodyScroll";

const TRANSITION_DURATION = 250;

type Props = {
  handleCloseAll: () => void;
  state?: "open" | "closing";
  onAfterClose?: () => void;
};

const SearchModal = ({
  handleCloseAll,
  state = "open",
  onAfterClose,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [queries, setQueries] = useState<string[]>([]);
  useLockBodyScroll(true);

  const handleAddQuery = (value: string) => {
    if (!value) return false;
    if (queries.includes(value)) return false;
    setQueries((prev) => [...prev, value]);

    return true;
  };

  const handleRemoveQuery = (value: string) => {
    setQueries((prev) => prev.filter((q) => q !== value));
  };

  useEffect(() => {
    if (state === "open") {
      setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsVisible(true));
        });
      }, 0);
    } else if (state === "closing") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(false);
      setTimeout(() => {
        onAfterClose?.();
      }, TRANSITION_DURATION);
    }
  }, [state]);

  return createPortal(
    <div
      className={`${Styles.Overlay} layout-wrapper`}
      data-open={isVisible}
      aria-hidden={!isVisible}
    >
      <div className={Styles.Grid}>
        <SearchHeader handleClose={handleCloseAll} />
        <SearchInput
          queries={queries}
          addQuery={handleAddQuery}
          removeQuery={handleRemoveQuery}
        />
        <SearchResult queries={queries} handleClose={handleCloseAll} />
      </div>
    </div>,
    document.body,
  );
};

export default SearchModal;
