import styled from "./Modal.module.css";

export default function Modal() {
  return (
    <div className={styled.backdrop} role="dialog" aria-modal="true">
      <div className={styled.modal}>
        <button className={styled.closeButton} aria-label="Close modal">
          &times;
        </button>
        {/* children */}
      </div>
    </div>
  );
}
