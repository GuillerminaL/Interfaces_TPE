"use strict";

//------------------ Cards animation from right -------------------

let options = {
    root: null, //todo el viewport
    rootMargin: '0px', //por defecto, negativo dentro del vp | positivo fuera del vp
    threshold: 0.5 //cuándo se ejecuta el código, de 0.0 a 1.0 (ej. mitad del obj 0.5)
}
const cards = document.querySelectorAll(".cardLanzamiento");
const animatedContainerObserver = new IntersectionObserver(animateScroll, options);
const animatedContainer = document.querySelector(".cardsLanzamiento");

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
            if(card == null) {
                clearInterval(interval);
                cardsAreVisible = true;  
            } 
        }, 300);
    } else {
        if(cardsAreVisible) {
            let i = cards.length-1;
            let card = cards[i];
            let interval = setInterval(() => {
                card.classList.add("disappearing");
                card = cards[i--];
                if(card == null) {
                    clearInterval(interval);
                    cardsAreVisible = false;
                }
            }, 300);
        }
    }
}

animatedContainerObserver.observe(animatedContainer);


//------------------ Caracter carousel titles animation ---------------------
const caractersCarObserver = new IntersectionObserver(animateTitles, options);
const caractersCarousel = document.querySelector("#caracters-carousel");
const caracterNames = document.querySelectorAll("div.personaje h2");
const caracterAbilities = document.querySelectorAll("div.personaje p");

let textsAreAnimated = false;
function animateTitles (entries) {
    if(entries[0].isIntersecting) { 
        caracterNames.forEach(name => { name.classList.add("animated"); });
        caracterAbilities.forEach(ability => { ability.classList.add("animated"); });
    } else {
        caracterNames.forEach(name => { name.classList.remove("animated"); });
        caracterAbilities.forEach(ability => { ability.classList.remove("animated"); });
    }
}

caractersCarObserver.observe(caractersCarousel);


//------------------ Story columns scroll animation --------------------- 
let imgRoute = '../images/lanzamiento/story/img';
let imgType = '.jpg';
const img = document.querySelector("div#story-img img");

const storySection = document.querySelector("section.historia");
const storySectionTitle = document.querySelector("section.historia h2");
const storyObserver = new IntersectionObserver(showStory, {root: null, rootMargin: '0px', threshold: 0.5 });
const paragraphs = document.querySelectorAll("#story-right-wrapper p");

/**
 * Al aparecer el título de la sección en el viewport, 
 * agrega un observador a cada párrafo para que a medida que entren al viewport
 * se haga visible junto con la imagen correspondiente 
 */

function showStory(entries) {
    if(entries[0].isIntersecting) { 
            paragraphs.forEach((p) => {
                const paragraphObserver = new IntersectionObserver(function(entries){
                    if(entries[0].isIntersecting) {  
                        img.src = imgRoute + p.getAttribute("data") + imgType;
                        if(img.classList.contains("invisible")) img.classList.remove("invisible");
                        if(p.classList.contains("invisible")) p.classList.remove("invisible");
                        img.classList.add("visible");
                        p.classList.add("visible");
                    } else {
                        if(p.classList.contains("visible")) p.classList.add("invisible");
                        if(img.classList.contains("visible")) img.classList.add("invisible");
                    }
                }, {threshold: [0.5]});
                paragraphObserver.observe(p);
            });
    }
}

storyObserver.observe(storySectionTitle);

//-------------------------- Parallax ----------------------------------
const body = document.querySelector("body");
const releaseTitle = document.querySelector(".title");
const releaseSection = document.querySelector("section#release");

const releaseObserver = new IntersectionObserver(function(entries) {
    if(!entries[0].isIntersecting) {
        releaseTitle.classList.remove("visible");
        body.classList.remove('stop-scrolling');
    } 
}, {threshold: [1]});


/**
 * Al cargarse la página, deshabilita el scroll y escucha un click o mouse move 
 * para mostrar el título del release, luego libera el scroll
 */

function showTitle () {

    body.classList.add('stop-scrolling');

    releaseSection.addEventListener("click", () => {
        if(!releaseTitle.classList.contains("visible")) {
            releaseTitle.classList.add("visible");
            body.classList.remove('stop-scrolling');
        } else {
            releaseTitle.classList.remove("visible");
        }
    });

    releaseSection.addEventListener("mousemove", () => {
        if(!releaseTitle.classList.contains("visible")) {
            releaseTitle.classList.add("visible");
            body.classList.remove('stop-scrolling');
        }
    });
    
    releaseObserver.observe(releaseSection);

}

window.onload = showTitle();
