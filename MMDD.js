
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
    //Do: Establish vehicle frame and and wheel off of a single X and Y coordinate ("concept" function below)
    //Do: Use current JS code (other folder) to change poistion and redraw below 
    //first take the remainder out of 360
    var leftWheelRadius = this.props.leftWheelRadius
    var rightWheelRadius = this.props.rightWheelRadius
    var distBetweenWheels = this.props.distBetweenWheels
    var leftAngularVelocity = this.props.leftAngularVelocity
    var rightAngularVelocity = this.props.rightAngularVelocity
    var startX = canvas.width / 2;
    var startY = canvas.height / 4;
    var diffBodyAngle = 0;

    $('#playMotionModel').click(function () {
      proceed = true;
    })
    $('#pauseMotionModel').click(function () {
      proceed = false;
    })
    const differential = new diff(leftWheelRadius, rightWheelRadius, distBetweenWheels, leftAngularVelocity, rightAngularVelocity, startX, startY, diffBodyAngle);
    //Does: Flips canvas to correct orientation
    ctx.transform(1, 0, 0, -1, 0, canvas.height);
    ctx2.transform(1, 0, 0, -1, 0, canvas.height);
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
        var theta = cPos[2] - Math.PI / 2;

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
        ctx.rect(bodyX, 0, distBetweenWheels * 16, 10);
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
        ctx.translate(offset, 0);
        // Note: after transforming [0,0] is visually [x,y] so the rect needs to be offset accordingly when drawn
        ctx.rect(-width / 2, 0, width, 10);
        ctx.fillStyle = "red";
        ctx.fill();
        // restore the context to its untranslated/unrotated state
        ctx.restore();
      }

      setTimeout(() => { window.requestAnimationFrame(concept); }, 1000 / 65);
    }

    window.requestAnimationFrame(concept);

  