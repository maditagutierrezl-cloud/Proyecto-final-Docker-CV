const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración del Pool de conexiones optimizado
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'database',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'cv_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Endpoint unificado para obtener persona y formación
app.get('/cv', async (req, res) => {
    try {
        const [personaRows] = await pool.query('SELECT * FROM persona LIMIT 1');
        const [formacionRows] = await pool.query('SELECT * FROM formacion');

        res.json({
            personal: personaRows[0] || {},
            formacion: formacionRows || []
        });
    } catch (error) {
        console.error('Error al obtener datos de la base de datos:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

process.on('uncaughtException', (err) => {
    console.error('Error no capturado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesa rechazada no manejada:', reason);
});