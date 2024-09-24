import express from 'express'
import bodyParser from 'body-parser';
import mysql from 'mysql2'
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const PORT = 4000;

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ventacarpeta'
});

connection.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a MySQL');
});

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')));

//ACA OBTENGO LOS DATOS DE LOS EMPLEADOS
app.get('/empleados', (req, res) => { 
    const query = `SELECT id_empleado, id_rol, id_grupo, nombre, apellido FROM empleados`;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error al obtener empleados' });
        }
        res.json(results);
    });
});

//ACA OBTENGO LOS DATOS DE LOS CLIENTES
app.get('/clientes', (req, res) => {
    const query = `
        SELECT 
            clientes.idcliente, 
            clientes.nombre,
            clientes.apellido,
            clientes.telefono, 
            clientes.dni, 
            clientes.metodo_de_pago, 
            clientes.id_vehiculo, 
            empleados.id_empleado, 
            empleados.id_empleado AS nombre_empleado, 
            empleados.apellido AS apellido_empleado
        FROM clientes
        LEFT JOIN empleados ON clientes.id_empleado = empleados.id_empleado;`;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error al obtener clientes' });
        }
        res.json(results);
    });
});

//ACA ASIGNO EL EMPLEADO AL CLIENTE
app.post('/asignar_empleado', (req, res) => {
    const { idCliente, idEmpleado } = req.body;

    // Actualizar la base de datos para asignar el empleado al cliente
    const query = 'UPDATE clientes SET id_empleado = ? WHERE idcliente = ?';
    connection.query(query, [idEmpleado, idCliente], (err, result) => {
        if (err) {
            console.error('Error al asignar empleado:', err);
            return res.json({ exito: false });
        }
        res.json({ exito: true });
    });
});

//ACA OBTENGO LOS DATOS DE LOS CLIENTES PARA EL EMPLEADO ESPECIFICADO POR EL ID.
app.get('/clientes_empleado/:id_empleado', (req, res) => {
    const id_empleado = req.params.id_empleado;
    const query = `
        SELECT c.idcliente, c.nombre, c.apellido
        FROM cliente AS c
        INNER JOIN asignaciones AS a ON c.idcliente = a.idcliente
        WHERE a.id_empleado = ?`;

    connection.query(query, [id_empleado], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error al obtener clientes' });
        }
        res.json(results);
    });
});

//SE OBTIENE EL EMAIL Y CONTRASEÑA PARA EL INICIO DE SESION
app.post('/login_empleados', (req, res) => {
    const { email, contraseña } = req.body;
    const query = `SELECT * FROM empleados WHERE email = ? AND contraseña = ?`;


    connection.query(query, [email, contraseña], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en la consulta de base de datos' });
        }
        if (results.length > 0) {
            res.json({ existe: true, empleado: results[0] });
        } else {
            res.json({ existe: false });
        }
    });
});

//ESTO ES PARA OBTENER EL ID DEL EMPLEADO AL INICIAR SESION
app.get('/empleados/:id_empleado/clientes', (req, res) => {
    const id_empleado = req.params.id_empleado;
    const query = `
        SELECT nombre, apellido, telefono, idcliente, dni, metodo_de_pago, id_vehiculo
        FROM clientes
        WHERE id_empleado = ?
    `;

    connection.query(query, [id_empleado], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en la consulta de base de datos' });
        }
        res.json(results);
    });
});

// ACA REGISTRO NUEVO CLIENTE
app.post('/registro', (req, res) => {
    const { nombre, apellido, telefono } = req.body;

    if (!nombre || !apellido || !telefono) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios.' });
    }

    const query = 'INSERT INTO clientes (nombre, apellido, telefono) VALUES (?, ?, ?)';
    connection.query(query, [nombre, apellido, telefono], (error, results) => { // Cambia db.query por connection.query
        if (error) {
            console.error('Error al insertar en la base de datos:', error);
            return res.status(500).json({ success: false, message: 'Error al registrar el cliente.' });
        }
        return res.status(200).json({ success: true, message: 'Cliente registrado exitosamente.' });
    });
});


// Configuración del directorio del archivo actual
app.get('/', (req, res) => {
    res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public', 'pages', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Servidor escuchando en http://localhost:${PORT}');
});