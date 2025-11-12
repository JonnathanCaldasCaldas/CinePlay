import { useState } from 'react';
import { CartContext } from './CartContext';
import { processPayment } from '../services/payAPI';
import { sendOrderConfirmation } from '../services/notificationAPI';
import { toast } from 'react-toastify';
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  const [userSelections, setUserSelections] = useState({
    cinema: '',
    date: '',
    language: '', 
    format: '',
    time: '',
  })

  const updateSelections = (updates) => { 
    setUserSelections((prev) => ({ ...prev, ...updates }));
  }

  // Añadir un producto al carrito
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Calcular total del carrito
  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Procesar pago
  const payOrder = async () => {
    try {
      setStatusMessage(null);
      setOrderId(null);

      // Total real del carrito
      const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );

      const resp = await processPayment({
        total,
        items: cart,
      });

      setOrderId(resp.orderId ?? "ORD-007");
      setStatusMessage(resp.message || "Pago Exitoso!");
      return true;
    } catch (error) {
      setStatusMessage(error.message);
      return false;
    }
  };

  // Consultar estado del pedido simulado
  const checkStatus = async () => {
    try {
      const result = await sendOrderConfirmation(orderId);
      toast.success(result.message || "Pedido confirmado exitosamente!");
    } catch (err) {
      toast.error(err.message || "Error al confirmar el pedido!");
    }
  };

  const value = {
    cart,
    showCart,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    orderId,
    statusMessage,
    payOrder,
    checkStatus,
    calculateTotal,
    userSelections,
    updateSelections
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
