"use strict";

/*------------------------- Game functionality ----------------------------*/
let selected_mode = "friendly";
let player1_selection;
let player2_selection;


/*--------- Pieces buttons settings -------*/
function showErrorMsg(msg) {
    //Muestra el mensaje...
    let section = document.querySelector(".piece-settings");
    let el = document.createElement("h5");
    el.innerHTML = msg;
    section.appendChild(el);

    setTimeout(() => {
        //Elimina el mensaje...
        section.removeChild(el);
    }, 2000);
}

function selectPiece(selectedBtn, btnsContainer, player) {
    //Por cada botón, quita la selección...
    for (const btn of btnsContainer.children) {
        btn.classList.remove("piece-settings-btn-active");
    }
    //Selecciona el correcto...
    selectedBtn.classList.add("piece-settings-btn-active");
    //Guarda los valores...
    if(player == 1) player1_selection = selectedBtn.value;
    else player2_selection = selectedBtn.value;
    //Si coinciden, muestra el error...
    if(player1_selection == player2_selection) {
        showErrorMsg("Selecciona una casa distinta a la de tu oponente!");
         //Des-selecciona los botones...
        for (const btn of btnsContainer.children) {
            btn.classList.remove("piece-settings-btn-active");
        }
        //Des-guarda los valores...
        if(player == 1) player1_selection = null;
        else player2_selection = null;
    }
}

//Setea los eventos que permiten seleccionar las fichas, chequeando que sean difeentes entre sí, y el botón de jugar...
function setFormBtnsEvents() {
    let btnsContainer = document.querySelector("#player-1-piece-btns");
    for (const btn of btnsContainer.children) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            selectPiece(btn, btnsContainer, 1)});
    }

    let ScndBtnsContainer = document.querySelector("#player-2-piece-btns");
    for (const btn of ScndBtnsContainer.children) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            selectPiece(btn, ScndBtnsContainer, 2)});
    }

    let radioInputs = document.querySelectorAll("input");
    radioInputs.forEach((input) => {
        input.addEventListener("click", () => {
            selected_mode = input.value;
        });
    });

    let startGameBtn = document.querySelector("#play-settings-btn");
    startGameBtn.addEventListener("click", play);
}


/*------------------- Mouse event functions --------------------*/



/*-----------------*/
let board = null;
let current_player;
let isDragging = false;
let selectedPiece;

function onMouseUp(e) {
    if(!isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    isDragging = false;
}

function onMouseOut(e) {
    if(!isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    isDragging = false;
}

function onMouseMove(e) {
    if(!isDragging) return;

    e.preventDefault();
    e.stopPropagation();
    if(isDragging && selectedPiece != null) {
        console.log("selected ", e.layerX, e.layerY);
        selectedPiece.setPosition(e.offsetX, e.offsetY);
        board.draw();
    }
}

function onMouseDown(e) {
    e.preventDefault();
    isDragging = true;
    if(selectedPiece != null) {
        selectedPiece.setResaltado = false;
        selectedPiece = null;
    }
    console.log(e);
    let clickedPiece = board.findSelectedElement(e.offsetX, e.offsetY);
    console.log(clickedPiece);
    if(clickedPiece != null) {
        clickedPiece.setResaltado = true;
        selectedPiece = clickedPiece;
        console.log(selectedPiece);
    }
}


function setGameEvents() {
    //Set events...
    CANVAS.addEventListener("mousedown",  (e) => {onMouseDown(e);});
    CANVAS.addEventListener("mouseup",  (e) => {onMouseUp(e);});
    CANVAS.addEventListener("mouseout",  (e) => {onMouseOut(e);});
    CANVAS.addEventListener("mousemove",  (e) => {onMouseMove(e);});
}


/*------------------------- Start game settings ----------------------------*/
let modes = {
    "friendly": {
        "line": 4,
        "columns": 7,
        "rows": 6,
        "pieces": 21
    },
    "brave": {
        "line": 5,
        "columns": 8,
        "rows": 7,
        "pieces": 32
    },
    "clever": {
        "line": 6,
        "columns": 9,
        "rows": 8,
        "pieces": 45
    },
    "ambicious": {
        "line": 7,
        "columns": 10,
        "rows": 9,
        "pieces": 60
    }
}

const settingsView = document.querySelector("#game-settings");
const gameBox = document.querySelector("#game-box");

let restartBtn = document.querySelector("#restart-btn");
restartBtn.addEventListener("click", () => {
    play(true);
});

let closeBtn = document.querySelector("#close-btn");
closeBtn.addEventListener("click", () => {
    location.href = "../html/cuatroEnLinea.html";
});


function checkSettings() {
    //Chequea que se hayan seleccionado las fichas de los jugadores...
    if(player1 == null || player2 == null) {
        showErrorMsg("Debes seleccionar un oponente!");
        return false;
    }    
}

const CANVAS = document.querySelector("#game-box-canvas");


function play(restart = null) {
    if(restart || checkSettings()) {
        //Change view and refresh timer...
        settingsView.style.display = "none";
        gameBox.classList.add("game-box");

        //Create timer, board, and players...
        let timer = new Timer(document.querySelector(".timer"));
        board = new Board(modes[selected_mode], player1_selection, player2_selection);
        
        setGameEvents();   
    }

}



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
    document.querySelector(".comment-btns").classList.toggle("visible");
    document.querySelector("#cancel-comment-btn").addEventListener("click", () => {
        document.querySelector(".comment-btns").classList.remove("visible");
    });
});



/*------------------------  Onload: Change view -------------------------------*/
function load() {
    let desktopView = document.querySelector("#desktop-first-view");
    let mobileView = document.querySelector("#mobile-first-view");
    if(window.innerWidth > 600) {
        mobileView.style.display = "none";
        desktopView.style.display = "flex";
        setFormBtnsEvents();
    } else {
        desktopView.style.display = "none";
        mobileView.style.display = "flex";
    }   
}

window.onload = load();

