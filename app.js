"use strict"

document.addEventListener("DOMContentLoaded", function () {
    
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var height = window.innerHeight;
    var width = window.innerWidth;



    canvas.height = height;
    canvas.width = width;

    ctx.fillStyle = "#adadad";
    ctx.strokeStyle = "#adadad";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, height/2);
    ctx.lineTo(width, height/2);
    ctx.stroke();
    ctx.lineWidth = 2;

    function drawFraction (num, den) {
        ctx.clearRect(width * 0.1 - 30, height * 0.1 - 30, 100, 100);
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(num, width * 0.1, height * 0.1);
        ctx.fillText(den, width * 0.1, height * 0.1 + 35);
        ctx.beginPath();
        ctx.strokeStyle = "#adadad";
        ctx.lineWidth = 1;
        ctx.moveTo(width * 0.1 - 20, height * 0.1 + 7);
        ctx.lineTo(width * 0.1 + 20, height * 0.1 + 7);
        ctx.stroke();
        ctx.lineWidth = 2;
    }


    var drawStep = function (x, n, number) {
        var yTop = height/2 - 20;
        var yBottom = height/2 + 20;
        var number = number || false;
        ctx.moveTo(x, yTop);
        ctx.lineTo(x, yBottom);

        if (!number) {
            var offset = 6;
            if (n > 9) {
                offset = 10;
            }
            ctx.font = '20px Arial';
            ctx.fillText(n, x - offset, yBottom + 30);
        }
        ctx.stroke();
    };



    var drawAllStep = function(distance) {
        var stepsNumber = width / distance;


        drawStep(distance, -1);
        drawStep(distance * 2, 0);
        
        for (var i = 3; i < stepsNumber; i = i + 1) {
            drawStep(distance * i, i - 2);
        }
    };



    var blinkOnStraightLine = function (n) {
        var x, y;
        x = n * 100 + 50 * 4;
        y = height/2;

        ctx.lineWidth = 1;
        ctx.strokeStyle = '#005fcb';
        ctx.beginPath();
        drawStep(x, n, true);
        //ctx.arc(x, y, 3, 0, Math.PI * 4, true); // Outer circle
        ctx.fill();
    };



    var start = function (n, current) {

        var num, den;
        current = current || 0;

        if (current > n) {
            //@todo
            console.log("continuo");
            //return;
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
            drawFraction(num, den);
            console.log(num/den);

        }

        return window.setTimeout(
            function () {start(n, current + 1)},
            4000
        );

        //return windows.start(n, current + 1);
    };




    drawAllStep(100);
    start(1000);



});





var Diagonale = {

    currentPosition: {x: 0, y: 1},

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
            if (this.currentPosition.x - 1 < 0) {
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

