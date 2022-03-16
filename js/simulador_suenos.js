const db = firebase.firestore();

const contenido = document.getElementById("contenido");
const cedula = document.getElementById("identificacion");
const nombre = document.getElementById("nombre");
const btnsiguiente = document.getElementById("siguiente");

const btneducacion = document.getElementById("educacion");
const btnemprendimiento = document.getElementById("emprendimiento");
const btnmatrimonio = document.getElementById("matrimonio");
const btntecnologico = document.getElementById("tecnologico");
const btnvacaciones = document.getElementById("vacaciones");
const btnvehiculo = document.getElementById("vehiculo");
const btnvivienda = document.getElementById("vivienda");
const btncalcular = document.getElementById("calcular");

const porAhorros = document.getElementById("ahorros");
const valValor = document.getElementById("valor");
const valMeses = document.getElementById("meses");

const form_registro = document.getElementById("form-registro");
const form_sueño = document.getElementById("form-sueño");
const resultado = document.getElementById("simulacion");

//Variable de Tasas
const tasaED = 0.06;
const tasaFE = 0.05;
const tasaPV = 0.06;
const tasaORD = 0.025;

let date = new Date();
//console.log(date.toLocaleDateString());

//Resultado
let porAh;
let tipo;
let valor;
let meses;
let tasaPeriodo;
let tasaP30;
let diames;
let tasa;
let totalGeneral;
let quincena;
let porCr;
let valorCuotaMensual;
let valorCuotaQuincenal;
let valorCredito;


/**
 *Save a new simulacion in firestore
 @param {string} cedula
 @param {string} nombre
 @param {string} tipo
 @param {string} meta
 @param {string} porAh
 @param {string} valorAhorro   
 @param {string} meses  
 @param {string} quincenas   
 @param {string} tasa
 @param {string} tasaPer   
 @param {string} valorCuotaMensual      
 @param {string} valorCuotaQuincenal     
 @param {string} totalGeneral
 @param {string} porCr
 @param {string} valorCredito
 @param {string} date
 */

 //Clases

 class UI {
     imprimirAlerta(mensaje, tipo){
         //crear el div
         const divMensaje = document.createElement('div');
         divMensaje.classList.add('text-center', 'sans-serif', 'alert', 'd-block', 'col-7');

         const divMensaje1 = document.createElement('div');
         divMensaje1.classList.add('text-center', 'sans-serif', 'alert', 'd-block', 'col-7');


         //Agregar clase en base al tipo de error
         if(tipo === 'error'){
             divMensaje.classList.add('alert-danger'); 
             divMensaje1.classList.add('alert-danger');            
         }else{
             divMensaje.classList.add('alert-success')
             divMensaje1.classList.add('alert-danger'); 
         }

         //Mensaje de error
         divMensaje.textContent = mensaje;
         divMensaje1.textContent = mensaje;

         //Agregar al DOM
         document.querySelector('#opcion').insertBefore(divMensaje, document.querySelector('.agregar-opcion'));
         document.querySelector('#registro').insertBefore(divMensaje1, document.querySelector('.agregar-registro'));

         //Quitar la alerta después de 5 segundos
         setTimeout(() => {
             divMensaje.remove();
             divMensaje1.remove();            
         }, 10000);
     }
 }

const ui = new UI();
 


const onGetSuenos = (callback) => db.collection("simuladorsuenos").onSnapshot(callback);
const getSuenosid = (id) => db.collection("simuladorsuenos").doc(id).get(); 
const getSuenos = () => db.collection("simuladorsuenos").get();


window.addEventListener("DOMContentLoaded", async(e) => {
    
})

window.addEventListener("load", function() {
    cargarPlazos(event);
}, false);


