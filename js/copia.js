const db = firebase.firestore();

const simulacionContainer = document.getElementById("simulacion-container");

db.collection("simuladorsuenos").orderBy("date", "desc").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
       console.log("Id",doc.id);
       console.log("Fecha",doc.data());
    });
});

