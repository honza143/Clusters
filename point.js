var points = [];

class Pos{
    constructor(posX, posY){
        this.x = posX;
        this.y = posY;
    }
}

class Point extends Pos{
    constructor(posX, posY, clusterNumber){
        super(posX, posY);
        this.clusterNumber = clusterNumber;
        this.changing = false;
    }
    change(number){
        this.clusterNumber = number;
        this.changing = true;
    }
}

function recalculatePoints(){
    var temp = (clusters.length>0)?clusters:clusters2;
    for(var i = 0; i<points.length; i++){
        var length = 10000000;
        var clusterNum = 0;
        var newCore = 0;
        var previousCore = points[i].clusterNumber;
        for(var j=0; j<temp.length; j++){
            var x = temp[j].x-points[i].x;
            var y = temp[j].y-points[i].y;
            var pom = Math.sqrt(x*x+y*y);
            if(pom<length){
                length = pom;
                newCore = temp[j].number;
            }
        }
        if(newCore != previousCore && algorithm.value!="alg1") {
            points[i].change(newCore);
        }
    }
    redraw();
}
