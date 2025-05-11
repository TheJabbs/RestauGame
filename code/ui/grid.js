class Grid extends Sprite {
    constructor(rows, cols, cellSize, pArrayOfSprites) {
        super();
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.createGrid(pArrayOfSprites);
    }

    createGrid(pArrayOfSprites) {
        let tableNumber =0

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (col === 0 || col === this.cols - 1 || row === 0 || row === this.rows - 1) {
                    let cell = new Obstacle(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
                    pArrayOfSprites.get("obstacle").push(cell);
                } else if (row === this.rows - 4) {
                    if (col < 3 || col >= this.cols - 4) {
                        let cell = new Obstacle(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
                        pArrayOfSprites.get("obstacle").push(cell);
                    } else if (col % 3 === 0) {
                        let color = tableNumber % 2 ? 'blue' : 'green'
                        let cell = new Table(col * this.cellSize, row * this.cellSize, this.cellSize * 3, this.cellSize, color, null, tableNumber);
                        pArrayOfSprites.get("obstacle").push(cell);
                        tableNumber++
                    }
                } else {
                    let cell = new Cell(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
                    pArrayOfSprites.get("ui").push(cell);
                }
            }
        }


    }
}