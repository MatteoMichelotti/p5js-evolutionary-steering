class Vehicle {
    constructor(x, y){
        this.maxSpeed = 5;
        this.maxSteerForce = 0.5;

        this.health = 255;

        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D().setMag(random(this.maxSpeed));
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

    avoidEdge(){
        const edge = debuggingElements.outerEdgeWidth.value();
        let desired = null;

        if (this.position.x < edge){
            desired = createVector(this.maxSpeed, this.velocity.y);
        }

        if (this.position.x > width-edge){
            desired = createVector(-this.maxSpeed, this.velocity.y);
        }

        if (this.position.y < edge){
            desired = createVector(this.velocity.x, this.maxSpeed);
        }

        if (this.position.y > height-edge){
            desired = createVector(this.velocity.x, -this.maxSpeed);
        }

        if (desired !== null){
            desired.setMag(this.maxSpeed);
            const steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxSteerForce);
            this.applyForce(steer);
        }
    };

    seek(target){
        if (!target) return;
        
        const desired = p5.Vector.sub(target.position, this.position);
        
        desired.mag() < target.radius
            ? desired.setMag(map(desired.mag(), 0, target.radius, 0, this.maxSpeed))
            : desired.setMag(this.maxSpeed);

        const steer = p5.Vector.sub(desired, this.velocity).limit(this.maxSteerForce);

        this.applyForce(steer);
    }

    display() {
        
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading());

        if (debuggingElements.showVehicleVelocity.checked()){
            stroke('#CD5C5C');
            strokeWeight(2);
            line(10, 0, 10+map(this.velocity.mag(), 0, this.maxSpeed, 0, 50), 0);
        }
        
        noStroke()
        fill(50, this.health, 0);
        triangle(10, 0, -8, 5, -8, -5);

        pop();
    }
}