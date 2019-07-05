const vehicles = [];
const vehicles_number = 20;

function setup(){
    createCanvas(1200, 600);

    for (let i=0; i<vehicles_number; i++){
        vehicles.push(new Vehicle(random(width), random(height)));
    }

}

function draw(){    
    background(51);
    vehicles.forEach(v => {
        v.update();
        v.wrap();
        v.display();
    });
}