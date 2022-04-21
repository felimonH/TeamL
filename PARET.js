import RRT from './Path Finding/RRT.js';

    //Does: Creates canvas based off screen size
    function establishCanvas() {
      var div = document.getElementById("canvasSpace");
      var canvas = document.createElement('canvas');
      var sizeWidth = 80 * window.innerWidth / 100,
        sizeHeight = 60 * window.innerHeight / 100 || 766;
      canvas.width = sizeWidth;
      canvas.height = sizeHeight;
      //document.getElementById("canvas").remove();
     
      div.innerHTML += '<canvas id="canvas" width= ' + sizeWidth + ' height=' + sizeHeight + '></canvas>';
    }

    establishCanvas()
    
    var canvas = document.getElementById("canvas");
    document.getElementById("canvas").style.backgroundColor = "white";
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

    //set values for playing
    var play = false;
    let tree = null;
    var step = false;;

    //Does: deletes all obstacles
    $('#delete').click(function () {
      context.clearRect(0, 0, cw, ch);
      drawGoalandStart()
    });

    //Does: Delete all of canvas and obstacles
    $('#clear').click(function () {
      context.clearRect(0, 0, cw, ch);
      isDone = 0;
      coordinates = [];
      innerArray = [];
      coordinates.push(innerArray);
      drawGoalandStart()

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
        context.arc(startCoord.x, startCoord.y, 9, 0, 2 * Math.PI);
        context.fillStyle = 'white';
        context.strokeStyle = 'white';
        context.stroke();
        context.fill()
      }

      context.beginPath();
      context.arc(mouseX, mouseY, 8, 0, 2 * Math.PI);
      context.fillStyle = 'blue';
      context.strokeStyle = 'blue';
      context.stroke();
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
      context.lineWidth = 0;
      //Edge case that "erases previous drawn circle"
      if (goalCoord != null) {
        context.beginPath();
        context.arc(goalCoord.x, goalCoord.y, 9, 0, 2 * Math.PI);
        context.fillStyle = 'white';
        context.strokeStyle = 'white';
        context.stroke();
        context.fill()
      }
      context.beginPath();
      context.arc(mouseX, mouseY, 8, 0, 2 * Math.PI);
      context.fillStyle = 'green';
      context.strokeStyle = 'green';
      context.stroke();
      context.fill()
      goalCoord = { x: mouseX, y: mouseY };
      setGoal = false;
    };
    function drawObstacle(e) {
      //Does: Stops when there is 5 shapes or there the current point has 10 coords.
      //Does: prevents too many objects
      // if (isDone > 5) {
      //  
      //   return;
      // }
      //Does: prevents too many points to an object
      // if (coordinates[isDone].length > 10) {

      //   return;
      // }
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
        context.lineWidth = 10;
        //Check distance and snap if close enough to start
        var a = coordinates[isDone][0].x - mouseX;
        var b = coordinates[isDone][0].y - mouseY;
        var c = Math.sqrt(a * a + b * b);

        if (c < 20) {

          context.strokeStyle = 'red';
          context.lineTo(mouseX, mouseY);
          context.stroke();
          fill();
        } else {

          context.strokeStyle = 'red';
          context.lineTo(mouseX, mouseY);
          context.stroke();
        }
        context.lineWidth = 2;
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
      context.lineWidth = 10;
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
        context.stroke();
        context.fill();

      }
      // 
      context.lineWidth = 2;
    }

    function drawGoalandStart() {
      context.lineWidth = 0;
      if (goalCoord != null) {
        context.beginPath();
        context.arc(goalCoord.x, goalCoord.y, 8, 0, 2 * Math.PI);
        context.fillStyle = 'green';
        context.strokeStyle = 'green';
        context.stroke();
        context.fill();

      }

      if (startCoord != null) {
        context.beginPath();
        context.arc(startCoord.x, startCoord.y, 8, 0, 2 * Math.PI);
        context.fillStyle = 'blue';
        context.strokeStyle = 'blue';
        context.stroke();
        context.fill();
      }
      return;
    }
    //Does: Plays algo
    $('#playRET').click(function () {

      play = true;
      var go = 'again';
      playAlgo(go);

    });

    $('#pauseRET').click(function () {

      play = false;

    });
    //recursive play for time delay
    function playAlgo(go) {
      if (play) {
        if ((typeof go) == 'string') {

          setTimeout(() => {

            go = oneStep();

            playAlgo(go);
          }, 1000 / 60);

        } else {
          if (tree != null) {
            //draw path from last part of array 
            //call prev until it its null
            //console.log(go)
            var node = go[1];
            console.log(node);

            node = node.nodes[node.nodes.length - 1];
            //[go.length - 1]
            var nodeNext = node.prev;
            // node.prev;
            while (nodeNext != null) {

              drawFullPath(node.x, node.y, nodeNext.x, nodeNext.y);
              node = nodeNext;
              nodeNext = node.prev;
            }

          }
        }
      }
    }
    //Does:  
    $('#resetRET').click(function () {

      context.clearRect(0, 0, cw, ch);
      tree = null;
      drawPolygons()
      drawGoalandStart();


    });
    $('#stepRET').click(function () {
      play = false;
      step = true;
      oneStep();
      step = false;

    });
    //Does: Detects red pixel and returns true if it is not red 
    function isOpenPixel(x, y) {

      var p = context.getImageData(x, y, 1, 1).data;

      if (p[0] == 255) {



        return false;
      } else {

        return true;
      }
    }

    //new idea 


    //return if the distance is greater
    function midpointCalc(sx, sy, ex, ey) {
      //check distance
      var a = ex - sx;
      var b = ey - sy;
      var c = Math.sqrt(a * a + b * b);
      //return true if distance is within limit
      if (c < 4) {
        return true;
      }

      //get midpoint 
      var midx = (ex + sx) / 2;
      var midy = (ey + sy) / 2;

      //if point there return false
      if (!isOpenPixel(midx, midy)) {
        return false;
      }

      // call function twice both with midpoints 
      return (midpointCalc(sx, sy, midx, midy) && midpointCalc(midx, midy, ex, ey))
    }


    $('#line').click(function () {



    });


    function oneStep() {
      context.lineWidth = 2;
      if (goalCoord == null || startCoord == null) {
        return;


      } else {

        var AlgoGoal = [goalCoord.x, goalCoord.y];
        var AlgoStart = [startCoord.x, startCoord.y];

      }





      var go = 'again';
      if (tree == null) {
        tree = new RRT(AlgoStart, AlgoGoal, 20, 0, 8, .1, [cw, ch]);
      }

      var node = tree.randomCheck();
      //detects for colision
      var blocked = midpointCalc(node.prev.x, node.prev.y, node.x, node.y);


      drawNodesAndLine(node.prev.x, node.prev.y, node.x, node.y, blocked);


      if (blocked == false) {
        go = tree.collide(node);

        return go;
      } else {

        //if no collision
        go = tree.move(node);
        //drawNodesAndLine(node.prev.x, node.prev.y, node.x, node.y, blocked);
        //if completed


        return go;
      }



    }
    function drawFullPath(x, y, x1, y1,) {
      //alert()
      x = parseInt(x);
      y = parseInt(y);
      x1 = parseInt(x1);
      y1 = parseInt(y1);
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x1, y1);
      context.strokeStyle = 'orange';
      context.stroke();

      context.beginPath();
      context.lineWidth = 0;
      context.fillStyle = 'black';
      context.arc(x1, y1, 3, 0, 2 * Math.PI);
      context.stroke();
      context.fill();
    }
    function drawNodesAndLine(x, y, x1, y1, isBlocked) {
      if (!step && !isBlocked) {
        return;
      }
      var nodeColor = `rgb(0, 255, 0)`;
      var lineColor = `rgb(0, 0, 255)`;
      if (!isBlocked) {
        nodeColor = `rgb(255, 0, 255)`;
        lineColor = `rgb(255, 255, 0)`;
      }

      x = parseInt(x);
      y = parseInt(y);
      x1 = parseInt(x1);
      y1 = parseInt(y1);

      // context.strokeStyle = "#" + Math.floor(Math.random() * 16777215).toString(16)
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x1, y1);
      context.strokeStyle = lineColor;
      context.stroke();

      context.beginPath();
      context.fillStyle = nodeColor;
      context.arc(x1, y1, 2, 0, 2 * Math.PI);
      context.fill();




    }
  