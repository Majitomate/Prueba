// **Inicializar la aplicación al cargar el DOM**
document.addEventListener("DOMContentLoaded", () => {
    inicializarAplicacion();

    const menuToggle = document.getElementById("menuToggle");
    const menuContent = document.getElementById("menuContent");

    menuToggle.addEventListener("click", () => {
        menuContent.classList.toggle("open"); // Alternar la clase 'open'
    });
});

// **Inicializar la aplicación**
function inicializarAplicacion() {
    const botonAgregarAnimal = document.getElementById("agregarAnimal");
    const botonBuscarAnimal = document.getElementById("buscarAnimal");
    const contenedorTarjetasAnimales = document.querySelector(".animal-cards");

    // Verificar si los datos iniciales ya fueron cargados
    if (!localStorage.getItem("datosInicializados")) {
        const datosIniciales = [
            { numeroArete: "1", raza: "Holstein", edad: 36, peso: 600, genero: "Hembra", salud: "Saludable" },
            { numeroArete: "2", raza: "Angus", edad: 48, peso: 750, genero: "Macho", salud: "Saludable" },
            { numeroArete: "3", raza: "Hereford", edad: 24, peso: 500, genero: "Hembra", salud: "Enfermo" }
        ];
        localStorage.setItem("animales", JSON.stringify(datosIniciales));
        localStorage.setItem("datosInicializados", "true"); // Marcar que los datos iniciales ya fueron cargados
    }

    // Cargar animales desde localStorage
    const animales = cargarAnimalesDesdeLocalStorage();
    console.log(animales); // Verifica que los datos se carguen correctamente

    // Renderizar animales
    animales.forEach(animal => {
        agregarTarjetaAnimal(animal, contenedorTarjetasAnimales, animales);
    });

    // Configurar eventos
    configurarEventoAgregarAnimal(botonAgregarAnimal, contenedorTarjetasAnimales, animales);
    configurarEventoBuscarAnimal(botonBuscarAnimal, contenedorTarjetasAnimales);
}

// **Cargar animales desde localStorage**
function cargarAnimalesDesdeLocalStorage() {
    return JSON.parse(localStorage.getItem("animales")) || [];
}

// **Guardar animales en localStorage**
function guardarAnimalesEnLocalStorage(animales) {
    localStorage.setItem("animales", JSON.stringify(animales));
}

// **Configurar evento para agregar animal**
function configurarEventoAgregarAnimal(botonAgregarAnimal, contenedorTarjetasAnimales, animales) {
    botonAgregarAnimal.addEventListener("click", () => {
        abrirModalAgregarAnimal(contenedorTarjetasAnimales, animales);
    });
}

// **Abrir modal para agregar animal**
function abrirModalAgregarAnimal(contenedorTarjetasAnimales, animales) {
    const modal = crearModal(`
        <h2>Agregar Animal</h2>
        <label>Arete del Animal:</label>
        <input type="text" id="numeroAreteAnimal" required>
        <label>Raza:</label>
        <input type="text" id="razaAnimal" required>
        <label>Edad (meses):</label>
        <input type="number" id="edadAnimal" min="0" required>
        <label>Peso:</label>
        <input type="number" id="pesoAnimal" min="0" required>
        <label>Género:</label>
        <select id="generoAnimal">
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
        </select>
        <label>Estado de Salud:</label>
        <select id="saludAnimal">
            <option value="Saludable">Saludable</option>
            <option value="Enfermo">Enfermo</option>
        </select>
        <button id="guardarAnimal">Guardar</button>
        <button id="cerrarModal">Cancelar</button>
        <p class="mensaje-error" id="mensajeError"></p>
    `);

    document.body.appendChild(modal);

    configurarEventosModalAgregarAnimal(modal, contenedorTarjetasAnimales, animales);
}

