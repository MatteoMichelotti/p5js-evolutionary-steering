class Vehicle {
    constructor(x, y){
        this.maxSpeed = 3;
        this.maxSteerForce = 0.5;

        this.health = 255;

        this.position = createVector(x, y);
        
        this.velocity = createVector(
            random(-this.maxSpeed, this.maxSpeed),
            random(-this.maxSpeed, this.maxSpeed)
        );
        
        this.acceleration = createVector(0, 0);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    applyForce(force){
        this.acceleration.add(force);
    }

    wrap(){
        this.position.x = (this.position.x + width) % width;
        this.position.y = (this.position.y + height) % height;
    }

    avoidBorder(){

    }

    display() {
        
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading());

        if (debuggingElements.showVehicleVelocity.checked()){
            stroke('#CD5C5C');
            strokeWeight(2);
            line(10, 0, 10+map(this.velocity.mag(), 0, sqrt(2)*this.maxSpeed, 0, 50), 0);
        }
        
        noStroke()
        fill(50, this.health, 0);
        triangle(10, 0, -8, 5, -8, -5);

        pop();
    }
}