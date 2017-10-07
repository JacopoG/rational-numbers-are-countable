document.addEventListener("DOMContentLoaded", function () {
    
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var height = 600;
    var width = 800;

    ctx.beginPath();
    ctx.moveTo(0, height/2);
    ctx.lineTo(width, height/2);
    ctx.stroke();

    var drawStep = function (x, n) {
        var yTop = height/2 - 10;
        var yBottom = height/2 + 10;
        ctx.moveTo(x, yTop);
        ctx.lineTo(x, yBottom);

        ctx.fillText(n, x - 4, yBottom + 30);
        ctx.stroke();
    }

    var drawAllStep = function(distance) {
        stepsNumber = width / distance;

        for (var i = 1; i < stepsNumber; i = i + 1) {
            drawStep(distance * i, i);
        }
    }

    drawAllStep(50);


    var blinkOnStraightLine = function (n) {
        var x, y;
        x = n * 50;
        y = height/2;

        ctx.beginPath();
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.arc(x, y, 3, 0, Math.PI * 4, true); // Outer circle
        ctx.fill();
    }

    /*
    blinkOnStraightLine(10);
    blinkOnStraightLine(1);
    blinkOnStraightLine(0.5);
    blinkOnStraightLine(8/3);
    */

    /*
    var drawQ = function () {


        blinkOnStraightLine

    };
    */

    var start = function (n, current) {

        var num, den;
        current = current || 0;

        if (current > n) {
            return;
        }

        
        if (current == 0) {

            blinkOnStraightLine(1);
            console.log(1);

        }
        else {

            Diagonale.nextStep();
            num = Diagonale.getNumerator();
            den = Diagonale.getDenominator();
            blinkOnStraightLine(num/den);
            console.log(num/den);

        }

        return window.setTimeout(
            function () {start(n, current + 1)},
            100
        );

        //return windows.start(n, current + 1);
    };

    start(1000);
    /*
    console.log("Prova");
    console.log(Diagonale.currentPosition);
    Diagonale.nextStep();
    console.log(Diagonale.currentPosition);
    Diagonale.nextStep();
    console.log(Diagonale.currentPosition);
    Diagonale.nextStep();
    console.log(Diagonale.currentPosition);
    Diagonale.nextStep();
    console.log(Diagonale.currentPosition);
    Diagonale.nextStep();
    console.log(Diagonale.currentPosition);
    Diagonale.nextStep();
    console.log(Diagonale.currentPosition);
    Diagonale.nextStep();
    console.log(Diagonale.currentPosition);
    */


    
    /*
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);
    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
    */

    /*
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
    */

    /*
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill(); 
    */

    /*
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
    ctx.stroke();
    */


    /*
    // Filled triangle
    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(105, 25);
    ctx.lineTo(25, 105);
    ctx.fill();

    // Stroked triangle
    ctx.beginPath();
    ctx.moveTo(125, 125);
    ctx.lineTo(125, 45);
    ctx.lineTo(45, 125);
    ctx.stroke();
    */

    /*
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        ctx.beginPath();
        var x = 25 + j * 50; // x coordinate
        var y = 25 + i * 50; // y coordinate
        var radius = 20; // Arc radius
        var startAngle = 0; // Starting point on circle
        var endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
        var anticlockwise = i % 2 !== 0; // clockwise or anticlockwise

        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        if (i > 1) {
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }
    }
    */

    /*
    ctx.beginPath();
    ctx.moveTo(75, 25);
    ctx.quadraticCurveTo(25, 25, 25, 62.5);
    ctx.quadraticCurveTo(25, 100, 50, 100);
    ctx.quadraticCurveTo(50, 120, 30, 125);
    ctx.quadraticCurveTo(60, 120, 65, 100);
    ctx.quadraticCurveTo(125, 100, 125, 62.5);
    ctx.quadraticCurveTo(125, 25, 75, 25);
    ctx.stroke();
    */


});





var Diagonale = {

    currentPosition: {x: 1, y: 1},

    diagonaleUp: true,

    start: function () {

    },

    nextStep: function () {

        if (this.diagonaleUp) {
            if (this.currentPosition.y - 1 < 1) {
                this.diagonaleUp = false;
            }
            else {
                this.currentPosition.y -= 1;
            }
            this.currentPosition.x += 1;
        }
        else {
            if (this.currentPosition.x - 1 < 1) {
                this.diagonaleUp = true;
            }
            else {
                this.currentPosition.x -= 1;
            }
            this.currentPosition.y += 1;
        }

    },

    getNumerator: function () {
        return this.currentPosition.x;
    },

    getDenominator: function () {
        return this.currentPosition.y;
    }
}

