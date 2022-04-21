
import cycles from '/Motion Models/js_versions/Motion_Model_Bicycle.js';


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
    
    
//Declare variables changed per instance
    var steeringAngle = 0;
    var distFrontToBack = 0;
    var frontWheelRadius = 0;
    var angularVelocity = 0;
    var radians = 0;
    var notUsedForBikeVariable = 0;
    
    //Declare 
    var theta = 0;
    var startX = canvas.width / 2;
    var startY = canvas.height / 4;
    let bike = new cycles(frontWheelRadius, distFrontToBack, angularVelocity, radians, startX, startY, theta, notUsedForBikeVariable);;

    //Does: Flips canvas to correct orientation
    ctx.transform(1, 0, 0, -1, 0, canvas.height);
    ctx2.transform(1, 0, 0, -1, 0, canvas.height);


    initalize();
    function initalize() {
      
      steeringAngle = 0;
       distFrontToBack = 30;
       frontWheelRadius = 6;
       angularVelocity = 1;
       radians = 0;
    
  
      startX = canvas.width / 2;
      startY = canvas.height / 4;
      theta = 0;
      bike = new cycles(frontWheelRadius, distFrontToBack, angularVelocity, radians, startX, startY, theta, notUsedForBikeVariable);

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
      
      // convert to neg when greater than 180
      if (steeringAngle > 180) {
      steeringAngle = steeringAngle - 360;
      }
     radians = steeringAngle * Math.PI / 180;

     bike = new cycles(frontWheelRadius, distFrontToBack, angularVelocity, radians, startX, startY, theta, notUsedForBikeVariable);
     
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
  // update()
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
        var cPos = bike.main();
        startX = cPos[0];
        startY = cPos[1];
        theta = cPos[2] 
        drawWheel(startX, startY, frontWheelRadius * 2, distFrontToBack / 4, steeringAngle, theta, distFrontToBack);
        drawBody(startX, startY, distFrontToBack, distFrontToBack / 4, theta);
        drawTrail(startX, startY);

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

      function drawBody(x, y, width,height , theta) {
        var bodyX = -width / 2;
        var bodyY = -height / 2;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.rotate(theta);
        ctx.rect(bodyX, bodyY, width, height);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.restore();
      }

      function drawWheel(x, y, width, height,  steeringAngles, theta, offset) {
        // first save the untranslated/unrotated context
        ctx.save();
        ctx.beginPath();
        // move the rotation point to the center of the body
        ctx.translate(x, y);
        ctx.rotate(theta);
        //Center is now  0, 0 + offset / 2, now offset for size of box 
        ctx.translate( 0 + offset / 2, 0);
        ctx.rotate(steeringAngles * Math.PI / 180);
        // Note: after transforming [0,0] is visually [x,y] so the rect needs to be offset accordingly when drawn
        ctx.rect(-width / 2, -height / 2, width, height);
        ctx.fillStyle = "red";
        ctx.fill();
        // restore the context to its untranslated/unrotated state
        ctx.restore();
      }
    //calls it only once during set   
    if (reset) {
      proceed = false;
      reset = false;
      return;
      
    }
    setTimeout(() => { window.requestAnimationFrame(concept); }, 1000 / 65);
    }

    window.requestAnimationFrame(concept);
    //alert(steeringAngle);