import React from 'react'

export class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }

  //THIS IS WHERE YOU PUT YOUR JAVASCRIPT/JQUERY CODE FOR MOTION MODELS/PATHFINDING ALGORITHMS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  jQueryCodeRET = () => {

    //Does: Creates canvas based off screen size
    function establishCanvas() {
      var div = document.getElementById("canvasSpace");
      var canvas = document.createElement('canvas');
      var sizeWidth = 80 * window.innerWidth / 100,
        sizeHeight = 60 * window.innerHeight / 100 || 766;
      canvas.width = sizeWidth;
      canvas.height = sizeHeight;
      document.getElementById("canvas").remove();
      div.innerHTML += '<canvas id="canvas" width= ' + sizeWidth + ' height=' + sizeHeight + '></canvas>';
    }

    establishCanvas()
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var cw = canvas.width;
    var ch = canvas.height;
    var offsetX, offsetY;
    //Does: Setups canvas so you can draw even after scrolling
    function reOffset() {
      var BB = canvas.getBoundingClientRect();
      offsetX = BB.left;
      offsetY = BB.top;
    }

    reOffset();
    window.onscroll = function (e) {
      reOffset();
    }

    //Does: setup drawing
    context.lineWidth = 2;
    context.strokeStyle = 'blue';

    //Does: Initalizes obstacles
    var coordinates = [];
    var isDone = 0;
    var innerArray = [];
    coordinates.push(innerArray)

    //Does: next mouse sets goal or start
    var setGoal = false;
    var setStart = false;
    var goalCoord;
    var startCoord;

    //Does: Creates new array for new object points per object
    $('#done').click(function () {
      isDone = isDone + 1;
      var innerArray = [];
      coordinates.push(innerArray)
    });

    //Does: Resets all of canvas 
    $('#delete').click(function () {
      context.clearRect(0, 0, cw, ch);
      isDone = 0;
      coordinates = [];
      innerArray = [];
      coordinates.push(innerArray);
    });

    //Do: sets up buttons for start and goal for robot 
    //Do: setup initalize robot pos/ goal position 
    //Do: setup collision detection when initalizing robot and obstacles 
    $('#goal').click(function () {
      setGoal = true;
      setStart = false;
    });

    $('#start').click(function () {
      setStart = true;
      setGoal = false;
    });
     //Does: sets up buttons for start and goal for robot 
    //Does: setup initalize robot pos/ goal position 
    //Does: setup collision detection when initalizing robot and obstacles 
    $('#goal').click(function () {
      setGoal = true;
      setStart = false;
    });

    $('#start').click(function () {
      setStart = true;
      setGoal = false;
    });
    //Does: handles when cavas is clicked
    //Do: make conditions for goal and start
    $("#canvas").mousedown(function (e) {
      if (setStart) {
        placeStart(e);
      } else if (setGoal) {
        placeGoal(e);
      } else {
        drawObstacle(e);
      }
    });
    function placeStart(e) {
      //Do: edgecase for pre drawn obstacles
      e.preventDefault();
      e.stopPropagation();
      var mouseX = parseInt(e.clientX - offsetX);
      var mouseY = parseInt(e.clientY - offsetY);
      context.beginPath();
      context.arc(mouseX, mouseY, 30, 0, 2 * Math.PI);
      context.fillStyle = 'blue';
      context.fill()

      startCoord = { x: mouseX, y: mouseY };
      setStart = false;
    };
    function placeGoal(e) {
      //Do: edgecase for predrawn obstacles
      e.preventDefault();
      e.stopPropagation();
      var mouseX = parseInt(e.clientX - offsetX);
      var mouseY = parseInt(e.clientY - offsetY);

      context.beginPath();
      context.arc(mouseX, mouseY, 30, 0, 2 * Math.PI);
      context.fillStyle = 'yellow';
      context.fill()


      goalCoord = { x: mouseX, y: mouseY };
      setGoal = false;

    };
    //Does: handles when cavas is clicked
    //Do: make conditions for goal and start
    $("#canvas").mousedown(function (e) {
      handleMouseDown(e);
    });

    function handleMouseDown(e) {
      //Does: Stops when there is 5 shapes or there the current point has 10 coords.
      //Does: prevents too many objects
      if (isDone > 5) {
        alert("too much arrays")
        return;
      }
      //Does: prevents too many points to an object
      if (coordinates[isDone].length > 10) {
        alert("too many points")
        return;
      }
      // Does: tell the browser we're handling this event
      e.preventDefault();
      e.stopPropagation();

      var mouseX = parseInt(e.clientX - offsetX);
      var mouseY = parseInt(e.clientY - offsetY);
      coordinates[isDone].push({ x: mouseX, y: mouseY });

      drawPolygon()
    }

    //Does: Draws obstacles
    function drawPolygon() {

      context.beginPath();
      context.moveTo(coordinates[isDone][0].x, coordinates[isDone][0].y);
      for (var index = 1; index < coordinates[isDone].length; index++) {
        context.lineTo(coordinates[isDone][index].x, coordinates[isDone][index].y);
      }
      context.closePath();

      //Colors/Fills Shapes
      context.fillStyle = 'blue';
      context.fill();

      context.stroke();
    }

    function detectPixel(x, y) {
      var pixel = context.getImageData(x, y, 1, 1).data;
      if (pixel[2] == 255 || pixel[3] == 255) {
        return true;
      }
    }


  }

  jQueryCodePRM = () => {
    //Does: Creates canvas based off screen size
    function establishCanvas() {
      var div = document.getElementById("canvasSpace");
      var canvas = document.createElement('canvas');
      var sizeWidth = 80 * window.innerWidth / 100,
        sizeHeight = 60 * window.innerHeight / 100 || 766;
      canvas.width = sizeWidth;
      canvas.height = sizeHeight;
      document.getElementById("canvas").remove();
      div.innerHTML += '<canvas id="canvas" width= ' + sizeWidth + ' height=' + sizeHeight + '></canvas>';
    }

    establishCanvas()
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var cw = canvas.width;
    var ch = canvas.height;
    var offsetX, offsetY;
    //Does: Setups canvas so you can draw even after scrolling
    function reOffset() {
      var BB = canvas.getBoundingClientRect();
      offsetX = BB.left;
      offsetY = BB.top;
    }

    reOffset();
    window.onscroll = function (e) {
      reOffset();
    }



    //Does: Initalizes obstacles
    class UI {


    }
    var coordinates = [];
    var isDone = 0;
    var innerArray = [];
    coordinates.push(innerArray);

    //Does: next mouse sets goal or start
    var setGoal = false;
    var goalCoord;
    var setStart = false;
    var startCoord;

    //Does: Creates new array for new object points per object
    $('#done').click(function () {
      context.fillStyle = 'red';
      context.fill();
      isDone = isDone + 1;
      var innerArray = [];
      coordinates.push(innerArray);

    });

    //Does: deletes all obstacles
    $('#clear').click(function () {
      context.clearRect(0, 0, cw, ch);
    });

    //Does: Delete all of canvas and objects
    $('#delete').click(function () {
      context.clearRect(0, 0, cw, ch);
      isDone = 0;
      coordinates = [];
      innerArray = [];
      coordinates.push(innerArray);
    });


    //Does: sets up buttons for start and goal for robot 
    //Does: setup initalize robot pos/ goal position 
    //Does: setup collision detection when initalizing robot and obstacles 
    $('#goal').click(function () {
      setGoal = true;
      setStart = false;
    });

    $('#start').click(function () {
      setStart = true;
      setGoal = false;
    });
    //Does: handles when cavas is clicked
    //Do: make conditions for goal and start
    $("#canvas").mousedown(function (e) {
      if (setStart) {
        placeStart(e);
      } else if (setGoal) {
        placeGoal(e);
      } else {
        drawObstacle(e);
      }
    });
    function placeStart(e) {
      //Do: edgecase for pre drawn obstacles
      e.preventDefault();
      e.stopPropagation();
      var mouseX = parseInt(e.clientX - offsetX);
      var mouseY = parseInt(e.clientY - offsetY);
      context.beginPath();
      context.arc(mouseX, mouseY, 30, 0, 2 * Math.PI);
      context.fillStyle = 'blue';
      context.fill()

      startCoord = { x: mouseX, y: mouseY };
      setStart = false;
    };
    function placeGoal(e) {
      //Do: edgecase for predrawn obstacles
      e.preventDefault();
      e.stopPropagation();
      var mouseX = parseInt(e.clientX - offsetX);
      var mouseY = parseInt(e.clientY - offsetY);

      context.beginPath();
      context.arc(mouseX, mouseY, 30, 0, 2 * Math.PI);
      context.fillStyle = 'yellow';
      context.fill()


      goalCoord = { x: mouseX, y: mouseY };
      setGoal = false;

    };
    function drawObstacle(e) {

      //Does: Stops when there is 5 shapes or there the current point has 10 coords.
      //Does: prevents too many objects
      if (isDone > 5) {
        alert("too much arrays")
        return;
      }
      //Does: prevents too many points to an object
      if (coordinates[isDone].length > 10) {
        alert("too many points")
        return;
      }
      // Does: tell the browser we're handling this event
      e.preventDefault();
      e.stopPropagation();

      var mouseX = parseInt(e.clientX - offsetX);
      var mouseY = parseInt(e.clientY - offsetY);
      coordinates[isDone].push({ x: mouseX, y: mouseY });
      console.log(coordinates[isDone])
      if (coordinates[isDone].length == 1) {

        context.beginPath();
        context.moveTo(mouseX, mouseY);
      } else {

        context.lineWidth = 2;
        context.strokeStyle = 'red';
        //context.fillStyle = 'red';
        context.lineTo(mouseX, mouseY);
        context.stroke();
      }

      //drawPolygon();
    }

    //Does: Draws all stored obstacles 
    function drawPolygons() {
      //Does: setup drawing
      context.lineWidth = 2;
      context.strokeStyle = 'red';
      for (var obstacle = 0; obstacle < coordinates.length - 1; obstacle++) {
        context.beginPath();

        context.moveTo(coordinates[obstacle][0].x, coordinates[obstacle][0].y);
        for (var index = 1; index < coordinates[obstacle].length; index++) {
          context.lineTo(coordinates[obstacle][index].x, coordinates[obstacle][index].y);
        }
        context.closePath();
        //Colors/Fills Shapes
        context.fillStyle = 'red';
        context.fill();
      }
      context.stroke();
    }

    //Does: Draw Goal and Start
    function drawGoalAndStart() {
      context.beginPath();
      context.arc(startCoord.x, startCoord.y, 30, 0, 2 * Math.PI);
      context.fillStyle = 'blue';
      context.fill()

      context.beginPath();
      context.arc(goalCoord.x, goalCoord.y, 30, 0, 2 * Math.PI);
      context.fillStyle = 'yellow';
      context.fill()
    }
    //Does: Plays algo
    $('#play').click(function () {
      if (startCoord != undefined) {
        branch(startCoord.x, startCoord.y);
      }
    });
    //Does:  
    $('#reset').click(function () {
      if (startCoord != undefined) {
        branch(startCoord.x, startCoord.y);
      }
    });
    //Does: redraws obstacles and goal and start
    $('#resetAlgo').click(function () {
      drawPolygons();
      drawGoalAndStart();
    });

    //Does: Detects pixel and returns true if it is blank 
    function detectPixel(x, y) {
      var pixel = context.getImageData(x, y, 1, 1).data;
      if (pixel[2] == 255 || pixel[3] == 255) {
        return true;
      }
    }
    //Does: test branch algo No actual just some BS
    function branch(x, y) {
      if (x > 7000) {
        return;
      }

      if (x < -400) {
        return;
      }


      //dot
      context.beginPath();
      context.arc(x, y, 5, 0, 2 * Math.PI);
      context.fillStyle = 'green';
      context.fill()
      //split 

      //branch 
      setTimeout(() => {
        if (!detectPixel(x + 20, y - 60)) {
          context.lineWidth = 2;
          context.strokeStyle = 'yellow';
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(x + 20, y - 60);
          context.stroke();
          branch(x + 20, y - 60);
        }

        if (!detectPixel(x + 30, y + 20)) {
          context.lineWidth = 2;
          context.strokeStyle = 'red';
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(x + 30, y + 20);
          context.stroke();
          branch(x + 30, y + 20);
        }
      }, 1000);
    }
  }

  jQueryCodeDiffDrive = () => {
    function establishCanvas() {
      var div = document.getElementById("canvasSpace");
      var canvas = document.createElement('canvas');
      var sizeWidth = 80 * window.innerWidth / 100,
        sizeHeight = 60 * window.innerHeight / 100 || 766;
      canvas.width = sizeWidth;
      canvas.height = sizeHeight;
      document.getElementById("canvas").remove();
      div.innerHTML += '<canvas id="canvas" width= ' + sizeWidth + ' height=' + sizeHeight + '></canvas>';
    }
    establishCanvas()
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var cw = canvas.width;
    var ch = canvas.height;
    var offsetX, offsetY;
    function reOffset() {
      var BB = canvas.getBoundingClientRect();
      offsetX = BB.left;
      offsetY = BB.top;
    }
    reOffset();
    window.onscroll = function (e) { reOffset(); }
  }

  jQueryCodeBicycle = () => {
    //f



    function establishCanvas() {
      var div = document.getElementById("canvasSpace");
      var canvas = document.createElement('canvas');
      var sizeWidth = 80 * window.innerWidth / 100,
        sizeHeight = 60 * window.innerHeight / 100 || 766;
      canvas.width = sizeWidth;
      canvas.height = sizeHeight;
      document.getElementById("canvas").remove();
      div.innerHTML += '<canvas id="canvas" width= ' + sizeWidth + ' height=' + sizeHeight + '></canvas>';
    }
    establishCanvas()
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    //document.getElementById("rightDrawingUI").style.gridColumn =
    //to create animations delete screen and redraw in new position 
    //Do: Establish vehicle frame and and wheel off of a single X and Y coordinate ("concept" function below)
    //Do: Use current JS code (other folder) to change poistion and redraw below 
    //Do: 
    var degre = this.props.degre;

    var DistFrontToBack = this.props.DistFrontToBack;
    var fRadius = this.props.fRadius;
    var AnglularVelocity = this.props.AnglularVelocity;


    var startX = canvas.width / 2;
    var startY = canvas.height / 2;

    var notUsedForBikeVariable = 0;

    const bike = new cycles(fRadius, DistFrontToBack, AnglularVelocity, degre, startX, startY, degre, notUsedForBikeVariable);
    alert(bike.straightMotion(AnglularVelocity, startX, startY, degre, 1))
    function concept() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      //Does: Sets Focul point to center of canvas



      //"DEGREE".value GENERATES UNEXPECTED ERRORS, MUST CONVERT THIS TO STATE TO USE BETWEEN COMPONENTS FOR A PERMANENT SOLUTION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      // draw a rotated rect

      drawRotatedRect(startX, startY, 100, 20, degre);
      drawStaticRect();

      // draw an unrotated reference rect

      function drawStaticRect() {
        ctx.beginPath();
        //just an offset to preposition the seperate drawing 
        ctx.rect(startX + 50, startY - 10, 200, 30);

        ctx.fillStyle = "blue";
        ctx.fill();
      }
      function drawRotatedRect(x, y, width, height, degrees) {

        // first save the untranslated/unrotated context
        ctx.save();

        ctx.beginPath();
        // move the rotation point to the center of the rect
        ctx.translate(x + width / 2, y + height / 4);
        // rotate the rect
        ctx.rotate(degrees * Math.PI / 180);
        //ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());

        // draw the rect on the transformed context
        // Note: after transforming [0,0] is visually [x,y]
        //       so the rect needs to be offset accordingly when drawn
        ctx.rect(-width / 2, -height / 2, width, height);

        ctx.fillStyle = "gold";
        ctx.fill();



        // restore the context to its untranslated/unrotated state
        ctx.restore();




      }

      window.requestAnimationFrame(concept);
    }

  }

  jQueryCodeTricycle = () => {
    function establishCanvas() {
      var div = document.getElementById("canvasSpace");
      var canvas = document.createElement('canvas');
      var sizeWidth = 80 * window.innerWidth / 100,
        sizeHeight = 60 * window.innerHeight / 100 || 766;
      canvas.width = sizeWidth;
      canvas.height = sizeHeight;
      document.getElementById("canvas").remove();
      div.innerHTML += '<canvas id="canvas" width= ' + sizeWidth + ' height=' + sizeHeight + '></canvas>';
    }
    establishCanvas()
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var cw = canvas.width;
    var ch = canvas.height;
    var offsetX, offsetY;
    function reOffset() {
      var BB = canvas.getBoundingClientRect();
      offsetX = BB.left;
      offsetY = BB.top;
    }
    reOffset();
    window.onscroll = function (e) { reOffset(); }
  }
  //rendering jQuery code when you first render the Canvas Component
  componentDidMount() {

    switch (this.props.jQuery) {
      case "RET":
        this.jQueryCodeRET();
        break;
      case "PRM":
        this.jQueryCodePRM();
        break;
      case "Diff. Drive":
        this.jQueryCodeDiffDrive();
        break;
      case "Bicycle":
        this.jQueryCodeBicycle();
        break;
      case "Tricycle":
        this.jQueryCodeTricycle();
        break;
    }
  }
  //using JQuery code when you re-render (update) the Canvas Component
  componentDidUpdate() {
    switch (this.props.jQuery) {
      case "RET":
        this.jQueryCodeRET();
        break;
      case "PRM":
        this.jQueryCodePRM();
        break;
      case "Diff. Drive":
        this.jQueryCodeDiffDrive();
        break;
      case "Bicycle":
        this.jQueryCodeBicycle();
        break;
      case "Tricycle":
        this.jQueryCodeTricycle();
        break;
    }
  }
  
  render() {
    return (<div id="canvasSpace">
      <canvas id="canvas" width={900} height={300}></canvas>
    </div>)
  }
}

class LowerControlUI extends React.Component {

  jQueryCode = () => {
    $('#play').click(function () {
      //alert("Play functionality must be implemented")
    })
    $('#pause').click(function () {
      //alert("Pause functionality must be implemented")
    })
  }

  componentDidMount = () => {
    this.jQueryCode();
  }

  render() {
    return (<div id="lowerControlUI">
      Simulation Control
      <div>
        <button id="play">Start Simulation</button>
        <button id="pause">Pause Simulation</button>
        <button id="step">1 Step</button>
        <button id="line"> Even Smaller Step</button>
        <button id="resetAlgo"> Reset</button>

      </div>
    </div>)
  }
}
