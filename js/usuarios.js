document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("config-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const password = document.getElementById("password").value;
        const notificaciones = document.getElementById("notificaciones").checked;

        if (nombre === "" || password === "") {
            alert("Por favor, completa todos los campos");
            return;
        }

        const configuracion = {
            nombre,
            password,
            notificaciones
        };

        // Guardar el usuario en localStorage
        localStorage.setItem("configuracionAdmin", JSON.stringify(configuracion));
        alert("Configuración guardada exitosamente.");
    });

    // Cargar configuración del usuario desde localStorage
    function cargarConfiguracion() {
        const configGuardada = localStorage.getItem("configuracionAdmin");
        if (configGuardada) {
            const config = JSON.parse(configGuardada);
            document.getElementById("nombre").value = config.nombre;
            document.getElementById("password").value = config.password;
            document.getElementById("notificaciones").checked = config.notificaciones;
        }
    }

    // Función para cerrar sesión y limpiar el localStorage
    function cerrarSesion() {
        if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
            localStorage.clear(); // Elimina todos los datos del localStorage
            alert("Has cerrado sesión exitosamente.");
            window.location.href = "../index.html"; // Redirige a la página de inicio de sesión
        }
    }

    // Vincular el evento de clic al botón de cerrar sesión
    const cierreSesion = document.getElementById('cierre-sesion');
    cierreSesion.addEventListener("click", cerrarSesion);

    cargarConfiguracion(); // Llamar a cargarConfiguracion al cargar la página
});



