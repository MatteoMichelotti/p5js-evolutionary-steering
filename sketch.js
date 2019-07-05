const vehicles = [];
const vehicles_number = 20;

const debuggingElements = { };

function setup(){
    createCanvas(1200, 600);

    debuggingElements.showVehicleVelocity = createCheckbox("Show vehicle velocity");
    debuggingElements.showOuterEdge = createCheckbox("Show outer edge");
    debuggingElements.outerEdgeWidth = createSlider(20, 100, 30)

    for (let i=0; i<vehicles_number; i++){
        vehicles.push(new Vehicle(random(width), random(height)));
    }
}

function draw(){    
    background(51);
    
    if (debuggingElements.showOuterEdge.checked()) {
        const edge = debuggingElements.outerEdgeWidth.value();
        stroke(255, 100);
        strokeWeight(1);
        noFill();
        rect(edge, edge, width - 2 * edge, height - 2 * edge);
    }

    vehicles.forEach(v => {
        v.update();
        v.wrap();
        v.display();
    });
}