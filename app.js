"use strict"

var Animation = (function () {
    var t = {},
        canvas,
        ctx,
        height,
        width,
        placeholderDistance = 100,
        velocity = 1000;



    t.init = function () {
        console.log("start animation");
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        height = window.innerHeight;
        width = window.innerWidth;
        placeholderDistance = width / 18;

        canvas.height = height;
        canvas.width = width;
        ctx.fillStyle = "#adadad";
        ctx.strokeStyle = "#adadad";
        ctx.lineWidth = 4;

        t.drawNaturalsStraightLine();
        t.drawAllPlaceholder(placeholderDistance);
        t.drawFraction(0, 1);
        t.start();
    };



    t.drawNaturalsStraightLine = function () {
        ctx.beginPath();
        ctx.moveTo(0, height/2);
        ctx.lineTo(width, height/2);
        ctx.stroke();
        ctx.lineWidth = 2;
    };



    t.drawPlaceholder = function (x, n, WithoutNumber) {
        var yTop = height/2 - 20;
        var yBottom = height/2 + 20;
        var WithoutNumber = WithoutNumber || false;
        ctx.moveTo(x, yTop);
        ctx.lineTo(x, yBottom);

        if (!WithoutNumber) {
            ctx.font = '20px Arial';
            ctx.textAlign = "center";
            ctx.fillText(n, x, yBottom + 30);
        }

        ctx.stroke();
    };




    t.drawAllPlaceholder = function(distance) {
        var stepsNumber = width / distance;


        t.drawPlaceholder(distance, -1);
        t.drawPlaceholder(distance * 2, 0);
        
        for (var i = 3; i < stepsNumber; i = i + 1) {
            t.drawPlaceholder(distance * i, i - 2);
        }
    };



    t.drawFraction = function (num, den) {
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
    };



    t.drawRational = function (n) {
        var x, y;
        x = (n + 2) * placeholderDistance;
        y = height/2;

        ctx.lineWidth = 1;
        ctx.strokeStyle = '#005fcb';
        ctx.beginPath();
        t.drawPlaceholder(x, n, true);

        ctx.fill();
    };



    t.start = function (current) {

        var num, den;
        current = current || 0;


        
        if (current == 0) {

            t.drawRational(0);
            console.log("0/1");

        }
        else {

            Diagonale.nextStep();
            num = Diagonale.getNumerator();
            den = Diagonale.getDenominator();
            t.drawRational(num/den);
            t.drawFraction(num, den);
            //console.log(num/den);
            console.log(num + "/" + den);

        }

        return window.setTimeout(
            function () {t.start(current + 1)},
            velocity
        );

    };



    return t;
}());

document.addEventListener("DOMContentLoaded", function () {

    Animation.init();

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

