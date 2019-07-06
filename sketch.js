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
}

function draw(){    
    background(51);

    const target = new Target(mouseX, mouseY, 50);
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