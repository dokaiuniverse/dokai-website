import * as Styles from "./style.css";
import { useEffect, useState } from "react";
import SearchResult from "./Result";
import SearchHeader from "./Header";
import SearchInput from "./Input";
import { createPortal } from "react-dom";
import useLockBodyScroll from "@hooks/useLockBodyScroll";

const TRANSITION_DURATION = 250;

type Props = {
  closeSearchRef: React.RefObject<(() => void) | null>;
  onClose: () => void;
};

const SearchModal = ({ closeSearchRef, onClose }: Props) => {
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

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, TRANSITION_DURATION);
  };

  useEffect(() => {
    closeSearchRef.current = handleClose;
    setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true));
      });
    }, 0);
  }, []);

  return createPortal(
    <div
      className={`${Styles.Overlay} layout-wrapper`}
      data-open={isVisible}
      aria-hidden={!isVisible}
    >
      <div className={Styles.Grid}>
        <SearchHeader handleClose={handleClose} />
        <SearchInput
          queries={queries}
          addQuery={handleAddQuery}
          removeQuery={handleRemoveQuery}
        />
        <SearchResult queries={queries} handleClose={handleClose} />
      </div>
    </div>,
    document.body,
  );
};

export default SearchModal;
