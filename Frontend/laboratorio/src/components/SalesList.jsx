// Frontend/laboratorio/src/components/SalesList.jsx
import React, { useState, useEffect } from "react";
import API from "../utils/api";
import "./components.css";

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/sales");
        setSales(response.data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar ventas:", err);
        setError(
          err.response?.data?.message ||
            "No se pudo cargar la lista de ventas. ¿Iniciaste sesión?"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  if (loading) {
    return <div>Cargando ventas...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div>
      <h2>Lista de Ventas</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th className="data-table-header">ID</th>
            <th className="data-table-header">Nombre</th>
            <th className="data-table-header">Cantidad</th>
            <th className="data-table-header">Fecha de creación</th>
          </tr>
        </thead>
        <tbody>
          {sales.length > 0 ? (
            sales.map((sale) => (
              <tr key={sale.id}>
                <td className="data-table-cell">{sale.id}</td>
                <td className="data-table-cell">{sale.name}</td>
                <td className="data-table-cell">{sale.amount}</td>
                <td className="data-table-cell">{sale.created_at}</td>
              </tr>
            ))
          ) : (
            <tr className="table-placeholder-row">
              <td colSpan="5">No hay ventas para mostrar.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalesList;
