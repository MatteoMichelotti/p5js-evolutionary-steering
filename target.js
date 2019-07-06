class Target {
    constructor(x, y, r){
        this.position = createVector(x, y);
        this.radius = r;
    }

    draw(){
        fill(110);
        noStroke();
        ellipse(this.position.x, this.position.y, this.radius, this.radius);
    }
}