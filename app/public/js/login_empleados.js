document.getElementById('loginEmpleadoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío por defecto

    // Obtener datos del formulario
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;

    // Enviar datos al servidor para verificar el inicio de sesión
    fetch('/login_empleados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, contraseña })
    })
    .then(response => response.json())
    .then(data => {
        if (data.existe) {
            const id_empleado = data.empleado.id_empleado; // Obtener el ID del empleado de la respuesta
            console.log("ID Empleado:", id_empleado); 
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
