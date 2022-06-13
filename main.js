img="";
Status="";
objects=[];

function preload(){
    img=loadSound("good_morning.mp3");
}

function setup(){
    canvas=createCanvas(450,450);
    canvas.center();
    
    video=createCapture(VIDEO); 
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";

}



function modelLoaded(){
    console.log("Model is loaded!");
    Status=true;
   
   
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
    console.log(results);
    objects=results;
    }
}

function draw(){
    image(video,0,0,450,450);
    
    if(Status != ""){

        objectDetector.detect(video,gotResults);
        console.log(objects.length);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            console.log(objects[i].label); 
            if(objects[i].label=='person'){
                document.getElementById("baby").innerHTML="Baby Detected";
                img.stop();
            }
            else if(objects[i].label != 'person'){
                document.getElementById("baby").innerHTML="Baby Not Detected";
                img.play();
            }
            else{
                document.getElementById("baby").innerHTML="Baby Not Detected";
                img.play();
            }

         
        }
    }
}

