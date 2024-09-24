function cargarEmpleados() {
    fetch('/empleados')
    .then(response => response.json())
    .then(data => {
        const tablaEmpleados = document.getElementById('tablaEmpleados').getElementsByTagName('tbody')[0];
        tablaEmpleados.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas

        data.forEach(empleado => {
            const fila = tablaEmpleados.insertRow();
            const celdaID = fila.insertCell(0);
            const celdaRol = fila.insertCell(1);
            const celdaGrupo = fila.insertCell(2);
            const celdaNombre = fila.insertCell(3);
            const celdaApellido = fila.insertCell(4);

            celdaID.textContent = empleado.id_empleado;
            celdaRol.textContent = empleado.id_rol;
            celdaGrupo.textContent = empleado.id_grupo;
            celdaNombre.textContent = empleado.nombre;
            celdaApellido.textContent = empleado.apellido;
        });
    })
    .catch(error => {
        console.error('Error al cargar los empleados:', error);
    });
}

function cargarLeads() {
    fetch('/clientes')
    .then(response => response.json())
    .then(data => {
        const tablaLeads = document.getElementById('tablaLeads').getElementsByTagName('tbody')[0];
        tablaLeads.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas

        data.forEach(cliente => {
            const fila = tablaLeads.insertRow();
            const celdaID = fila.insertCell(0);
            const celdaNombre = fila.insertCell(1);
            const celdaApellido = fila.insertCell(2);
            const celdaTelefono = fila.insertCell(3);
            const celdaDni = fila.insertCell(4);
            const celdaMetodoDePago = fila.insertCell(5);
            const celdaIdVehiculo = fila.insertCell(6);
            const celdaEmpleadoAsignado = fila.insertCell(7);


            celdaID.textContent = cliente.idcliente;
            celdaNombre.textContent = cliente.nombre;
            celdaApellido.textContent = cliente.apellido;
            celdaTelefono.textContent = cliente.telefono;
            celdaDni.textContent = cliente.dni;
            celdaMetodoDePago.textContent = cliente.metodo_de_pago;
            celdaIdVehiculo.textContent = cliente.id_vehiculo;
            if (cliente.nombre_empleado) {
                celdaEmpleadoAsignado.textContent = `${cliente.nombre_empleado} ${cliente.apellido_empleado}`;
            } else {
                // Si no hay empleado asignado, mostrar el botón "Asignar empleado"
                const botonAsignar = document.createElement('button');
                botonAsignar.textContent = 'Asignar empleado';
                botonAsignar.addEventListener('click', function() {
                    const idEmpleado = prompt('Ingrese el ID del empleado a asignar:');
                    if (idEmpleado) {
                        asignarEmpleado(cliente.idcliente, idEmpleado);
                    }
                });
                celdaEmpleadoAsignado.appendChild(botonAsignar);
            }
        });
    })
    .catch(error => {
        console.error('Error al cargar los Leads:', error);
    });
}

function asignarEmpleado(idCliente, idEmpleado) {
    fetch(`/asignar_empleado`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idCliente, idEmpleado })
    })
    .then(response => response.json())
    .then(data => {
        if (data.exito) {
            alert('Empleado asignado con éxito');
            // Volver a cargar los leads para reflejar la asignación
            cargarLeads();
        } else {
            alert('Error al asignar empleado');
        }
    })
    .catch(error => {
        console.error('Error al asignar empleado:', error);
    });
}

window.onload = function() {
    cargarEmpleados();
    cargarLeads();
};