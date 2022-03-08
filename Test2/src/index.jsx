import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     default: true,
     filterText: '',
     page: '',
     num: 0
    };
    this.toggleButton = this.toggleButton.bind(this)

  }
  toggleButton = (num) => {
    this.setState({ page: num }, () => {
  console.log('');
}); 
};

    render() {   
      switch(this.state.page) {
        case '1':
          return(<><Navbar toggleButton = {this.toggleButton}/><HomePage/><Canvas/><RightObstacleUI/><LowerControlUI/><Footer/></>)
          break;
        case '2':
           return(<><Navbar toggleButton = {this.toggleButton}/><HomePage/><Canvas2/><RightObstacleUI/><LowerControlUI/><Footer/></>)
          break;
        case '3':
           return(<><Navbar toggleButton = {this.toggleButton}/><HomePage/><Canvas3/><RightDrawingUI/><LowerControlUI/><Footer/></>)
          break;
        case '4':
          return(<><Navbar toggleButton = {this.toggleButton}/><HomePage/><Canvas4/><RightDrawingUI/><LowerControlUI/><Footer/></>)
          break;
        case '5':
          return(<><Navbar toggleButton = {this.toggleButton}/><HomePage/><Canvas5/><RightDrawingUI/><LowerControlUI/><Footer/></>)
          break;
        default:
          return(<><Navbar toggleButton = {this.toggleButton}/><HomePage/></>)
        
    }
  }
    }
class HomePage extends React.Component {
  render() {
    return (<div class="center">
<img src = "https://media.istockphoto.com/photos/cute-blue-robot-giving-thumbs-up-3d-picture-id1350820098?b=1&k=20&m=1350820098&s=170667a&w=0&h=8gO4GcPH-wsEZS6PYn2WXbQN3ZPPv98vE6mBl-Ckwr8="/>
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
                <li><a href="#Algorithm_1"  onClick={this.toggleButton} name = "1">Algorithm 1</a></li>
                <li><a href="#Algorithm_2"  onClick={this.toggleButton} name = "2">Algorithm 2</a></li>
              </ul>
            </li>

            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">Motion Models
                <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#Model_1"  onClick={this.toggleButton} name = "3">Model 1</a></li>
                <li><a href="#Model_2"  onClick={this.toggleButton} name = "4">Model 2</a></li>
                <li><a href="#Model_3"  onClick={this.toggleButton} name = "5">Model 3</a></li>
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

  jQueryCode = () => {
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
    //Does: Creates new array for new object points per object
    $('#done').click(function () {
      isDone = isDone + 1;
      var innerArray = [];
      coordinates.push(innerArray);
    });

    //Resets all 
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
      //Stops when there is 5 shapes or there the current point has 10 coords.
      //prevents too many objects
      if (isDone > 5) {
        alert("too much arrays")
        return;
      }

      //prevents too many points to an object
      if (coordinates[isDone].length > 10) {
        alert("too many points")
        return;
      }



      // tell the browser we're handling this event
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

  componentDidMount() {
    
    this.jQueryCode()
  }
  render() {
    return (<div id="canvasSpace">
      <canvas id="canvas" width={900} height={300}></canvas>
    </div>)
  }


}



class Canvas2 extends React.Component {
  constructor(props) {
    super(props);
  }
///
  jQueryCode = () => {
    //Canvas Stuff begins here
    function establishCanvas() {
      //Gets width and height to fill space 
      //Dynamic Canvas size
      //width 80vw height 60 vh
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
///
    //Does Creates a double array
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

    //Resets all 
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
      //Stops when there is 5 shapes or there the current point has 10 coords.
      //prevents too many objects
      if (isDone > 5) {
        alert("too much arrays")
        return;
      }

      //prevents too many points to an object
      if (coordinates[isDone].length > 10) {
        alert("too many points")
        return;
      }



      // tell the browser we're handling this event
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

  componentDidMount() {
    
    this.jQueryCode()
  }
  render() {
    return (<div id="canvasSpace">
      <canvas id="canvas" width={900} height={300}></canvas>
    </div>)
  }


}

class Canvas3 extends React.Component {

  jQueryCode = () => {
   //Canvas Stuff begins here
    function establishCanvas() {
      //Gets width and height to fill space 
      //Dynamic Canvas size
      //width 80vw height 60 vh
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
  componentDidMount() {
    this.jQueryCode()
  }
  render() {
    return (<div id="canvasSpace">
      <canvas id="canvas" width={900} height={300}></canvas>
    </div>)
  }
}


class Canvas4 extends React.Component {

  jQueryCode = () => {
   //Canvas Stuff begins here
    function establishCanvas() {
      //Gets width and height to fill space 
      //Dynamic Canvas size
      //width 80vw height 60 vh
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
  componentDidMount() {
    this.jQueryCode()
  }
  render() {
    return (<div id="canvasSpace">
      <canvas id="canvas" width={900} height={300}></canvas>
    </div>)
  }
}


class Canvas5 extends React.Component {

  jQueryCode = () => {
   //Canvas Stuff begins here
    function establishCanvas() {
      //Gets width and height to fill space 
      //Dynamic Canvas size
      //width 80vw height 60 vh
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
  componentDidMount() {
    this.jQueryCode()
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

  constructor(props) {
    super(props);
  }
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
 constructor(props) {
   super(props);
 }
  render() {
    return (<div id = "rightObstacleUI">Obstacle UI
      <div><img draggable = {true} width = {60} src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Circle_-_black_simple.svg/500px-Circle_-_black_simple.svg.png"></img>
      <button id = "Circle">Add a Circle</button>
      </div>
      <div><img width = {60} src = "https://upload.wikimedia.org/wikipedia/commons/2/27/Red_square.svg"></img>
      <button id = "Square">Add a Square</button></div>
       <div>
         <img width = {60}  src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Rectangle_example.svg/800px-Rectangle_example.svg.png"></img>
      <button id = "Rectangle">Add a Rectangle</button>
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

