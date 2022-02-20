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

  mouseX = parseInt(e.clientX - offsetX);
  mouseY = parseInt(e.clientY - offsetY);
  coordinates.push({x:mouseX, y:mouseY});
  drawPolygon();
}

function drawPolygon() {
  context.clearRect(0,0,cw,ch);
  context.beginPath();
  context.moveTo(coordinates[0].x, coordinates[0].y);
  for (index = 1; index<coordinates.length; index++) {
    context.lineTo(coordinates[index].x, coordinates[index].y);
  }
  context.closePath();
  context.stroke();
}