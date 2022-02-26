import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
   
   constructor(props) {
    super(props);
    this.state = {
      filterText: '',
    };
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);

  }
    handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
    
  }

    render() {
        return(<><Navbar/><Canvas/><RightDrawingUI/><RightParameterUI  onFilterTextChange={this.handleFilterTextChange}/><Footer/><LowerControlUI/></>
            )
    }
}
class Navbar extends React.Component {
    render() {
        return(<div id = "naving">
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
                    <li><a href="#">Algorithm 1</a></li>
                    <li><a href="#">Algorithm 2</a></li>
                    <li><a href="#">Algorithm 3</a></li>
                  </ul>
                </li>
                
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">Motion Models
                    <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                      <li><a href="#">Model 1</a></li>
                      <li><a href="#">Model 2</a></li>
                      <li><a href="#">Model 3</a></li>
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
        return( <div id = "canvasSpace">
      <canvas id="canvas" width={900} height={300}></canvas>
    </div>)
    }
}
class LowerControlUI extends React.Component {
    render() {
        return(<div id = "lowerControlUI">
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
    this.props.onFilterTextChange(e.target.value);
  }

  
    render() {
        return( <div id = "rightParameterUI">
        Parameters (just as a reminder for the future, we need to do error checking on all parameters)
        <label for = "parameter_1">Parameter 1:</label>
          <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <br></br>
        <label for = "parameter_2">Parameter 2:</label>
        <input type = "number" id = "parameter2"/>
    </div>)
    }
}
class RightDrawingUI extends React.Component {
    render() {
        return( <div id = "rightDrawingUI">
        Drawing UI
        <div>
          <button id="done">Click when done assigning points</button>
        </div>
    </div>)
    }
}
class Footer extends React.Component {
    render() {
        return(<div id= "foot">
        Random Footer :)
    </div>)
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

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
    div.innerHTML += '<canvas id="canvas" width= ' + sizeWidth+ ' height='+ sizeHeight+ '></canvas>';


 
    
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

window.onscroll = function(e) { reOffset(); }

context.lineWidth = 2;
context.strokeStyle = 'blue';

var coordinates = [];
var isDone = false;

//button-clicking functionality
$('#play').click(function() {
  alert("Play functionality must be implemented")
})
$('#pause').click(function() {
  alert("Pause functionality must be implemented")
})
$('#done').click(function(){
  isDone = true;
});

$("#canvas").mousedown(function(e) {handleMouseDown(e);});

function handleMouseDown(e) {
  if(isDone || coordinates.length > 10) {return;}

  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();

  var mouseX = parseInt(e.clientX - offsetX);
  var mouseY = parseInt(e.clientY - offsetY);
  coordinates.push({x:mouseX, y:mouseY});
  drawPolygon();
}

function drawPolygon() {
  context.clearRect(0,0,cw,ch);
  context.beginPath();
  context.moveTo(coordinates[0].x, coordinates[0].y);
  for (var index = 1; index<coordinates.length; index++) {
    context.lineTo(coordinates[index].x, coordinates[index].y);
  }
  context.closePath();
  context.stroke();
}