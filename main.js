var status = '';
var objects = [];
function preload(){
    audio = loadSound('alert_on_call.mp3');
}
function setup(){
    canvas = createCanvas(450,450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectdetector = ml5.objectDetector('cocossd',modelloaded);
}
function modelloaded(){
    console.log("model is loaded");
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    status= true;
}
function draw(){
    image(video,0,0,450,450);
        r = random(255);
        g = random(255);
        b = random(255);
        objectdetector.detect(video,gotresults);
        for (i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill(r,g,b)
            stroke(r,g,b)
            percentage = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentage+"%",objects[i].x,objects[i].y);
            noFill()
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if (objects[i].label == "person"){
                document.getElementById("baby-status").innerHTML = "Baby found";
                audio.stop();
            }
            else{
                audio.play();
                document.getElementById("baby-status").innerHTML = "Baby not found"
            }
        }
        if (objects.length == 0){
            audio.play();
                document.getElementById("baby-status").innerHTML = "Baby not found"
        }
}
function gotresults(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}