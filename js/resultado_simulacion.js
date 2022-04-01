const db = firebase.firestore();

const simulacionContainer = document.getElementById("simulacion-container");

//const getTasks = () => db.collection("tasks").get(); 
const onGetTasas = (callback) => db.collection("simuladorsuenos").onSnapshot(callback);    
const deleteTasas = (id) => db.collection("simuladorsuenos").doc(id).delete();    
const getTasas = (id) => db.collection("simuladorsuenos").doc(id).get();    
const updateTasas = (id, updatedTasas) => db.collection('simuladorsuenos').doc(id).update(updatedTasas);


window.addEventListener("DOMContentLoaded", async(e) => {    

    onGetTasas((querySnapshot) => {    
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
    





