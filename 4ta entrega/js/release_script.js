"use strict";

//------------------ Cards animation from right -------------------
function animateScroll (entries) {
    if(entries[0].isIntersecting) {
        let cards = animatedContainer.children;
        console.log(cards);
        let i = 0;
        let card = cards[i];
        let interval = setInterval(() => {
            card.classList.add("scrolling");
            card = cards[i++];
            if(card == null) clearInterval(interval);
        }, 700);
    }
}

let options = {
    root: null, //todo el viewport
    rootMargin: '0px', //por defecto, negativo dentro del vp | positivo fuera del vp
    threshold: 0.1 //cuándo se ejecuta el código, de 0.0 a 1.0 (ej. mitad del obj 0.5)
}

const observer = new IntersectionObserver(animateScroll, options);
const animatedContainer = document.querySelector(".cardsLanzamiento");

observer.observe(animatedContainer);
