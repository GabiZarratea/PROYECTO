document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío por defecto

    // Obtener datos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;

    // Crear un objeto con los datos
    const formData = {
        nombre,
        apellido,
        telefono
    };

    // Enviar datos al servidor (ajusta la URL según tu API)
    fetch('/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registro exitoso!');
            // Limpiar el formulario
            document.getElementById('registrationForm').reset();
        } else {
            alert('Error en el registro: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error al registrar:', error);
    });
});