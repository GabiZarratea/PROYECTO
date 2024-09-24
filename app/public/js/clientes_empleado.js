document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del empleado de la URL
    const params = new URLSearchParams(window.location.search);
    const id_empleado = params.get('id_empleado');

    if (id_empleado) {
        // Realizar solicitud al servidor para obtener los clientes
        fetch(`/empleados/${id_empleado}/clientes`)
            .then(response => response.json())
            .then(data => {
                const tbody = document.querySelector('#clientesTable tbody');
                if (data.length > 0) {
                    data.forEach(cliente => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${cliente.nombre}</td>
                            <td>${cliente.apellido}</td>
                            <td>${cliente.telefono}</td>
                            <td>${cliente.idcliente}</td>
                            <td>${cliente.dni}</td>
                            <td>${cliente.metodo_de_pago}</td>
                            <td>${cliente.id_vehiculo}</td>
                        `;
                        tbody.appendChild(tr);
                    });
                } else {
                    tbody.innerHTML = '<tr><td colspan="7">No tienes clientes asignados.</td></tr>';
                }
            })
            .catch(error => {
                console.error('Error al obtener clientes:', error);
            });
    } else {
        alert('ID Empleado no proporcionado en la URL.');
    }
});
