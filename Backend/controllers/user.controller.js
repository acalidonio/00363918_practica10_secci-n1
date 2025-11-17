// backend/controllers/user.controller.js
import { pool } from '../database.js';
import { genSalt, hash } from 'bcrypt';

const userController = {};

userController.getUsers = async (req, res) => {
  try {
    const response = await pool.query('SELECT id, name, email FROM users');
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

userController.getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const response = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
    if (response.rows.length === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    res.json(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

userController.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Por favor, ingrese nombre, email y contraseña' });
  }

  try {
    // Hashear la contraseña
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      body: {
        user: { id: result.rows[0].id, name, email }
      }
    });
  } catch (error) {
    console.error(error);
    // Error de email duplicado
    if (error.code === '23505') {
      return res.status(400).json({ msg: 'El email ya está registrado' });
    }
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

userController.updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ msg: 'Por favor, ingrese nombre y email' });
  }

  try {
    const response = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
      [name, email, id]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    res.json(response.rows[0]);
  } catch (error) {
    console.error(error);
    // Error de email duplicado
    if (error.code === '23505') {
      return res.status(400).json({ msg: 'El email ya está en uso' });
    }
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

userController.deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    res.json(`Usuario ${id} eliminado exitosamente`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

export default userController;