"use strict";

//------------------ Cards animation from right -------------------
/**
 * Animate scroll: fija un intervalo para regular la aparición y animación de las cards, una a una. 
 *                 Es llamada por el observador cuando la mitad de la sección entró en el viewport
 * 
 * @param {*} entries los elementos observados por el observador
 */

let cards = [];
function animateScroll (entries) {
    if(entries[0].isIntersecting) {    
        cards = animatedContainer.children;
        let i = 0;
        let card = cards[i];
        let interval = setInterval(() => {
            card.classList.remove("disappearing");
            card.classList.add("appearing");
            card = cards[i++];
            if(card == null) clearInterval(interval);
        }, 700);  
    } else {
        if(cards.length > 0) {
            let i = cards.length-1;
            let card = cards[i];
            let interval = setInterval(() => {
                card.classList.add("disappearing");
                card = cards[i--];
                if(card == null) clearInterval(interval);
            }, 300);
        }
    }
}

let options = {
    root: null, //todo el viewport
    rootMargin: '0px', //por defecto, negativo dentro del vp | positivo fuera del vp
    threshold: 0.5 //cuándo se ejecuta el código, de 0.0 a 1.0 (ej. mitad del obj 0.5)
}

const animatedContainerObserver = new IntersectionObserver(animateScroll, options);
const animatedContainer = document.querySelector(".cardsLanzamiento");

animatedContainerObserver.observe(animatedContainer);


//------------------ Caracter carousel titles animation ---------------------


