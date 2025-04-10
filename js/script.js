document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("animal-form");
    const tableBody = document.getElementById("animal-table-body");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const nombre = document.getElementById("nombre").value;
        const especie = document.getElementById("especie").value;
        const edad = document.getElementById("edad").value;
        const peso = document.getElementById("peso").value;
        
        if (nombre.trim() === "" || edad <= 0 || peso <= 0) {
            alert("Por favor, complete todos los campos correctamente");
            return;
        }
        
        agregarAnimal(nombre, especie, edad, peso);
        form.reset();
    });
    
    function agregarAnimal(nombre, especie, edad, peso) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${nombre}</td>
            <td>${especie}</td>
            <td>${edad}</td>
            <td>${peso}</td>
            <td>
                <button class="delete-btn">Eliminar</button>
            </td>
        `;
        
        tableBody.appendChild(row);
        
        row.querySelector(".delete-btn").addEventListener("click", function () {
            row.remove();
        });
    }
});
