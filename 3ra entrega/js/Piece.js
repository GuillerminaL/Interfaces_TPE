class Piece extends Shape {

    constructor(x, y, context, radious, image) {
        super(x, y, context);
        this.radious = radious;
        this.image = image;
    }

    getRadious() {return this.radious;}

    setRadious(radious) {this.radious = radious;}

    draw() {
        this.cxt.save();
        this.cxt.beginPath();
        this.cxt.arc(this.x, this.y, this.radious, 0, 2 * Math.PI);
        this.cxt.closePath();
        this.cxt.clip();

        this.cxt.drawImage(this.image, this.x-this.radious, this.y-this.radious, this.image.width, this.image.height);
        if(this.resaltado === true) {
            console.log("resaltado");
            this.cxt.strokeStyle = this.resaltadoStyle;
            this.cxt.lineWidth = 5;
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