class Food {
    constructor(n){
        this.resetFood(n);
    }

    resetFood(n){
        this.food = [];
        for (let i = 0; i < n; i++) {
            this.addFood();
        }
    }

    addFood(){
        this.food.push(new FoodItem());
    }

    replaceFood(index){
        this.food.splice(index, 1);
        this.addFood();
    }

    findClosestTo(vehicle){
        let closestIdx = -1;
        let closest = Infinity;
        this.food.forEach((item, idx) => {
            const d = item.position.dist(vehicle.position);
            if (d <= vehicle.visionRadius && d < closest){
                closest = d;
                closestIdx = idx;
            }
        });

        return {
            item: this.food[closestIdx],
            idx: closestIdx,
            distance: closest
        };
    }

    checkEdge(){
        const isWithinEdge = (item, edge) => {
            if (item.position.x < edge) return false;
            if (item.position.x > width-edge) return false;
            if (item.position.y < edge) return false;
            if (item.position.y > height-edge) return false;
            return true;
        }

        const edge = debuggingElements.outerEdgeWidth.value();
        for (var i=this.food.length-1; i>=0; i--){
            if (!isWithinEdge(this.food[i], edge)){
                this.food.splice(i, 1);
                this.food.unshift(new FoodItem());
            }
        }
    }

    display(){
        this.food.forEach(f => f.display());
    }
}


class FoodItem {
    constructor(){
        this.position = createVector(
            random(width),
            random(height)
        );

        this.bad = { color: color(255, 0, 0), value: -0.2 };
        this.good = { color: color(0, 255, 0), value: 0.2 };
        this.nutrition = random(this.bad.value, this.good.value);
    }

    display(){
        fill(lerpColor(this.bad.color, this.good.color, map(this.nutrition, this.bad.value, this.good.value, 0, 1)));
        noStroke();
        ellipse(this.position.x, this.position.y, 3, 3);
    }
}