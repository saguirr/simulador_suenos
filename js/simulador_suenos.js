const db = firebase.firestore();

const form_registro = document.getElementById("form-registro");
const form_sueño = document.getElementById("form-sueño");
const resultado = document.getElementById("simulacion");

const btneducacion = document.getElementById("educacion");
const btnemprendimiento = document.getElementById("emprendimiento");
const btnmatrimonio = document.getElementById("matrimonio");
const btntecnologico = document.getElementById("tecnologico");
const btnvacaciones = document.getElementById("vacaciones");
const btnvehiculo = document.getElementById("vehiculo");
const btnvivienda = document.getElementById("vivienda");
const btncalcular = document.getElementById("calcular");

const contenido = document.getElementById("contenido");
const cedula = document.getElementById("identificacion");
const nombre = document.getElementById("nombre");

const porAhorros = document.getElementById("ahorros");
const porCredito = document.getElementById("credito");
const valValor = document.getElementById("valor");
const valMeses = document.getElementById("meses");

//Variable de Tasas
const tasaED = 0.0375
const tasaFE = 0.0275
const tasaPV = 0.0375
const tasaORD = 0.0175

//Resultado
let tipo;
let valor;
let meses;
let tasaPeriodo;
let tasa;
let totalGeneral;


/**
 *Save a new simulacion in firestore
 @param {string} cedula      Cedula Asociado
 @param {string} nombre      Nombre Asociado
 */

 //Clases

 class UI {
     imprimirAlerta(mensaje, tipo){
         //crear el div
         const divMensaje = document.createElement('div');
         divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-7');

         //Agregar clase en base al tipo de error
         if(tipo === 'error'){
             divMensaje.classList.add('alert-danger');             
         }else{
             divMensaje.classList.add('alert-success')
         }

         //Mensaje de error
         divMensaje.textContent = mensaje;

         //Agregar al DOM
         document.querySelector('#opcion').insertBefore(divMensaje, document.querySelector('.agregar-opcion'));

         //Quitar la alerta después de 5 segundos
         setTimeout(() => {
             divMensaje.remove();             
         }, 3000);
     }
 }

const ui = new UI();
 
 const saveRegistro = (cedula, nombre) =>    
 db.collection("simuladorsuenos").doc().set({
     cedula,
     nombre,
 }); 

const onGetSuenos = (callback) => db.collection("simuladorsuenos").onSnapshot(callback);
const getSuenosid = (id) => db.collection("simuladorsuenos").doc(id).get(); 
const getSuenos = () => db.collection("simuladorsuenos").get();


window.addEventListener("DOMContentLoaded", async(e) => {
    
})

function buscarUsuario(){
    onGetSuenos((query))
}

form_registro.addEventListener('submit', async(e) => {
    e.preventDefault();

    const cedula = form_registro['identificacion'];
    const nombre = form_registro['nombre'];

    //const nombreasociado = nombre.value;

    if(cedula.value == '' || nombre.value == '') {
        alert("Faltan datos para realizar el registro")
        return;
    } else {

        await saveRegistro(cedula.value, nombre.value)
        form_registro.reset();
        //cedula.focus

        activaTab('sueño');
    }
});


btneducacion.addEventListener("click", async (e) => {
    e.preventDefault();

    activaTab('opcion');
    seleccion = "Educacion"  
});

btnemprendimiento.addEventListener("click", async (e) => {
    e.preventDefault();

    activaTab('opcion');
    seleccion = "Emprendimiento"  
});

btnmatrimonio.addEventListener("click", async (e) => {
    e.preventDefault();

    activaTab('opcion');
    seleccion = "Matrimonio"  
});

btntecnologico.addEventListener("click", async (e) => {
    e.preventDefault();

    activaTab('opcion');    
    seleccion = "Tecnologico";     
});

btnvacaciones.addEventListener("click", async (e) => {
    e.preventDefault();

    activaTab('opcion');
    seleccion = "Vacaciones"  
});

btnvehiculo.addEventListener("click", async (e) => {
    e.preventDefault();

    activaTab('opcion');    
    seleccion = "Vehiculo"; 
});

