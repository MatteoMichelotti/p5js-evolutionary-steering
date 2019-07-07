class Vehicle {
    constructor(x, y){
        this.MIN_SPEED = 1;
        this.MAX_SPEED = 3;

        this.maxDesiredSpeed = this.MAX_SPEED;
        this.maxSteerForce = 0.25;

        this.health = 1;
        this.dead = false;

        this.visionRadius = 60;

        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D().setMag(random(this.MIN_SPEED, this.MAX_SPEED));
        this.acceleration = createVector(0, 0);

        this.MIN_HEALTH = color(255, 0, 0);
        this.MAX_HEALTH = color(0, 255, 0);
    }

    update() {
        this.health -= 0.0001;
        if (!this.dead){
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
        }
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
            desired = createVector(this.maxDesiredSpeed, this.velocity.y);
        }

        if (this.position.x > width-edge){
            desired = createVector(-this.maxDesiredSpeed, this.velocity.y);
        }

        if (this.position.y < edge){
            desired = createVector(this.velocity.x, this.maxDesiredSpeed);
        }

        if (this.position.y > height-edge){
            desired = createVector(this.velocity.x, -this.maxDesiredSpeed);
        }

        if (desired !== null){
            desired.setMag(this.maxDesiredSpeed);
            const steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxSteerForce);
            this.applyForce(steer);
        }
    };

    seek(target){
        if (!target) return;

        const desired = p5.Vector.sub(target.position, this.position);
        
        desired.mag() < target.radius
            ? desired.setMag(map(desired.mag(), 0, target.radius, 0, this.maxDesiredSpeed))
            : desired.setMag(this.maxDesiredSpeed);

        const steer = p5.Vector.sub(desired, this.velocity).limit(this.maxSteerForce);

        this.applyForce(steer);
    }

    updateMaxSpeed(){
        this.maxDesiredSpeed = map(this.health, 0, 1, this.MIN_SPEED, this.MAX_SPEED);
    }

    eat(food){
        this.health += food.nutrition;
        this.health = min(this.health, 1);
        this.updateMaxSpeed();
        if (this.health <= 0){
            this.dead = true;
        }
    }

    display() {
        
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading());

        if (debuggingElements.showVehicleVelocity.checked()){
            stroke('#CD5C5C');
            strokeWeight(2);
            line(10, 0, 10+map(this.velocity.mag(), this.MIN_SPEED, this.MAX_SPEED, 0, 50), 0);
        }

        if (debuggingElements.showVisionRadius.checked()){
            noStroke();
            fill(255,30);
            ellipse(0, 0, this.visionRadius*2, this.visionRadius*2);
        }
        
        noStroke();
        fill(lerpColor(this.MIN_HEALTH, this.MAX_HEALTH, this.health));
        triangle(10, 0, -8, 5, -8, -5);

        pop();
    }
}