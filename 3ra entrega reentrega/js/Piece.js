class Piece extends Shape {

    constructor(x, y, context, radious, fill) {
        super(x, y, context);
        this.radious = radious;
        this.player = fill;
        this.image = this.createImage(fill);
        this.isPlayed = false;
    }

    createImage(fill) {
        let image = new Image();
        image.src = "../images/juego/" + fill + ".png";
        image.width = this.radious*2;
        image.height = this.radious*2;
        return image;
    }

    getPlayer() { return this.player;}
     
    getIsPlayed() {return this.isPlayed;}

    setIsPlayed(state) { this.isPlayed = state;}

    getRadious() {return this.radious;}

    setRadious(radious) {this.radious = radious;}

    draw() {
        this.cxt.save();
        this.cxt.beginPath();
        this.cxt.arc(this.x, this.y, this.radious, 0, 2 * Math.PI);
        this.cxt.closePath();
        this.cxt.clip();

        this.cxt.drawImage(this.image, this.x-this.radious, this.y-this.radious, this.image.width, this.image.height);
        if(this.highlight === true) {
            this.cxt.strokeStyle = this.highlightStyle;
            this.cxt.lineWidth = 10;
        }
        this.cxt.stroke();
        this.cxt.restore();
    }

    isPointInside(x, y) {
        let _x = this.x - x;
        let _y = this.y - y;
        return (Math.sqrt(_x * _x + _y * _y) < this.getRadious());
    }
}