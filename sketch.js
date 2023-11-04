var cols = 10, rows = 10

// var base_path = "./tiles_main"
// var from=1,to= 5
// var midpoints = [0.25, 0.5, 0.75]

var base_path = "tiles_circuit"
var from=0,to=12
var midpoints = [0,0.25,0.5,0.75,0.95]

var grid, images = []

function loadTiles(base_path, from, to, extension) {
  for (let i = from; i <= to; i++) {
    //let fileName = i.toString().padStart(2, "0")
    let fileName = i.toString()
    let img = loadImage(`${base_path}/${fileName}.${extension}`)
    images.push(img) 
    //tiles.push(new Tile(img)) //will not work!
  }
}

function preload() {
  loadTiles(base_path, from,to, "png") 
}

function setup() {
  // put setup code here
  createCanvas(400, 400)

  grid = new Grid(cols, rows, images, midpoints)
  //console.log(tiles[1].up)  
  

  // let attempts = 0
  // while(!grid.isFinished) {
  //   attempts++
  //   console.log(`Building tiles, attempt: #${attempts}`)
  //   grid.proceedWave()
  // }
  //frameRate(5) 
}

 
function draw() {    
  // put drawing code here
  background(200)

  grid.proceedWave()
  grid.show() 

  //grid.proceedMaze()    
  if(grid.isFinished)
    noLoop()

  // for(let j=0;j<rows;j++)
  //   for(let i=0;i<cols;i++)
  //     image(random(images),i*w,j*h,w,h)

}
