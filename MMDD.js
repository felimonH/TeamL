import diff from '/Motion Models/js_versions/Motion_Model_Differential.js';

    function establishCanvas() {
      var div = document.getElementById("canvasSpace");
      $("canvas").remove();
      div.innerHTML += '<canvas id="canvas"' + 'width="640"' + 'height="260"></canvas>';
      div.innerHTML += '<canvas id="canvas2"' + 'width="640"' + 'height="260"></canvas>';

    }
  
    establishCanvas()
    
    var canvas = document.getElementById("canvas");
    var canvas2 = document.getElementById("canvas2");
    var ctx = canvas.getContext("2d");
    var ctx2 = canvas2.getContext("2d");
    var proceed = true;
    var reset = false;

    //Do: Establish vehicle frame and and wheel off of a single X and Y coordinate ("concept" function below)
    //Do: Use current JS code (other folder) to change poistion and redraw below 
    //Declare variables 
    var leftWheelRadius = 0;
    var rightWheelRadius = 0;
    var distBetweenWheels = 0;
    var leftAngularVelocity = 0;
    var rightAngularVelocity = 0;

    var startX = canvas.width / 2;
    var startY = canvas.height / 4;
    var theta = 0;
  
    let differential = new diff(leftWheelRadius, rightWheelRadius, distBetweenWheels, leftAngularVelocity, rightAngularVelocity, startX, startY, theta);

    ctx.transform(1, 0, 0, -1, 0, canvas.height);
    ctx2.transform(1, 0, 0, -1, 0, canvas.height);


    initalize();
    function initalize() {
      
    leftWheelRadius = 5;
    rightWheelRadius = 5;
    distBetweenWheels = 3;
    leftAngularVelocity = 1;
    rightAngularVelocity = 1;
    
  
      startX = canvas.width / 2;
      startY = canvas.height / 4;
      theta = 0;
      differential = new diff(leftWheelRadius, rightWheelRadius, distBetweenWheels, leftAngularVelocity, rightAngularVelocity, startX, startY, theta);

      proceed = true;
      reset = true;
      window.requestAnimationFrame(concept);
      //proceed = false;
      
    }
    function update() {


      leftWheelRadius = document.getElementById("leftWheelRadius").value ;
      rightWheelRadius = document.getElementById("rightWheelRadius").value ;
      distBetweenWheels = document.getElementById("distBetweenWheels").value;
      leftAngularVelocity = document.getElementById("leftAngularVelocity").value;
      rightAngularVelocity = document.getElementById("rightAngularVelocity").value;
      // convert to neg when greater than 180


      differential = new diff(leftWheelRadius, rightWheelRadius, distBetweenWheels, leftAngularVelocity, rightAngularVelocity, startX, startY, theta);
     
    }
    //Buttons
    $('#updateMotionModel').click(function () {
      update()
    })
    $('#resetMotionModel').click(function () {
      ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      initalize();
    })
    $('#playMotionModel').click(function () {
      proceed = true;

    })
    $('#pauseMotionModel').click(function () {
      proceed = false;
    })
    
    //Does: Flips canvas to correct orientation
    
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
        var cPos = differential.main();
        startX = cPos[0];
        startY = cPos[1];
        theta = cPos[2] ;

        //left wheel
        drawWheel(startX, startY, leftWheelRadius * 4, -distBetweenWheels * 8, theta);
        //right wheel
        drawWheel(startX, startY, rightWheelRadius * 4, distBetweenWheels * 8, theta)
        //body
        drawBody(startX, startY, distBetweenWheels * 8, theta)
        //trail
        drawTrail(startX, startY);

      }
      function drawTrail(x, y) {
        ctx2.beginPath()
        ctx2.arc(x, y, 1, 0, 2 * Math.PI);
        ctx2.fillStyle = "lime"
        ctx2.fill()
      }

      function drawBody(x, y, width, theta) {
        var bodyX = -width
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);

        ctx.rotate(theta);
        ctx.rect(0, bodyX, 10, distBetweenWheels * 16);
        ctx.fillStyle = "purple";
        ctx.fill();
        ctx.restore();
      }

      function drawWheel(x, y, width, offset, theta) {
        // first save the untranslated/unrotated context
        ctx.save();
        ctx.beginPath();
        // move the rotation point to the center of the body
        ctx.translate(x, y);
        ctx.rotate(theta);
        //Center is now  0, 0 + offset / 2, now offset for size of box 
        ctx.translate(0, offset);
        // Note: after transforming [0,0] is visually [x,y] so the rect needs to be offset accordingly when drawn
        ctx.rect(0, -width / 2, 10, width);
        ctx.fillStyle = "red";
        ctx.fill();
        // restore the context to its untranslated/unrotated state
        ctx.restore();
      }
      if (reset) {
        proceed = false;
        reset = false;
        return;
        
      }
      setTimeout(() => { window.requestAnimationFrame(concept); }, 1000 / 65);
    }
 
    window.requestAnimationFrame(concept);

  