class Board {

    ygap = 5;
    xgap = 10;
    spotSize;

    constructor(mode, house1, house2) {
        this.mode = mode;
        this.house1 = house1;
        this.house2 = house2;
        this.context = CANVAS.getContext("2d");
        this.canvash = CANVAS.height;
        this.canvasw = CANVAS.width;

        this.qplaces = mode.columns*mode.rows;
        this.spotSize = this.canvash/mode.rows - this.ygap;

        this.spots = this.createSpots(this.canvasw/4);
        this.house1Pieces = this.createPieces(house1, this.canvasw/8);
        this.house2Pieces = this.createPieces(house2, this.canvasw-this.canvasw/8);

        this.draw();
    }

    getContext() {return this.context;}

    getCanvasW() {return this.canvasw;}

    getCanvasH() {return this.canvash;}

    getSpotSize() {return this.spotSize;}

    draw() {
        this.context.clearRect(0, 0, CANVAS.width, CANVAS.height);
        for(const row of this.spots) { 
            for(const spot of row) spot.draw();
        }
        for(const piece of this.house1Pieces) piece.draw();
        for(const piece of this.house2Pieces) piece.draw(); 
    }

    //Indicar que empiece a mitad x = canvasw/3
    createSpots(startx) {
        let spots = [];
        let posy = this.ygap;
        for (let row = 0; row < this.mode.rows; row++) {
            let r = [];
            let posx = startx;
            for (let col = 0; col < this.mode.columns; col++) {
                let spot = new Spot(posx, posy, this.context, this.spotSize, this.spotSize);
                r.push(spot);
                posx += this.spotSize + this.xgap;
            }
            spots.push(r);
            posy += this.spotSize + this.ygap;
        }
        return spots;
    }

    createImage(house) {
        let image = new Image();
        image.src = "../images/juego/" + house + ".png";
        image.width = this.spotSize;
        image.height = this.spotSize;
        return image;
    }

    createPieces(house, startx) {
        let pieces = [];
        let image = this.createImage(house);
        let radious = this.spotSize/2;
        let x = startx;
        let y = this.canvash - this.spotSize;
        for (let i = 0; i < this.mode.pieces; i++) {
            let piece = new Piece(x, y, this.context, radious, image);
            y-= this.ygap;
            pieces.push(piece);
        }
        return pieces;
    }  

    findSelectedElement(x, y) { 
        for(const el of this.house1Pieces) {
            if(el.isPointInside(x, y)) {
                console.log("si" + el);
                return el;
            } 
        }
        for(const el of this.house2Pieces) {
            if(el.isPointInside(x, y)) {
                console.log("si" + el);
                return el;
            } 
        }
    }
        
}