btnsiguiente.addEventListener("click", async (e) => {
    e.preventDefault();

    const cedula = form_registro['identificacion'];
    const nombre = form_registro['nombre'];

    const diames = parseInt(30);

    if(cedula.value == '' || nombre.value == '') {
        ui.imprimirAlerta("Faltan datos para realizar el registro");
        return;
    } else {
        activaTab('sueño');   
       // nextTab('sueño');  
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

const saveRegistro = (cedula, nombre, tipo, meta, porAh, valorAhorro, meses, quincenas, tasa,
        tasaPer, valorCuotaMensual, valorCuotaQuincenal, totalGeneral, porCr, valorCredito, date) =>
    db.collection("simuladorsuenos").doc().set({
    cedula,
    nombre,
    tipo,
    meta,
    porAh,
    valorAhorro,
    meses,
    quincenas,    
    tasa,
    tasaPer,
    valorCuotaMensual,
    valorCuotaQuincenal,
    totalGeneral,
    porCr,
    valorCredito,
    date,
});

btncalcular.addEventListener("click", async (e) => {
    e.preventDefault();

    const porAh = parseInt(porAhorros.value);
    const va = valValor.value;
    const meses = parseInt(valMeses.value);
    val = Number(va.replace(/,/g, ''));

    //Validacion
    try {if(cedula.value == '' || nombre.value == '') {
            ui.imprimirAlerta('El número de documento y El nombre son obligatorios para la simulación', 'error');
            return;
        }else if(isNaN(porAh) || isNaN(val) || isNaN(meses) || val === 0){
            ui.imprimirAlerta('Todos los campos son obligatorios para realizar la simulación', 'error');
            return;
        }else if (porAh > 100) {
            ui.imprimirAlerta('El porcentaje de Ahorro no puede ser superior al 100%', 'error');
            return;
        }    
        else{        
            activaTab('simulacion');
            simulacion();
            
    
            await saveRegistro(cedula.value, nombre.value, tipo, meta, porAh, valorAhorro, meses, quincenas,
                tasa, tasaPer, valorCuotaMensual, valorCuotaQuincenal, totalGeneral, porCr,  valorCredito, date);
        }

    } catch (error) {
        console.log(error);
    }
});

function simulacion(e){

    //console.log(nombreasociado);

    
    const url = "www.feproteccion.com.co"

    const porAh = parseInt(porAhorros.value);
    //const cr = parseInt(porCredito.value);
    const va = valValor.value;
    const meses = parseInt(valMeses.value);
    quincenas = parseInt(valMeses.value * 2);
    const dias = parseInt(valMeses.value * 30.471);
    val = Number(va.replace(/,/g, ''));
    const diames = parseInt(30); 

    if (porAh === 100) {
        porCr = 0;
    }
    if ((porAh > 0) && (porAh < 100)){
        porCr = 100 - porAh;
    }

    switch (seleccion) {
        case "Educacion":
            tipo = "Ahorro Universitario"
            tasaPeriodo = Math.round10((((1 + tasaED) ** (1 / 365)) ** dias), -1, -5);
            tasaP30 = Math.round10((((1 + tasaED) ** (1 / 365)) ** diames) - 1, -5);
            tasa = Math.round10((tasaED * 100), -5);            
            break;
        case "Emprendimiento":
            tipo = "Ahorro Ordinario"
            tasaPeriodo = Math.round10((((1 + tasaORD) ** (1 / 365)) ** dias) - 1, -5);
            tasaP30 = Math.round10((((1 + tasaORD) ** (1 / 365)) ** diames) - 1, -5);
            tasa = Math.round10((tasaORD * 100), -5);
            break;
        case "Matrimonio":
            tipo = "Ahorro Ordinario"
            tasaPeriodo = Math.round10((((1 + tasaORD) ** (1 / 365)) ** dias) - 1, -5);
            tasaP30 = Math.round10((((1 + tasaORD) ** (1 / 365)) ** diames) - 1, -5);
            tasa = Math.round10((tasaORD * 100), -5);
            break;
        case "Tecnologico":
            tipo = "Ahorro Ordinario"
            tasaPeriodo = Math.round10((((1 + tasaORD) ** (1 / 365)) ** dias) - 1, -5);
            tasaP30 = Math.round10((((1 + tasaORD) ** (1 / 365)) ** diames) - 1, -5);
            tasa = Math.round10((tasaORD * 100), -5);
            break;
        case "Vacaciones":
            tipo = "Ahorro Fin Específico"
            tasaPeriodo = Math.round10((((1 + tasaFE) ** (1 / 365)) ** dias) - 1, -5);
            tasaP30 = Math.round10((((1 + tasaFE) ** (1 / 365)) ** diames) - 1, -5);
            tasa = Math.round10((tasaFE * 100), -5);
            break;
        case "Vehiculo":
            tipo = "Ahorro Fin Específico"
            tasaPeriodo = Math.round10((((1 + tasaFE) ** (1 / 365)) ** dias) - 1, -5);
            tasaP30 = Math.round10((((1 + tasaFE) ** (1 / 365)) ** diames) - 1, -5);
            tasa = Math.round10((tasaFE * 100), -5);
            break;
        case "Vivienda":
            tipo = "Ahorro Provivienda"            
            tasaPeriodo = Math.round10((((1 + tasaPV) ** (1 / 365)) ** dias) - 1, -5);
            tasaP30 = Math.round10((((1 + tasaPV) ** (1 / 365)) ** diames) - 1, -5);            
            tasa = Math.round10((tasaPV * 100), -5);
            console.log(tasaP30);                      
            break;
        default:
            break;
    }
   
    const valAhorro = parseInt(val * (porAh / 100));
    const valCredito = parseInt(val * (porCr / 100));
    const valCuotaM = parseInt(valAhorro / meses);
    const valCuotaQ = parseInt(valCuotaM / 2);
    let asociado = nombre.value    
    
    let n = 1;    
    let calcuota = 0;
    let suma = 0;
    let valor = 0;

    while (n <= meses) {

        suma = (suma + valCuotaM);
        //console.log('La suma es:', suma);
        interes = (suma*tasaP30)+suma
        //console.log('El valor es de:', valor);
        calcuota = calcuota + interes;
        suma = calcuota;
        valor = valor + suma;       
        //console.log('El Calculo cuota es de:', calcuota);        
        
        calcuota = 0
        cuota = 0;
        n = n + 1;

   };
   
   //console.log('Total es:', suma)

    tasaPer = Math.round10((tasaP30 * 100), -5);
    meta = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0}).format(val);
    //interes =  valAhorro * tasaPeriodo;
    interesT = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(interes);
    valorAhorro = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(valAhorro);
    valorCredito = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(valCredito);
    valorCuotaMensual = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(valCuotaM);
    valorCuotaQuincenal = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(valCuotaQ);
    //totalGeneral = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0}).format(valAhorro + interes);
    totalGeneral = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0}).format(suma);

    const divResultado = document.createElement('div');
    divResultado.classList.add('simulacion', 'p-3');

    //Scripting d elos elementos de la simulación

    const asociadoParrafo = document.createElement('h3');
    asociadoParrafo.classList.add('card-title', 'Verdana', 'font-weight-bolder', 'text-center');
    asociadoParrafo.innerHTML = `<span style="color: #0B2A70">${asociado} </span>`;

    const tipoParrafo = document.createElement('h3');
    //tipoParrafo.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    tipoParrafo.classList.add('card-title', 'Verdana', 'font-weight-bolder');
    tipoParrafo.innerHTML = `<span class="subtitulo">El ahorro que debes abrir para cumplir tu sueño es:</span> 
                            <br>
                            <span class="resultado">${tipo} </span>
                            <br>
                            <br>`;

    const metaParrafo = document.createElement('p');
    metaParrafo.classList.add('card-title', 'Verdana', 'font-weight-bolder');
    metaParrafo.innerHTML = `<span class="nomresultados">Sueño a Alcanzar:</span> <span class="resultado_1">${meta} </span>`;

    const porcentajeAhorroParrafo = document.createElement('p');
    porcentajeAhorroParrafo.classList.add('card-title', 'Verdana', 'font-weight-bolder');
    porcentajeAhorroParrafo.innerHTML = `<span class="nomresultados">Porcentaje de Ahorro:</span> <span class="resultado_1">${porAh} % </span>`;

    const ahorroParrafo = document.createElement('p');
    ahorroParrafo.classList.add('card-title', 'Verdana', 'font-weight-bolder');
    ahorroParrafo.innerHTML = `<span class="nomresultados">Total a Ahorrar:</span> <span class="resultado">${valorAhorro} </span>`;

    const mesesParrafo = document.createElement('p');
    mesesParrafo.classList.add('card-title', 'Verdana', 'font-weight-bolder');
    mesesParrafo.innerHTML = `<span class="nomresultados">Plazo en meses:</span> <span class="resultado">${meses} meses</span>`;

    const quincenasParrafo = document.createElement('p');
    quincenasParrafo.classList.add('card-title', 'Verdana', 'font-weight-bolder');
    quincenasParrafo.innerHTML = `<span class="nomresultados">Plazo en quincenas:</span> <span class="resultado_1">${quincenas}</span>`;

    const tasaAhParrafo = document.createElement('p');
    tasaAhParrafo.classList.add('card-title', 'Verdana', 'font-weight-bolder');
    tasaAhParrafo.innerHTML = `<span class="nomresultados">Tasa del Ahorro:</span> <span class="resultado_1">${tasa} %</span>`;

    const tasaPeParrafo = document.createElement('p');
    tasaPeParrafo.classList.add('card-title', 'Verdana', 'font-weight-bolder');
    tasaPeParrafo.innerHTML = `<span class="nomresultados">Tasa del Periodo:</span> <span class="resultado_1">${tasaPer} %</span>`;

    const cuotaMenParrafo = document.createElement('p');
    cuotaMenParrafo.classList.add('card-title', 'Verdana', 'font-weight-bolder');
    cuotaMenParrafo.innerHTML = `<span class="nomresultados">Cuota Mensual:</span> <span class="resultado">${valorCuotaMensual}</span>`;

    const cuotaQuiParrafo = document.createElement('p');
    cuotaQuiParrafo.classList.add('card-title', 'Verdana', 'font-weight-bolder');
    cuotaQuiParrafo.innerHTML = `<span class="nomresultados">Cuota Quincenal:</span> <span class="resultado_1">${valorCuotaQuincenal}</span>`;

    const totalTotal = document.createElement('p');
    totalTotal.classList.add('card-title', 'Verdana', 'font-weight-bolder');
    totalTotal.innerHTML = `<span class="nomresultados">Valor Aproximado a Recibir:</span> <span class="resultado"> ${totalGeneral}</span>`;

    const creditoParrafo = document.createElement('p');
    creditoParrafo.classList.add('card-title', 'Verdana', 'font-weight-bolder');
    creditoParrafo.innerHTML = `<span class="cuerpo">El porcentaje de </span><span class="resultado_1">crédito </span><span class="cuerpo">para completar tu meta es de:</span> <span class="resultado_1">${porCr} % </span>
                                <span class="cuerpo">Que corresponde a un valor en Crédito de:</span> <span class="resultado_1">${valorCredito}. </span>
                                <br>
                                <span class="cuerpo">Para realizar la </span><span class="resultado_1">simulación </span><span class="cuerpo"> del valor del crédito, ingresa a </span><span class="resultado_1">Servicios en Línea en:</span> <span class="cuerpo">${url} </span>
                                <br>
                                <br>
                                <br>
                                <span class="resultado">Puedes guardar la simulación en formato PDF dando click al botón "PDF" úbicado en la parte superior </span>
                                <br>
                                <br>
                                <br>
                                <span class="nota"><strong>Nota:</strong> Los valores resultantes de esta simulación son de carácter informativo y pueden estar sujetos a variación conforme a las tasas de interés y plazos vigentes en el reglamento de Ahorros 
                                                         del Fondo de Empleados Protección***</span>`;

    //Agregar los parrafos al divCita
    divResultado.appendChild(asociadoParrafo);
    divResultado.appendChild(tipoParrafo);
    divResultado.appendChild(metaParrafo);
    divResultado.appendChild(porcentajeAhorroParrafo);
    divResultado.appendChild(ahorroParrafo);    
    divResultado.appendChild(mesesParrafo);
    divResultado.appendChild(quincenasParrafo);
    divResultado.appendChild(tasaAhParrafo);
    divResultado.appendChild(tasaPeParrafo);
    divResultado.appendChild(cuotaMenParrafo);
    divResultado.appendChild(cuotaQuiParrafo);
    divResultado.appendChild(totalTotal);
    divResultado.appendChild(creditoParrafo);

    //Agregar las citas al HTML
    resultado.appendChild(divResultado);    

    //Limpiar resultado después de 5 segundo
    setTimeout(() => {

        //Limpiar
        cedula.value = '';
        nombre.value = '';
        porAhorros.value = '';
        valValor.value = '';
        valMeses.value = '';

        resultado.remove();

        //activaTab('registro');

    }, 100000);

      
}

