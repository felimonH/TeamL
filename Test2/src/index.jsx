import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  /*TO SUMMARIZE, THE APP CLASS MANAGES ALL STATE CHANGES AND ACTS ALMOST LIKE A PARENT CLASS. THE TERM 'CLASS' AND 'COMPONENT' ARE USED
  INTERCHANGEABLY. ALL STATE CHANGES ARE MADE, HOWEVER, BY CHILD CLASSES VIA EVENT HANDLERS. THINK ENCAPSULATION FROM COMP401.*/

  constructor(props) {
    super(props);
    this.state = {
      default: true,
      filterText: '',
      page: '',
      degree: 0,
    };
    
    this.toggleButton = this.toggleButton.bind(this)
    this.handleDegreeChange = this.handleDegreeChange.bind(this)
  }
  toggleButton = (num) => {
    this.setState({ page: num }, () => {
      console.log('');
    });
  };

   handleDegreeChange = (num) => {
    this.setState({ degree: num }, () => {
      console.log('');
    });
  }
  
  //rendering components conditionally based on what tab you clicked on: (this.state.page). Right now, all tabs are rendering the same stuff but that can be changed. 
  render() {
    switch (this.state.page) {
      case 'RET':
        return (<><Navbar toggleButton={this.toggleButton} /><Canvas jQuery={this.state.page} /><RightParameterUI jQuery={this.state.page}/><RightDrawingUI /><LowerControlUI /><Footer /></>)
        break;
      case 'PRM':
        return (<><Navbar toggleButton={this.toggleButton} /><Canvas jQuery={this.state.page} /><RightParameterUI jQuery={this.state.page}/><RightDrawingUI /><LowerControlUI /><Footer /></>)
        break;
      case 'Diff. Drive':
        return (<><Navbar toggleButton={this.toggleButton} /><Canvas jQuery={this.state.page} /><RightParameterUI onDegreeChange = {this.handleDegreeChange} jQuery={this.state.page}/><LowerControlUI /><Footer /></>)
        break;
      case 'Bicycle':
        return (<><Navbar toggleButton={this.toggleButton} /><Canvas jQuery={this.state.page} stat = {this.state.degree} /><RightParameterUI onDegreeChange = {this.handleDegreeChange} jQuery={this.state.page}/><LowerControlUI /><Footer /></>)
        break;
      case 'Tricycle':
        return (<><Navbar toggleButton={this.toggleButton} /><Canvas jQuery={this.state.page} /><RightParameterUI jQuery={this.state.page}/><LowerControlUI /><Footer /></>)
        break;
      //changing this for testing
      default:
        return (<><Navbar toggleButton={this.toggleButton} /><HomePage /></>)



    }
  }
}
//NEEDS SOME WORK TO MAKE THE HOME PAGE LOOK A LITTLE BETTER
class HomePage extends React.Component {
  render() {
    return (<div class="center">
      <img src="https://media.istockphoto.com/photos/cute-blue-robot-giving-thumbs-up-3d-picture-id1350820098?b=1&k=20&m=1350820098&s=170667a&w=0&h=8gO4GcPH-wsEZS6PYn2WXbQN3ZPPv98vE6mBl-Ckwr8=" />
    </div>)
  }
}

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleButton = this.toggleButton.bind(this)
  }
  toggleButton(e) {
    this.props.toggleButton(e.target.name)
  }

  render() {

    return (<div id="naving">
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">Start Here</a>
          </div>

          <ul class="nav navbar-nav">
            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">Path Algorithms
                <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#Algorithm_1" onClick={this.toggleButton} name="RET">Rapidly Exploring Random Trees</a></li>
                <li><a href="#Algorithm_2" onClick={this.toggleButton} name="PRM">Probabilistic Road Map</a></li>
              </ul>
            </li>

            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">Motion Models
                <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#Model_1" onClick={this.toggleButton} name="Diff. Drive">Differential Drive</a></li>
                <li><a href="#Model_2" onClick={this.toggleButton} name="Bicycle">Bicycle</a></li>
                <li><a href="#Model_3" onClick={this.toggleButton} name="Tricycle">Tricycle</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>)
  }
}

