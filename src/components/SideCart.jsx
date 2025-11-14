import { useState } from "react";
import { Offcanvas, Stack, Button, Image, ListGroup } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";

const SideCart = ({ show, handleClose }) => {
  const { cart, removeFromCart, payOrder, checkStatus, orderId, calculateTotal } = useCart();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handlePay = async (simulateFail = false) => {
    await payOrder(simulateFail);
    openModal();
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tu Carrito</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {cart.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <Stack gap={3}>
              <ListGroup variant="flush">
                {cart.map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <Image
                      src={item.image ?? item.poster}
                      style={{ width: 45 }}
                    />

                    <div className="me-auto ms-2">
                      <strong>{item.title}</strong>
                      <div>
                        Cant: {item.quantity} x ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      &times;
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="d-flex justify-content-end fw-bold fs-5">
                Total: ${calculateTotal().toFixed(2)}
              </div>

              <Button variant="primary" onClick={() => handlePay(false)}>
                Proceder al Pago
              </Button>

              <Button variant="danger" onClick={() => handlePay(true)}>
                Pagar (Simular Fallo)
              </Button>

              {orderId && (
                <Button variant="warning" onClick={checkStatus}>
                  Consultar Estado del Pedido
                </Button>
              )}
            </Stack>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      <CartModal show={showModal} handleClose={closeModal} />
    </>
  );
};

export default SideCart;