btnvivienda.addEventListener("click", async (e) => {
    e.preventDefault();

    activaTab('opcion');
    seleccion = "Vivienda"  
});

btncalcular.addEventListener("click", async (e) => {
    e.preventDefault();

    activaTab('simulacion');
    simulacion();
        
});

function simulacion(e){

    //console.log(nombreasociado);

    const ah = parseInt(porAhorros.value);
    const cr = parseInt(porCredito.value);
    const va = valValor.value;
    const meses = parseInt(valMeses.value);
    const quincenas = parseInt(valMeses.value * 2);
    const dias = parseInt(valMeses.value * 30.471);
    val = Number(va.replace(/,/g, ''));

    //Validacion
    if(isNaN(ah) || isNaN(cr)){
        ui
    }

    //Calculo tasa del periodo 

    switch (seleccion) {
        case "Educacion":
            tipo = "AHORRO EDUCACIÓN"
            tasaPeriodo = Math.round10((((1 + tasaPV) ** (1 / 365)) ** dias) - 1, -5);
            tasa = Math.round10((tasaPV * 100), -5);
            break;
        case "Emprendimiento":
            tipo = "AHORRO ORDINARIO"
            tasaPeriodo = Math.round10((((1 + tasaFE) ** (1 / 365)) ** dias) - 1, -5);
            tasa = Math.round10((tasaFE * 100), -5);
            break;
        case "Matrimonio":
            tipo = "AHORRO ORDINARIO"
            tasaPeriodo = Math.round10((((1 + tasaORD) ** (1 / 365)) ** dias) - 1, -5);
            tasa = Math.round10((tasaORD * 100), -5);
            break;
        case "Tecnologico":
            tipo = "AHORRO ORDINARIO"
            tasaPeriodo = Math.round10((((1 + tasaPV) ** (1 / 365)) ** dias) - 1, -5);
            tasa = Math.round10((tasaPV * 100), -5);
            break;
        case "Vacaciones":
            tipo = "AHORRO FIN ESPECIFICO"
            tasaPeriodo = Math.round10((((1 + tasaFE) ** (1 / 365)) ** dias) - 1, -5);
            tasa = Math.round10((tasaFE * 100), -5);
            break;
        case "Vehículo":
            tipo = "AHORRO FIN ESPECIFICO"
            tasaPeriodo = Math.round10((((1 + tasaORD) ** (1 / 365)) ** dias) - 1, -5);
            tasa = Math.round10((tasaORD * 100), -5);
            break;
        case "Vivienda":
            tipo = "AHORRO PROVIVIENDA"
            tasaPeriodo = Math.round10((((1 + tasaORD) ** (1 / 365)) ** dias) - 1, -5);
            tasa = Math.round10((tasaORD * 100), -5);
            break;
        default:
            break;
    }

    const valAhorro = parseInt(val * (ah / 100));
    const valCredito = parseInt(val * (cr / 100));
    const valCuotaM = parseInt(valAhorro / meses);
    const valCuotaQ = parseInt(valCuotaM / 2);
    
    tasaPer = Math.round10((tasaPeriodo * 100), -5);
    meta = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0}).format(val);
    interes =  val * tasaPeriodo;
    interesT = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(interes);
    valorAhorro = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(valAhorro);
    valorCredito = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(valCredito);
    valorCuotaMensual = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(valCuotaM);
    valorCuotaQuincenal = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(valCuotaQ);
    totalGeneral = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0}).format(valAhorro + interes);

    const divResultado = document.createElement('div');
    divResultado.classList.add('simulacion', 'p-3');

    //Scripting d elos elementos de la simulación

    const tipoParrafo = document.createElement('h3');
    tipoParrafo.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    tipoParrafo.innerHTML = `<span style="color: #0B2A70">AHORRO:</span> <span style="color: #0B2A70">${tipo} </span>`;

    const metaParrafo = document.createElement('p');
    metaParrafo.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    metaParrafo.innerHTML = `<span style="color: #000000; font-weight:bold">Sueños a Alcanzar:</span> <span style="color: #000000">${meta} </span>`;

    const ahorroParrafo = document.createElement('p');
    ahorroParrafo.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    ahorroParrafo.innerHTML = `<span style="color: #000000; font-weight:bold">Total a Ahorrar:</span> <span style="color: #000000">${valorAhorro} </span>`;

    const mesesParrafo = document.createElement('p');
    mesesParrafo.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    mesesParrafo.innerHTML = `<span style="color: #000000; font-weight:bold">Plazo en meses:</span> <span style="color: #000000">${meses} meses</span>`;

    const quincenasParrafo = document.createElement('p');
    quincenasParrafo.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    quincenasParrafo.innerHTML = `<span style="color: #000000; font-weight:bold">Plazo en quincenas:</span> <span style="color: #000000">${quincenas}</span>`;

    const tasaAhParrafo = document.createElement('p');
    tasaAhParrafo.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    tasaAhParrafo.innerHTML = `<span style="color: #000000; font-weight:bold">Tasa del Ahorro:</span> <span style="color: #000000">${tasa} %</span>`;

    const cuotaMenParrafo = document.createElement('p');
    cuotaMenParrafo.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    cuotaMenParrafo.innerHTML = `<span style="color: #000000; font-weight:bold">Cuota Mensual:</span> <span style="color: #000000">${valorCuotaMensual}</span>`;

    const cuotaQuiParrafo = document.createElement('p');
    cuotaQuiParrafo.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    cuotaQuiParrafo.innerHTML = `<span style="color: #000000; font-weight:bold">Cuota Quincenal:</span> <span style="color: #000000">${valorCuotaQuincenal}</span>`;

    const totalTotal = document.createElement('p');
    totalTotal.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    totalTotal.innerHTML = `<span style="color: #000000; font-weight:bold">Valor Aproximado a Recibir:</span> <span style="color: #000000"> ${totalGeneral}</span>`;

    const creditoParrafo = document.createElement('p');
    creditoParrafo.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    creditoParrafo.innerHTML = `<span style="color: #000000; font-weight:bold">Valor en Crédito:</span> <span style="color: #000000">${valorCredito} </span>`;

    //Agregar los parrafos al divCita
    divResultado.appendChild(tipoParrafo);
    divResultado.appendChild(metaParrafo);
    divResultado.appendChild(ahorroParrafo);    
    divResultado.appendChild(mesesParrafo);
    divResultado.appendChild(quincenasParrafo);
    divResultado.appendChild(tasaAhParrafo);
    divResultado.appendChild(cuotaMenParrafo);
    divResultado.appendChild(cuotaQuiParrafo);
    divResultado.appendChild(totalTotal);
    divResultado.appendChild(creditoParrafo);

    //Agregar las citas al HTML
    resultado.appendChild(divResultado);    

    /*//Limpiar resultado después de 5 segundo
    setTimeout(() => {
        resultado.remove();

    }, 5000);*/

    //Limpiar
    //inversion.value = '';
    //plazo.value = '';

    //Reiniciar el formulario
    //formulario.reset();
    
}

function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};

//FUNCIONES
const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
});

// Closure
(function() {
    /**
     * Ajuste decimal de un número.
     *
     * @param {String}  type  El tipo de ajuste.
     * @param {Number}  value El número.
     * @param {Integer} exp   El exponente (El logaritmo de ajuste en base 10).
     * @returns {Number} El valor ajustado.
     */

    function decimalAdjust(type, value, exp) {
        // Si exp es undefined o cero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }

        value = +value;
        exp = +exp;

        // Si el valor no es un número o exp no es un entero...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }

        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

     // Decimal round
    if (!Math.round10) {
        Math.round10 = function(value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }

    // Decimal floor
    if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }

    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();

$("input[data-type='currency']").inputmask({
    groupSeparator: ",",
    alias: "integer",
    placeholder: "0",
    autoGroup: !0,
    digitsOptional: !1,
    clearMaskOnLostFocus: !1
}).click(function() {
    $(this).select();
});
