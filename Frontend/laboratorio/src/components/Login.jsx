// Frontend/laboratorio/src/components/Login.jsx
import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./components.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos
    try {
      const response = await API.post("/api/signin", { email, password });
      localStorage.setItem("token", response.data.token);

      // Redirigir a /customers después de un login exitoso
      navigate("/customers");
    } catch (err) {
      setError(err.response?.data?.msg || "Algo salió mal");
    }
  };

  return (
    <form onSubmit={handleLogin} className="form-container">
      <h3>Iniciar Sesión</h3>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-input"
        required
      />
      <button type="submit" className="form-button">
        Login
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default Login;