class Canvas extends React.Component {
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
    $('#play').click(function () {
      if (startCoord != undefined) {
        branch(startCoord.x, startCoord.y);
      }
    });

    $('#reset').click(function () {
      if (startCoord != undefined) {
        branch(startCoord.x, startCoord.y);
      }
    });

    $('#resetAlgo').click(function () {
      drawPolygons();
      drawGoalAndStart();
    });

    function detectPixel(x, y) {
      var pixel = context.getImageData(x, y, 1, 1).data;
      if (pixel[2] == 255 || pixel[3] == 255) {
        return true;
      }
    }

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
    var degre = this.props.stat
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

    function draw() {
      var ctx = context;
      ctx.globalCompositeOperation = 'destination-over';
      //var rect = { x: 100, y: 100, width: 175, height: 50 };
      ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas



      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2,);

      //earth
      var time = new Date();
      ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
      ctx.translate(105, 0);
      //ctx.fillRect(0, -12, 40, 24); // Shadow
      ctx.fillStyle = 'green';
      ctx.fillRect(-12, -12, 60, 60);

      // Moon
      ctx.save();
      ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
      context.fillStyle = 'red';
      ctx.translate(0, 28.5);
      ctx.fillRect(-3.5, -3.5, 50, 50);
      ctx.restore();

      ctx.restore();

      ctx.beginPath();
      ctx.strokeStyle = 'green';
      ctx.arc(canvas.width / 2, canvas.height / 2, 105, 0, Math.PI * 2, false); // Earth orbit
      ctx.stroke();

      //these are not centered 
      ctx.fillStyle = 'red';
      var rectWidth = 10;
      var rectHeight = 10;
      ctx.fillRect(canvas.width / 2 - rectWidth / 2, canvas.height / 2 - rectHeight / 2, rectWidth, rectHeight);
      ctx.fillStyle = 'blue';
      ctx.fillRect(canvas.width / 2, canvas.height / 2, 30, 30);


      window.requestAnimationFrame(draw);
    }

    //to create animations delete screen and redraw in new position 





    $('#done').click(function () {

      alert(document.getElementById("degree").value)

    });
    

    function concept() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)


      var startX = canvas.width / 2;
      var startY = canvas.height / 2;

      // draw an unrotated reference rect

      function drawStaticRect() {
        ctx.beginPath();

        ctx.rect(startX + 50, startY - 10, 200, 30);

        ctx.fillStyle = "blue";
        ctx.fill();
      }

      //"DEGREE".value GENERATES UNEXPECTED ERRORS, MUST CONVERT THIS TO STATE TO USE BETWEEN COMPONENTS FOR A PERMANENT SOLUTION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      // draw a rotated rect
    
      drawRotatedRect(startX, startY, 100, 20, degre);
      drawStaticRect();


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

    //testDontImpliment
    //window.requestAnimationFrame(draw);
    window.requestAnimationFrame(concept);
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

