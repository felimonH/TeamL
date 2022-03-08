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
    };
    this.toggleButton = this.toggleButton.bind(this)
  }
  toggleButton = (num) => {
    this.setState({ page: num }, () => {
      console.log('');
    });
  };
  //rendering components conditionally based on what tab you clicked on: (this.state.page). Right now, all tabs are rendering the same stuff but that can be changed. 
  render() {
    switch (this.state.page) {
      case 'RET':
        return (<><Navbar toggleButton={this.toggleButton} /><HomePage /><Canvas jQuery={this.state.page} /><RightObstacleUI /><RightParameterUI /><LowerControlUI /><Footer /></>)
        break;
      case 'PRM':
        return (<><Navbar toggleButton={this.toggleButton} /><HomePage /><Canvas jQuery={this.state.page} /><RightObstacleUI /><RightParameterUI /><LowerControlUI /><Footer /></>)
        break;
      case 'Diff. Drive':
        return (<><Navbar toggleButton={this.toggleButton} /><HomePage /><Canvas jQuery={this.state.page} /><RightDrawingUI /><RightParameterUI /><LowerControlUI /><Footer /></>)
        break;
      case 'Bicycle':
        return (<><Navbar toggleButton={this.toggleButton} /><HomePage /><Canvas jQuery={this.state.page} /><RightDrawingUI /><RightParameterUI /><LowerControlUI /><Footer /></>)
        break;
      case 'Tricycle':
        return (<><Navbar toggleButton={this.toggleButton} /><HomePage /><Canvas jQuery={this.state.page} /><RightDrawingUI /><RightParameterUI /><LowerControlUI /><Footer /></>)
        break;
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
    coordinates.push(innerArray);

    //Does: Creates new array for new object points per object
    $('#done').click(function () {
      isDone = isDone + 1;
      var innerArray = [];
      coordinates.push(innerArray);
    });

    //Does: Resets all of canvas 
    $('#delete').click(function () {
      context.clearRect(0, 0, cw, ch);
      isDone = 0;
      coordinates = [];
      innerArray = [];
      coordinates.push(innerArray);
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

      drawPolygon();
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
    context.lineWidth = 2;
    context.strokeStyle = 'blue';

    var coordinates = [];
    var isDone = 0;
    var innerArray = [];

    coordinates.push(innerArray);
    $('#done').click(function () {
      isDone = isDone + 1;
      var innerArray = [];
      coordinates.push(innerArray);
    });

    $('#delete').click(function () {
      context.clearRect(0, 0, cw, ch);
      isDone = 0;
      coordinates = [];
      innerArray = [];
      coordinates.push(innerArray);
    });

    $("#canvas").mousedown(function (e) {
      handleMouseDown(e);
    });

    function handleMouseDown(e) {
      if (isDone > 5) {
        alert("too much arrays")
        return;
      }
      if (coordinates[isDone].length > 10) {
        alert("too many points")
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      var mouseX = parseInt(e.clientX - offsetX);
      var mouseY = parseInt(e.clientY - offsetY);
      coordinates[isDone].push({ x: mouseX, y: mouseY });
      drawPolygon();
    }
    function drawPolygon() {

      context.beginPath();
      context.moveTo(coordinates[isDone][0].x, coordinates[isDone][0].y);
      for (var index = 1; index < coordinates[isDone].length; index++) {
        context.lineTo(coordinates[isDone][index].x, coordinates[isDone][index].y);
      }
      context.closePath();
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


    //to create animations delete screen and redraw in new position 
    function testDontImpliment() {
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");

      //ctx.fillRect(50, 20, 100, 50);
      //ctx.clearRect(50, 20, 100, 50));

      var rect = { x: 100, y: 100, width: 175, height: 50 };

      // draw the rectangle unrotated
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

      // draw the rectangle rotated by 45 degrees (==PI/4 radians)
      ctx.translate(rect.x + rect.width / 2, rect.y + rect.height / 2);
      ctx.rotate(Math.PI / 4);
      ctx.translate(-rect.x - rect.width / 2, -rect.y - rect.height / 2);

      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
      var t = 3

      context.clearRect(0, 0, canvas.width, canvas.height);

    };
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
      alert("Play functionality must be implemented")
    })
    $('#pause').click(function () {
      alert("Pause functionality must be implemented")
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
      </div>
    </div>)
  }
}

class RightParameterUI extends React.Component {
  render() {
    return (<div id="rightParameterUI">
      Parameters (just as a reminder for the future, we need to do error checking on all parameters)
      <label for="parameter_1" id="label_1">Parameter 1:</label>
      <input
        type="text"
        placeholder="Search..."
        id="parameter_1"
      />
      <br></br>
      <label for="parameter_2" id="label_2">Parameter 2:</label>
      <input type="number" id="parameter_2" />
    </div>)
  }
}

class RightDrawingUI extends React.Component {
  render() {
    return (<div id="rightDrawingUI">
      Drawing UI
      <div>
        <button id="done">Click when done assigning points</button>
        <button id="delete">Click to delete all shapes</button>
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