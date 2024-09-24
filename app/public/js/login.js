// Enviar el formulario al servidor al hacer submit
document.getElementById("miFormulario").addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const idCliente = document.getElementById('idcliente').value.trim();
    const idVehiculo = document.getElementById('id_vehiculo').value.trim();

    // Obtener los elementos de error
    const errorNombre = document.getElementById('errorNombre');
    const errorApellido = document.getElementById('errorApellido');
    const errorTelefono = document.getElementById('errorTelefono');
    const errorIdCliente = document.getElementById('errorIdCliente');
    const errorIdVehiculo = document.getElementById('errorIdVehiculo');

    // Limpiar los mensajes de error
    errorNombre.textContent = '';
    errorApellido.textContent = '';
    errorTelefono.textContent = '';
    errorIdCliente.textContent = ''; 
    errorIdVehiculo.textContent = '';

    // Variable para verificar si hay errores
    let valido = true;

    // Validar el nombre
    if (nombre === '') {
        errorNombre.textContent = 'El nombre es obligatorio.';
        valido = false;
    }

    // Validar el apellido
    if (apellido === '') {
        errorApellido.textContent = 'El apellido es obligatorio.';
        valido = false;
    }

    // Validar el número de teléfono
    const telefonoRegex = /^[0-9]{10}$/;
    if (!telefonoRegex.test(telefono)) {
        errorTelefono.textContent = 'El número de teléfono debe tener 10 dígitos.';
        valido = false;
    }

    // Validar el ID Cliente
    if (idCliente === '') {
        errorIdCliente.textContent = 'El ID Cliente es obligatorio.';
        valido = false;
    }

    // Validar el ID Vehículo
    if (idVehiculo === '') {
        errorIdVehiculo.textContent = 'El ID Vehículo es obligatorio.';
        valido = false;
    }

    // Devolver el estado de la validación
    if (!valido) {
        return;
    }

    // Si los datos son válidos, envíalos al servidor
    const formData = {
        nombre,
        apellido,
        telefono,
        idcliente: idCliente,
        id_vehiculo: idVehiculo
    };

    fetch('/login', { // Asegúrate de que la URL coincida con tu ruta en el servidor
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.existe) { // Si el cliente existe, redirige
            window.location.href = `/pages/empleados.html?idcliente=${formData.idcliente}`;
        } else {
            // Si el cliente no existe, crear uno nuevo
            return fetch('/crear_cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.creado) {
            alert('Cliente creado exitosamente');
            window.location.href = `/pages/empleados.html?idcliente=${formData.idcliente}`;
        } else if (!data.existe) {
            alert('No se pudo crear el cliente');
        }
    })
    .catch(error => {
        console.error('Error en el envío de datos:', error);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Llamar a cargarEmpleados para llenar la tabla cuando la página se cargue
    cargarEmpleados();
});

function cargarEmpleados() {
    fetch('/empleados')
    .then(response => response.json())
    .then(data => {
        const tablaEmpleados = document.getElementById('tablaEmpleados').getElementsByTagName('tbody')[0];
        tablaEmpleados.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas

        data.forEach(empleado => {
            const fila = tablaEmpleados.insertRow(); // Crea una nueva fila
            const celdaID = fila.insertCell(0); // Crea una celda para el ID
            const celdaNombre = fila.insertCell(1); // Crea una celda para el nombre
            const celdaApellido = fila.insertCell(2); // Crea una celda para el apellido

            // Crear un botón para el ID del empleado y agregar un manejador de eventos de clic
            const botonID = document.createElement('button');
            botonID.textContent = empleado.id_empleado;
            botonID.onclick = function() {
                mostrarClientes(empleado.id_empleado);
            };

            celdaID.appendChild(botonID); // Añadir el botón a la celda
            celdaNombre.textContent = empleado.nombre;
            celdaApellido.textContent = empleado.apellido;
        });
    })
    .catch(error => {
        console.error('Error al cargar los empleados:', error);
    });
}

function mostrarClientes(id_empleado) {
    fetch(`/clientes_empleado/${id_empleado}`)
    .then(response => response.json())
    .then(data => {
        const tablaClientes = document.getElementById('tablaClientes').getElementsByTagName('tbody')[0];
        tablaClientes.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas

        data.forEach(cliente => {
            const fila = tablaClientes.insertRow(); // Crea una nueva fila
            const celdaID = fila.insertCell(0); // Crea una celda para el ID
            const celdaNombre = fila.insertCell(1); // Crea una celda para el nombre
            const celdaApellido = fila.insertCell(2); // Crea una celda para el apellido

            celdaID.textContent = cliente.idcliente;
            celdaNombre.textContent = cliente.nombre;
            celdaApellido.textContent = cliente.apellido;
        });
    })
    .catch(error => {
        console.error('Error al cargar los clientes:', error);
    });
}


// Llamar a cargarEmpleados para llenar la tabla
cargarEmpleados();


// Cargar empleados al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarEmpleados();
});
