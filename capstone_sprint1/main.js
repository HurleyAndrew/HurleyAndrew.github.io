p5.disableFriendlyErrors = true; //gets rid of warning check to decrease load time
let startX = 0;
let startY = 0;
let boxSize = 20;
let boxArray = [];
let frameArray = [];
let tempX = startX;
let tempY = startY;
let gridSize = 80; // 1024 x 360  51 box x 18 box
let gridX = 53;
let gridY = 18;
let color = "#000000";
let framePosition = 0;
let colorPicker;
let animate = false;
let forward = true;
let looping = true;
let frameSpeed = 15;
let gifLength = 180;// divide by framerate for length of gif
var canvasRef;//needed so it knows what to capture
let gifCounter = 0;//count for referencing 
let exporting = false;

var capturer;

function setup() {
  var theCanvas = createCanvas(boxSize * gridX, boxSize * gridY);
  theCanvas.parent("canvasDiv"); //this places the canvas inside a div in html
  canvasRef = theCanvas.canvas;
  colorPicker = document.querySelector("#colorPicker"); // HTML Color Picker

  captureBtn = document.querySelector("#captureBtn");
  deleteBtn = document.querySelector("#deleteBtn");
  addBtn = document.querySelector("#addBtn");
  playBtn = document.querySelector(".playpauseBtn");
  exportBtn = document.querySelector(".exportBtn");

  frameRateBtn = document.querySelector(".frameRateBtn");

  frameRateBtn.onchange = function(e) {
    frameSpeed = frameRateBtn.value;
  };

  exportBtn.onclick = function(e) {
    saveAsGif();
    gifCheck();
  };

  playBtn.onclick = function(e) {
    toggleAnimation();
  };

  deleteBtn.onclick = function(e) {
    decreaseFrame();
  };

  addBtn.onclick = function(e) {
    increaseFrame();
  };

  colorPicker.onchange = function(e) {
    color = e.target.value;
  };

  captureBtn.onclick = function(e) {
    saveFrame();
  };

  initializeGrid();
  }

function draw() {
  console.log(exporting + " still going");
  if (animate == false) {
    for (let i = 0; i < boxArray.length; i++) {
      //displays frames for drawing
      boxArray[i].checkHover();
      boxArray[i].display();
    }
  } else if (animate) {
    let start = millis();

    
      for (let i = 0; i < boxArray.length; i++) {
        //displays frames for drawing
        boxArray[i].display();
      }

      if (framePosition == frameArray.length - 1) {
        framePosition = 0;
        loadFrame(framePosition);
      } else {
        increaseFrame();
      }
    
    let end = millis();
    let elapsed = end - start;
    console.log("This took: " + elapsed + "ms.");
  }
  else if(exporting){//supposed to be exporting
    console.log("is export")
      
  }
}

function saveFrame() {
  frameArray.push(boxArray);

  setFrame();
  framePosition += 1;
}

function setFrame() {
  boxArray = [];
  initializeGrid();
}
function increaseFrame() {
  if (frameArray[framePosition + 1] == null) {
    return;
  } else {
    framePosition += 1;
    loadFrame(framePosition);
  }
}
function decreaseFrame() {
  if (framePosition == 0) {
    return;
  } else {
    framePosition -= 1;
    loadFrame(framePosition);
  }
}

/*  Save individual canvas's as a png
    Looped over each canvas with its array of colors attached to it
*/
// for as many items as in the framearray load that frame array into the canvas
function saveAsGif() {
  // var count = 0;
  // saveFrames("out", "png", 1, frameArray.length, data => {
  //   var x = document.createElement("IMG");
  //   x.setAttribute("src", data[count].imageData);
  //   x.setAttribute("width", "960");
  //   x.setAttribute("height", "350");
  //   x.setAttribute("position", "absolute");
  //   x.setAttribute("top", "0");
  //   x.setAttribute("height", "350");
  //   document.body.appendChild(x);
  //   print(data);
  //   count += 1;
  // });
  capturer = new CCapture({
    FPS:frameSpeed,
    format:'gif',
    display: true,
    frameLimit: 180,
    workersPath:'./js/',
    verbose:true
  });
  exporting = true;//so canvas knows when to record
  console.log("export Starting");
  gifCounter = frameCount;
  gifLength += frameCount;
  framePosition = 0;
  noStroke();
  capturer.start();//starts the capture function. might try moving to html


  /*  previous code for saving frames as pngs. unsure of if using this later or not.
  noStroke();
  frameRate(1);

  framePosition = 0;

  for (let i = 0; i < frameArray.length; i++) {
    for (let i = 0; i < boxArray.length; i++) {
      //displays frames for drawing
      boxArray[i].display();
    }

    console.log(framePosition);
    loadFrame(framePosition);
    save("frame#00" + framePosition);
    framePosition += 1;
  }

  framePosition = 0;
  console.log("exported");
  stroke(1);
  frameRate(60);
  */
}

/* When the mouse is dragged idk something happens */
function mouseDragged() {
  for (let i = 0; i < boxArray.length; i++) {
    if (boxArray[i].hover) {
      boxArray[i].changeColor(color);
    }
  }
}
function mousePressed() {
  for (let i = 0; i < boxArray.length; i++) {
    if (boxArray[i].hover) {
      boxArray[i].changeColor(color);
    }
  }
}

function initializeGrid() {
  for (let i = 0; i < gridY; i++) {
    for (let j = 0; j < gridX; j++) {
      boxArray.push(new colorBox(tempX, tempY, boxSize, boxSize));
      tempX += boxSize;
    }
    tempX = startX;
    tempY += boxSize;
  }
  tempX = startX;
  tempY = startY;
}

function loadFrame(frame) {
  //loads requested frame
  boxArray = [];
  for (let i = 0; i < frameArray[frame].length; i++) {
    boxArray.push(frameArray[frame][i]);
  }
}

function toggleAnimation() {
  animate = !animate;
  console.log(animate);
  if (animate) {
    framePosition = 0;
    noStroke();
    console.log(frameSpeed);
    frameRate(frameSpeed);
  } else {
    stroke(1);
    frameRate(60);
  }
}

function gifCheck(){//this will save individual frames for gif then decide whether to keep going or not
  console.log("entering the checker");
  for(let j = 0; j < gifLength; j++){
  for (let i = 0; i < boxArray.length; i++) {
    //displays frames for drawing
    boxArray[i].display();
  }

  if (framePosition == frameArray.length - 1) {
    framePosition = 0;
    loadFrame(framePosition);
  } else {
    increaseFrame();
  }


  if(gifCounter < gifLength){
    for(let n = 0; n < 2; n++){
      capturer.capture(canvasRef);
    }
    
    gifCounter++;
    
  }
}
  capturer.stop();
  capturer.save();
  exporting = false;
  stroke(1);
  gifCounter = 0;
}