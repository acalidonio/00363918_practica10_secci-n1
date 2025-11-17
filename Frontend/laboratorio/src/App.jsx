// Frontend/laboratorio/src/App.jsx
import React from "react";
import "./App.css";
import "./components/components.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login.jsx";
import Protected from "./components/Protected.jsx";
import CustomerList from "./components/CustomerList.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CreateSale from "./components/CreateSale.jsx";
import SalesList from "./components/SalesList.jsx";
import SalesReport from "./components/SalesReport.jsx";

const Home = () => {
  const token = localStorage.getItem("token");
  // Si hay token, va a clientes, si no, a login.
  return token ? <Navigate to="/customers" /> : <Navigate to="/login" />;
};

const App = () => (
  <Router>
    <div>
      <nav className="app-nav">
        <Link to="/login" className="app-nav-link">
          Login
        </Link>
        <Link to="/customers" className="app-nav-link">
          Clientes
        </Link>
        <Link to="/protected" className="app-nav-link">
          Ruta protegida (Test)
        </Link>
        <Link to="/sales/new" className="app-nav-link">
          Nueva venta
        </Link>
        <Link to="/sales/list" className="app-nav-link">
          Lista de ventas
        </Link>
        <Link to="/sales/report" className="app-nav-link">
          Reporte de ventas
        </Link>
      </nav>

      <div className="app-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/protected" element={<Protected />} />
            <Route path="/sales/new" element={<CreateSale />} />
            <Route path="/sales/list" element={<SalesList />} />
            <Route path="/sales/report" element={<SalesReport />} />
          </Route>
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
