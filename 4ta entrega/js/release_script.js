"use strict";

//------------------ Cards animation from right -------------------
/**
 * Animate scroll: fija un intervalo para regular la aparición y animación de las cards, una a una. 
 *                 Es llamada por el observador cuando la mitad de la sección entró en el viewport
 * 
 * @param {*} entries los elementos observados por el observador
 */

let cardsAreVisible = false;
function animateScroll (entries) {
    if(entries[0].isIntersecting) {    
        let i = 0;
        let card = cards[i];
        let interval = setInterval(() => {
            card.classList.remove("disappearing");
            card.classList.add("appearing");
            card = cards[i++];
            if(card == null) clearInterval(interval);
        }, 500);
        cardsAreVisible = true;  
    } else {
        if(cardsAreVisible) {
            let i = cards.length-1;
            let card = cards[i];
            let interval = setInterval(() => {
                card.classList.add("disappearing");
                card = cards[i--];
                if(card == null) clearInterval(interval);
            }, 300);
            cardsAreVisible = false;
        }
    }
}

let options = {
    root: null, //todo el viewport
    rootMargin: '0px', //por defecto, negativo dentro del vp | positivo fuera del vp
    threshold: 0.5 //cuándo se ejecuta el código, de 0.0 a 1.0 (ej. mitad del obj 0.5)
}

const cards = document.querySelectorAll(".cardLanzamiento");
const animatedContainerObserver = new IntersectionObserver(animateScroll, options);
const animatedContainer = document.querySelector(".cardsLanzamiento");
animatedContainerObserver.observe(animatedContainer);


//------------------ Caracter carousel titles animation ---------------------
let textsAreAnimated = false;
function animateTitles (entries) {
    if(entries[0].isIntersecting) { 
        caracterNames.forEach(name => {
            name.classList.add("animated");
        });
        caracterAbilities.forEach(ability => {
            ability.classList.add("animated");
        });
    } else {
        caracterNames.forEach(name => {
            name.classList.remove("animated");
        });
        caracterAbilities.forEach(ability => {
            ability.classList.remove("animated");
        });
    }
}

const caractersCarObserver = new IntersectionObserver(animateTitles, options);
const caractersCarousel = document.querySelector("#caracters-carousel");
caractersCarObserver.observe(caractersCarousel);

const caracterNames = document.querySelectorAll("div.personaje h2");
const caracterAbilities = document.querySelectorAll("div.personaje p");
