var canvas = document.getElementById('myCanvas');
var circle = document.getElementById('circle');
var sorted = document.getElementById('sorted');
var button = document.getElementById('button');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');
var button4 = document.getElementById('button4');
var button5 = document.getElementById('button5');
var button6 = document.getElementById('button6');
var presets = document.getElementById('presets');
var switches = document.getElementById('switches');
var switches2 = document.getElementById('switches2');
var algorithm = document.getElementById('algorithm');
var pointForm = document.getElementById('pointForm');
var iterations = document.getElementById('iterations');
var clusterForm= document.getElementById('clusterForm');
var pointClicks = document.getElementById('pointClicks');
var clusterClicks = document.getElementById('clusterClicks');
var noPoints = document.getElementById('noPoints');
var noCLuster = document.getElementById('noCLuster');

var width = 400;
var height = 400;
var iteration = 0;
var running = false;
var pointCluster = "point";

var ctx;
var ctx2;
var ctx2s;

custom();

var finished = false;

function custom(){
    ctx = canvas.getContext("2d");
    ctxs = switches.getContext("2d");
    ctxs2 = switches2.getContext("2d");
    canvas.width = width;
    canvas.height = height;
}

news("new");

ctxs.textAlign="center";
ctxs.font = "15px Arial";
ctxs.fillText("POINTS", 45, 16);
ctxs2.rect(0, 0, 90, 20);
ctxs2.fill();

switches.onclick = function(){
    switchBar();
}

switches2.onclick = function(){
    switchBar();
}

function switchBar(){
    pointCluster = (pointCluster=="cluster")?"point":"cluster";
    if(pointCluster == "point"){
        ctxs2.rect(0, 0, 90, 20);
        ctxs2.fill();
        ctxs.clearRect(0, 0, 90, 20);
        ctxs.textAlign="center";
        ctxs.font = "15px Arial";
        ctxs.fillText("POINTS", 45, 16);
    }
    else{
        ctxs.rect(0, 0, 90, 20);
        ctxs.fill();
        ctxs2.clearRect(0, 0, 90, 20);
        ctxs2.textAlign="center";
        ctxs2.font = "15px Arial";
        ctxs2.fillText("CLUSTERS", 45, 16);
    }
}

var circled = false;

function circleSetup(){
    if(!running){
        circled = !circled;
        circle.checked=(circled)?true:false;
    }
    news("circled");
}