function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show'); 
    //$('.nav-tabs a[href="#' + tab + '"]').tab('hide');
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

function printDiv(nombreDiv) {
    var contenido = document.getElementById("simulacion").innerHTML;
    var contenidoOriginal= document.body.innerHTML;
    document.body.innerHTML = contenido;
    window.print();
    document.body.innerHTML = contenidoOriginal;

    //Limpiar
    cedula.value = '';
    nombre.value = '';
    porAhorros.value = '';
    valValor.value = '';
    valMeses.value = '';
   
}

function mayus(e) {
    e.value = e.value.toUpperCase();
}


//Funcion para cargar las provincias al campo "select".
function cargarPlazos() {

    const plazoSelect = document.querySelector("#ahorros");

    //Inicializamos el array.
    var array = ['', 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].sort();
    //Ordena el array alfabeticamente.
    function comparar(a, b) { return a - b; }
    array.sort(comparar); // [ 1, 5, 40, 200 ]
    //Pasamos a la funcion addOptions(el ID del select, las provincias cargadas en el array).
    addOptions("ahorros", array);
}

//Funcion para agregar opciones a un <select>.
function addOptions(domElement, array) {
    var selector = document.getElementsByName(domElement)[0];
    //Recorremos el array.
    for (plazoSelect in array) {
        var opcion = document.createElement("option");
        opcion.text = array[plazoSelect];
        selector.add(opcion);
    }
}