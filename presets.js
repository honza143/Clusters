function sPreset(){
    for(var i = 0; i<500; i++){
        ctx.lineWidth = 1;
        var radius = 100*((Math.random()*0.2)+0.8);
        var angle = Math.random();
        var pom = angle;
        angle = angle*2*Math.PI;
        x = 200+radius*Math.cos(angle);
        y = 110+radius*Math.sin(angle);
        if(pom>0.25){
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.stroke();
            points.push(new Point(x, y, 0));
        }
        if(pom<0.5 || pom>0.75){
            ctx.beginPath();
            ctx.arc(x, y+180, 3, 0, 2 * Math.PI);
            ctx.stroke();
            points.push(new Point(x, y+180, 0));
        }
    }
}

function twoCirclePreset(){
    for(var i = 0; i<700; i++){
        ctx.lineWidth = 1;
        var radius = 150*((Math.random()*0.2)+0.8);
        var angle = Math.random()*2*Math.PI;
        x = 200+radius*Math.cos(angle);
        y = 200+radius*Math.sin(angle);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.stroke();
        points.push(new Point(x, y, 0));
    }
    for(var i = 0; i<300; i++){
        ctx.lineWidth = 1;
        var radius = 150*((Math.random()*0.15)+0.25);
        var angle = Math.random()*2*Math.PI;
        x = 200+radius*Math.cos(angle);
        y = 200+radius*Math.sin(angle);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.stroke();
        points.push(new Point(x, y, 0));
    }
}

function wavePreset(){
    for(var i = 0; i<1000; i++){
        ctx.lineWidth = 1;
        var radius = 100*((Math.random()*0.2)+0.8);
        var angle = Math.random();
        var pom = angle;
        var x = 0;
        var y = 0;
        angle = angle*2*Math.PI;
        if(pom<0.5){
            x = 150+radius*Math.cos(angle);
            y = 185+radius*Math.sin(angle);
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.stroke();
            points.push(new Point(x, y, 0));
            ctx.beginPath();
            ctx.arc(400-x, 400-y, 3, 0, 2 * Math.PI);
            ctx.stroke();
            points.push(new Point(400-x, 400-y, 0));
        }
        else if(pom<0.75){
            x = radius*Math.cos(angle);
            y = 185+radius*Math.sin(angle);
            x = (x%20)+70;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.stroke();
            points.push(new Point(x, y, 0));
            ctx.beginPath();
            ctx.arc(400-x, 400-y, 3, 0, 2 * Math.PI);
            ctx.stroke();
            points.push(new Point(400-x, 400-y, 0));
        }
    }
}

function threeCirclesPreset(){
    for(var j = 0; j<3; j++){
        for(var i = 0; i<200; i++){
            var offx;
            var offy;
            switch(j){
                case 0: offx = 150; offy = 300; break;
                case 1: offx = 200; offy = 150; break;
                case 2: offx = 300; offy = 75; break;
            }
            ctx.lineWidth=1;
            ctx.beginPath();
            radius = 50*Math.sqrt(Math.random());
            angle = Math.random()*2*Math.PI;
            var x = offx+radius*Math.cos(angle);
            var y = offy+radius*Math.sin(angle);
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.stroke();
            points.push(new Point(x, y, 0));
        }
    }
}

function squarePreset(){
    for(var i = 0; i<1000; i++){
        ctx.lineWidth=1;
        ctx.beginPath();
        var x = 50+Math.random()*300;
        var y = 50+Math.random()*300;
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.stroke();
        points.push(new Point(x, y, 0));
    }
}

function presetChange(){      //PRESETS
    points = [];
    clusters = [];
    redraw();
    switch(presets.value){
        case "preset0": // blank
            points = [];
            clusters = [];
            redraw();
            break;
        case "preset1": // S
            sPreset();
            break;
        case "preset2": // CIRCLE IN CIRCLE
            twoCirclePreset();
            break;
        case "preset3": // WAVES
            wavePreset();
            break;
        case "preset4": // 3 CIRCLES
            threeCirclesPreset();
            break;
        case "preset5": // SQUARE
            squarePreset();
            break;
    }
}
