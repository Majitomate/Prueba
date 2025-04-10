document.addEventListener("DOMContentLoaded", () => {
    inicializarEventos();
});

let filaEditada = null; // Variable global para la fila seleccionada en edición

function inicializarEventos() {
    const openModal = document.getElementById("openModal");
    const closeModal = document.getElementById("closeModal");
    const closeEditModal = document.getElementById("closeEditModal");
    const form = document.getElementById("control-form");
    const editForm = document.getElementById("edit-form");
    const tableBody = document.querySelector("tbody");

    cargarTabla(tableBody); // Cargar registros desde localStorage
    cargarAnimales(); // Cargar animales desde localStorage
    openModal.addEventListener("click", mostrarModal);
    closeModal.addEventListener("click", cerrarModal);
    closeEditModal.addEventListener("click", cerrarEditModal);
    form.addEventListener("submit", (event) => manejarEnvioFormulario(event, tableBody));
    editForm.addEventListener("submit", manejarEdicionFormulario);
    tableBody.addEventListener("click", manejarAccionesTabla);
}

// Modal de agregar
function mostrarModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
}

function cerrarModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    limpiarMensajesError("errorMessage");
}

// Modal de editar
function mostrarEditModal(fila) {
    filaEditada = fila; // Guardar referencia a la fila seleccionada

    // Rellenar el formulario con los valores actuales de la fila
    const tipo = fila.children[1].textContent;
    const fecha = fila.children[2].textContent;
    const descripcion = fila.children[3].textContent;

    document.getElementById("edit-tipo").value = tipo;
    document.getElementById("edit-fecha").value = fecha;
    document.getElementById("edit-descripcion").value = descripcion;

    // Mostrar el modal de edición
    const editModal = document.getElementById("editModal");
    editModal.style.display = "flex";
}

function cerrarEditModal() {
    const editModal = document.getElementById("editModal");
    editModal.style.display = "none";
    limpiarMensajesError("editErrorMessage");
}

// Manejo del formulario de agregar
function manejarEnvioFormulario(event, tableBody) {
    event.preventDefault();

    const tipo = document.getElementById("tipo").value.trim();
    const fecha = document.getElementById("fecha").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    if (!validarCampos(tipo, fecha, descripcion, "errorMessage")) return;

    agregarFilaTabla(tableBody, tipo, fecha, descripcion);
    cerrarModal();
    document.getElementById("control-form").reset();
}

// Manejo del formulario de edición
function manejarEdicionFormulario(event) {
    event.preventDefault();

    const nuevoTipo = document.getElementById("edit-tipo").value.trim();
    const nuevaFecha = document.getElementById("edit-fecha").value.trim();
    const nuevaDescripcion = document.getElementById("edit-descripcion").value.trim();

    if (!validarCampos(nuevoTipo, nuevaFecha, nuevaDescripcion, "editErrorMessage")) return;

    // Actualizar los valores de la fila seleccionada
    filaEditada.children[1].textContent = nuevoTipo;
    filaEditada.children[2].textContent = nuevaFecha;
    filaEditada.children[3].textContent = nuevaDescripcion;

    cerrarEditModal();
    guardarTabla();
    showToast("Registro actualizado con éxito");
    filaEditada = null; // Reiniciar la referencia
}

// Validación de campos
function validarCampos(tipo, fecha, descripcion, errorElementId) {
    const errorMessage = document.getElementById(errorElementId);
    const MIN_DESC_LENGTH = 10;
    const textRegex = /^[a-zA-Z0-9\s]+$/;

    if (!tipo || !fecha || !descripcion) {
        mostrarMensajeError(errorMessage, "Por favor, completa todos los campos.");
        return false;
    }

    if (descripcion.length < MIN_DESC_LENGTH) {
        mostrarMensajeError(errorMessage, `La descripción debe tener al menos ${MIN_DESC_LENGTH} caracteres.`);
        return false;
    }

    if (!textRegex.test(tipo) || !textRegex.test(descripcion)) {
        mostrarMensajeError(errorMessage, "Los campos de Tipo y Descripción solo pueden contener letras, números y espacios.");
        return false;
    }

    return true;
}

