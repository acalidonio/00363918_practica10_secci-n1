// Frontend/laboratorio/src/components/SalesReport.jsx
import React, { useState, useEffect } from "react";
import API from "../utils/api";
import "./components.css";

const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/sales/report");
        setSales(response.data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar reporte de ventas:", err);
        setError(
          err.response?.data?.message ||
            "No se pudo cargar el reporte de ventas. ¿Iniciaste sesión?"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  if (loading) {
    return <div>Cargando reporte de ventas...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div>
      <h2>Reporte de Ventas</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th className="data-table-header">Cliente</th>
            <th className="data-table-header">Total Ventas</th>
          </tr>
        </thead>
        <tbody>
          {sales.length > 0 ? (
            sales.map((sale) => (
              <tr key={sale.id_customer}>
                <td className="data-table-cell">{sale.name}</td>
                <td className="data-table-cell">$ {sale.total_sales}</td>
              </tr>
            ))
          ) : (
            <tr className="table-placeholder-row">
              <td colSpan="2">No hay ventas para mostrar en un reporte.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;
