var cols = 20, rows = 20

let mainTilesInfo = {
  basePath: "tiles_main",
  from: 1,
  to: 5,
  midPoints: [0.25, 0.5, 0.75],
  extension: "png"
}

let circuitTilesInfo = {
  basePath: "tiles_circuit",
  from: 0,
  to: 35,
  midPoints: [0, 0.5, 1.0],
  extension: "png"
}

const showAllSteps = false
let tilesInfo = circuitTilesInfo 
// let tilesInfo = mainTilesInfo
var grid, images = []

function loadTileImages() {
  for (let i = tilesInfo.from; i <= tilesInfo.to; i++) {
    //let fileName = i.toString().padStart(2, "0")
    let fileName = i.toString()
    let img = loadImage(`${tilesInfo.basePath}/${fileName}.${tilesInfo.extension}`)
    images.push(img)
    //tiles.push(new Tile(img)) //will not work!
  }
}

function preload() {
  loadTileImages()
}

function setup() {
  // put setup code here
  createCanvas(400, 400)

  grid = new Grid(cols, rows, images, tilesInfo.midPoints)
  Grid.restartIfCrash = true
  //console.log(tiles[1].up)  


  if (!showAllSteps) {
    let attempts = 0
    while (!grid.isFinished) {
      attempts++
      console.log(`Building tiles, attempt: #${attempts}`)
      grid.proceedWave()
    }
  }
  //frameRate(5) 
}


function draw() {
  // put drawing code here
  background(20)

  grid.proceedWave()
  //grid.proceedMaze()
  grid.show()


  if (grid.isFinished)
    noLoop()

  // for(let j=0;j<rows;j++)
  //   for(let i=0;i<cols;i++)
  //     image(random(images),i*w,j*h,w,h)

}
