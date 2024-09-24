document.getElementById("miFormulario").addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Envío iniciado");

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

    fetch('/crear_cliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.creado) {
            console.log('Cliente creado y empleado asignado:', data);
            // Redirigir o actualizar la interfaz de usuario según sea necesario
            window.location.href = `/pages/empleados.html?idcliente=${formData.idcliente}`;
        } else {
            console.error('Error al crear el cliente:', data.error);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
    
});
