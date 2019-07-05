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

    display() {
        noStroke()
        fill(50, this.health, 0);
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading());
        triangle(10, 0, -8, 5, -8, -5);

        //Debugging
        if (debuggingElements.showVehicleVelocity.checked()){
            stroke('#CD5C5C');
            line(0, 0, map(this.velocity.mag(), 0, sqrt(2)*this.maxSpeed, 0, 100), 0);
        }
        //End Debugging

        pop();
    }
}