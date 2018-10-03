function kmeans(){
    for(var i = 0; i<clusters.length; i++){
        clusters2[i] = new Cluster(clusters[i].x, clusters[i].y, clusters[i].number);
    }
    iteration++;
    iterations.innerHTML = leadingZero(iteration);
    recalculatePoints();
    recalculateClusterCenter();
    var pom = 0;
    for(var i=0; i<clusters.length; i++){
        if(clusters[i].step==0 && clusters[i].x == clusters2[i].x && clusters[i].y == clusters2[i].y)
            pom++;
        else if(isNaN(clusters[i].x) || isNaN(clusters[i].y>400 || clusters[i].y<0))
            pom++;
    }
    if(pom == clusters.length){
        running = false;
        clearInterval(plays);
        finished = true;
        stop();
    }
}

function recalculateClusterCenter(){
    clusterHistory[clusterHistory.length] = [];
    for(var i=0; i<clusters.length; i++){
        clusterHistory[clusterHistory.length-1][i] = new Cluster(clusters[i].x, clusters[i].y, clusters[i].number);
    }

    for(var i = 0; i<clusters.length; i++){
        var x = 0;
        var y = 0;
        var number = 0;
        for(var j = 0; j<points.length; j++){
            if(points[j].clusterNumber == clusters[i].number){
                x += points[j].x;
                y += points[j].y;
                number += 1;
            }
        }
        clusters[i].newX = x/number;
        clusters[i].newY = y/number;
        if(clusters[i].x == clusters[i].newX && clusters[i].y == clusters[i].newY){
            clusters[i].x = clusters[i].newX;
            clusters[i].y = clusters[i].newY;
        }
        else {
            clusters[i].step = 1;
        }
    }
}
