// Backend/controllers/customer.controller.js
import { pool } from "../database.js";

const customerController = {};

customerController.getCustomers = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT id, name, address, phone, code FROM customers"
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

customerController.searchCustomerByCode = async (req, res) => {
  const { code } = req.query;
  try {
    const response = await pool.query("SELECT * FROM customers WHERE id = $1", [
      code,
    ]);
    if (response.rows.length === 0) {
      return res.status(404).json({ msg: "Cliente no encontrado" });
    }
    res.json(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

export default customerController;
