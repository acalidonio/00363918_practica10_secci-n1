// backend/controllers/auth.controller.js
import pkg from 'jsonwebtoken';
import { pool } from '../database.js';
import { genSalt, hash, compare } from 'bcrypt';
import { SECRET_KEY } from '../config.js';

const { sign } = pkg;
const authController = {};

authController.signUp = async (req, res) => {
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

    const userId = result.rows[0].id;

    // Generar token JWT
    const token = sign({ id: userId }, SECRET_KEY, {
      expiresIn: "8h"
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    // Error de email duplicado
    if (error.code === '23505') {
      return res.status(400).json({ msg: 'El email ya está registrado' });
    }
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

authController.signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Por favor, ingrese email y contraseña' });
  }

  try {
    // Buscar usuario por email
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    const user = userResult.rows[0];

    // Comparar contraseña del body con el hash almacenado
    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    // Generar y enviar token JWT
    const token = sign({ id: user.id }, SECRET_KEY, {
      expiresIn: "8h"
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

export default authController;