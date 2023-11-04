class Tile {
    constructor(img, midpoints = null) {
        this.image = img 

        //console.log(img)

        this.width = img.width
        this.height = img.height
        this.density = img.pixelDensity()

        this.image.loadPixels()
        this.pixels = this.image.pixels

        if(this.pixels.length==4)
            console.error("Cannot load!")
        else
        {
            if(!midpoints) midpoints = [0.25,0.5,0.75]
            this.midpoints = midpoints
            this.discoverColorEdges()
        }
    }

    getPixel(x, y) {
        x = constrain(int(x),0,this.width-1) //Math.min(this.width-1,int(x)) //ensure integer
        y = constrain(int(y),0,this.height-1) //Math.min(this.height-1,int(y)) //ensure integer
       
        let o = 4 * this.density * (this.width * y + x)
        return color(
            this.pixels[o], this.pixels[o + 1],
            this.pixels[o + 2], this.pixels[o + 3])
    }

    areSameColors(c1, c2) {
        return c1.levels[0] === c2.levels[0] &&
            c1.levels[1] === c2.levels[1] &&
            c1.levels[2] === c2.levels[2] &&
            c1.levels[3] === c2.levels[3]
    }

    discoverColorEdges() {

        this.up = this.midpoints.map( m=> this.getPixel(this.width*m,0));
        // this.up = [
        //     this.getPixel(this.width / 4, 0),
        //     this.getPixel(this.width / 2, 0),
        //     this.getPixel(3 * this.width / 4, 0)
        // ] 

        this.down = this.midpoints.map( m=> this.getPixel(this.width*m,this.height-1))
        // this.down = [
        //     this.getPixel(this.width / 4, this.height-1),
        //     this.getPixel(this.width / 2, this.height-1),
        //     this.getPixel(3 * this.width / 4, this.height-1)
        // ]

        this.right = this.midpoints.map(m=> this.getPixel(this.width-1,this.height*m))
        // this.right = [
        //     this.getPixel(this.width-1, this.height/4),
        //     this.getPixel(this.width-1, this.height/2),
        //     this.getPixel(this.width-1, 3*this.height/4)
        // ]

        this.left = this.midpoints.map( m=> this.getPixel(0, this.height*m))
        // this.left = [
        //     this.getPixel(0, this.height/4),
        //     this.getPixel(0, this.height/2),
        //     this.getPixel(0, 3*this.height/4)
        // ]
    }

    canMatchWith(side1, side2)
    {
        for(let i=0; i<this.midpoints.length; i++)
            if(!this.areSameColors(side1[i],side2[i])) return false

        // return this.areSameColors(side1[0],side2[0]) &&
        // this.areSameColors(side1[1],side2[1]) &&
        // this.areSameColors(side1[2],side2[2])
        
        return true
    }

    show(x, y, w, h) {
        image(this.image, x, y, w, h) 
    }
}