var cols = 10, rows = 10

const TileContacts = {
  DOWN_UP: 1,
  RIGHT_LEFT: 2
}

let mainTilesInfo = {
  basePath: "tiles_main",
  from: 1,
  to: 5,
  midPoints: [0.25, 0.5, 0.75],
  extension: "png",
  images: {},
  exclusions: []
}

let circuitTilesInfo = {
  basePath: "tiles_circuit",
  from: 0,
  to: 35,
  midPoints: [0, 0.5, 1.0],
  extension: "png",
  images: {},
  exclusions: [
    {
      contact: TileContacts.DOWN_UP,
      first: '17',
      second: '19'
    },
    {
      contact: TileContacts.RIGHT_LEFT,
      first:'18',
      second:'4'
    }

  ]
}

//TODO: Produce rotations
//TODO: See explicitly matched candidates 


let tilesInfo = circuitTilesInfo
// let tilesInfo = mainTilesInfo
var grid

function getTileImages() {
  for (let i = tilesInfo.from; i <= tilesInfo.to; i++) {
    //let fileName = i.toString().padStart(2, "0")
    let fileName = i.toString()
    let img = loadImage(`${tilesInfo.basePath}/${fileName}.${tilesInfo.extension}`)
    tilesInfo.images[i] = img
    //tiles.push(new Tile(img)) //will not work!
  }
}

function preload() {
  getTileImages()
}

function setup() {
  // put setup code here
  createCanvas(200, 200)

  grid = new Grid(cols, rows, tilesInfo)
  Grid.restartIfCrash = true
  //console.log(tiles[1].up)  

  const showAllSteps = true
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


}

function drawRandom() {
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++)
      image(random(images), i * w, j * h, w, h)

}