// Mostrar y limpiar errores
function mostrarMensajeError(elemento, mensaje) {
    elemento.textContent = mensaje;
    elemento.style.display = "block";
}

function limpiarMensajesError(errorElementId) {
    const errorMessage = document.getElementById(errorElementId);
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
}

// Agregar una nueva fila
function agregarFilaTabla(tableBody, tipo, fecha, descripcion) {
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${tableBody.children.length + 1}</td>
        <td>${tipo}</td>
        <td>${fecha}</td>
        <td>${descripcion}</td>
        <td></td>
    `;

    const accionesCell = newRow.children[4];
    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.addEventListener("click", () => mostrarEditModal(newRow));

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener("click", () => eliminarFila(newRow)); 

    accionesCell.appendChild(editButton);
    accionesCell.appendChild(deleteButton);

    tableBody.appendChild(newRow);
    showToast("Registro agregado con éxito");
    guardarTabla();
}

// Eliminar fila
function eliminarFila(fila) {
    const acepta = confirm("¿Estás seguro de eliminar el registro?");
    if (acepta) {
        fila.remove();
        guardarTabla();
        showToast("Registro eliminado con éxito");
    }
}

// Manejar acciones en la tabla
function manejarAccionesTabla(event) {
    if (event.target.closest(".edit")) {
        mostrarEditModal(event.target.closest("tr"));
    }
}

// Persistencia con localStorage
function guardarTabla() {
    const registros = Array.from(document.querySelectorAll("tbody tr")).map(row => ({
        numeroArete: row.children[0].textContent,
        tipo: row.children[1].textContent,
        fecha: row.children[2].textContent,
        descripcion: row.children[3].textContent,
    }));
    localStorage.setItem("controles", JSON.stringify(registros));
}

function cargarTabla(tableBody) {
    let registros = JSON.parse(localStorage.getItem("controles"));

    // Si no hay datos en localStorage y la bandera no está configurada, agregar datos iniciales
    if (!localStorage.getItem("controlesInicializados")) {
        registros = [
            { numeroArete: "1", tipo: "Vacunación", fecha: "2025-04-01", descripcion: "Vacuna contra la rabia" },
            { numeroArete: "2", tipo: "Desparasitación", fecha: "2025-03-15", descripcion: "Desparasitación interna" },
            { numeroArete: "3", tipo: "Chequeo general", fecha: "2025-02-20", descripcion: "Revisión médica anual" }
        ];
        localStorage.setItem("controles", JSON.stringify(registros));
        localStorage.setItem("controlesInicializados", "true"); // Marcar que los datos iniciales ya fueron cargados
    }

    // Cargar los registros en la tabla
    registros = JSON.parse(localStorage.getItem("controles")) || [];
    registros.forEach((registro, index) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${registro.numeroArete || index + 1}</td>
            <td>${registro.tipo}</td>
            <td>${registro.fecha}</td>
            <td>${registro.descripcion}</td>
            <td></td>
        `;

        const accionesCell = newRow.children[4];
        const editButton = document.createElement("button");
        editButton.className = "edit";
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener("click", () => mostrarEditModal(newRow));

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete";
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener("click", () => eliminarFila(newRow));

        accionesCell.appendChild(editButton);
        accionesCell.appendChild(deleteButton);

        tableBody.appendChild(newRow);
    });
}

// Mostrar notificaciones (toasts)
function showToast(message) {
    const toastContainer = document.getElementById("toastContainer");

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}

// Cargar animales en el selector
function cargarAnimales() {
    const animales = JSON.parse(localStorage.getItem("animales")) || [];
    const selectAnimal = document.getElementById("animal");

    // Limpiar opciones existentes
    selectAnimal.innerHTML = "";

    // Agregar opciones
    animales.forEach(animal => {
        const option = document.createElement("option");
        option.value = animal.numeroArete; // Usar numeroArete como valor
        option.textContent = `${animal.raza} (${animal.numeroArete})`;
        selectAnimal.appendChild(option);
    });
}