d3.select(canvas).on("click", function(){
    finished = false;
    if(!running && d3.event.clientX>8 && d3.event.clientX<408 && d3.event.clientY>38 && d3.event.clientY<438){
        if(pointCluster=="point"){
            for(var i = 0; i<pointClicks.value; i++){
                ctx.lineWidth=1;
                ctx.beginPath();
                radius = pointClicks.value*Math.sqrt(Math.random());
                angle = Math.random()*2*Math.PI;
                x = 2*radius*Math.cos(angle);
                y = 2*radius*Math.sin(angle);
                while(d3.event.clientX+x>398)x=x-380;
                while(d3.event.clientX+x<18)x=x+380;
                while(d3.event.clientY+y>428)y=y-380;
                while(d3.event.clientY+y<48)y=y+380;
                ctx.arc(d3.event.clientX+x-8, d3.event.clientY+y-38, 3, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }
        else if(pointCluster=="cluster"){
            if(clusters.length<10){
                clusterClicks.value++;
                clusters.push(new Cluster(d3.event.clientX-8, d3.event.clientY-35, clusters.length+1));
                clusterHistory[0] = [];
                var tempArray = (clusters.length>0)?clusters:clusters2;
                for(var i=0; i<tempArray.length; i++){
                    clusterHistory[0][i] = new Cluster(tempArray[i].x, tempArray[i].y, tempArray[i].number);
                }
                news();
            }
        }
        sorted.style.display = "none";
        button4.style.display = "block";

        iteration = 0;
        iterations.innerHTML = leadingZero(iteration);
    }
});

var plays;

button.onclick = function(){        //PREVIOUS
    finished = false;
    if(iteration > 1){
        running = false;
        clearInterval(plays);
        button2.firstChild.src = "icons/play.png";
        iteration--;
        iterations.innerHTML = leadingZero(iteration);
        back(iteration);
        button2.disabled = false;
        button3.disabled = false;
        button2.firstChild.src = "icons/play.png";
        button3.firstChild.src = "icons/next.png";
        if(iteration == 1){
            button.disabled = false;
            button.firstChild.src = "icons/previousg.png";
        }
    }
}

button2.onclick = function(){       //PLAY
    finished = false;
    if(running){
        running = false;
        clearInterval(plays);
        button2.firstChild.src = "icons/play.png";
    }
    else{
        if(clusters.length < 1 && algorithm.value!="alg1")noCLuster.display = "block";
        else if(points.length < 1)noPoints.display = "block";
        else {
            button2.firstChild.src = "icons/pause.png";
            running = true;
            play();
        }
    }
}

button3.onclick = function(){       //NEXT
    finished = false;
    running = false;
    clearInterval(plays);
    button2.firstChild.src = "icons/play.png";
    play();
}

button4.onclick = function(){       //CLEAR
    finished = false;
    running = false;
    clearInterval(plays);
    points = [];
    clusters = [];
    clusters2 = [];
    iteration = 0;
    clusterClicks.value = 0;
    iterations.innerHTML = leadingZero(iteration);

    button.disabled = true;
    button2.disabled = true;
    button3.disabled = true;
    button.firstChild.src = "icons/previousg.png";
    button2.firstChild.src = "icons/playg.png";
    button3.firstChild.src = "icons/nextg.png";

    button4.style.display = "none";
    redraw();
}

button5.onclick = function(){       //RANDOMLY
    finished = false;
    for(var i = 0; i<pointClicks.value; i++){
        ctx.lineWidth=1;
        ctx.beginPath();
        x = 10+Math.random()*380;
        y = 10+Math.random()*380;
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.stroke();
        points.push(new Point(x, y, 0));
    }
    button4.style.display = "block";
    if(clusters.length>0){
        button2.disabled = false;
        button3.disabled = false;
        button2.firstChild.src = "icons/play.png";
        button3.firstChild.src = "icons/next.png";
    }
}

function leadingZero(integer){
    var pom = integer;
    if(iteration<10) pom = '0' + integer;
    if(iteration<100) pom = '0' + pom;
    if(iteration<1000) pom = '0' + pom;
    return pom;
}

function algChange(){
    finished = false;
    iteration = 0;
    iterations.innerHTML = leadingZero(iteration);
    running = false;
    stop();
    clusters = [];
    clusters2 = [];
    clusterHistory = [];
    clusterClicks.value = 0;
    if(algorithm.value=="alg1" && points.length>0){
        button2.disabled = false;
        button3.disabled = false;
        button2.firstChild.src = "icons/play.png";
        button3.firstChild.src = "icons/next.png";
    }
    redraw();
}

function back(step){
    clusters = clusterHistory[step];
    //console.log(clusterHistory[step][0].x);
    recalculatePoints();
    redraw();
}

function news(newtry){
    iteration = 0;
    iterations.innerHTML = leadingZero(iteration);
    for(var i=0; i<clusters.length; i++){
        clusters[i].history = [];
    }
    if(running){
        if(newtry == "input") clusterClicks.value--;
        else if(newtry == "circled") circle.checked=(circle.checked)?false:true;
    }
    else{
        if(newtry != "new"){
            button2.disabled = false;
            button3.disabled = false;
            button2.firstChild.src = "icons/play.png";
            button3.firstChild.src = "icons/next.png";

            setInterval(redraw, 100);
            //setInterval(recalculatePoints, 500);
        }
        if(newtry == "input"){
            clusters = [];
            var pom = clusterClicks.value;
            if(pom>10) pom = 10;
            for(var i=0; i<pom; i++){
                var x;
                var y;
                if(circled){
                    var angle = i*((2*Math.PI)/pom);
                    x = 200+150*Math.cos(angle);
                    y = 200+150*Math.sin(angle);
                }
                else{
                    x = 10+380*Math.random();
                    y = 10+380*Math.random();
                }
                clusters[i] = new Cluster(x, y, i+1);
                clusterHistory[0] = [];
                for(var i=0; i<tempArray.length; i++){
                    clusterHistory[0][i] = new Cluster(clusters[i].x, clusters[i].y, clusters[i].number);
                }
            }
        }
        else if(newtry == "circled"){
            for (var i=0; i<clusters.length; i++){
                var angle = i*((2*Math.PI)/clusters.length);
                clusters[i].x = 200+150*Math.cos(angle);
                clusters[i].y = 200+150*Math.sin(angle);
            }
        }
        else if(newtry == "new"){
            points = [];
            clusters = [];
            pointForm.reset();
            clusterForm.reset();
        }
        for (var i=0; i<clusters.length; i++){
            ctx.lineWidth = 5;
            ctx.strokeStyle = "grey";
            ctx.beginPath();
            ctx.arc(clusters[i].x, clusters[i].y, 10, 0, 2*Math.PI);
            ctx.stroke();
        }
        ctx.strokeStyle = "black";
        if(points.length>0){
            for(var i=0; i<points.length; i++){
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(points[i].x, points[i].y, 3, 0, 2*Math.PI);
                ctx.stroke();
            }
        }
    }
}

function play(){
    if(algorithm.value=="alg0"){
        if(running) plays = setInterval(kmeans, 1000);
        else kmeans();
    }
    else if(algorithm.value=="alg1"){
        meanShift();
    }
    button.disabled = false;
    button.firstChild.src = "icons/previous.png";
}

function stop(){
    if(!running){
        button2.disabled = true;
        button3.disabled = true;
        sorted.style.display = "block";
        button2.firstChild.src = "icons/playg.png";
        button3.firstChild.src = "icons/nextg.png";
        iterations.innerHTML = leadingZero(iteration);
    }
}

function redraw(){
    var pointArray = points;
    var clusterArray = (clusters.length>0)?clusters:clusters2;
    if(!finished) sorted.style.display = "none";
    ctx.clearRect(0, 0, 400, 400);
    for(var i=0; i<pointArray.length; i++){
        if(pointArray[i].changing){
            ctx.lineWidth = 2;
            ctx.strokeStyle = setStyle(pointArray[i].clusterNumber);
        }
        else{
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
        }
        ctx.beginPath();
        ctx.arc(pointArray[i].x, pointArray[i].y, 3, 0, 2*Math.PI);
        if(!pointArray[i].changing){
            ctx.fillStyle = setStyle(pointArray[i].clusterNumber);
            ctx.fill();
        }
        ctx.stroke();
    }
    for(var i=0; i<clusterArray.length; i++){
        var pomX;
        var pomY;
        if(clusterArray[i].step != 0){
            clusterArray[i].step++;
            if(clusterArray[i].step == 10){
                clusterArray[i].x = clusterArray[i].newX;
                clusterArray[i].y = clusterArray[i].newY;
                clusterArray[i].step = 0;
                pomX = clusterArray[i].newX;
                pomY = clusterArray[i].newY;
                for(var j = 0; j<points.length; j++){
                    if(points[j].changing){
                        points[j].changing = false;
                    }
                }
            }
            else{
                pomX = clusterArray[i].x + ((clusterArray[i].newX-clusterArray[i].x)/10)*clusterArray[i].step;
                pomY = clusterArray[i].y + ((clusterArray[i].newY-clusterArray[i].y)/10)*clusterArray[i].step;
            }
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.arc(clusterArray[i].newX, clusterArray[i].newY, 10, 0, 2*Math.PI);
            ctx.strokeStyle = setStyle(clusterArray[i].number);
            ctx.stroke();
        }
        else {
            pomX = clusterArray[i].x;
            pomY = clusterArray[i].y;
        }

        ctx.lineWidth = 5;
        ctx.strokeStyle = "grey";
        ctx.beginPath();
        ctx.arc(pomX, pomY, 10, 0, 2*Math.PI);
        ctx.fillStyle = setStyle(clusterArray[i].number);
        ctx.fill();
        ctx.stroke();
    }
}

function setStyle(number){
    var pom;
    switch(number){
        case 1:
            pom = "red"; break;
        case 2:
            pom = "blue"; break;
        case 3:
            pom = "lime"; break;
        case 4:
            pom = "yellow"; break;
        case 5:
            pom = "black"; break;
        case 6:
            pom = "white"; break;
        case 7:
            pom = "orange"; break;
        case 8:
            pom = "pink"; break;
        case 9:
            pom = "cyan"; break;
        case 10:
            pom = "brown"; break;
    }
    return pom;
}
