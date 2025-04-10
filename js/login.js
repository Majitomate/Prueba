document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    // Llamada a funciones
    if (!validarPassword(password)) {
        mostrarError(errorMessage, "La contraseña debe tener entre 8 y 16 caracteres.");
    } else if (validarCredenciales(username, password)) {
        mostrarCargando(".btn", "Cargando...");
        redireccionar("accesos/menu.html", 1500);
    } else {
        mostrarError(errorMessage, "Usuario o contraseña incorrectos");
    }
});

// Usuario definido directamente en el código
const usuarioDefinido = {
    username: "admin",
    password: "12345678"
};

// Validar la longitud de la contraseña
function validarPassword(password) {
    return password.length >= 8 && password.length <= 16;
}

// Validar credenciales
function validarCredenciales(username, password) {
    return username === usuarioDefinido.username && password === usuarioDefinido.password;
}

// Mostrar errores
function mostrarError(elemento, mensaje) {
    elemento.textContent = mensaje;
    elemento.style.display = "block";
}

// Mostrar efecto de carga
function mostrarCargando(selectorBoton, texto) {
    document.querySelector(selectorBoton).textContent = texto;
}

// Redirigir
function redireccionar(url, tiempo) {
    setTimeout(() => {
        window.location.href = url;
    }, tiempo);
}

// Mostrar u ocultar contraseña
function mostrarPassword() {
    document.getElementById("togglePassword").addEventListener("click", function () {
        const passwordInput = document.getElementById("password");
        const icon = this.querySelector("i");

        // Cambiar entre "password" y "text"
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            passwordInput.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    });
}

