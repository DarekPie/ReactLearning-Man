import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal =  forwardRef( function Modal({ children, buttonCaption }, ref) {

    const dialog =  useRef();

    useImperativeHandle(ref, () => {
        return{
            open() {
                dialog.current.showModal();
            }
        };
    })

  return createPortal(
    <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
        {children}
        <form method = "dialog" className="mt-4 text-right">
            {/* <button className="text-stone-800 hover:text-stone-950">{buttonCaption}</button> */}
            <Button>{buttonCaption}</Button>
        </form>
        
    </dialog>,
    document.getElementById("modal-root")
  );
})

export default Modal;