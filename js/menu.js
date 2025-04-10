// Inicialización del dropdown
function inicializarDropdown() {
    const dropdownBtn = document.getElementById("notificaciones-dropdown-btn");
    const dropdown = document.querySelector(".dropdown");

    configurarToggleDropdown(dropdownBtn, dropdown);
    configurarClickFueraDropdown(dropdown, dropdownBtn);
    configurarTeclasDropdown(dropdown, dropdownBtn);
}

// Alternar el estado activo del dropdown
function configurarToggleDropdown(dropdownBtn, dropdown) {
    dropdownBtn.addEventListener("click", function (event) {
        event.preventDefault();
        dropdown.classList.toggle("active");
    });
}

// Cerrar el dropdown al hacer clic fuera de él
function configurarClickFueraDropdown(dropdown, dropdownBtn) {
    window.addEventListener("click", function (event) {
        if (!event.target.closest(".dropdown") && event.target !== dropdownBtn) {
            dropdown.classList.remove("active");
        }
    });
}

// Manejo de accesibilidad para teclado
function configurarTeclasDropdown(dropdown, dropdownBtn) {
    dropdownBtn.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            dropdown.classList.toggle("active");
        }
    });

    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            dropdown.classList.remove("active");
        }
    });
}

// Inicializar las notificaciones dinámicas
function inicializarNotificaciones() {
    const dropdown = document.getElementById('notificaciones-dropdown');
    const notificaciones = [
        "✅ Vacuna programada para el 25 de febrero",
        "⚠️ Revisión de peso pendiente",
        "🔔 Control antiparasitario en 3 días"
    ];

    dropdown.innerHTML = ""; // Limpia contenido

    if (notificaciones.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "No hay notificaciones disponibles.";
        dropdown.appendChild(emptyMessage);
        return;
    }

    notificaciones.forEach(notificacion => {
        const li = document.createElement('li');
        li.textContent = notificacion;
        dropdown.appendChild(li);
    });
}

// Inicializar toda la aplicación
function iniciarApp() {
    inicializarDropdown();
    inicializarNotificaciones();
}

// Ejecutar al cargar el DOM
document.addEventListener("DOMContentLoaded", iniciarApp);