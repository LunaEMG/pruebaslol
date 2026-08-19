const express = require('express');
const { Pool } = require('pg');

const app = express();
// 1. Aquí usamos la lógica del puerto que armaste
const puerto = process.env.PORT || 3000;

// 2. Conectamos a la base de datos de Neon de forma segura
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Requisito para bases de datos en la nube
});

// 3. Una ruta básica de prueba
app.get('/', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT NOW()');
    res.send(`¡Hola desde Render! Hora de la base de datos: ${resultado.rows[0].now}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error conectando a la base de datos');
  }
});

app.listen(puerto, () => {
  console.log(`Servidor activo en el puerto ${puerto}`);
});