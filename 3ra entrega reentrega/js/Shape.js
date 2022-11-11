class Shape {

    constructor (x, y, context) {
        this.x = x;
        this.y = y;
        this.cxt = context;
        this.highlight = false;
        this.highlightStyle = "yellow";
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

    setHighlight(highlight) {
        this.highlight = highlight;
    }

    setHighlightStyle(style) {
        this.highlightStyle = style;
    }

    isHighlighted() {
        return this.highlight;
    }

    isPointInside() {}

}