import { useState } from "react";
import "./../styles/tickets.css";

export default function TicketSelector({ onChange }) {
  const [general, setGeneral] = useState(1);
  const [thirdAge, setThirdAge] = useState(1);

  const update = () => {
    onChange({
      general,
      thirdAge,
      total: general * 7.6 + thirdAge * 3.8,
    });
  };

  const modify = (type, value) => {
    if (type === "general") {
      setGeneral(general + value);
    } else {
      setThirdAge(thirdAge + value);
    }
  };

  return (
    <div className="tickets-container">
      <h2>Selecciona tus boletos</h2>

      <div className="ticket-item">
        <span>2D General</span>
        <div className="buttons">
          <button onClick={() => modify("general", -1)}>-</button>
          <span>{general}</span>
          <button onClick={() => modify("general", +1)}>+</button>
        </div>
        <span>$7.60</span>
      </div>

      <div className="ticket-item">
        <span>2D 3ra Edad</span>
        <div className="buttons">
          <button onClick={() => modify("thirdAge", -1)}>-</button>
          <span>{thirdAge}</span>
          <button onClick={() => modify("thirdAge", +1)}>+</button>
        </div>
        <span>$3.80</span>
      </div>

      <button className="btn-yellow" onClick={update}>
        Actualizar total
      </button>
    </div>
  );
}