class RightParameterUI extends React.Component {
  constructor(props) {
    super(props);

     this.handleDegreeChange = this.handleDegreeChange.bind(this);
  }
  handleDegreeChange(e) {
    this.props.onDegreeChange(e.target.value);
  }
  render() {
    switch (this.props.jQuery) {
      case 'Diff. Drive':
        return (<div id="rightParameterUI">
      Parameters (just as a reminder for the future, we need to do error checking on all parameters)
      <br></br>
      <label for="parameter_1" id="label_1">Other:</label>
      <br></br>
      <input
        type="text"
        placeholder="Search..."
        id="parameter_1"
      />
      <br></br>
      <label for="parameter_2">Speed:</label>
      <br></br>
      <input type="number" placeholder="10" id="parameter_2"/>
      <br></br>
      <label for="degree" >Degree:</label>
      <br></br>
      <input type="number" id="degree" placeholder='0'></input>
    </div>)
      case 'Bicycle':
        return (<div id="rightParameterUI">
      Parameter (just as a reminder for the future, we need to do error checking on all parameters)
      <br></br>
      <label for="parameter_1" id="label_1">Other:</label>
      <br></br>
      <input
        type="text"
        placeholder="Search..."
        id="parameter_1"
  
      />
      <br></br>
      <label for="parameter_2">Speed:</label>
      <br></br>
      <input type="number" placeholder="10" id="parameter_2" />
      <br></br>
      <label for="degree" >Degree:</label>
      <br></br>
      <input type="number" id="degree" placeholder='0'onChange = {this.handleDegreeChange}></input>
    </div>)
      case 'Tricycle':
        return (<div id="rightParameterUI">
      Parametes (just as a reminder for the future, we need to do error checking on all parameters)
      <br></br>
      <label for="parameter_1" id="label_1">Other:</label>
      <br></br>
      <input
        type="text"
        placeholder="Search..."
        id="parameter_1"
        
      />
      <br></br>
      <label for="parameter_2">Speed:</label>
      <br></br>
      <input type="number" placeholder="10" id="parameter_2"/>
      <br></br>
      <label for="degree" >Degree:</label>
      <br></br>
      <input type="number" id="degree" placeholder='0'></input>
    </div>)

    //for some reason, switching between bicycle and one of the pathfinding algorithms causes an unforseen error because the jQueryCode is still checking for a parameter for some reason. This is a 
    //way to fix it for now, just render an input that will be overwritten
      case 'PRM':
        return (<div id="rightParameterUI">
      <input type="number" id="degree" placeholder='0'></input>
    </div>
      )
      case 'RET':
        return (<div id="rightParameterUI">
      <input type="number" id="degree" placeholder='0'></input>
    </div>
      )
    }
      /*
    return (<div id="rightParameterUI">
      Parameters (just as a reminder for the future, we need to do error checking on all parameters)
      <br></br>
      <label for="parameter_1" id="label_1">Other:</label>
      <br></br>
      <input
        type="text"
        placeholder="Search..."
        id="parameter_1"
      />
      <br></br>
      <label for="parameter_2">Speed:</label>
      <br></br>
      <input type="number" placeholder="10" id="parameter_2" />
      <br></br>
      <label for="degree" >Degree:</label>
      <br></br>
      <input type="number" id="degree" placeholder='0'></input>
    </div>)
  }
  */
}}

class RightDrawingUI extends React.Component {
  render() {
    return (<div id="rightDrawingUI">
      Drawing UI
      <div>

        <button id="done">Click when done assigning points</button>
        <br></br>
        <button id="clear">Click to clear all obstacles</button>
        <br></br>
        <button id="delete">Click to delete all shapes</button>
        <br></br>
        <button id="goal">Click to set goal</button>
        <br></br>
        <button id="start">Click to set start</button>
      </div>
    </div>)
  }
}

class RightObstacleUI extends React.Component {
  render() {
    return (<div id="rightObstacleUI">Obstacle UI
      <div><img draggable={true} width={60} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Circle_-_black_simple.svg/500px-Circle_-_black_simple.svg.png"></img>
        <button id="Circle">Add a Circle</button>
      </div>
      <div><img width={60} src="https://upload.wikimedia.org/wikipedia/commons/2/27/Red_square.svg"></img>
        <button id="Square">Add a Square</button></div>
      <div>
        <img width={60} src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Rectangle_example.svg/800px-Rectangle_example.svg.png"></img>
        <button id="Rectangle">Add a Rectangle</button>
      </div></div>)
  }
}

class Footer extends React.Component {
  render() {
    return (<div id="foot">
      Random Footer :)
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
//some questions for our next meeting: 1.) Arbitrary obstacles vs. drag-and-drop for the pathfinding algorithms. 2.) Any missing pseudocode we may need for pathfinding algorithms/motion models. 3.) Anything back from hosting (UNC hosting)
//some reminders: 1.) We are not doing separate tabs or "separate" pages. Unfortunately, right now we can't focus on using a router or backend to accomplish navigating through the app by typing in a URL. Really, we don't need this anyways but keep that in mind.
//2.) Stick to basic coding rules of indentation and commenting. I myself (Adam) am guilty of not doing this but we all need to commit ourselves to making readable code for our own sakes.
//3.) Some easy things to do over Spring Break: Make home page prettier, find a purpose for the footer or get rid (figure out how to take up the empty space if you do get rid), styling or color issues you may have with the site.
// Some harder things to do: Fix the file structure so we don't have to cd and then do stuff. Figure out how are we going to get this thing on the web once they figure out hosting. Actually implement the motion models and pathfinding algorithms. 