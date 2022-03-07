import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     default: true,
     pathfinding_algorithm_1: false,
     pathfinding_algorithm_2: false,
     motion_model_1: false,
     motion_model_2: false,
     motion_model_3: false, 
     filterText: '',
     num: 0,
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.toggleButton = this.toggleButton.bind(this)
    this.toggleButton2 = this.toggleButton2.bind(this)
    this.toggleButton4 = this.toggleButton4.bind(this)
    this.toggleButton5 = this.toggleButton5.bind(this)
    this.toggleButton6 = this.toggleButton6.bind(this)
    this.toggleButton3 = this.toggleButton3.bind(this)

  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  toggleButton() {
    this.setState({ pathfinding_algorithm_1: true });
    this.setState({ default: false });
    alert("pathfinding_algorithm_1")
  };
  toggleButton2() {
    this.setState({ pathfinding_algorithm_2: true });
    this.setState({ default: false });
    alert("pathfinding_algorithm_2")
  };
  toggleButton4() {
    this.setState({ motion_model_1: true });
    this.setState({ default: false });
      alert("motion_model_1")
  };
  toggleButton5() {
    this.setState({ motion_model_2: true });
    this.setState({ default: false });
     alert("motion_model_2")
  };
  toggleButton6() {
    this.setState({ motion_model_3: true });
    this.setState({ default: false });
     alert("motion_model_3")
  };

  toggleButton3() { 
    if (this.state.num == 5) {
      alert("too many obstacles, remember, there is a limit of 5 at the current moment")
      
} else {
   this.setState((prevState, props) => ({
    num: prevState.num + 1
})); 
}
};

    render() {
        return(<><Navbar toggleButton = {this.toggleButton} toggleButton2 = {this.toggleButton2} toggleButton3 = {this.toggleButton3} toggleButton4 = {this.toggleButton4} toggleButton5 = {this.toggleButton5} toggleButton6 = {this.toggleButton6}/><HomePage/>{this.state.default ? null : <Canvas/>}{this.state.default ? null : (this.state.showButton ? <RightDrawingUI/> : <RightObstacleUI toggleButton3 = {this.toggleButton3}/>)}{this.state.default ? null : (this.state.showButton ? <RightParameterUI onFilterTextChange={this.handleFilterTextChange}/> : null)}{this.state.default ? null : <Footer/>}{this.state.default ? null : <LowerControlUI/>}</>
            )
    }
  }
class HomePage extends React.Component {
  render() {
    return (<div>HomePage</div>)
  }
}
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleButton = this.toggleButton.bind(this)
    this.toggleButton2 = this.toggleButton2.bind(this)
    this.toggleButton4 = this.toggleButton4.bind(this)
    this.toggleButton5 = this.toggleButton5.bind(this)
    this.toggleButton6 = this.toggleButton6.bind(this)
  }
  toggleButton() {
    this.props.toggleButton()
  }
  toggleButton2() {
    this.props.toggleButton2()
  }
  toggleButton4() {
    this.props.toggleButton4()
  }
  toggleButton5() {
    this.props.toggleButton5()
  }
  toggleButton6() {
    this.props.toggleButton6()
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
                <li><a href="#Algorithm_1"  onClick={this.toggleButton}>Algorithm 1</a></li>
                <li><a href="#Algorithm_2"  onClick={this.toggleButton2}>Algorithm 2</a></li>
              </ul>
            </li>

            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">Motion Models
                <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#Model_1"  onClick={this.toggleButton4}>Model 1</a></li>
                <li><a href="#Model_2"  onClick={this.toggleButton5}>Model 2</a></li>
                <li><a href="#Model_3"  onClick={this.toggleButton6}>Model 3</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>)
  }
}

class Canvas extends React.Component {

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
        <button id="delete">Click to delete all shapes</button>
      </div>
    </div>)
  }
}
class RightObstacleUI extends React.Component {
 constructor(props) {
   super(props);
   
  this.toggleButton3 = this.toggleButton3.bind(this)

 }

 toggleButton3() {
   this.props.toggleButton3()
 };

  render() {
    return (<div id = "rightObstacleUI">Obstacle UI
      <div><img draggable = {true} width = {60} src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Circle_-_black_simple.svg/500px-Circle_-_black_simple.svg.png"></img>
      <button id = "Circle" onClick = {this.toggleButton3}>Add a Circle</button>
      </div>
      <div><img width = {60} src = "https://upload.wikimedia.org/wikipedia/commons/2/27/Red_square.svg"></img>
      <button id = "Square" onClick = {this.toggleButton3}>Add a Square</button></div>
       <div>
         <img width = {60}  src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Rectangle_example.svg/800px-Rectangle_example.svg.png"></img>
      <button id = "Rectangle" onClick = {this.toggleButton3}>Add a Rectangle</button>
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


