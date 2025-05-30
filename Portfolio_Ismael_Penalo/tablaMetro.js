const estaciones = [
  {nombre: "Mama Tingo", zona: "Villa mella", linea: "L1", flujo: 35000},
  {nombre: "Gregorio Urbano Gilbert", zona: "Ensanche la Paz", linea: "L1", flujo: 12000},
  {nombre: "Gregorio Luperon", zona: "Cerros De Buena Vista", linea: "L1", flujo: 9200},
  {nombre: "Peña Gomez", zona: "Los Guaricanos", linea: "L1", flujo: 10000},
  {nombre: "Hermanas Mirabal", zona: "Cerca al Mirador Norte", linea: "L1", flujo: 8000},
  {nombre: "Maximo gomez", zona: "en la isabela", linea: "L1", flujo: 22000},
  {nombre: "Los tainos", zona: "Villa Agricolas", linea: "L1", flujo: 18000},
  {nombre: "Pedro livio Cedeño", zona: "Cementerio Nacional", linea: "L1", flujo: 6000},
  {nombre: "Manuel Arturo Peña Batlle", zona: "Villa Juana", linea: "L1", flujo: 9000},
  {nombre: "Juan Bosch", zona: "Av, 27 de Febrero", linea: "L1", flujo: 13000},
  {nombre: "Casandra Damiron", zona: "Cerca al Teatro Nacional", linea: "L1", flujo: 10000},
  {nombre: "Joaquin Balaguer", zona: "Cerca al Ministerio Educacion", linea: "L1", flujo: 18000},
  {nombre: "Amin Abel", zona: "Cerca a La UASD", linea: "L1", flujo: 14000},
  {nombre: "Francisco Alberto Camaño", zona: "Cerca a UNICDA", linea: "L1", flujo: 11000},
  {nombre: "Centro de los Heroes", zona: "Av, Enrique Jimenez", linea: "L1", flujo: 30000},
  {nombre: "Juan Pablo Duarte L1", zona: "Conexion con L2", linea: "L1", flujo: 60000},
  {nombre: "Maria Montez", zona: "Km 9 Autop. Duarte", linea: "L2", flujo: 28000},
  {nombre: "Pedro Francisco Bono", zona: "Av. Nuñez de Caceres", linea: "L2", flujo: 5700},
  {nombre: "Gregorio Billini", zona: "Av.Dr.Defillo", linea: "L2", flujo: 6000},
  {nombre: "Ulises francisco espaillat", zona: "Av.Winston Churchil", linea: "L2", flujo: 7000},
  {nombre: "Pedro Mir", zona: "Av.Winston Churchil", linea: "L2", flujo: 15000},
  {nombre: "Freddy beras Goico", zona: "Av. Lope De Vega", linea: "L2", flujo: 8000},
  {nombre: "Juan Ulises Garcia Saleta", zona: "Av. Ortega y Gasset", linea: "L2", flujo: 5000},
  {nombre: "Juan Pablo Duarte L2", zona: "Conexión con L1", linea: "L2", flujo: 70000},
  {nombre: "Coronel Rafael tomas", zona: "Av. San Martin", linea: "L2", flujo: 5700},
  {nombre: "Mauricio Baez", zona: "Cerca a Escuela Rep.Dom", linea: "L2", flujo: 1000},
  {nombre: "Ramon Careres", zona: "Av. Duarte", linea: "L2", flujo: 6700},
  {nombre: "Horacio Vasquez", zona: "Av.Josefa Brea", linea: "L2", flujo: 12000},
  {nombre: "Manuel de Jesus Galvan", zona: "Av. Jose M. Lopez", linea: "L2", flujo: 4000},
  {nombre: "Eduardo Brito", zona: "Av. Francisco Del Rosario Sanchez", linea: "L2", flujo: 8000},
  {nombre: "Ercilia Pepin", zona: "Av. Venezuela", linea: "L2", flujo: 7300},
  {nombre: "Rosa Duarte", zona: "Av. Fernandez Navarrete", linea: "L2", flujo: 9000},
  {nombre: "Trina de Moya", zona: "C. Trina de Moya", linea: "L2", flujo: 5600},
  {nombre: "Concepcion Bona", zona: "Carretera Mella", linea: "L2", flujo: 6000}
];

let paginaActual = 1;
const filasPorPagina = 5;
let flujoAsc = true;
let datosFiltrados = [...estaciones];

function mostrarTabla() {
  const cuerpo = document.getElementById("cuerpoTabla");
  cuerpo.innerHTML = "";
  const inicio = (paginaActual - 1) * filasPorPagina;
  const fin = inicio + filasPorPagina;
  const pagina = datosFiltrados.slice(inicio, fin);

  pagina.forEach(est => {
    cuerpo.innerHTML += `
      <tr>
        <td data-label="Estación">${est.nombre}</td>
        <td data-label="Zona">${est.zona}</td>
        <td data-label="Línea">${est.linea}</td>
        <td data-label="Flujo Diario">${est.flujo.toLocaleString()}</td>
      </tr>`;
  });

  document.getElementById("paginaActual").innerText =
    `Página ${paginaActual} de ${Math.ceil(datosFiltrados.length / filasPorPagina)}`;
  document.getElementById("prevBtn").disabled = paginaActual === 1;
  document.getElementById("nextBtn").disabled = paginaActual >= Math.ceil(datosFiltrados.length / filasPorPagina);
}

function cambiarPagina(valor) {
  paginaActual += valor;
  mostrarTabla();
}

function filtrarTabla() {
  const filtro = document.getElementById("lineaFilter").value;
  datosFiltrados = filtro === "todas" ? [...estaciones] : estaciones.filter(e => e.linea === filtro);
  paginaActual = 1;
  mostrarTabla();
}

function ordenarPorFlujo() {
  flujoAsc = !flujoAsc;
  datosFiltrados.sort((a, b) => flujoAsc ? a.flujo - b.flujo : b.flujo - a.flujo);
  paginaActual = 1;
  mostrarTabla();
}

function filtrarBusqueda() {
  const texto = document.getElementById("busqueda").value.toLowerCase();
  const filtro = document.getElementById("lineaFilter").value;

  datosFiltrados = estaciones.filter(est => {
    const coincideTexto =
      est.nombre.toLowerCase().includes(texto) ||
      est.zona.toLowerCase().includes(texto);
    const coincideLinea = filtro === "todas" || est.linea === filtro;
    return coincideTexto && coincideLinea;
  });

  paginaActual = 1;
  mostrarTabla();
}

mostrarTabla();

