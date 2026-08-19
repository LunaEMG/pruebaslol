const express = require('express');
const { Pool } = require('pg');
const cron = require('node-cron');

const app = express();
// 1. Aquí usamos la lógica del puerto que armaste
const puerto = process.env.PORT || 3000;

// 2. Conectamos a la base de datos de Neon de forma segura
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Requisito para bases de datos en la nube
});

cron.schedule('* * * * *', () => {
  console.log('Tarea programada. hora actual: ', new Date().toISOString());
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

// 1. Traductor para leer los datos que envía Twilio
app.use(express.urlencoded({ extended: true }));

// 2. Nuestra "puerta" para recibir los mensajes
app.post('/whatsapp', (req, res) => {
  const mensajeEntrante = req.body.Body; // Twilio manda el texto en la propiedad "Body"
  const numeroRemitente = req.body.From; // Y el número del usuario en "From"

  console.log(`ola q tal.  Mensaje recibido de ${numeroRemitente}: ${mensajeEntrante}`);

  // Le confirmamos a Twilio que recibimos el paquete correctamente
  res.sendStatus(200); 
});


app.listen(puerto, () => {
  console.log(`Servidor activo en el puerto ${puerto}`);
});