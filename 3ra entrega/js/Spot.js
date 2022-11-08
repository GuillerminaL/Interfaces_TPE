class Spot extends Shape {

    constructor(x, y, context, width, height) {
        super(x, y, context);
        this.width = width;
        this.height = height;
    }

    setWidth(width) {this.width = width;}

    getWidth() {return this.width;}

    setHeight(height) {this.height = height;}

    getHeight() {return this.height;}

    draw() {
        if(this.resaltado === true) {
            this.cxt.strokeStyle = this.resaltadoStyle;
            this.cxt.lineWidth = 5;
        }
        this.cxt.strokeRect(this.x, this.y, this.width, this.height);
    }

    isPointInside(x, y) {
        return (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height);
    }


}