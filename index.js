
let form = document.querySelector('form');
let cantidadInput = document.getElementById('cantidad');
let monedaOrigenSelect = document.getElementById('moneda-origen');
let monedaDestinoSelect = document.getElementById('moneda-destino');
let resultadoDiv = document.getElementById('resultado');

const tasasDeCambio = {
    usd: 1.00,
    eur: 1.10,
    real: 0.70,
    chilenos: 720,
    libras: 1.25
};

form.addEventListener('submit', function (e) {
    e.preventDefault()
    alert("Calculando");
    let cantidad = parseFloat(cantidadInput.value);
    let monedaOrigen = monedaOrigenSelect.value;
    let monedaDestino = monedaDestinoSelect.value;
    let tasaOrigen = tasasDeCambio[monedaOrigen];
    let tasaDestino = tasasDeCambio[monedaDestino];
    let cambio = cantidad * (tasaDestino / tasaOrigen);
    resultadoDiv.textContent = 'Tu cambio es: ' + cambio.toFixed(1) + ' ' + monedaDestino;
});

const botonCarrito = document.getElementById("add-carrito");
botonCarrito.onclick = function() {
    agregarAlCarrito();
};
function agregarAlCarrito() {
    const cantidad = document.getElementById("cantidad").value;
    const monedaOrigen = document.getElementById("moneda-origen").value;
    const monedaDestino = document.getElementById("moneda-destino").value;
    const valorCambio = calcularCambio(cantidad, monedaOrigen, monedaDestino);
    const carrito = document.getElementById("carrito");
    const listaCompras = document.getElementById("lista-compras");
    const total = document.getElementById("total");
    const nuevoItem = document.createElement("li");
    nuevoItem.textContent = `${cantidad} ${monedaOrigen} a ${monedaDestino}: ${valorCambio}`;
    listaCompras.appendChild(nuevoItem);
    const totalActual = parseFloat(total.textContent);
    total.textContent = (totalActual + valorCambio).toFixed(1);
}

    function calcularCambio(cantidad, monedaOrigen, monedaDestino) {
        if (!(monedaOrigen in tasasDeCambio) || !(monedaDestino in tasasDeCambio)) {
            return "Moneda no válida";
        }
        const tasaOrigen = tasasDeCambio[monedaOrigen];
        const tasaDestino = tasasDeCambio[monedaDestino];
        const valorCambio = cantidad * (tasaDestino / tasaOrigen);
        return valorCambio.toFixed(1); 
    }

const operacion = {cantidad, monedaOrigen, monedaDestino, resultado};
guardarOperacionEnLocalStorage(operacion);
function guardarOperacionEnLocalStorage(operacion) {
    const operacionesPrevias = JSON.parse(localStorage.getItem("operaciones")) || [];
    operacionesPrevias.push(operacion);
    localStorage.setItem("operaciones", JSON.stringify(operacionesPrevias));
}
function mostrarOperacionesDesdeLocalStorage() {
    const operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];
    operaciones.forEach(operacion => {
        const item = document.createElement("li");
        item.textContent = `${operacion.cantidad} ${operacion.monedaOrigen} a ${operacion.monedaDestino}: ${operacion.resultado.toFixed(1)}`;
        listaOperaciones.appendChild(item);
    });
}
mostrarOperacionesDesdeLocalStorage();



