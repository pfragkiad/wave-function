
// const GridMode = {
//     MAZE:1,
//     WAVE_COLLAPSE:2
// }

class Grid {
    constructor(cols, rows, tilesInfo) {
        this.cols = cols
        this.rows = rows

        this.cellWidth = width / cols
        this.cellHeight = height / rows

        this.cells = []
        for (let j = 0; j < rows; j++)
            for (let i = 0; i < cols; i++)
                this.cells.push(new Cell(i, j))

        //build tiles if images is passed
        this.tilesInfo = tilesInfo
        this.tiles = Object.keys(tilesInfo.images).map(k => new Tile(k, tilesInfo))
        //this.tiles = Object.keys(tilesInfo.images).map(k=> new Tile(tilesInfo.images[k],k,tilesInfo.midpoints))
        //this.tiles = images.map(img => new Tile(img, midpoints))


        this.isFinished = false

        // this.isMaze = false
        // if (this.isMaze) {
        //     //initialize (maze)
        //     let firstCell = this.cells[0]
        //     firstCell.assignedTile = this.tiles[2]
        //     firstCell.visited = true
        //     this.visitedCells = [firstCell] //stack
        // }
        
        this.reset()

    }


    static restartIfCrash = false

    reset() {
        this.cells.forEach(c => {
            c.reset()
            if (this.tiles)
                c.setTileOptions(this.tiles)
        })
        this.isFinished = false
    }

    show() {
        this.cells.forEach(c => {
            if (c.assignedTile !== undefined) {
                // console.log(c.i * this.cellWidth,
                //     c.j * this.cellHeight,
                //     this.cellWidth,
                //     this.cellHeight)

                c.assignedTile.show(
                    c.i * this.cellWidth,
                    c.j * this.cellHeight,
                    this.cellWidth,
                    this.cellHeight);
            }
        })
    }

    // getCellIndex(i, j) {
    //     return i + j * this.rows
    // }

    getCell(i, j) {
        return this.cells[i + j * this.rows]
    }

    getUnvisitedNeighbors(c) {
        let neighbors = [], cell

        //let cellIndex = this.getCellIndex(c.i - 1, c.j)
        cell = this.getCell(c.i - 1, c.j)
        if (c.i > 0 && !cell.visited) neighbors.push(cell)

        cell = this.getCell(c.i + 1, c.j)
        if (c.i < this.cols - 1 && !cell.visited) neighbors.push(cell)

        cell = this.getCell(c.i, c.j - 1)
        if (c.j > 0 && !cell.visited) neighbors.push(cell)

        cell = this.getCell(c.i, c.j + 1)
        if (c.j < this.rows - 1 && !cell.visited) neighbors.push(cell)

        return neighbors
    }

    proceedWave() {
        if (this.isFinished) return;

        let nonVisitedCells = this.cells.filter(c => !c.visited)
        if (nonVisitedCells.length == 0) {
            console.log("All tiles have been filled.")
            this.isFinished = true; return;
        }

        //select random cell with minimum entropy
        let minimumEntropy = Math.min(...nonVisitedCells.map(c => c.entropy()));

        //get random cell with minimum entropy that is not collapsed/visited
        this.currentCell = random(nonVisitedCells.filter(c => c.entropy() == minimumEntropy))

        //select random tile from its available options
        this.currentCell.selectRandomTile() //==collapse()

        //consider cases of non-matching they should be empty
        if (this.currentCell.assignedTile === undefined) {
            if (Grid.restartIfCrash) {
                console.log("Tiles cannot be fully filled. Restarting...")
                this.reset() //start over
            }
            else {
                console.log("Tiles cannot be fully filled. Stopped.")
                this.isFinished = true;
            }
            return;
        }

        //reduce the entropy for each neighbor
        let neighbors = this.getUnvisitedNeighbors(this.currentCell)

        //here we should backup and check if we can reduce the entropy to a non-zero number
        neighbors.forEach(n => n.reduceEntropy(this.currentCell, this.tilesInfo))
    }

    //     proceedMaze() { //maze algorithm
    //         if (this.isFinished) return

    //         this.currentCell = this.visitedCells.pop()
    //         if (this.currentCell === undefined) {
    //             this.isFinished = true; return;
    //         }

    //         //check if the current cells has any unvisited neibors (at least one)
    //         let currentNeighbors = this.getUnvisitedNeighbors(this.currentCell)
    //         while (currentNeighbors.length == 0) {
    //             this.currentCell = this.visitedCells.pop()
    //             if (this.currentCell === undefined) {
    //                 this.isFinished = true; return;
    //             }

    //             currentNeighbors = this.getUnvisitedNeighbors(this.currentCell)
    //         }

    //         //console.log(currentNeighbors)
    //         //push the current cell to the stack
    //         this.visitedCells.push(this.currentCell)

    //         //choose one of the unvisited neighbors
    //         let randomNeighbor = random(currentNeighbors)

    //         let matchedTiles = []
    //         let currentTile = this.currentCell.assignedTile
    //         if (randomNeighbor.i == this.currentCell.i + 1) //neighbor is on the right
    //         {
    //             matchedTiles = this.tiles.filter(t => t.canMatchWith(t.left, currentTile.right))
    //         }
    //         else if (randomNeighbor.i == this.currentCell.i - 1) //neighbor is on the left
    //         {
    //             matchedTiles = this.tiles.filter(t => t.canMatchWith(t.right, currentTile.left))
    //         }
    //         else if (randomNeighbor.j == this.currentCell.j + 1) //neighbor is on the bottom
    //         {
    //             matchedTiles = this.tiles.filter(t => t.canMatchWith(t.up, currentTile.down))
    //         }
    //         else //neighbor is on the top
    //         {
    //             matchedTiles = this.tiles.filter(t => t.canMatchWith(t.down, currentTile.up))
    //         }

    //         //filter the matchedTiles based on the visited neighbor tiles as well


    //         randomNeighbor.assignedTile = //this.tiles[0]
    //             matchedTiles.length > 0 ? random(matchedTiles) : this.tiles[0];

    //         randomNeighbor.visited = true
    //         this.visitedCells.push(randomNeighbor)

    //         //https://en.wikipedia.org/wiki/Maze_generation_algorithm
    //         /*
    // Choose the initial cell, mark it as visited and push it to the stack

    // While the stack is not empty

    // Pop a cell from the stack and make it a current cell
    // If the current cell has any neighbours which have not been visited
    //   Push the current cell to the stack
    //   Choose one of the unvisited neighbours
    //   Remove the wall between the current cell and the chosen cell
    //   Mark the chosen cell as visited and push it to the stack
    //         */

    //     }


}