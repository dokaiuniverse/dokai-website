import { ModalLayoutProps } from "@components/modal/useModal";
import * as Styles from "./style.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import CrossSVG from "@assets/icons/cross.svg";

const BottomUpModalLayout = ({
  children,
  isShowModal,
  modalRef,
  handleClickOutSide,
  closeModal,
  showDelay,
}: ModalLayoutProps) => {
  return (
    <div
      ref={modalRef}
      onClick={handleClickOutSide}
      className={Styles.Layout({ isShowModal })}
      style={assignInlineVars({
        [Styles.showDelayVar]: `${showDelay}ms`,
      })}
    >
      <div className={Styles.Container({ isShowModal })}>
        <div className={Styles.Content}>
          <button onClick={closeModal} className={Styles.CloseButton}>
            <CrossSVG className={Styles.CloseButtonIcon} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default BottomUpModalLayout;
