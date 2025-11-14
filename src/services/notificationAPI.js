const NOTIFY_API_BASE = "https://notificacion-pedido.free.beeceptor.com";

export async function sendOrderConfirmation(orderId) {
  const URL = `${NOTIFY_API_BASE}/orders/${orderId}`;
  console.log(URL)

  try {
    const res = await fetch(URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const txt = await res.text();

    if (!res.ok) throw new Error(txt);

    try {
      return JSON.parse(txt);
    } catch {
      throw new Error("Respuesta inválida desde el servidor.");
    }
  } catch (err) {
    throw new Error(`Error notificación: ${err.message}`);
  }
}
