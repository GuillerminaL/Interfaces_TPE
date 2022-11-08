class Shape {

    constructor (x, y, context) {
        this.x = x;
        this.y = y;
        this.cxt = context;
        this.resaltado = false;
        this.fillStyle = "grey";
        this.strokeStyle = "grey";
        this.resaltadoStyle = "red";
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    getPosition(x, y) {
        return {
            x: this.getX(),
            y: this.getY()
        }
    }

    setFill(fill) {this.fill = fill;}

    getFill() { return this.fill;}

    getX() { return this.x;}

    getY() { return this.y;}

    getCxt() {return this.cxt;}

    setResaltado(resaltado) {
        this.resaltado = resaltado;
    }

    isPointInside() {}

}