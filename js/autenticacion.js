function ingresar() {
    var email = document.getElementById('email2').value;
    var contrasena = document.getElementById('contrasena2').value;
 
    firebase.auth().signInWithEmailAndPassword(email, contrasena)
        .then((user) => {
            // Signed in
            // ...
            console.log('sesión iniciada');
            window.location.href = "resultadossimulacion.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}
