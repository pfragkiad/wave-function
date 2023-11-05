class Cell {
    constructor(i, j) {
        this.i = i
        this.j = j

        this.reset()
    }

    reset() {
        this.visited = false
        this.assignedTile = undefined
        this.options = []
    }

    setTileOptions(options) {
        this.options = options
    }

    selectRandomTile() {
        this.assignedTile = random(this.options)
        if (this.assignedTile !== undefined) {
            this.options = [this.assignedTile]
        }
        else 
        {
            this.options = []
            console.error(`Cannot select tile for Cell(${this.i},${this.j})!`)
        }

        this.visited = true
    }

    entropy() {
        //console.log(this.options.length)
        return this.options.length
    }

    reduceEntropy(currentCell) //this cell is the "neighbor" of the 
    {
        //keep only the tiles are compatible
        let currentTile = currentCell.assignedTile

        if (currentTile === undefined) {
            console.error(`Cell(${currentCell.i},${currentCell.j}) has undefined tile!`)
            return
        }

        if (this.i == currentCell.i + 1)   //neighbor is on the right
            this.options = this.options.filter(t => t.canMatchWith(t.left, currentTile.right))

        if (this.i == currentCell.i - 1) //neighbor is on the right
            this.options = this.options.filter(t => t.canMatchWith(t.right, currentTile.left))

        if (this.j == currentCell.j + 1) //neighbor is on the bottom
            this.options = this.options.filter(t => t.canMatchWith(t.up, currentTile.down))

        if (this.j == currentCell.j - 1) //neighbor is on the top
            this.options = this.options.filter(t => t.canMatchWith(t.down, currentTile.up))

    }


}

// class CellWithTile extends Cell
// {
//     constructor(i,j)
//     {
//         super(i,j)
//     }
// }