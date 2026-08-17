const express = require('express');
const { Pool } = require('pg'); // Importamos la herramienta para PostgreSQL

const app = express();
const port = 3000;

// Configuramos la conexión con los mismos datos del docker-compose.yml
const pool = new Pool({
  user: 'mi_usuario',
  host: 'db', // ¡Ojo aquí!
  database: 'mi_base_datos',
  password: 'mi_password',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    // Le pedimos a la base de datos que nos diga qué hora es
    const resultado = await pool.query('SELECT NOW()');
    const horaDB = resultado.rows[0].now;
    
    res.send(`¡Hola Mundo con Docker! 🐳 La hora en la base de datos es: ${horaDB}`);
  } catch (error) {
    console.error('Error en la base de datos:', error);
    res.status(500).send('Hubo un error conectando a PostgreSQL');
  }
});

app.listen(port, () => {
  console.log(`¡NUEVO servidor con BD escuchando en el puerto ${port}!`);
});