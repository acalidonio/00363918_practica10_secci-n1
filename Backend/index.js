// index.js
import app from './app.js';
import { PORT } from './config.js';
import { pool } from './database.js';

async function main() {
  try {
    await pool.query('SELECT NOW()');
    console.log('Conexión exitosa a la base de datos.');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

main();