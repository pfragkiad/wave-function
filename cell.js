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
        else {
            this.options = []
            console.error(`Cannot select tile for Cell(${this.i},${this.j})!`)
        }

        this.visited = true
    }

    entropy() {
        //console.log(this.options.length)
        return this.options.length
    }

    reduceEntropy(currentCell, tilesInfo) //this cell is the "neighbor" of the 
    {
        //keep only the tiles are compatible
        let currentTile = currentCell.assignedTile

        if (currentTile === undefined) {
            console.error(`Cell(${currentCell.i},${currentCell.j}) has undefined tile!`)
            return
        }

        if (this.i == currentCell.i + 1) //neighbor is on the right
        {
            let exclusions = tilesInfo.exclusions.filter(e => e.contact === TileContacts.RIGHT_LEFT && e.first == currentTile.id).map(e => e.second)
            // if(exclusions.length>0) 
            //     console.log(`Found ${exclusions} exclusions`)
            this.options = this.options.filter(t => t.canMatchWith(t.left, currentTile.right) && !exclusions.includes(t.id))
        }
        else if (this.i == currentCell.i - 1) //neighbor is on the left
        {
            let exclusions = tilesInfo.exclusions.filter(e => e.contact === TileContacts.RIGHT_LEFT && e.second == currentTile.id).map(e => e.first)
            this.options = this.options.filter(t => t.canMatchWith(t.right, currentTile.left) && !exclusions.includes(t.id))
        }
        else if (this.j == currentCell.j + 1) //neighbor is on the bottom
        {
            let exclusions = tilesInfo.exclusions.filter(e => e.contact === TileContacts.DOWN_UP && e.first == currentTile.id).map(e => e.second)
            this.options = this.options.filter(t => t.canMatchWith(t.up, currentTile.down) && !exclusions.includes(t.id))
        }
        else if (this.j == currentCell.j - 1) //neighbor is on the top
        {
            let exclusions = tilesInfo.exclusions.filter(e => e.contact === TileContacts.DOWN_UP && e.second == currentTile.id).map(e => e.first)
            this.options = this.options.filter(t => t.canMatchWith(t.down, currentTile.up) && !exclusions.includes(t.id))
        }



    }


}

// class CellWithTile extends Cell
// {
//     constructor(i,j)
//     {
//         super(i,j)
//     }
// }