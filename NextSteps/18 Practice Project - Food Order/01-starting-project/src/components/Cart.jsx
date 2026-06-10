import { UseContext } from "react";

import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";

export default function Cart() {
  const cartCtx = useContext(CartContext);

  return (
    <Modal>
      <h2>Your Cart</h2>
      <ul></ul>
    </Modal>
  );
}
