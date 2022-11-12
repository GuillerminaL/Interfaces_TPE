class Spot extends Shape {

    constructor(x, y, context, width, height) {
        super(x, y, context);
        this.width = width;
        this.height = height;
        this.piece = null;
        this.free = true;
        this.image = this.createImage();
    }

    createImage() {
        let image = new Image();
        image.src = "../images/juego/backgroundspot.png";
        image.width = this.width;
        image.height = this.height;
        return image;
    }

    isFree() {return this.free;}

    setIsFree(free) { this.free = free;}

    setPiece(piece) { this.piece = piece;}
    
    getPiece() { return this.piece;}

    setWidth(width) {this.width = width;}

    getWidth() {return this.width;}

    setHeight(height) {this.height = height;}

    getHeight() {return this.height;}

    draw() {
        if(this.highlight === true) {
            this.cxt.strokeStyle = this.highlightStyle;
            this.cxt.lineWidth = 5;
        }
        // this.ctx.globalAlpha = 0.2;
        this.cxt.fillStyle = "rgba(80, 76, 76, 0.5)";
        this.cxt.fillRect(this.x, this.y, this.width, this.height);
        // this.cxt.strokeRect(this.x, this.y, this.width, this.height);
    }

    isPointInside(x, y) {
        return (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height);
    }


}