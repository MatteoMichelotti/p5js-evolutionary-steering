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

    eat(index){
        this.food.splice(index, 1);
        this.addFood();
    }

    findClosestTo(target){
        let closestIdx = -1;
        let closest = Infinity;
        this.food.forEach((item, idx) => {
            const d = item.position.dist(target.position);
            if (d < closest){
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
    }

    display(){
        fill(0, 255, 0);
        noStroke();
        ellipse(this.position.x, this.position.y, 3, 3);
    }
}