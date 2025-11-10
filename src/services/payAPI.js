const MOCK_API_BASE = "https://tiendareact-caldas.free.beeceptor.com";

async function handleResponse(response) {
  const responseText = await response.text();

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`;

    try {
      const parsed = JSON.parse(responseText);
      errorMessage = parsed.message || errorMessage;
    } catch {
      errorMessage = responseText || errorMessage;
    }

    throw new Error(errorMessage);
  }

  try {
    return JSON.parse(responseText);
  } catch {
    throw new Error("Error: Respuesta válida pero JSON inválido.");
  }
}

/**
 * 1) Procesar pago de boletos
 */
export async function processPayment(cart) {
  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const body = {
    amount: totalAmount,
    items: cart.items,
  };

  const res = await fetch(
    "https://tiendareact-caldas.free.beeceptor.com/payment/process",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  return handleResponse(res);
}


/**
 * 2) Consultar estado del pedido
 */
export async function getOrderStatus() {
  const URL = `${MOCK_API_BASE}/orders/ORD-007`;
  try {
    const res = await fetch(URL);
    return await handleResponse(res);
  } catch (err) {
    throw new Error(`Error revisando orden: ${err.message}`);
  }
}