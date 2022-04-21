
import tricycle from '../Motion Models/js_versions/Motion_Model_Tricycle';
import diff from '../Motion Models/js_versions/Motion_Model_Differential';








class Canvas extends React.Component {
  constructor(props) {
    super(props);

  }
  //THIS IS WHERE YOU PUT YOUR JAVASCRIPT/JQUERY CODE FOR MOTION MODELS/PATHFINDING ALGORITHMS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


  jQueryCodeDiffDrive = () => {
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

  }



  jQueryCodeTricycle = () => {
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
    var steeringAngle = (this.props.steeringAngle % 360)
    var distFrontToBack = this.props.distFrontToBack;
    var frontWheelRadius = this.props.frontWheelRadius;
    var angularVelocity = this.props.angularVelocity;
    var distBackTwoWheels = (this.props.distBackTwoWheels / 2);
    var radians = 0;
    // convert to neg when greater than 180
    if (steeringAngle > 180) {
      steeringAngle = steeringAngle - 360;
    }
    radians = steeringAngle * Math.PI / 180;

    var startX = canvas.width / 2;
    var startY = canvas.height / 4;
    var trikeBodyAngle = 0;
    var notUsedForTrikeVariable = 0;

    $('#playMotionModel').click(function () {
      proceed = true;
    })
    $('#pauseMotionModel').click(function () {
      proceed = false;
    })
    const trike = new tricycle(frontWheelRadius, distFrontToBack, angularVelocity, radians, startX, startY, trikeBodyAngle, notUsedForTrikeVariable);
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
        var cPos = trike.main();
        startX = cPos[0];
        startY = cPos[1];
        var theta = cPos[2] - Math.PI / 2;

        //front wheel
        drawWheel(startX - 5, startY, frontWheelRadius * 0.3, distFrontToBack / 3.5, steeringAngle, theta, distFrontToBack);
        //back left wheel
        drawWheels(startX, startY, frontWheelRadius * 0.3, distFrontToBack / 4, steeringAngle, theta, -distBackTwoWheels / 3, distFrontToBack * -1);
        //back right wheel
        drawWheels(startX, startY, frontWheelRadius * 0.3, distFrontToBack / 4, steeringAngle, theta, distBackTwoWheels / 3, distFrontToBack * -1);
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
        ctx.rect(bodyX, bodyY, distBackTwoWheels / 1.5, height / 4);
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
        ctx.translate(offset1, 0 + offset / 2);
        ctx.rotate(steeringAngles * Math.PI / 180);
        // Note: after transforming [0,0] is visually [x,y] so the rect needs to be offset accordingly when drawn
        ctx.rect(-width / 2, -height / 2, width, height);
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

      function drawWheel(x, y, height, width, steeringAngles, theta, offset) {
        // first save the untranslated/unrotated context
        ctx.save();
        ctx.beginPath();
        // move the rotation point to the center of the body
        ctx.translate(x, y);
        ctx.rotate(theta);
        //Center is now  0, 0 + offset / 2, now offset for size of box 
        ctx.translate(0, 0 + offset / 2);
        ctx.rotate(steeringAngles * Math.PI / 180);
        // Note: after transforming [0,0] is visually [x,y] so the rect needs to be offset accordingly when drawn
        ctx.rect(-width / 2, -height / 2, width, height);
        ctx.fillStyle = "red";
        ctx.fill();
        // restore the context to its untranslated/unrotated state
        ctx.restore();
      }

      setTimeout(() => { window.requestAnimationFrame(concept); }, 1000 / 65);
    }

    window.requestAnimationFrame(concept);
  }





}



