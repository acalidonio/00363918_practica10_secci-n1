import { pool } from '../database.js'

const customerController = {};

customerController.test = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM customers');
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
}

export default customerController;


