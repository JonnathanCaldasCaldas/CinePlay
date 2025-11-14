import { Modal, Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";

export default function CartModal({ show, handleClose }) {
  const { 
    statusMessage, 
    cart,
    userSelections
  } = useCart();

  const { cinema, date } = userSelections ?? {};

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Resumen de Compra</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h5>{statusMessage ?? "Procesando..."}</h5>

        <h5 className="mt-3">Datos Generales</h5>
        <p><strong>Cine:</strong> {cinema}</p>
        <p><strong>Fecha:</strong> {date}</p>

        <h5 className="mt-3">Películas</h5>
        {cart.map(item => (
          <div key={item.id} style={{ marginBottom: "12px" }}>
            <p><strong>{item.title}</strong></p>
            <p>Idioma: {item.language}</p>
            <p>Formato: {item.format}</p>
            <p>Horario: {item.time}</p>
            <p>Cantidad: {item.quantity}</p>
            <hr />
          </div>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
