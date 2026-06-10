import { createPoral } from "react-dom";
import { useEffect, useRef } from "react";

export default function Modal({ children, open, className = '' }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPoral(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}
