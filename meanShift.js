function eucliDistance(xx, xy, xix, xiy){
    return Math.sqrt(Math.pow((xx-xix), 2) * Math.pow((xy-xiy), 2));
}

function neighbourPoints(array, centroidx, centroidy, distance){
    var eligiblePoints = [];
    for(var p=0; p<array.length; p++){
        var dist = eucliDistance(array[p].x, array[p].y, centroidx, centroidy);
        if(dist <= distance){
            eligiblePoints.push(array[p]);
        }
    }
    return eligiblePoints;
}

function clusterCenter(distance, bandwidth){
    var pom;
    pom = (1/(bandwidth*Math.sqrt(2*Math.PI))) * Math.exp(-0.5*Math.pow((distance / bandwidth), 2));
    return pom;
}

function meanShift(){
    if(iteration<1){
        clusters = [];
        clusters2 = [];
        for(var i=0; i<points.length; i++){
            clusters.push(new Cluster(points[i].x, points[i].y, i));
        }
        clusterHistory[0] = [];
        var tempArray = [];
        tempArray = (clusters.length>0)?clusters:clusters2;
        for(var i=0; i<tempArray.length; i++){
            clusterHistory[0][i] = new Cluster(tempArray[i].x, tempArray[i].y, tempArray[i].number);
        }
    }
    if(running) plays = setInterval(meanShiftStep, 1000);
    else meanShiftStep();
}

var step = 0;

function meanShiftStep(){
    iteration++;
    iterations.innerHTML = leadingZero(iteration);
    redraw();
    var tempArray = [];
    tempArray = (clusters.length>0)?clusters:clusters2;
    clusterHistory[clusterHistory.length] = [];
    for(var i=0; i<tempArray.length; i++){
        clusterHistory[clusterHistory.length-1][i] = new Cluster(tempArray[i].x, tempArray[i].y, tempArray[i].number);
    }
    var end = false;
    for(var i=0; i<tempArray.length; i++){
        var neighbours = [];
        neighbours = neighbourPoints(tempArray, tempArray[i].x, tempArray[i].y, 300);         //DISTANCE
        var numeratorx = 0;
        var numeratory = 0;
        var denominator = 0;

        for(var j = 0; j<neighbours.length; j++){
            var distance = eucliDistance(neighbours[j].x, neighbours[j].y, tempArray[i].x, tempArray[i].y);
            var weight = clusterCenter(distance, 150);          //BANDWIDTH
            numeratorx += (weight * neighbours[j].x);
            numeratory += (weight * neighbours[j].y);
            denominator += weight;
        }
        var new_x = numeratorx / denominator;
        var new_y = numeratory / denominator;
        var pomCounter = 0;
        if(step%2 == 0){
            for(var j=0; j<clusters2.length; j++){
                if(j!=i && new_x==clusters2[j].x && new_y==clusters2[j].y){
                    pomCounter++;
                }
            }
            if(pomCounter == 0){
                clusters2.push(new Cluster(new_x, new_y, i));
            }
        }
        else {
              for(var j=0; j<clusters.length; j++){
                  if(j!=i && new_x==clusters[j].x && new_y==clusters[j].y){
                      pomCounter++;
                  }
              }
              if(pomCounter == 0){
                  clusters.push(new Cluster(new_x, new_y, i));
              }
        }
    }
    var pomCounter = 0;
    if(step%2 == 0){
        clusters = [];
        for(var i=0; i<clusters2.length; i++){
            clusters2.number = i+1;
            if(tempArray.length==clusters2.length && tempArray[i].x == clusters2[i].x && tempArray[i].y == clusters2[i].y) pomCounter++;
        }
        redraw();
    }
    else{
        clusters2 = [];
        for(var i=0; i<clusters.length; i++){
            clusters.number = i+1;
            if(tempArray.length==clusters.length && tempArray[i].x == clusters[i].x && tempArray[i].y == clusters[i].y) pomCounter++;
        }
        redraw();
    }

    if(pomCounter==tempArray.length){
        end = true;
        console.log(tempArray.length, pomCounter, "END!");
    }
    step++;
    if(end){
        clearInterval(plays);
        running = false;
        var temp = (clusters.length>0)?clusters:clusters2;
        for(var i=0; i<temp.length; i++){
            temp[i].number = i%10+1;
        }
        end = false;
        finished = true;
        recalculatePoints();
        redraw();
        stop();
    }
}
