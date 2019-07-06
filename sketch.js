let target;

const vehicles = [];
const vehicles_number = 1;

const debuggingElements = { };

function setup(){
    createCanvas(1200, 600);

    debuggingElements.showVehicleVelocity = createCheckbox("Show vehicle velocity", true);
    debuggingElements.showOuterEdge = createCheckbox("Show outer edge", true);
    debuggingElements.outerEdgeWidth = createSlider(20, 100, 40)

    for (let i=0; i<vehicles_number; i++){
        vehicles.push(new Vehicle(random(width), random(height)));
    }

    target = new Target(width / 2, height / 2, 50);
}

function draw(){    
    background(51);

    if (random() < 0.001){
        target = new Target(random(width), random(height), 50);
    }
    target.draw();
    
    if (debuggingElements.showOuterEdge.checked()) {
        const edge = debuggingElements.outerEdgeWidth.value();
        stroke(255, 100);
        strokeWeight(1);
        noFill();
        rect(edge, edge, width - 2 * edge, height - 2 * edge);
    }

    vehicles.forEach(v => {
        v.seek(target);
        v.update();
        v.avoidEdge();
        v.display();
    });
}