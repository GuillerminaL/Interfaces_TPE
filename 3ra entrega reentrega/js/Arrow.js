class Arrow extends Shape {

    constructor (fromx, fromy, cxt, tox, toy, arrowWidth, color) {
        super(fromx, fromy, cxt);
        this.tox = tox;
        this.toy = toy;
        this.color = color;
        this.arrowWidth = arrowWidth;
    }

    draw(){
        //variables to be used when creating the arrow
        let headlen = 10;
        let angle = Math.atan2(this.toy-this.y,this.tox-this.x);
     
        this.cxt.save();
        if(this.highlight === true) {
            this.cxt.strokeStyle = this.highlightStyle;
        } else {
            this.cxt.strokeStyle = this.color;
        }
     
        //starting path of the arrow from the start square to the end square
        //and drawing the stroke
        this.cxt.beginPath();
        this.cxt.moveTo(this.x, this.y);
        this.cxt.lineTo(this.tox, this.toy);
        this.cxt.lineWidth = this.arrowWidth;
        this.cxt.stroke();
     
        //starting a new path from the head of the arrow to one of the sides of
        //the point
        this.cxt.beginPath();
        this.cxt.moveTo(this.tox, this.toy);
        this.cxt.lineTo(this.tox-headlen*Math.cos(angle-Math.PI/7),
                        this.toy-headlen*Math.sin(angle-Math.PI/7));
     
        //path from the side point of the arrow, to the other side point
        this.cxt.lineTo(this.tox-headlen*Math.cos(angle+Math.PI/7),
                        this.toy-headlen*Math.sin(angle+Math.PI/7));
     
        //path from the side point back to the tip of the arrow, and then
        //again to the opposite side point
        this.cxt.lineTo(this.tox, this.toy);
        this.cxt.lineTo(this.tox-headlen*Math.cos(angle-Math.PI/7),
                        this.toy-headlen*Math.sin(angle-Math.PI/7));
     
        //draws the paths created above
        this.cxt.stroke();
        this.cxt.restore();
    }
}