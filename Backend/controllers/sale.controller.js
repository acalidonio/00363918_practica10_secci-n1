// Backend/controllers/sale.controller.js
import { pool } from "../database.js";

const saleController = {};

saleController.createSale = async (req, res) => {
  const { amount, id_customer } = req.body;

  // Validación de entrada simple
  if (!amount || !id_customer) {
    return res
      .status(400)
      .json({ message: "Se requieren los campos amount y id_customer." });
  }

  const amountFloat = parseFloat(amount);
  const customerIdInt = parseInt(id_customer, 10);

  if (isNaN(amountFloat) || isNaN(customerIdInt)) {
    return res.status(400).json({ message: "Formato de datos inválido." });
  }

  try {
    // Validar que id_customer exista en la tabla customers
    const customerCheck = await pool.query(
      "SELECT id FROM customers WHERE id = $1",
      [customerIdInt]
    );

    if (customerCheck.rowCount === 0) {
      return res.status(404).json({ message: "Cliente no encontrado." });
    }

    // Insertar la venta
    const insertResult = await pool.query(
      "INSERT INTO sales (amount, created_at, id_customer) VALUES ($1, NOW(), $2) RETURNING id, amount, created_at, id_customer",
      [amountFloat, customerIdInt]
    );

    res.status(201).json({
      message: "Venta registrada exitosamente",
      sale: insertResult.rows[0],
    });
  } catch (error) {
    console.error("Error al registrar la venta:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

saleController.getSales = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT s.id, s.amount, s.created_at, s.id_customer, c.name FROM sales s JOIN customers c ON s.id_customer = c.id"
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

saleController.getReport = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT c.name, SUM(s.amount) AS total_sales FROM sales s JOIN customers c ON s.id_customer = c.id GROUP BY c.name"
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

export default saleController;
