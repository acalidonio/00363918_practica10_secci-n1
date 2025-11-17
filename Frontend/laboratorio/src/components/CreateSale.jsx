// Frontend/laboratorio/src/components/CreateSale.jsx
import React, { useState } from "react";
import API from "../utils/api.js";
import "./components.css";

const CreateSale = () => {
  const [amount, setAmount] = useState("");
  const [idCustomer, setIdCustomer] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!amount || !idCustomer) {
      setError("Ambos campos son obligatorios.");
      return;
    }

    try {
      const response = await API.post("/api/sales", {
        amount: parseFloat(amount),
        id_customer: parseInt(idCustomer, 10),
      });

      setSuccess(response.data.message);
      // Limpiar formulario
      setAmount("");
      setIdCustomer("");
    } catch (err) {
      console.error("Error al crear la venta:", err);
      setError(err.response?.data?.message || "Error al registrar la venta.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Registrar Nueva Venta</h2>
      <input
        type="number"
        placeholder="Monto (Amount)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="form-input"
        step="0.01"
        min="0"
        required
      />
      <input
        type="number"
        placeholder="ID del Cliente (id_customer)"
        value={idCustomer}
        onChange={(e) => setIdCustomer(e.target.value)}
        className="form-input"
        min="1"
        required
      />
      <button type="submit" className="form-button">
        {" "}
        {}
        Registrar Venta
      </button>

      {error && <p className="error-message">Error: {error}</p>}
      {success && <p className="success-message">{success}</p>}
    </form>
  );
};

export default CreateSale;