render() {
  switch (this.props.jQuery) {
    case 'Diff. Drive':
      return (<div id="rightParameterUI">
        <h4>Parameters</h4>
        <h5>Robot Properties</h5>
        <label for="leftWheelRadius">Left Wheel Radius (0 &#60; x &#8804; 10)</label>
        <br></br>
        <input type="number" id="leftWheelRadius" placeholder='0' onChange={this.handleLeftWheelRadiusChange}></input>
        <br></br>

        <label for="rightWheelRadius">Right Wheel Radius (0 &#60; x &#8804; 10)</label>
        <br></br>
        <input type="number" id="rightWheelRadius" placeholder='0' onChange={this.handleRightWheelRadiusChange}></input>
        <br></br>

        <label for="distBetweenWheels">Distance Between Wheels (0 &#60; x &#8804; 10)</label>
        <br></br>
        <input type="number" id="distBetweenWheels" placeholder='0' onChange={this.handleDistBetweenWheelsChange}></input>
        <br></br>

        <h5>Control Inputs</h5>
        <label for="leftAngularVelocity">Left Angular Velocity (0 &#8804; x &#8804; 10)</label>
        <br></br>
        <input type="number" id="leftAngularVelocity" placeholder='0' onChange={this.handleLeftAngularVelocityChange}></input>
        <br></br>

        <label for="rightAngularVelocity">Right Angular Velocity (0 &#8804; x &#8804; 10)</label>
        <br></br>
        <input type="number" id="rightAngularVelocity" placeholder='0' onChange={this.handleRightAngularVelocityChange}></input>
      </div>
      )

    case 'Bicycle':
      return (<div id="rightParameterUI">
        <h4>Parameters</h4>
        <h5>Robot Properties</h5>
        <label for="frontWheelRadius">Front Wheel Radius (0 &#60; x &#8804; 50)</label>
        <br></br>
        <input type="number" id="frontWheelRadius" placeholder='0' onChange={this.handleFrontWheelRadiusChange}></input>
        <br></br>

        <label for="distFrontToBack">Distance front to back (10 &#60; x &#8804; 100)</label>
        <br></br>
        <input type="number" id="distFrontToBack" placeholder='0' onChange={this.handleDistFrontToBackChange}></input>
        <br></br>

        <h5>Control Inputs</h5>
        <label for="steeringAngle">Steering Angle(&#8477;)</label>
        <br></br>
        <input type="number" id="steeringAngle" placeholder='0' onChange={this.handleSteeringAngleChange}></input>
        <br></br>

        <label for="angularVelocity">Angular Velocity (0 &#8804; x &#8804; 10)</label>
        <br></br>
        <input type="number" id="angularVelocity" placeholder='0' onChange={this.handleAngularVelocityChange}></input>
      </div>)

    case 'Tricycle':
      return (<div id="rightParameterUI">
        <h4>Parameters</h4>
        <h5>Robot Properties</h5>
        <label for="frontWheelRadius">Front Wheel Radius (0 &#60; x &#8804; 50)</label>
        <br></br>
        <input type="number" id="frontWheelRadius" placeholder='0' onChange={this.handleFrontWheelRadiusChange}></input>
        <br></br>

        <label for="distFrontToBack">Distance front to back (10 &#60; x &#8804; 100)</label>
        <br></br>
        <input type="number" id="distFrontToBack" placeholder='0' onChange={this.handleDistFrontToBackChange}></input>
        <br></br>

        <label for="distBetweenBackWheels">Distance Between Back Wheels (30 &#60; x &#8804; 200)</label>
        <br></br>
        <input type="number" id="distBetweenBackWheels" placeholder='0' onChange={this.handleDistBackTwoWheelsChange}></input>
        <br></br>

        <h5>Control Inputs</h5>
        <label for="angularVelocity">Angular Velocity (0 &#8804; x &#8804; 10)</label>
        <br></br>
        <input type="number" id="angularVelocity" placeholder='0' onChange={this.handleAngularVelocityChange}></input>
        <br></br>

        <label for="steeringAngle">Steering Angle (&#8477;)</label>
        <br></br>
        <input type="number" id="steeringAngle" placeholder='0' onChange={this.handleSteeringAngleChange}></input>
        <br></br>
      </div>)
  }
}
}



ReactDOM.render(<App />, document.getElementById('root'));