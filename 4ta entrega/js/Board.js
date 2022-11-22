class Board {

    margin = 5;
    ygap = 2;
    xgap = 2;
    spotSize;

    constructor(mode, player1, player2) {
        this.mode = mode;
        this.player1 = player1;
        this.player2 = player2;
        this.context = CANVAS.getContext("2d");
        this.canvash = CANVAS.height;
        this.canvasw = CANVAS.width;

        this.qplaces = mode.columns*mode.rows;
        this.spotSize = this.canvash/ (mode.rows +1) - this.ygap;

        let xBoardStart = (this.canvasw/2) - (this.mode.columns/2)*(this.spotSize+this.xgap);
        let arrowW = this.spotSize/4;
        let arrowH = this.spotSize/2;
        let arrowsRowStart = xBoardStart + this.spotSize/2;
        this.arrows = this.createArrows(arrowsRowStart, arrowW);
        this.spots = this.createSpots(xBoardStart, arrowH+this.margin); //this.spots = [columna[spots], columna[spots]...]
        this.pieces = {
            player1 : {
                "name": player1,
                "pieces": this.createPieces(player1, this.canvasw/8),
            }, 
            player2 : {
                "name": player2,
                "pieces": this.createPieces(player2, this.canvasw-this.canvasw/8)
            }
        }
        
        this.draw();
    }

    getContext() {return this.context;}

    getCanvasW() {return this.canvasw;}

    getCanvasH() {return this.canvash;}

    getSpotSize() {return this.spotSize;}

    draw() {
        this.context.clearRect(0, 0, CANVAS.width, CANVAS.height);
        for(const arrow of this.arrows) arrow.draw();
        for(const row of this.spots) { 
            for(const spot of row) spot.draw();
        }
        for(const piece of this.pieces.player1.pieces) piece.draw();
        for(const piece of this.pieces.player2.pieces) piece.draw(); 
    }

    //start: Indica en qué lugar del canvas empieza 
    createSpots(xstart, ystart) {
        let spots = [];
        let posx = xstart;
        for (let col = 0; col < this.mode.columns; col++) {
            let column = [];
            let posy = ystart;
            for (let row = 0; row < this.mode.rows; row++) {
                let spot = new Spot(posx, posy, this.context, this.spotSize, this.spotSize);
                column.push(spot);
                posy += this.spotSize + this.ygap;
            }
            spots.push(column);
            posx += this.spotSize + this.xgap;
        }
        return spots;
    }

    createArrows(start, width) {
        let arrowsRow = [];
         //drawArrow(ctx, 100, 10, 100, 50, 10, 'red');
        for (let col = 0; col < this.mode.columns; col++) {
            //  arrow = new Arrow(fromx,  fromy,        ctx,      tox,  toy, arrowWidth, color)
            let arrow = new Arrow(start, this.ygap, this.context, start, this.spotSize/2, width, "grey");
            arrowsRow.push(arrow);
            start += (this.spotSize + this.ygap);
        }
        return arrowsRow;
    }

    createPieces(player, startx) {
        let pieces = [];
        let radious = this.spotSize/2;
        let x = startx;
        let y = this.canvash - this.spotSize;
        for (let i = 0; i < this.mode.pieces; i++) {
            let piece = new Piece(x, y, this.context, radious, player);
            y -= this.margin;
            pieces.push(piece);
        }
        return pieces;
    }  

    findSelectedElement(x, y) { 
        for(const el of this.pieces.player1.pieces) {
            if(el.isPointInside(x, y)) return el;
        }
        for(const el of this.pieces.player2.pieces) {
            if(el.isPointInside(x, y)) return el;
        }
    }

    highlightColumn(index, hgl) {
        for(const arrow of this.arrows) {
            arrow.setHighlight(false);
        }
        if(hgl) this.arrows[index].setHighlight(true);
    }

    findSelectedColumn(x, y) {
        for(const column of this.spots) {
            for (const spot of column) {
                if (spot.isPointInside(x, y)) {
                    return this.spots.indexOf(column);  
                }
            }
        }
    }

    isFull(columnIndex) {
        let column = this.spots[columnIndex];
        for(const spot of column) {
            if(spot.isFree()) {
                return false;
            }
        }
        return true;
    }

    settlePiece(interval, spot, piece, columnIndex) {
        clearInterval(interval);
        interval = null;
        spot.setIsFree(false);
        spot.setPiece(piece);
        piece.setHighlight(false);
        this.highlightColumn(columnIndex, false);
        this.draw();
    }

    played_pieces = 0;

    savePlay(piece, columnIndex) {
        if(!piece.getIsPlayed()) {
            piece.setIsPlayed(true);
            let column = this.spots[columnIndex];
            let row = 0;
            if ( !column[row].isFree() ) {    
                return false;        
            }
            let interval = setInterval(() => {
                    let spot = column[row];
        
                    if(spot.isFree()) {
                        piece.setPosition(spot.getX()+this.spotSize/2, spot.getY()+this.spotSize/2);
                        this.draw();
                        if(row < column.length - 1) {
                            spot = column[row++];
                        } 
                        else {
                            if ( row == column.length - 1 ) { // Llego al ultimo spot (fila)
                                spot = column[row];
                                this.settlePiece(interval, spot, piece, columnIndex);
                                this.played_pieces++;
                                return true;
                            }
                        } 
                    } else {
                        if ( row > 0 ) {
                            spot = column[row-1];
                            piece.setPosition(spot.getX()+this.spotSize/2, spot.getY()+this.spotSize/2);
                            this.settlePiece(interval, spot, piece, columnIndex);
                            this.played_pieces++;
                            return true;
                        }
                    }               
            }, 100);
        }
    }
        

    /*--------------------- Checks -----------------*/
    winner = null;

    getWinner() { return this.winner;}

    showWinnerPlay(line) {
        for(const piece of line) {
            piece.setHighlightStyle("green");
            piece.setHighlight(true);
        }
        this.draw();
    }

    getSpotPosition(piece, column) {
        let currentSpot = null;
        for ( const spot of this.spots[column]) {
            if ( spot.isPointInside(piece.getX(), piece.getY())) {
                currentSpot = spot;
                break;
            }
        }
        return currentSpot;
    }

    checkDiagonalUpRight(player, spot, column) {
        const line = [];
        let col_index = column + 1;
        let row_index = this.spots[column].indexOf(spot) - 1;
        while ( row_index >= 0 && col_index < this.mode.columns ) {
            let next_spot = this.spots[col_index][row_index];
            const currentPiece = next_spot.getPiece();
            if ( currentPiece != null && currentPiece.getPlayer() === player ) {
                line.push(currentPiece);
                row_index--; 
                col_index++;
            }
            else {
                break;
            }
        }
        return line;
    }

    checkDiagonalDownLeft(player, spot, column) {
        const line = [];
        let col_index = column - 1;
        let row_index = this.spots[column].indexOf(spot) + 1;
        while ( row_index < this.mode.rows && col_index >= 0 ) {
            let next_spot = this.spots[col_index][row_index];
            const currentPiece = next_spot.getPiece();
            if ( currentPiece != null && currentPiece.getPlayer() === player ) {
                line.push(currentPiece);
                row_index++; 
                col_index--;
            }
            else {
                break;
            }
        }
        return line;
    }

    checkDiagonalUpLeft(player, spot, column) {
        const line = [];
        let col_index = column - 1;
        let row_index = this.spots[column].indexOf(spot) - 1;
        while ( row_index >= 0 && col_index >= 0 ) {
            let next_spot = this.spots[col_index][row_index];
            const currentPiece = next_spot.getPiece();
            if ( currentPiece != null && currentPiece.getPlayer() === player ) {
                line.push(currentPiece);
                row_index--; 
                col_index--;
            }
            else {
                break;
            }
        }
        return line;
    }

    checkDiagonalDownRight(player, spot, column){
        const line = [];
        let col_index = column + 1;
        let row_index = this.spots[column].indexOf(spot) + 1;
        while ( row_index < this.mode.rows && col_index < this.mode.columns) {
            let next_spot = this.spots[col_index][row_index];
            const currentPiece = next_spot.getPiece();
            if ( currentPiece != null && currentPiece.getPlayer() === player ) {
                line.push(currentPiece);
                row_index++; 
                col_index++;
            }
            else {
                break;
            }
        }
        return line;
    }

    checkSecondDiagonal(piece, player, spot, column) {
        let line = this.checkDiagonalDownRight(player, spot, column);
        if(line.length != this.mode.line-1) {
            let scnd_line = this.checkDiagonalUpLeft(player, spot, column);
            if(line.length + scnd_line.length != this.mode.line-1) {
                return null;
            } 
            for(const line_piece of scnd_line) line.push(line_piece);
        }
        line.push(piece);
        this.winner = player;
        return line;
    }

    checkFirstDiagonal(piece, player, spot, column) {
        let line = this.checkDiagonalDownLeft(player, spot, column);
        if(line.length != this.mode.line-1) {
            let scnd_line = this.checkDiagonalUpRight(player, spot, column);
            if(line.length + scnd_line.length != this.mode.line-1) {
                return null;
            } 
            for(const line_piece of scnd_line) line.push(line_piece);
        }
        line.push(piece);
        this.winner = player;
        return line;
    }

    checkDiagonals(piece, column) {
        let spot = this.getSpotPosition(piece, column);
        let line = [];
        let player = spot.getPiece().getPlayer();
        return (this.checkFirstDiagonal(piece, player, spot, column) || this.checkSecondDiagonal(piece, player, spot, column));
    }

    checkRows() { 
        for (let row = this.mode.rows -1; row >= 0; row--) {
            let line = [];
            let player;
            for (const column of this.spots) {
                let spot = column[row];
                
                if(!spot.isFree()) {
                    let piece = spot.getPiece();
                    let piece_player = piece.getPlayer();
                    if(player == null) player = piece_player;
                    if(player == piece_player) {
                        line.push(piece);
                        if(line.length == this.mode.line) { //Hizo línea...
                            this.winner = player;
                            return line;
                        } 
                    } else {
                        player = piece_player;
                        line = [];
                        line.push(piece);
                    }
                } else {
                    player = null;
                    line = [];
                }
            }   
        }
        return null;
    }

    checkColumns() {
        for(const column of this.spots) {
            let line = [];
            let player;
            for (let i = column.length-1; i >= 0 ; i--) {
                const spot = column[i];
                if(!spot.isFree()) {
                    let piece = spot.getPiece();
                    let piece_player = piece.getPlayer();
                    if(player == null) player = piece_player;
                    if(player == piece_player) {
                        line.push(piece);
                        if(line.length == this.mode.line) {
                            this.winner = player;
                            return line;
                        } 
                    } else {
                        player = piece_player;
                        line = [];
                        line.push(piece);
                    }
                } 
            }
        }
        return null;
    }

    //A partir de l cuarta ficha, controlar...
    checkWinner(piece, column) {
        //Si se jugaron las piezas necesarias para hacer línea, chequea. Si no, retorna null...
        if(this.played_pieces >= (this.mode.line*2) - 1) {
            let line = [];
            line = this.checkColumns();
            if(line == null) line = this.checkRows();
            if(line == null) line = this.checkDiagonals(piece, column);
            if(line != null && this.winner != null) {
                this.showWinnerPlay(line);
                return this.winner;
            }
        }
        return this.winner;
    }    
        
}
