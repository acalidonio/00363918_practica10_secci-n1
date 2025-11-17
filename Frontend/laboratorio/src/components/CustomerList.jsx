// Frontend/laboratorio/src/components/CustomerList.jsx
import React, { useState, useEffect } from "react";
import API from "../utils/api";
import "./components.css";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/customers");
        setCustomers(response.data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar clientes:", err);
        setError(
          err.response?.data?.message ||
            "No se pudo cargar la lista de clientes. ¿Iniciaste sesión?"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  if (loading) {
    return <div>Cargando clientes...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th className="data-table-header">ID</th>
            <th className="data-table-header">Nombre</th>
            <th className="data-table-header">Dirección</th>
            <th className="data-table-header">Teléfono</th>
            <th className="data-table-header">Código</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer.id}>
                <td className="data-table-cell">{customer.id}</td>
                <td className="data-table-cell">{customer.name}</td>
                <td className="data-table-cell">{customer.address}</td>
                <td className="data-table-cell">{customer.phone}</td>
                <td className="data-table-cell">{customer.code}</td>
              </tr>
            ))
          ) : (
            <tr className="table-placeholder-row">
              <td colSpan="5">No hay clientes para mostrar.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
