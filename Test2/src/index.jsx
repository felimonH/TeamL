import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
      filterText: '',
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.toggleButton = this.toggleButton.bind(this)
    this.toggleButton2 = this.toggleButton2.bind(this)
  }
  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  toggleButton() {
    this.setState({ showButton: true });
  };
  toggleButton2() {
    this.setState({ showButton: false });
  };
  render() {
    return (<><Navbar toggleButton={this.toggleButton} toggleButton2={this.toggleButton2} /><Canvas /><RightDrawingUI />{this.state.showButton ? <RightParameterUI onFilterTextChange={this.handleFilterTextChange} /> : null}<Footer /><LowerControlUI /></>
    )
  }
}
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleButton = this.toggleButton.bind(this)
    this.toggleButton2 = this.toggleButton2.bind(this)
  }
  toggleButton() {
    this.props.toggleButton()
  }
  toggleButton2() {
    this.props.toggleButton2()
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
                <li><a href="#Algorithm_1" onClick={this.toggleButton2}>Algorithm 1</a></li>
                <li><a href="#Algorithm_2" onClick={this.toggleButton2}>Algorithm 2</a></li>
                <li><a href="#Algorithm_3" onClick={this.toggleButton2}>Algorithm 3</a></li>
              </ul>
            </li>

            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">Motion Models
                <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#Model_1" onClick={this.toggleButton}>Model 1</a></li>
                <li><a href="#Model_2" onClick={this.toggleButton}>Model 2</a></li>
                <li><a href="#Model_3" onClick={this.toggleButton}>Model 3</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>)
  }
}
class Canvas extends React.Component {
  render() {
    return (<div id="canvasSpace">
      <canvas id="canvas" width={900} height={300}></canvas>
    </div>)
  }
}
class LowerControlUI extends React.Component {
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
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }
  handleFilterTextChange(e) {
    alert(e.target.value)
    this.props.onFilterTextChange(e.target.value);
  }


  render() {
    return (<div id="rightParameterUI">
      Parameters (just as a reminder for the future, we need to do error checking on all parameters)
      <label for="parameter_1" id="label_1">Parameter 1:</label>
      <input
        type="text"
        placeholder="Search..."
        onChange={this.handleFilterTextChange}
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

//button-clicking functionality
$('#play').click(function () {
  alert("Play functionality must be implemented")
})
$('#pause').click(function () {
  alert("Pause functionality must be implemented")
})

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

var coordinates = [];
var isDone = 0;

//button for finishing drawing points
$('#done').click(function () {
  isDone = isDone + 1;
});

//code for drawing polygon
//TODO: make more than one polygon
//  double array for coordniates 
//  keep double array count based on how many times isDone is clicked
//  isDone should be a numerical variable now 


$("#canvas").mousedown(function (e) { handleMouseDown(e); });

function handleMouseDown(e) {
  //Stops when there is 5 shapes or there the current point has 10 coords.
  if (isDone > 5 || coordinates[isDone].length > 10) {
    alert("too much stuff")
    return;
  }

  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();

  var mouseX = parseInt(e.clientX - offsetX);
  var mouseY = parseInt(e.clientY - offsetY);
  coordinates.push({ x: mouseX, y: mouseY });
  drawPolygon();
}

function drawPolygon() {
  context.clearRect(0, 0, cw, ch);
  context.beginPath();
  context.moveTo(coordinates[isDone][0].x, coordinates[isDone][0].y);
  for (var index = 1; index < coordinates[isDone].length; index++) {
    context.lineTo(coordinates[isDone][index].x, coordinates[isDone][index].y);
  }
  context.closePath();
  context.stroke();
}