import { Modal, Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";

export default function CartModal({ show, handleClose }) {
  const { statusMessage } = useCart();

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Resultado del Pago</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {statusMessage || "Procesando..."}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
