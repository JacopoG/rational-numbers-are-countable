"use strict"



document.addEventListener("DOMContentLoaded", function () {

    Animation.init();
    document.querySelector(".velocity-input").addEventListener("change", function () {
        console.log("change");
        Animation.updateVelocity();
    });


});



var Animation = (function () {
    var t = {},
        canvas,
        ctx,
        height,
        width,
        placeholderDistance = 100,
        velocity = 1000,
        dotsAtSameTime = 10,
        dots = [];



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
        t.updateVelocity();
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
            ctx.font = '20px Lato';
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
        ctx.clearRect(width * 0.1 - 30, height * 0.1 - 30, 60, 80);
        ctx.fillStyle = "#adadad";
        ctx.font = "30px Lato";
        ctx.textAlign = "center"; ctx.fillText(num, width * 0.1, height * 0.1);
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
        t.drawDot(n);

        ctx.fill();
    };



    t.nearToOtherDots = function (x, y) {
        var near = false;
        dots.forEach( function (dot, index) {
            var distance;
            distance = Math.sqrt(Math.pow(Math.abs(dot.x - x), 2) + Math.pow(Math.abs(dot.y - y), 2));
            if (distance < 10) {
                near = true;
            }
        });
        
        return near;
    };



    t.drawDot = function (n, y, visibilityLevel, isNewDot) {
        var x, rgb;
        isNewDot = (isNewDot == undefined) ? true : isNewDot;
        visibilityLevel = (visibilityLevel == undefined) ? dotsAtSameTime : visibilityLevel;
        x = (n + 2) * placeholderDistance;
        y = y || height/2 * 0.8;
        rgb = {
            r: 0,
            g: 95,
            b: 203,
        };

        if (dots.length > dotsAtSameTime) {
            console.warn("too dots in memory: " + dots.length);
        }

        //when draw the dot at full visibility level,
        //if is too near other dots,
        //move the dot above
        while (isNewDot && t.nearToOtherDots(x, y)) {
            y -= 10;
        }

        //first time I draw a dot,
        //I add it to the array
        if (isNewDot) {
            dots.push({
                "x": x,
                "y": y
            });
        }

        //last time I draw the dot,
        //now can be removed
        if (visibilityLevel == 0) {
            dots.shift();
            ctx.clearRect(x - 4, y - 4, 8, 8);
            return;
        }

        rgb.r += Math.round((255 - rgb.r) * 1 / visibilityLevel);
        rgb.g += Math.round((255 - rgb.g) * 1 / visibilityLevel);
        rgb.b += Math.round((255 - rgb.b) * 1 / visibilityLevel);

        //drawing
        ctx.clearRect(x - 4, y - 4, 8, 8); //clean up the previous status
        ctx.beginPath();
        ctx.fillStyle = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
        ctx.arc(x, y, 3 * (visibilityLevel / dotsAtSameTime), 0, 2 * Math.PI);
        ctx.fill();

        visibilityLevel = visibilityLevel - 1;

        window.setTimeout(

            function () {
                t.drawDot(n, y, visibilityLevel, false);
            },

            velocity
        );

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
            console.log(num + "/" + den);

        }

        return window.setTimeout(
            function () {t.start(current + 1)},
            velocity
        );

    };



    t.updateVelocity = function () {
        var factor = document.querySelector(".velocity-input").value;
        velocity = 1000 * (1,1 - factor/10);
        console.log(velocity);
    }



    return t;
}());





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



function slow () {
    var input = document.querySelector(".velocity-input");

    if (input.value > 1) {
        input.value = parseInt(input.value) - 1;
        dispatchChangeEvent();
    }

    console.log("slow");
}



function fast () {
    var input = document.querySelector(".velocity-input");

    if (input.value < 10) {
        input.value = parseInt(input.value) + 1;
        dispatchChangeEvent();
    }

    console.log("fast");
}

function dispatchChangeEvent () {
    var input = document.querySelector(".velocity-input"),
        event = document.createEvent('Event');

    event.initEvent("change", false, true);
    input.dispatchEvent(event);
    //input.dispatchEvent(new Event('change')); IE not support, obviously

}

