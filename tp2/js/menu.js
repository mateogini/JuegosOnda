//menu
function toggleMenu(){
    document.querySelector(".navbar").classList.toggle("show");
}

//menu perfil
function togglePerfil(){
    document.querySelector(".nav-perfil").classList.toggle("show");
}

function toggleCarrito(){
    document.querySelector(".desp-carrito").classList.toggle("show");
}

//carrusel
const carousel = document.querySelector(".carousel"),
 firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper1 i ");
let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
const showHideIcons = () => {

    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; 
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); 
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Simula la carga de la página
    let cargaActual = 0;
    const porcentajeCarga = document.getElementById("porcentaje-carga");
    const logoSpinner = document.querySelector(".logoSpinner");

    const simularCarga = setInterval(function () {
        
        cargaActual += 1;
       porcentajeCarga.innerText = cargaActual + "%";

        // Calcula la opacidad gradualmente
        const opacityValue = 1 - cargaActual / 100;

        // Aplica la opacidad a la imagen con la clase "logoSpinner"
        logoSpinner.style.opacity = opacityValue;

        if (cargaActual < 100) {
            document.querySelectorAll(".index, .header, .footerHome").forEach(function(element) {
                element.style.display = "none";
            });
        } else {
            clearInterval(simularCarga);
            // Oculta el spinner y el porcentaje de carga una vez que la carga esté completa
            document.querySelector(".spinner-container").style.display = "none";
            document.querySelector(".footerHome").style.display = "flex";
            document.querySelectorAll(".index, .header").forEach(function(element) {
                element.style.display = "block";
            });
        }
    }, 50);
});  



  document.addEventListener("DOMContentLoaded", function () {
    // Encuentra el botón "Ver más" y los comentarios adicionales
    const verMasBoton = document.getElementById("verMasComentarios");
    const comentariosAdicionales = document.querySelector(".comentarios-adicionales");
    const verMenosBoton = document.getElementById("verMenosComentarios");
    
    // Manejador de eventos para el clic en el botón "Ver más"
    verMasBoton.addEventListener("click", function () {
        // Muestra los comentarios adicionales
        comentariosAdicionales.style.display = "block";
        
        // Oculta el botón "Ver más" después de mostrar todos los comentarios
        verMasBoton.style.display = "none";
        verMenosBoton.style.display = "block";

    });

    verMenosBoton.addEventListener("click", function() {
    
        comentariosAdicionales.style.display = "none";
        verMasBoton.style.display = "block";
        verMenosBoton.style.display = "none";
    });
});

  




