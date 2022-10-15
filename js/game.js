"use strict";

/*----------------------- Share pop up ----------------------*/
let popUp = document.querySelector("#share-pop-up");
let openPopUpBtn = document.querySelector("#share-btn");
let popUpOverlay = document.querySelector("#overlay");

openPopUpBtn.addEventListener("click", () => {
    popUp.classList.toggle("visible");
    document.querySelector("#close-pop-up").addEventListener("click", () => {
        popUp.classList.remove("visible");
    });
});

document.querySelector("#comment-input").addEventListener("click", () => {
    console.log("hello");
    document.querySelector(".comment-btns").classList.toggle("visible");
    document.querySelector("#cancel-comment-btn").addEventListener("click", () => {
        document.querySelector(".comment-btns").classList.remove("visible");
    });
});
