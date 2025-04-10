// Función para mostrar los reportes de animales en el inventario
function mostrarReportesAnimales(inventario) {
    console.log("Reporte de Animales en el Inventario:");
    inventario.forEach((animal, index) => {
        console.log(`${index + 1}. Nombre: ${animal.nombre}, Especie: ${animal.especie}, Edad: ${animal.edad}`);
    });
}

// Función para mostrar los reportes de controles sanitarios
function mostrarReportesControlesSanitarios(controlesSanitarios) {
    console.log("Reporte de Controles Sanitarios:");
    controlesSanitarios.forEach((control, index) => {
        console.log(`${index + 1}. Animal: ${control.animal}, Fecha: ${control.fecha}, Observaciones: ${control.observaciones}`);
    });
}

// Función para abrir la pestaña con el reporte de animales
function abrirReporteAnimales() {
    // Obtener datos del localStorage
    const inventario = JSON.parse(localStorage.getItem("animales")) || [];

    // Abrir una nueva pestaña
    const pestaña = window.open("", "_blank");

    pestaña.document.write(`
        <html>
        <head>
            <title>Reporte de Animales</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    background-color: #cbe3c1;
                    color: #333;
                }
                h2 {
                    text-align: center;
                    color: #984216;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    font-size: 16px;
                    text-align: left;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 12px;
                }
                th {
                    background-color: #984216;
                    color: white;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
                tr:nth-child(odd) {
                    background-color: #e6f7d4;
                }
                tr:hover {
                    background-color: #78898F;
                }
                .no-data {
                    text-align: center;
                    font-size: 18px;
                    color: #888;
                }
                button {
                    background-color: #984216;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    cursor: pointer;
                    border-radius: 5px;
                    font-size: 16px;
                    margin-top: 20px;
                }
                button:hover {
                    background-color: #6b2e12;
                }
            </style>
        </head>
        <body>
            <h2>Reporte de Animales</h2>
    `);

    if (inventario.length === 0) {
        pestaña.document.write("<p class='no-data'>No hay animales registrados.</p>");
    } else {
        pestaña.document.write(`
            <table id="reporteTabla">
                <thead>
                    <tr>
                        <th>Número de Arete</th>
                        <th>Raza</th>
                        <th>Edad (meses)</th>
                        <th>Peso (kg)</th>
                        <th>Género</th>
                        <th>Salud</th>
                    </tr>
                </thead>
                <tbody>
        `);

        inventario.forEach(animal => {
            pestaña.document.write(`
                <tr>
                    <td>${animal.numeroArete}</td>
                    <td>${animal.raza}</td>
                    <td>${animal.edad}</td>
                    <td>${animal.peso}</td>
                    <td>${animal.genero}</td>
                    <td>${animal.salud}</td>
                </tr>
            `);
        });

        pestaña.document.write(`
                </tbody>
            </table>
        `);
    }

    // Agregar botón para generar PDF
    pestaña.document.write(`
        <button id="generarPDF">Generar PDF</button>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js"></script>
        <script>
            document.getElementById("generarPDF").addEventListener("click", () => {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                const tabla = document.getElementById("reporteTabla");
                doc.text("Reporte de Animales", 10, 10);
                doc.autoTable({ html: tabla, startY: 20 });
                doc.save("reporte_animales.pdf");
            });
        </script>
    `);

    pestaña.document.write(`
        </body>
        </html>
    `);

    pestaña.document.close();
}

// Función para abrir la pestaña con el reporte de controles sanitarios
function abrirReporteControles() {
    // Obtener datos del localStorage
    const controlesSanitarios = JSON.parse(localStorage.getItem("controles")) || [];

    // Abrir una nueva pestaña
    const pestaña = window.open("", "_blank");

    pestaña.document.write(`
        <html>
        <head>
            <title>Reporte de Controles Sanitarios</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    background-color: #cbe3c1;
                    color: #333;
                }
                h2 {
                    text-align: center;
                    color: #984216;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    font-size: 16px;
                    text-align: left;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 12px;
                }
                th {
                    background-color: #984216;
                    color: white;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
                tr:nth-child(odd) {
                    background-color: #e6f7d4;
                }
                tr:hover {
                    background-color: #78898F;
                }
                .no-data {
                    text-align: center;
                    font-size: 18px;
                    color: #888;
                }
                button {
                    background-color: #984216;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    cursor: pointer;
                    border-radius: 5px;
                    font-size: 16px;
                    margin-top: 20px;
                }
                button:hover {
                    background-color: #6b2e12;
                }
            </style>
        </head>
        <body>
            <h2>Reporte de Controles Sanitarios</h2>
    `);

    if (controlesSanitarios.length === 0) {
        pestaña.document.write("<p class='no-data'>No hay controles sanitarios registrados.</p>");
    } else {
        pestaña.document.write(`
            <table id="reporteTabla">
                <thead>
                    <tr>
                        <th>Número de Arete</th>
                        <th>Tipo</th>
                        <th>Fecha</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
        `);

        controlesSanitarios.forEach(control => {
            pestaña.document.write(`
                <tr>
                    <td>${control.numeroArete}</td>
                    <td>${control.tipo}</td>
                    <td>${control.fecha}</td>
                    <td>${control.descripcion}</td>
                </tr>
            `);
        });

        pestaña.document.write(`
                </tbody>
            </table>
        `);
    }

    // Agregar botón para generar PDF
    pestaña.document.write(`
        <button id="generarPDF">Generar PDF</button>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js"></script>
        <script>
            document.getElementById("generarPDF").addEventListener("click", () => {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                const tabla = document.getElementById("reporteTabla");
                doc.text("Reporte de Controles Sanitarios", 10, 10);
                doc.autoTable({ html: tabla, startY: 20 });
                doc.save("reporte_controles_sanitarios.pdf");
            });
        </script>
    `);

    pestaña.document.write(`
        </body>
        </html>
    `);

    pestaña.document.close();
}

// Ejemplo de uso
const inventario = [
    { nombre: "Max", especie: "Perro", edad: 5 },
    { nombre: "Luna", especie: "Gato", edad: 3 }
];

const controlesSanitarios = [
    { animal: "Max", fecha: "2023-10-01", observaciones: "Vacunación al día" },
    { animal: "Luna", fecha: "2023-09-15", observaciones: "Desparasitación realizada" }
];

// Mostrar reportes
mostrarReportesAnimales(inventario);
mostrarReportesControlesSanitarios(controlesSanitarios);