// **Configurar eventos del modal para agregar animal**
function configurarEventosModalAgregarAnimal(modal, contenedorTarjetasAnimales, animales) {
    const botonCerrar = modal.querySelector("#cerrarModal");
    const botonGuardar = modal.querySelector("#guardarAnimal");

    // Cerrar el modal al hacer clic en "Cancelar"
    botonCerrar.addEventListener("click", () => modal.remove());

    // Guardar el animal al hacer clic en "Guardar"
    botonGuardar.addEventListener("click", () => {
        const numeroArete = document.getElementById("numeroAreteAnimal").value;
        const raza = document.getElementById("razaAnimal").value;
        const edad = document.getElementById("edadAnimal").value;
        const peso = document.getElementById("pesoAnimal").value;
        const genero = document.getElementById("generoAnimal").value;
        const salud = document.getElementById("saludAnimal").value;
        const mensajeError = document.getElementById("mensajeError");

        if (!validarCamposAnimal(numeroArete, raza, edad, peso, genero, salud, animales, mensajeError)) return;

        const nuevoAnimal = { numeroArete, raza, edad, peso, genero, salud };
        animales.push(nuevoAnimal);
        guardarAnimalesEnLocalStorage(animales);
        agregarTarjetaAnimal(nuevoAnimal, contenedorTarjetasAnimales, animales);
        modal.remove();
    });
}

// **Validar campos del animal**
function validarCamposAnimal(id, raza, edad, peso, genero, salud, animales, mensajeError) {
    if ((!id && id !== null) || !raza || !edad || !peso || !genero || !salud) {
        mensajeError.textContent = "Por favor, completa todos los campos.";
        mensajeError.style.display = "block";
        return false;
    }

    // Validar que el número de arete solo contenga números
    const numeroAreteRegex = /^[0-9]+$/;
    if (id !== null && !numeroAreteRegex.test(id)) {
        mensajeError.textContent = "El número de arete solo debe contener números.";
        mensajeError.style.display = "block";
        return false;
    }

    if (id !== null && animales.some(animal => animal.numeroArete === id)) {
        mensajeError.textContent = "El número de arete ya existe. Por favor, ingresa un número único.";
        mensajeError.style.display = "block";
        return false;
    }

    const EDAD_MINIMA = 0, EDAD_MAXIMA = 100, PESO_MINIMO = 0, PESO_MAXIMO = 1000;
    if (edad < EDAD_MINIMA || edad > EDAD_MAXIMA || peso < PESO_MINIMO || peso > PESO_MAXIMO) {
        mensajeError.textContent = `La edad debe estar entre ${EDAD_MINIMA} y ${EDAD_MAXIMA} meses y el peso debe estar entre ${PESO_MINIMO} y ${PESO_MAXIMO} kg.`;
        mensajeError.style.display = "block";
        return false;
    }

    mensajeError.style.display = "none";
    return true;
}

// **Agregar tarjeta de animal**
function agregarTarjetaAnimal(animal, contenedorTarjetasAnimales, animales) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("animal-card");
    tarjeta.innerHTML = `
        <h3>Arete: ${animal.numeroArete}</h3>
        <p>Raza: ${animal.raza}</p>
        <p>Edad: ${animal.edad} meses</p>
        <p>Peso: ${animal.peso} kg</p>
        <p>Género: ${animal.genero}</p>
        <p>Estado de Salud: ${animal.salud}</p>
        <button class="boton-editar" data-id="${animal.numeroArete}">Editar</button>
        <button class="boton-eliminar" data-id="${animal.numeroArete}">Eliminar</button>
    `;
    contenedorTarjetasAnimales.appendChild(tarjeta);

    configurarEventosTarjetaAnimal(tarjeta, animal, contenedorTarjetasAnimales, animales);
}

// **Configurar eventos de la tarjeta de animal**
function configurarEventosTarjetaAnimal(tarjeta, animal, contenedorTarjetasAnimales, animales) {
    const botonEliminar = tarjeta.querySelector(".boton-eliminar");
    const botonEditar = tarjeta.querySelector(".boton-editar");

    botonEliminar.addEventListener("click", () => eliminarAnimal(tarjeta, animal, animales));
    botonEditar.addEventListener("click", () => abrirModalEditarAnimal(animal, tarjeta, animales));
}

