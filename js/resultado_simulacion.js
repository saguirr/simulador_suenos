const db = firebase.firestore();

const simulacionContainer = document.getElementById("simulacion-container");

const onGetSimulaciones = (callback) => db.collection("simuladorsuenos").orderBy("date", "desc").onSnapshot(callback)
                                           
window.addEventListener("DOMContentLoaded", async(e) => {    

    onGetSimulaciones((querySnapshot) => {    
        //tasasContainer.innerHTML = "";
        
        const listado = document.querySelector('#listado-simulacion')  
        querySnapshot.forEach((doc) => {
        const simulacion = doc.data();
        
        listado.innerHTML += `
        <tbody>
            <tr class="table-active">         
                <td>
                    <p class="font-bold">${simulacion.cedula}</p>        
                </td>
                <td>
                    <p class="font-bold">${simulacion.nombre}</p>        
                </td>
                <td>
                    <p class="font-bold">${simulacion.date}</p>        
                </td>
                <td>
                    <p class="font-bold">${simulacion.meta}</p>        
                </td>
                <td>
                    <p class="font-bold">${simulacion.sueño}</p>        
                </td>
                <td>
                    <p class="font-bold">${simulacion.tipo}</p>        
                </td>
                <td>
                    <p class="font-bold">${simulacion.porAh}</p>        
                </td>
                <td>
                    <p class="font-bold">${simulacion.valorAhorro}</p>        
                </td>
                <td>
                    <p class="font-bold">${simulacion.tasa} %</p>        
                </td>
                <td>
                    <p class="font-bold">${simulacion.meses}</p>        
                </td>
                <td>
                    <p class="font-bold">${simulacion.valorCuotaMensual}</p>        
                </td>
                <td>
                    <p class="font-bold">${simulacion.totalGeneral}</p>        
                </td>
                <td>
                    <p class="font-bold">${simulacion.porCr}</p>        
                </td>
                <td>
                    <p class="font-bold">${simulacion.valorCredito}</p>       
                </td>                
            </tr>
        </tbody>`;

        });   

    });
});

function limpiarHTML() {
    while(tasasContainer.firstChild) {
        tasasContainer.removeChild(tasasContainer.firstChild);    
    }
}


function fnExcelReport() {
    var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';

    tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';

    tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';

    tab_text = tab_text + "<table border='1px'>";
    tab_text = tab_text + $('#tblData').html();
    tab_text = tab_text + '</table></body></html>';

    var data_type = 'data:application/vnd.ms-excel';
    
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([tab_text], {
                type: "application/csv;charset=utf-8;"
            });
            navigator.msSaveBlob(blob, 'Simulaciones.xls');
        }
    } else {
        $('#descarga').attr('href', data_type + ', ' + encodeURIComponent(tab_text));
        $('#descarga').attr('download', 'Simulaciones.xls');
    }
}