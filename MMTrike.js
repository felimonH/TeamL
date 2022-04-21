
import tricycle from '/Motion Models/js_versions/Motion_Model_Tricycle.js';
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
    var reset = true;
    //Do: Establish vehicle frame and and wheel off of a single X and Y coordinate ("concept" function below)
    //Do: Use current JS code (other folder) to change poistion and redraw below 
    //first take the remainder out of 360

    //Changing variables
    var steeringAngle = 0;
    var distFrontToBack = 0;
    var frontWheelRadius = 0;
    var angularVelocity = 0;
    var distBackTwoWheels = 0;
    var radians = 0;
    //var notUsedForTrikeVariable = 0;
 
  
    //positional variables
    var startX = canvas.width / 2;
    var startY = canvas.height / 4;
    var theta = 0;
    let trike = new tricycle(frontWheelRadius, distFrontToBack, angularVelocity, radians, startX, startY, theta, distBackTwoWheels);

    //Does: Flips canvas to correct orientation
    ctx.transform(1, 0, 0, -1, 0, canvas.height);
    ctx2.transform(1, 0, 0, -1, 0, canvas.height);


    initalize();
    function initalize() {
      
      steeringAngle = 0;
       distFrontToBack = 50;
       frontWheelRadius = 15;
       angularVelocity = 1;
       distBackTwoWheels = 60;
       radians = 0;
    
  
      startX = canvas.width / 2;
      startY = canvas.height / 4;
      theta = 0;
      trike = new tricycle(frontWheelRadius, distFrontToBack, angularVelocity, radians, startX, startY, theta, distBackTwoWheels);

      proceed = true;
      reset = true;
      window.requestAnimationFrame(concept);
      //proceed = false;
      
    }
    function update() {
      steeringAngle = document.getElementById("steeringAngle").value % 360;
      
      distFrontToBack = document.getElementById("distFrontToBack").value;
     
      frontWheelRadius = document.getElementById("frontWheelRadius").value;
      angularVelocity = document.getElementById("angularVelocity").value;
      
      distBackTwoWheels = document.getElementById("distBetweenBackWheels").value;
      
      // convert to neg when greater than 180
      if (steeringAngle > 180) {
      steeringAngle = steeringAngle - 360;
      }
     radians = steeringAngle * Math.PI / 180;

     
     trike = new tricycle(frontWheelRadius, distFrontToBack, angularVelocity, radians, startX, startY, theta, distBackTwoWheels);
     
    }
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
        var cPos = trike.main();
        startX = cPos[0];
        startY = cPos[1];
        theta = cPos[2];

        //front wheel
        drawWheel(startX , startY, frontWheelRadius , distFrontToBack/ 4, steeringAngle, theta, distFrontToBack);
        //back left wheel
        drawWheels(startX, startY, frontWheelRadius, distFrontToBack / 4, steeringAngle, theta, -distBackTwoWheels / 3, distFrontToBack * -1);
        //back right wheel
        drawWheels(startX, startY, frontWheelRadius , distFrontToBack / 4, steeringAngle, theta, distBackTwoWheels / 3, distFrontToBack * -1);
        drawBody(startX, startY, distFrontToBack, distFrontToBack / 4, theta);
        drawBackRectangle(startX, startY, distFrontToBack / 2, distBackTwoWheels, theta)
        drawTrail(startX, startY);
      }
      function drawBackRectangle(x, y, height, width, theta) {
        var bodyX = -width / 3;
        var bodyY = -height;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.rotate(theta);
        ctx.rect(bodyY, bodyX ,  height / 4,distBackTwoWheels / 1.5);
        ctx.fillStyle = "purple";
        ctx.fill();
        ctx.restore();
      }
      function drawWheels(x, y, height, width, steeringAngles, theta, offset1, offset) {
        // first save the untranslated/unrotated context
        ctx.save();
        ctx.beginPath();
        // move the rotation point to the center of the body
        ctx.translate(x, y);
        ctx.rotate(theta);
        //Center is now  0, 0 + offset / 2, now offset for size of box 
        ctx.translate( 0 + offset / 2, offset1);
        ctx.rotate(steeringAngles * Math.PI / 180);
        // Note: after transforming [0,0] is visually [x,y] so the rect needs to be offset accordingly when drawn
        ctx.rect(  -width / 2, -height / 2, height, width);
        
        ctx.fillStyle = "red";
        ctx.fill();
        // restore the context to its untranslated/unrotated state
        ctx.restore();
      }
      //check rotation
      //bodyCenter(startX, startY);
      //wheelCenter(startX, startY, DistFrontToBack);
      function drawTrail(x, y) {

        ctx2.beginPath()
        ctx2.arc(x, y, 1, 0, 2 * Math.PI);
        ctx2.fillStyle = "lime"
        ctx2.fill()

      }

      function drawBody(x, y, height, width, theta) {
        var bodyX =-height / 2;
         
        var bodyY = -width / 2;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.rotate(theta);
        ctx.rect(bodyX, bodyY,  height,width);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.restore();
      }
// drawWheel(startX , startY, frontWheelRadius , distFrontToBack, steeringAngle, theta, distFrontToBack);
      function drawWheel(x, y, length,thick, steeringAngles, theta, offset) {
      
        // first save the untranslated/unrotated context
        ctx.save();
        ctx.beginPath();
        // move the rotation point to the center of the body
        ctx.translate(x, y);
        ctx.rotate(theta);
        //Center is now  0, 0 + offset / 2, now offset for size of box 
        ctx.translate(0 + offset / 2, 0 );
        ctx.rotate(steeringAngles * Math.PI / 180);
        // Note: after transforming [0,0] is visually [x,y] so the rect needs to be offset accordingly when drawn
        ctx.rect( -length / 2,-thick / 2,   length,thick );
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

  