// **Eliminar animal**
function eliminarAnimal(tarjeta, animal, animales) {
    if (confirm("¿Deseas eliminar este animal?")) {
        // Eliminar la tarjeta del DOM
        tarjeta.remove();

        // Actualizar el array de animales
        const nuevosAnimales = animales.filter(a => a.numeroArete !== animal.numeroArete);

        // Guardar el array actualizado en localStorage
        guardarAnimalesEnLocalStorage(nuevosAnimales);

        // Actualizar el array original (sincronizar)
        animales.length = 0; // Vaciar el array original
        nuevosAnimales.forEach(a => animales.push(a)); // Rellenarlo con los nuevos datos
    }
}

// **Abrir modal para editar animal**
function abrirModalEditarAnimal(animal, tarjeta, animales) {
    const modal = crearModal(`
        <h2>Editar Animal</h2>
        <label>Arete del Animal:</label>
        <input type="text" id="editarIdAnimal" value="${animal.numeroArete}" disabled>
        <label>Raza:</label>
        <input type="text" id="editarRazaAnimal" value="${animal.raza}" required>
        <label>Edad (meses):</label>
        <input type="number" id="editarEdadAnimal" value="${animal.edad}" min="0" required>
        <label>Peso:</label>
        <input type="number" id="editarPesoAnimal" value="${animal.peso}" min="0" required>
        <label>Género:</label>
        <select id="editarGeneroAnimal">
            <option value="Macho" ${animal.genero === "Macho" ? "selected" : ""}>Macho</option>
            <option value="Hembra" ${animal.genero === "Hembra" ? "selected" : ""}>Hembra</option>
        </select>
        <label>Estado de Salud:</label>
        <select id="editarSaludAnimal">
            <option value="Saludable" ${animal.salud === "Saludable" ? "selected" : ""}>Saludable</option>
            <option value="Enfermo" ${animal.salud === "Enfermo" ? "selected" : ""}>Enfermo</option>
        </select>
        <button id="guardarEdicionAnimal">Guardar Cambios</button>
        <button id="cerrarModalEdicion">Cancelar</button>
        <p class="mensaje-error" id="mensajeErrorEdicion"></p>
    `);

    document.body.appendChild(modal);

    configurarEventosModalEditarAnimal(modal, animal, tarjeta, animales);
}

// **Configurar eventos del modal para editar animal**
function configurarEventosModalEditarAnimal(modal, animal, tarjeta, animales) {
    const botonCerrar = modal.querySelector("#cerrarModalEdicion");
    const botonGuardar = modal.querySelector("#guardarEdicionAnimal");

    botonCerrar.addEventListener("click", () => modal.remove());

    botonGuardar.addEventListener("click", () => {
        const raza = document.getElementById("editarRazaAnimal").value;
        const edad = document.getElementById("editarEdadAnimal").value;
        const peso = document.getElementById("editarPesoAnimal").value;
        const genero = document.getElementById("editarGeneroAnimal").value;
        const salud = document.getElementById("editarSaludAnimal").value;
        const mensajeError = document.getElementById("mensajeErrorEdicion");

        if (!validarCamposAnimal(null, raza, edad, peso, genero, salud, [], mensajeError)) return;

        animal.raza = raza;
        animal.edad = edad;
        animal.peso = peso;
        animal.genero = genero;
        animal.salud = salud;

        guardarAnimalesEnLocalStorage(animales);

        tarjeta.querySelector("p:nth-child(2)").textContent = `Raza: ${raza}`;
        tarjeta.querySelector("p:nth-child(3)").textContent = `Edad: ${edad} meses`;
        tarjeta.querySelector("p:nth-child(4)").textContent = `Peso: ${peso} kg`;
        tarjeta.querySelector("p:nth-child(5)").textContent = `Género: ${genero}`;
        tarjeta.querySelector("p:nth-child(6)").textContent = `Estado de Salud: ${salud}`;

        modal.remove();
    });
}

// **Configurar evento para buscar animal**
function configurarEventoBuscarAnimal(botonBuscarAnimal, contenedorTarjetasAnimales) {
    botonBuscarAnimal.addEventListener("click", () => abrirModalBuscarAnimal(contenedorTarjetasAnimales));
}

