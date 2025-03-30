
const express = require('express'); 
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Para servir archivos estáticos como CSS y JS

// Conexión a MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'THEGIGABOT',
    password: 'THE-gigabot206',
    database: 'formulario1'
});

db.connect(err => {
    if (err) {
        console.error('❌ Error conectando a la base de datos:', err);
        return;
    }
    console.log('✅ Conectado a la base de datos');
});

// Ruta principal que muestra el formulario
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Formulario.html"));
});

// Ruta para ver la lista de usuarios
app.get("/usuarios", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Usuarios.html"));
});


// Ruta para registrar usuarios
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "⚠️ Todos los campos son obligatorios" });
    }
    db.query('INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, result) => {
        if (err) {
            console.error(err);
        return res.status(500).json({ message: "❌ Error al registrar usuario" });
        }
        res.json({ message: "Usuario registrado correctamente" });
    });
});

// Ruta para obtener la lista de usuarios en JSON
app.get('/api/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "❌ Error al obtener los usuarios" });
        }
        res.json(results);
    });
});

// Iniciar servidor
app.listen(5000, () => {
    console.log('🚀 Servidor corriendo en http://127.0.0.1:5000');
    console.log('📄 Formulario disponible en: http://127.0.0.1:5000');
    console.log('📋 Lista de usuarios en: http://127.0.0.1:5000/usuarios');
});
