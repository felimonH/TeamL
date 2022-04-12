import React from 'react';
import ReactDOM from 'react-dom';
import cycles from '../js_versions/Motion_Model_Bicycle'

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
      AngularVelocity: 0,

    };
    this.toggleButton = this.toggleButton.bind(this);
    this.handleDegreeChange = this.handleDegreeChange.bind(this);
    this.handleDistF2BChange = this.handleDistF2BChange.bind(this);
    this.handleAngularVelocityChange = this.handleAngularVelocityChange.bind(this);
    this.handleFrontWheelRadiusChange = this.handleFrontWheelRadiusChange.bind(this)
    this.handleDistB2WChange = this.handleDistB2WChange.bind(this)
    //Diff. Drive Fields
    this.handleDistBetweenWheelsChange = this.handleDistBetweenWheelsChange.bind(this);
    this.handleLeftAngularVelocityChange = this.handleLeftAngularVelocityChange.bind(this);
    this.handleRightAngularVelocityChange = this.handleRightAngularVelocityChange.bind(this);
    this.handleLeftWheelRadiusChange = this.handleLeftWheelRadiusChange.bind(this);
    this.handleRightWheelRadiusChange = this.handleRightWheelRadiusChange.bind(this);


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
  handleDistBetweenWheelsChange = (num) => {
    this.setState({ distance_between_wheels: num }, () => {
      console.log('');
    });
  }
  handleLeftAngularVelocityChange = (num) => {
    this.setState({ left_angular_velocity: num }, () => {
      console.log('');
    });
  }
  handleRightAngularVelocityChange = (num) => {
    this.setState({ right_angular_velocity: num }, () => {
      console.log('');
    });
  }
  handleLeftWheelRadiusChange = (num) => {
    this.setState({ left_wheel_radius: num }, () => {
      console.log('');
    });
  }
  handleRightWheelRadiusChange = (num) => {
    this.setState({ right_wheel_radius: num }, () => {
      console.log('');
    });
  }
  handleDistF2BChange = (num) => {
    this.setState({ DistFrontToBack: num }, () => {
      console.log('');
    });
  }
  handleAngularVelocityChange = (num) => {
    this.setState({ AngularVelocity: num }, () => {
      console.log('');
    });
  }
  handleDistB2WChange = (num) => {
    this.setState({ DistBackTwoWheels: num }, () => {
      console.log('');
    });
  }
  handleFrontWheelRadiusChange = (num) => {
    this.setState({ fRadius: num }, () => {
      console.log('');
    });
  }

  //rendering components conditionally based on what tab you clicked on: (this.state.page). Right now, all tabs are rendering the same stuff but that can be changed. 
  render() {
    switch (this.state.page) {
      case 'RET':
        return (<><Navbar toggleButton={this.toggleButton} /><Canvas jQuery={this.state.page} /><RightParameterUI jQuery={this.state.page} /><RightDrawingUI /><LowerControlUI /><Footer /></>)
        break;
      case 'PRM':
        return (<><Navbar toggleButton={this.toggleButton} /><Canvas jQuery={this.state.page} /><RightParameterUI jQuery={this.state.page} /><RightDrawingUI /><LowerControlUI /><Footer /></>)
        break;
      case 'Diff. Drive':
        return (<><Navbar toggleButton={this.toggleButton} /><Canvas
          jQuery={this.state.page} /><RightParameterUI onLeftAngularVelocityChange={this.handleLeftAngularVelocityChange}
            onRightAngularVelocityChange={this.handleRightAngularVelocityChange}
            onLeftWheelRadiusChange={this.handleLeftWheelRadiusChange}
            onRightWheelRadiusChange={this.handleRightWheelRadiusChange}
            onDistBetweenWheelsChange={this.handleDistBetweenWheelsChange} jQuery={this.state.page} /><LowerControlUI /></>)
        break;
      case 'Bicycle':
        return (<><Navbar toggleButton={this.toggleButton} /><Canvas jQuery={this.state.page}
          degre={this.state.degree}
          AngularVelocity={this.state.AngularVelocity}
          DistFrontToBack={this.state.DistFrontToBack}
          fRadius={this.state.fRadius}

        /><RightParameterUI
            onAngularVelocityChange={this.handleAngularVelocityChange}
            onDegreeChange={this.handleDegreeChange}

            onFrontWheelRadiusChange={this.handleFrontWheelRadiusChange}
            onDistF2BChange={this.handleDistF2BChange}
            jQuery={this.state.page} /><LowerControlUI /></>)
        break;
      case 'Tricycle':
        return (<><Navbar toggleButton={this.toggleButton} /><Canvas jQuery={this.state.page} /><RightParameterUI onAngularVelocityChange={this.handleAngularVelocityChange}
          onDegreeChange={this.handleDegreeChange}
          onDistB2WChange={this.handleDistB2WChange}
          onFrontWheelRadiusChange={this.handleFrontWheelRadiusChange}
          onDistF2BChange={this.handleDistF2BChange}
          jQuery={this.state.page} /><LowerControlUI /></>)
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
            <a class="navbar-brand" href="#">Interactive Robotics Education Tool</a>
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

    this.state = {
      last_position: [],
    }
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

      //Edge case that "erases previous drawn circle"
      if (startCoord != null) {
        context.beginPath();
        context.arc(startCoord.x, startCoord.y, 31, 0, 2 * Math.PI);
        context.fillStyle = `rgb(233, 221, 221)`;
        context.fill()
      }

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

      //Edge case that "erases previous drawn circle"
      if (goalCoord != null) {
        context.beginPath();
        context.arc(goalCoord.x, goalCoord.y, 31, 0, 2 * Math.PI);
        context.fillStyle = `rgb(233, 221, 221)`;
        context.fill()
      }

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

      if (coordinates[isDone].length == 1) {

        context.beginPath();
        context.moveTo(mouseX, mouseY);
      } else {

        //Check distance and snap if close enough to start

        var a = coordinates[isDone][0].x - mouseX;
        var b = coordinates[isDone][0].y - mouseY;

        var c = Math.sqrt(a * a + b * b);

        if (c < 20) {

          context.lineWidth = 2;
          context.strokeStyle = 'red';
          context.lineTo(mouseX, mouseY);
          context.stroke();
          fill();

        } else {
          context.lineWidth = 2;
          context.strokeStyle = 'red';
          context.lineTo(mouseX, mouseY);
          context.stroke();
        }

      }

      //drawPolygon();
    }
    function fill() {
      context.fillStyle = 'red';
      context.fill();
      isDone = isDone + 1;
      var innerArray = [];
      coordinates.push(innerArray);
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

    var proceed = true;
    //document.getElementById("rightDrawingUI").style.gridColumn =
    //to create animations delete screen and redraw in new position 
    //Do: Establish vehicle frame and and wheel off of a single X and Y coordinate ("concept" function below)
    //Do: Use current JS code (other folder) to change poistion and redraw below 
    //Do: 
    //Degree to radians
    // remainder to 360
    var degre = (this.props.degre % 360)


    var DistFrontToBack = this.props.DistFrontToBack;
    var fRadius = this.props.fRadius;
    var AngularVelocity = this.props.AngularVelocity;

    if (degre == 0) {
      //degre = 1;
    }
    if (isNaN(DistFrontToBack)) {
      DistFrontToBack = 30;
    }
    if (isNaN(fRadius)) {
      fRadius = 10;
    }
    if (isNaN(AngularVelocity)) {
      AngularVelocity = 0;
    }


    var radians = 0;
    // convert to neg when greater than 180
    if (degre > 180) {
      degre = degre - 360;
    }
    radians = degre * Math.PI / 180;

    var startX = canvas.width / 2;
    var startY = canvas.height / 4;
    var bikeBodyAngle = 0;
    var notUsedForBikeVariable = 0;

    $('#play').click(function () {
      //alert("Play functionality must be implemented")
      proceed = true;
    })
    $('#pause').click(function () {
      //alert("Play functionality must be implemented")
      proceed = false;
    })


    const bike = new cycles(fRadius, DistFrontToBack, AngularVelocity, radians, startX, startY, bikeBodyAngle, notUsedForBikeVariable);
    //Does: Flips canvas to correct orientation
    ctx.transform(1, 0, 0, -1, 0, canvas.height);


    $('#resetAlgo').click(function () {
      //alert("Play functionality must be implemented")


    })
    function concept() {


      //Does: Sets Focul point to center of canvas


      //Pause when off screen
      if (startX > canvas.width) {
        proceed = false;
      }
      if (0 > startX) {
        proceed = false;
      }
      if (startY > canvas.height) {
        proceed = false;
      }
      if (0 > startY) {
        proceed = false;
      }


      //Pause when stop is false
      if (proceed) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw a rotated rect
        var Cpos = bike.main();

        startX = Cpos[0];
        startY = Cpos[1];
        var theta = Cpos[2] - Math.PI / 2;
        drawWheel(startX, startY, fRadius * 2, DistFrontToBack / 4, degre, theta, DistFrontToBack);
        drawBody(startX, startY, DistFrontToBack, DistFrontToBack / 4, theta);
      }
      //check rotation
      //bodyCenter(startX, startY);
      //wheelCenter(startX, startY, DistFrontToBack);

      function bodyCenter(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
      }
      function wheelCenter(x, y, length) {

        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.rotate(theta);
        ctx.arc(0, 0 + length / 2, 3, 0, 2 * Math.PI)
        //ctx.arc(x, y + length / 2, 3, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        //ctx.rect(x, y, 50, 100);
        ctx.fill();

        ctx.restore();
      }

      function drawBody(x, y, height, width, theta) {
        var bodyX = -width / 2;
        var bodyY = -height / 2;
        // first save the untranslated/unrotated context
        ctx.save();

        ctx.beginPath();
        // move the rotation point to the center of the rect
        ctx.translate(x, y);
        // rotate the rect
        //ctx.rotate(theta);
        ctx.rotate(theta);

        // draw the rect on the transformed context
        // Note: after transforming [0,0] is visually [x,y]
        //       so the rect needs to be offset accordingly when drawn
        ctx.rect(bodyX, bodyY, width, height);
        //ctx.rect(startX + 50, startY - 10, 200, 30);

        ctx.fillStyle = "blue";
        ctx.fill();



        // restore the context to its untranslated/unrotated state
        ctx.restore();


      }

      function drawWheel(x, y, height, width, degrees, theta, offset) {

        // var wheely = -height / 2 + offset / 2;
        // first save the untranslated/unrotated context
        ctx.save();

        ctx.beginPath();
        // move the rotation point to the center of the body
        ctx.translate(x, y);
        ctx.rotate(theta);
        //Center is now 
        //  0, 0 + offset / 2

        //now offset for size of box 
        ctx.translate(0, 0 + offset / 2);
        ctx.rotate(degrees * Math.PI / 180);
        // rotate the rect

        // ctx.translate(x, y);
        // draw the rect on the transformed context
        // Note: after transforming [0,0] is visually [x,y]
        //       so the rect needs to be offset accordingly when drawn

        ctx.rect(-width / 2, -height / 2, width, height);

        ctx.fillStyle = "red";
        ctx.fill();



        // restore the context to its untranslated/unrotated state
        ctx.restore();




      }
      setTimeout(() => { window.requestAnimationFrame(concept); }, 1000 / 65);
      //window.requestAnimationFrame(concept);
    }

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
      //alert("boom");
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
        <button id="play"><img width="25" height="25" src="https://media.istockphoto.com/vectors/vector-play-button-icon-vector-id1066846868?k=20&m=1066846868&s=612x612&w=0&h=BikDjIPuOmb08aDFeDiEwDiKosX7EgnvtdQyLUvb3eA="></img></button>
        <button id="pause"><img width="40" height="25" src="data:image/png;base64,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"></img></button>
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
    this.handleAngularVelocityChange = this.handleAngularVelocityChange.bind(this);
    this.handleFrontWheelRadiusChange = this.handleFrontWheelRadiusChange.bind(this);
    this.handleDistF2BChange = this.handleDistF2BChange.bind(this);
    this.handleDistB2WChange = this.handleDistB2WChange.bind(this);
    this.handleDistBetweenWheelsChange = this.handleDistBetweenWheelsChange.bind(this);
    this.handleLeftWheelRadiusChange = this.handleLeftWheelRadiusChange.bind(this);
    this.handleRightWheelRadiusChange = this.handleRightWheelRadiusChange.bind(this);
    this.handleLeftAngularVelocityChange = this.handleLeftAngularVelocityChange.bind(this);
    this.handleRightAngularVelocityChange = this.handleRightAngularVelocityChange.bind(this);
  }
  handleDistB2WChange(e) {
    if (e.target.value <= 10 || e.target.value > 50) {
    } else {
      this.props.onDistB2WChange(e.target.value);
    }
  }
  handleDistF2BChange(e) {
    if (e.target.value <= 10 || e.target.value > 100) {
    } else {
      this.props.onDistF2BChange(e.target.value);
    }
  };
  handleDistBetweenWheelsChange(e) {
    if (e.target.value <= 0 || e.target.value > 10) {
    } else {
      this.props.onDistBetweenWheelsChange(e.target.value);
    }
  }
  handleDegreeChange(e) {
    this.props.onDegreeChange(e.target.value);
  };
  handleAngularVelocityChange(e) {
    if (e.target.value < 0 || e.target.value > 10) {
    } else {
      this.props.onAngularVelocityChange(e.target.value);
    }
  };
  handleLeftAngularVelocityChange(e) {
    if (e.target.value < 0 || e.target.value > 10) {
    } else {
      this.props.onLeftAngularVelocityChange(e.target.value);
    }
  };
  handleRightAngularVelocityChange(e) {
    if (e.target.value < 0 || e.target.value > 10) {
    } else {
      this.props.onRightAngularVelocityChange(e.target.value);
    }
  };
  handleFrontWheelRadiusChange(e) {
    if (e.target.value <= 0 || e.target.value > 50) {
    } else {
      this.props.onFrontWheelRadiusChange(e.target.value);
    }
  };
  handleLeftWheelRadiusChange(e) {
    if (e.target.value <= 0 || e.target.value > 10) {
    } else {
      this.props.onLeftWheelRadiusChange(e.target.value);
    }
  };
  handleRightWheelRadiusChange(e) {
    if (e.target.value <= 0 || e.target.value > 10) {
    } else {
      this.props.onRightWheelRadiusChange(e.target.value);
    }
  };

  render() {
    switch (this.props.jQuery) {
      case 'Diff. Drive':
        return (<div id="rightParameterUI">
          <h4>Parameters</h4>
          <br></br>
          <br></br>
          <h5>Robot Properties</h5>
          <label for="fRadius">Left Wheel Radius (0 &#60; x &#8804; 10)</label>
          <br></br>
          <input type="number" id="fRadius" placeholder='0' onChange={this.handleLeftWheelRadiusChange}></input>
          <br></br>

          <label for="fRadius">Right Wheel Radius (0 &#60; x &#8804; 10)</label>
          <br></br>
          <input type="number" id="fRadius" placeholder='0' onChange={this.handleRightWheelRadiusChange}></input>
          <br></br>

          <label for="fRadius">Distance Between Wheels (0 &#60; x &#8804; 10)</label>
          <br></br>
          <input type="number" id="fRadius" placeholder='0' onChange={this.handleDistBetweenWheelsChange}></input>
          <br></br>

          <h5>Control Parameters</h5>
          <label for="AngularVelocity">Left Angular Velocity (0 &#8804; x &#8804; 10)</label>
          <br></br>
          <input type="number" id="AngularVelocity" placeholder='0' onChange={this.handleLeftAngularVelocityChange}></input>
          <br></br>

          <label for="AngularVelocity">Right Angular Velocity (0 &#8804; x &#8804; 10)</label>
          <br></br>
          <input type="number" id="AngularVelocity" placeholder='0' onChange={this.handleRightAngularVelocityChange}></input>

        </div>)
      case 'Bicycle':
        return (<div id="rightParameterUI">
          <h4>Parameters</h4>
          <br></br>
          <br></br>
          <h5>Robot Properties</h5>
          <label for="fRadius">Front Wheel Radius (0 &#60; x &#8804; 50)</label>
          <br></br>
          <input type="number" id="fRadius" placeholder='0' onChange={this.handleFrontWheelRadiusChange}></input>
          <br></br>

          <label for="DistFrontToBack">Distance front to back (10 &#60; x &#8804; 100)</label>
          <br></br>
          <input type="number" id="DistFrontToBack" placeholder='0' onChange={this.handleDistF2BChange}></input>
          <br></br>
          <h5>Control Parameters</h5>
          <label for="degree" >Steering Angle(&#8477;)</label>
          <br></br>
          <input type="number" id="degree" placeholder='0' onChange={this.handleDegreeChange}></input>
          <br></br>



          <label for="AngularVelocity">Angular Velocity (0 &#8804; x &#8804; 10)</label>
          <br></br>
          <input type="number" id="AngularVelocity" placeholder='0' onChange={this.handleAngularVelocityChange}></input>

        </div>)
      case 'Tricycle':
        return (<div id="rightParameterUI">
          <h4>Parameters</h4>
          <br></br>
          <br></br>
          <h5>Robot Properties</h5>
          <label for="fRadius">Front Wheel Radius (0 &#60; x &#8804; 50)</label>
          <br></br>
          <input type="number" id="fRadius" placeholder='0' onChange={this.handleFrontWheelRadiusChange}></input>
          <br></br>

          <label for="DistFrontToBack">Distance front to back (10 &#60; x &#8804; 100)</label>
          <br></br>
          <input type="number" id="DistFrontToBack" placeholder='0' onChange={this.handleDistF2BChange}></input>
          <br></br>
          <label for="DistanceBetweenBackWheels">Distance Between Back Wheels (10 &#60; x &#8804; 50)</label>
          <br></br>
          <input type="number" id="AngularVelocity" placeholder='0' onChange={this.handleAngularVelocityChange}></input>
          <br></br>
          <h5>Control Parameters</h5>
          <label for="AngularVelocity">Angular Velocity (0 &#8804; x &#8804; 10)</label>
          <br></br>
          <input type="number" id="AngularVelocity" placeholder='0' onChange={this.handleAngularVelocityChange}></input>
          <br></br>

          <label for="degree" >Degree (&#8477;)</label>
          <br></br>
          <input type="number" id="degree" placeholder='0' onChange={this.handleDegreeChange}></input>
          <br></br>


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
  }
}

class RightDrawingUI extends React.Component {
  render() {
    return (<div id="rightDrawingUI">
      Drawing UI
      <div>


        <button id="clear">Click to clear all obstacles</button>
        <br></br>

        <button id="goal">Click to set goal</button>
        <br></br>
        <button id="start">Click to set start</button>
      </div>
    </div>)
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