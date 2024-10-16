document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formLogin");
    const mensajeBienvenida = document.getElementById("mensajeBienvenida");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        mensajeBienvenida.style.display = "flex";
        document.getElementById("formRegistro").style.display= "none";
        document.querySelector("footer").style.display="none"
        document.querySelector("header").style.display="none"
        setTimeout(function () {
            window.location.href = "index.html";
        }, 3000);
    });
});