import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
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

// Función para obtener un empleado aleatorio
// Obtener un empleado aleatorio que no esté asignado a ningún cliente
const obtenerEmpleadoAleatorioDisponible = () => {
    const query = `
        SELECT id_empleado 
        FROM empleados 
        WHERE id_empleado NOT IN (
            SELECT id_empleado 
            FROM clientes 
            GROUP BY id_empleado 
            HAVING COUNT(idcliente) >= 5
        )
        ORDER BY (
            SELECT COUNT(idcliente)
            FROM clientes
            WHERE clientes.id_empleado = empleados.id_empleado
            GROUP BY clientes.id_empleado
        ) ASC
        LIMIT 1
    `;

    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error al obtener empleado disponible:', err);
                reject(err);
            } else if (results.length > 0) {
                resolve(results[0].id_empleado);
            } else {
                reject(new Error('No se encontraron empleados disponibles'));
            }
        });
    });
};

const asignarEmpleadoACliente = (idcliente, id_empleado) => new Promise((resolve, reject) => {
    const query = `UPDATE clientes SET id_empleado = ? WHERE idcliente = ?`;
    connection.query(query, [id_empleado, idcliente], err => {
        if (err) {
            console.error('Error al actualizar la asignación de empleado:', err);
            reject(err);
        } else {
            resolve();
        }
    });
});


const actualizarAsignacionEmpleado = (idcliente) => {
    setInterval(async () => {
        try {
            const id_empleado = await obtenerEmpleadoAleatorioDisponible();
            await asignarEmpleadoACliente(idcliente, id_empleado);
            console.log(`Empleado ${id_empleado} asignado al cliente ${idcliente}`);
        } catch (err) {
            console.error('Error al asignar empleado:', err);
        }
    }, 10000); // Actualización cada 2 meses
};

// Ruta para verificar si el cliente existe y, si no, crear uno nuevo
app.post('/login', async (req, res) => {
    const { nombre, apellido, telefono, idcliente, id_vehiculo } = req.body;
    
    // Verificar si el cliente ya existe
    const query = `SELECT * FROM clientes WHERE idcliente = ?`;
    connection.query(query, [idcliente], async (err, results) => {
        if (err) {
            console.error('Error en la consulta SELECT:', err);
            return res.status(500).json({ error: 'Error en la consulta de base de datos' });
        }

        if (results.length > 0) {
            // Cliente existe, verificar si ya tiene un empleado asignado
            const cliente = results[0];
            if (!cliente.id_empleado) {
                // Asignar un empleado si no hay uno asignado
                try {
                    const id_empleado = await obtenerEmpleadoAleatorioDisponible();
                    await asignarEmpleadoACliente(idcliente, id_empleado);
                    console.log(`Empleado ${id_empleado} asignado al cliente ${idcliente}`);
                    return res.json({ existe: true });
                } catch (err) {
                    console.error('Error al asignar empleado:', err);
                    return res.status(500).json({ error: 'Error al asignar empleado' });
                }
            }
            return res.json({ existe: true });
        } else {
            // Cliente no existe, crear uno nuevo
            const queryInsert = `INSERT INTO clientes (nombre, apellido, telefono, idcliente, id_vehiculo) VALUES (?, ?, ?, ?, ?)`;
            connection.query(queryInsert, [nombre, apellido, telefono, idcliente, id_vehiculo], async (err) => {
                if (err) {
                    console.error('Error al crear el cliente:', err);
                    return res.status(500).json({ error: 'Error al crear el cliente' });
                }

                console.log(`Cliente ${idcliente} creado exitosamente`);

                // Asignar un empleado al nuevo cliente
                try {
                    const id_empleado = await obtenerEmpleadoAleatorioDisponible();
                    await asignarEmpleadoACliente(idcliente, id_empleado);
                    console.log(`Empleado ${id_empleado} asignado al nuevo cliente ${idcliente}`);
                    return res.json({ creado: true });
                } catch (err) {
                    console.error('Error al asignar empleado:', err);
                    return res.status(500).json({ error: 'Error al asignar empleado' });
                }
            });
        }
    });
});


// Ruta para crear un nuevo cliente
app.post('/js/crear_cliente', async (req, res) => {
    const { nombre, apellido, telefono, idcliente, id_vehiculo } = req.body;

    if (!nombre || !apellido || !telefono || !idcliente || !id_vehiculo) {
        return res.status(400).json({ error: 'Faltan datos en la solicitud' });
    }

    try {
        // Verificar si el cliente ya existe
        const queryVerificarCliente = `SELECT idcliente FROM clientes WHERE idcliente = ?`;
        const clienteExistente = await new Promise((resolve, reject) => {
            connection.query(queryVerificarCliente, [idcliente], (err, results) => {
                if (err) {
                    console.error('Error al verificar cliente:', err);
                    reject(err);
                } else {
                    resolve(results.length > 0);
                }
            });
        });

        if (clienteExistente) {
            return res.status(400).json({ error: 'El cliente ya existe' });
        }

        // Obtener un empleado disponible
        const id_empleado = await obtenerEmpleadoAleatorioDisponible();
        console.log('Empleado asignado:', id_empleado);

        // Crear el nuevo cliente
        const queryCliente = `INSERT INTO clientes (nombre, apellido, telefono, idcliente, id_vehiculo, id_empleado) VALUES (?, ?, ?, ?, ?, ?)`;
        
        await new Promise((resolve, reject) => {
            connection.query(queryCliente, [nombre, apellido, telefono, idcliente, id_vehiculo, id_empleado], (err, results) => {
                if (err) {
                    console.error('Error al ejecutar la consulta de inserción:', err);
                    reject(err);
                } else {
                    console.log('Cliente creado exitosamente:', results);
                    resolve();
                }
            });
        });

        res.json({ creado: true, id_empleado });
    } catch (err) {
        console.error('Error al crear el cliente:', err);
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
});

app.get('/empleados', (req, res) => {
    const query = `SELECT id_empleado, nombre, apellido FROM empleados`;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error al obtener empleados' });
        }
        res.json(results);
    });
});

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



app.get('/clientes/:idcliente', (req, res) => {
    const idcliente = req.params.idcliente;
    const query = `
        SELECT nombre, apellido, telefono, idcliente, dni, metodo_de_pago, id_vehiculo, id_empleado
        FROM clientes
        WHERE idcliente = ?
    `;

    connection.query(query, [idcliente], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en la consulta de base de datos' });
        }
        results.length > 0 ? res.json(results[0]) : res.status(404).json({ error: 'Cliente no encontrado' });
    });
});

app.post('/login_empleados', (req, res) => {
    const { nombre, id_empleado } = req.body;
    const query = `SELECT * FROM empleados WHERE nombre = ? AND id_empleado = ?`;

    connection.query(query, [nombre, id_empleado], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en la consulta de base de datos' });
        }
        res.json({ existe: results.length > 0, empleado: results[0] || null });
    });
});

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

// Configuración del directorio del archivo actual
app.get('/', (req, res) => {
    res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public', 'pages', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
