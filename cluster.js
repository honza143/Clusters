var clusters = [];
var clusters2 = [];

class Cluster extends Pos{
    constructor(posX, posY, number){
        super(posX, posY);
        this.number = number;
        this.newX = posX;
        this.newY = posY;
        this.step = 0;
    }
}

var clusterHistory = [];