// **Abrir modal para buscar animal**
function abrirModalBuscarAnimal(contenedorTarjetasAnimales) {
    const modal = crearModal(`
        <h2>Buscar Animal</h2>
        <label>Raza:</label>
        <input type="text" id="buscarRaza">
        <label>Género:</label>
        <select id="buscarGenero">
            <option value="">Todos</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
        </select>
        <label>Estado de Salud:</label>
        <select id="buscarSalud">
            <option value="">Todos</option>
            <option value="Saludable">Saludable</option>
            <option value="Enfermo">Enfermo</option>
        </select>
        <button id="aplicarBusqueda">Aplicar Filtros</button>
        <button id="cerrarModalBusqueda">Cancelar</button>
    `);

    document.body.appendChild(modal);

    configurarEventosModalBuscarAnimal(modal, contenedorTarjetasAnimales);
}

// **Configurar eventos del modal para buscar animal**
function configurarEventosModalBuscarAnimal(modal, contenedorTarjetasAnimales) {
    const botonCerrar = modal.querySelector("#cerrarModalBusqueda");
    const botonAplicar = modal.querySelector("#aplicarBusqueda");

    botonCerrar.addEventListener("click", () => modal.remove());

    botonAplicar.addEventListener("click", () => {
        const buscarRaza = document.getElementById("buscarRaza").value.toLowerCase();
        const buscarGenero = document.getElementById("buscarGenero").value;
        const buscarSalud = document.getElementById("buscarSalud").value;

        const tarjetas = document.querySelectorAll(".animal-card");
        tarjetas.forEach(tarjeta => {
            const raza = tarjeta.querySelector("p:nth-child(2)").textContent.toLowerCase();
            const genero = tarjeta.querySelector("p:nth-child(5)").textContent.replace("Género: ", "");
            const salud = tarjeta.querySelector("p:nth-child(6)").textContent.replace("Estado de Salud: ", "");

            const coincideRaza = raza.includes(buscarRaza);
            const coincideGenero = buscarGenero ? genero === buscarGenero : true;
            const coincideSalud = buscarSalud ? salud === buscarSalud : true;

            tarjeta.style.display = coincideRaza && coincideGenero && coincideSalud ? "block" : "none";
        });

        modal.remove();
    });
}

// **Crear modal dinámico**
function crearModal(contenidoHTML) {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalContent.innerHTML = contenidoHTML;

    modal.appendChild(modalContent);

    return modal;
}

// **Configurar evento para buscar por identificador**
document.getElementById("searchButton").addEventListener("click", () => {
    const searchValue = document.getElementById("search").value.toLowerCase();
    const tarjetas = document.querySelectorAll(".animal-card");

    tarjetas.forEach(tarjeta => {
        const id = tarjeta.querySelector("h3").textContent.replace("ID: ", "").toLowerCase();
        tarjeta.style.display = id.includes(searchValue) ? "block" : "none";
    });
});

// **Manejar envío de formulario**
function manejarEnvioFormulario(event, tableBody) {
    event.preventDefault();

    const tipo = document.getElementById("tipo").value.trim();
    const fecha = document.getElementById("fecha").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const numeroArete = document.getElementById("animal").value; // Obtener el numeroArete del animal seleccionado

    if (!validarCampos(tipo, fecha, descripcion, "errorMessage")) return;

    agregarFilaTabla(tableBody, tipo, fecha, descripcion, numeroArete);
    cerrarModal();
    document.getElementById("control-form").reset();
}

// **Agregar fila a la tabla**
function agregarFilaTabla(tableBody, tipo, fecha, descripcion, numeroArete) {
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${tableBody.children.length + 1}</td>
        <td>${tipo}</td>
        <td>${fecha}</td>
        <td>${descripcion}</td>
        <td>${numeroArete}</td>
        <td></td>
    `;

    const accionesCell = newRow.children[5];
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

// **Guardar tabla en localStorage**
function guardarTabla() {
    const registros = Array.from(document.querySelectorAll("tbody tr")).map(row => ({
        numeroArete: row.children[4].textContent, // Guardar el numeroArete
        tipo: row.children[1].textContent,
        fecha: row.children[2].textContent,
        descripcion: row.children[3].textContent,
    }));
    localStorage.setItem("tablaRegistros", JSON.stringify(registros));
}

// **Cargar animales en el selector**
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