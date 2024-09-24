document.getElementById('loginEmpleadoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío por defecto

    // Obtener datos del formulario
    const nombre = document.getElementById('nombre').value;
    const id_empleado = document.getElementById('id_empleado').value;

    // Enviar datos al servidor para verificar el inicio de sesión
    fetch('/login_empleados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, id_empleado })
    })
    .then(response => response.json())
    .then(data => {
        if (data.existe) {
            // Redirigir a la página de clientes asignados con el ID del empleado
            window.location.href = `/pages/clientes_empleado.html?id_empleado=${id_empleado}`;
        } else {
            alert('Empleado no encontrado');
        }
    })
    .catch(error => {
        console.error('Error al iniciar sesión:', error);
    });
});


