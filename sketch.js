const vehicles = [];
const vehicles_number = 1;

let food = null;
const food_number = 100;
const eat_distance = 5;

const debuggingElements = { };

function setup(){
    createCanvas(1200, 600);

    debuggingElements.showVehicleVelocity = createCheckbox("Show vehicle velocity", true);
    debuggingElements.showOuterEdge = createCheckbox("Show outer edge", true);
    debuggingElements.outerEdgeWidth = createSlider(20, 100, 40)

    for (let i=0; i<vehicles_number; i++){
        vehicles.push(new Vehicle(random(width), random(height)));
    }

    food = new Food(food_number);
}

function draw(){    
    background(51);
    
    if (debuggingElements.showOuterEdge.checked()) {
        const edge = debuggingElements.outerEdgeWidth.value();
        stroke(255, 100);
        strokeWeight(1);
        noFill();
        rect(edge, edge, width - 2*edge, height - 2*edge);
    }

    vehicles.forEach(v => {
        const closestFood = food.findClosestTo(v);
        v.seek(closestFood.item);
        if (closestFood.distance < eat_distance){
            v.eat(closestFood.item);
            food.replaceFood(closestFood.idx);
        }

        v.update();
        v.avoidEdge();
        v.display();
    });

    food.checkEdge();
    food.display();
}