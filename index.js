let form = document.querySelector('form');
let cantidadInput = document.getElementById('cantidad');
let monedaOrigenSelect = document.getElementById('moneda-origen');
let monedaDestinoSelect = document.getElementById('moneda-destino');
let resultadoDiv = document.getElementById('resultado');

const tasasDeCambio = {
    usd: 1.00,
    eur: 1.15,
    real: 0.19,
    chilenos: 0.0013,
    libras: 1.36,
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

function calcularCambio(cantidad, monedaOrigen, monedaDestino) {
    if (!(monedaOrigen in tasasDeCambio) || !(monedaDestino in tasasDeCambio)) {
        return "Moneda no válida";
    }
    const tasaOrigen = tasasDeCambio[monedaOrigen];
    const tasaDestino = tasasDeCambio[monedaDestino];
    const valorCambio = cantidad * (tasaDestino / tasaOrigen);
    return valorCambio.toFixed(1);
}


const botonCarrito = document.getElementById("add-carrito");
botonCarrito.onclick = function () {
    agregarAlCarrito();
};

const listaCompras = document.getElementById("lista-compras");
const resultadoFinal = document.getElementById("resultado-final");

const carrito = [];

function actualizarTotal() {
    let total = 0;
    carrito.forEach(item => {
        total += item.total;
    });
    resultadoFinal.textContent = "Total: " + total.toFixed(2) + " USD";
}

document.getElementById("add-carrito").addEventListener("click", () => {
    const cantidad = parseFloat(document.getElementById("cantidad").value);
    const monedaOrigen = document.getElementById("moneda-origen").value;
    const monedaDestino = document.getElementById("moneda-destino").value;

    let total = 0;
    if (monedaOrigen === "eur" && monedaDestino === "usd") {
        total = cantidad * 1.15;
    } else if (monedaOrigen === "real" && monedaDestino === "usd") {
        total = cantidad * 0.19;
    } else if (monedaOrigen === "chilenos" && monedaDestino === "usd") {
        total = cantidad * 0.0013;
    } else if (monedaOrigen === "libras" && monedaDestino === "usd") {
        total = cantidad * 1.36;
    }

    carrito.push({ total });

    const listItem = document.createElement("li");
    listItem.textContent = `${cantidad} ${monedaOrigen} a USD: ${total.toFixed(1)}`;
    listaCompras.appendChild(listItem);

    actualizarTotal();
});

document.getElementById("vaciarCarrito").addEventListener("click", () => {
    carrito.length = 0;
    listaCompras.innerHTML = "";
    resultadoFinal.textContent = "Total:";
});

