(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n ? n : e)
      }, l, l.exports, e, t, n, r)
    }
    return n[o].exports
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s
})({
  "./src/js/index.js": [function(require, module, exports) {
    var Particle = require('./particles'),
      canvas = document.querySelector('#particlesField'),
      ctx = canvas.getContext('2d'),
      width = window.innerWidth,
      height = window.innerHeight,

      presetDefault = {
        // count: 1000,
        count: 1000,
        size: Math.max(width, height) / 2000,
        minSpeed: 1,
        maxSpeed: 50,
        startOrigin: {
          x: undefined,
          y: undefined
        }
      },

      presetFast = {
        count: 1000,
        size: 1,
        minSpeed: 20,
        maxSpeed: 100,
        startOrigin: {
          x: undefined,
          y: undefined
        }
      },

      presetCentralExplode = {
        count: 1000,
        size: 1,
        minSpeed: 1,
        maxSpeed: 100,
        startOrigin: {
          x: width / 2,
          y: height / 2
        }
      },

      presetInsaneRandomSizeFromLeftTop = {
        count: 2000,
        size: function() {
          return Math.random() * 10 + 1;
        },
        minSpeed: 20,
        maxSpeed: 100,
        startOrigin: {
          x: 1,
          y: 1
        }
      },

      presetInsaneRandomSizeFromCenter = {
        count: 2000,
        size: function() {
          return Math.random() * 2 + 0.2;
        },
        minSpeed: 20,
        maxSpeed: 100,
        startOrigin: {
          x: width / 2,
          y: height / 2
        }
      },

      settings = presetDefault;

    window.generateParticles = function(count, size, originX, originY) {

      window.particles = window.particles || [];

      for (var i = 0; i < count; i++) {
        var x = originX || Math.random() * window.innerWidth,
          y = originY || Math.random() * window.innerHeight;
        (function(particle) {
          window.particles.push(particle);
        })(new Particle(x, y, size));
      }
    };

    /* ======================= */

    resize();

    window.addEventListener('resize', resize, false);

    generateParticles(settings.count, settings.size, settings.startOrigin.x, settings.startOrigin.y);

    animate();

    /* ======================= */

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      if (window.particles) {

        for (var i = 0; i < window.particles.length; i++) {
          if (window.particles[i].position.x > width) {
            window.particles[i].stop();
            window.particles[i].position.x = width;
          }

          if (window.particles[i].position.y > height) {
            window.particles[i].stop();
            window.particles[i].position.y = height;
          }

        }
      }

    }

    function renderCanvas() {
      ctx.globalCompositeOperation = 'source-over';
      // ctx.globalCompositeOperation = "xor";


      // ctx.fillStyle = 'rgba(0,0,0,0.05)';

      ctx.fillStyle = 'rgba(1,5,12,0.05)';  // this is how it gives it a tail: fills everything gradually this color
      // lower alpha, longer tails

      ctx.fillRect(0, 0, width, height);  // rectangle over the entire screen

      // ctx.globalCompositeOperation = 'source-over';	// compositor operation for balls
      ctx.fillStyle = "rgba(255,255,255,1)"		// Color of the balls 
      // ctx.fillStyle = "rgba(4,18,47,0.1)";		// Color of the balls

      if (window.particles) {
        for (var i = 0; i < window.particles.length; i++) {
          var ball = window.particles[i];
          ctx.beginPath();
          ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2, false);
          // ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI, false);
          ctx.closePath();
          ctx.fill();
        }
      }

    }

    function animate(time) {
      requestAnimationFrame(animate);

      if (width !== canvas.width) {
        canvas.width = width;
      }

      if (height !== canvas.height) {
        canvas.height = height;
      }

      if (window.particles) {
        for (var i = 0; i < window.particles.length; i++) {
          var ball = window.particles[i];
          if (!ball.getPosition(time)) { // Time is the problem with why they all speed up
          	// if ball not exists, make another
            var x = Math.random() * width,
              y = Math.random() * height,
              // speed = Math.random() * (settings.maxSpeed / 2) + settings.minSpeed;
              speed = Math.random() * Math.random() * (settings.maxSpeed / 2) + settings.minSpeed;
            ball.move(x, y, speed);
          }
        }
      }

      renderCanvas();
    }

  }, {
    "./particles": "./index.js"
  }],
  "./index.js": [function(require, module, exports) {
    var Particle;

    Particle = function(posx, posy, radius) {

      if (radius < 0) {
        throw "Error! Given the particle radius " + radius + " pixels, but the radius cannot be negative!";
      }

      this.position = {
        x: posx || 0,
        y: posy || 0
      };

      if (typeof radius == 'function') {
        this.radius = radius();
      } else {
        this.radius = radius || 0;
      }

      this.status = 'standing'; // Statuses: standing || moving

      this.direction = this.position;

      this.speed = 1; // 1 pixels per second
      // this.speed =  Math.round(Math.random()) + Math.round(Math.random()) * 2;

      this.spotlightTimeStamp = undefined;

    };

    Particle.prototype.stop = function() {
      // alert("stop")
      this.status = 'standing';
      this.spotlightTimeStamp = undefined;
      this.direction = this.position;
    };

    Particle.prototype.move = function(posx, posy, speed) {

      this.status = 'moving';

      this.spotlightTimeStamp = undefined;
      var deltaX = posx - this.position.x,
        deltaY = posy - this.position.y,
        distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      this.direction = {
        x: posx,
        y: posy,
        distance: distance,
        sin: deltaY / distance,
        cos: deltaX / distance,
        // this.direction.slope = Math.atan(this.direction.sin / this.direction.cos);
        // slope: Math.random() * Math.PI * 2.0,
        slope: Math.atan( deltaY / deltaX ),
        chosenSlope: Math.random() * Math.PI * 2.0
      };

      if (this.direction.slope < 0) {
      	this.direction.slope += Math.PI * 2.0;
      }

      this.startPoint = this.position;

      this.speed = speed || 1;
      // this.speed = speed;
    };

    Particle.prototype.turn = function turn(direction_gradient) {
      // if you've reached chosen direction, choose another
      if (Math.abs(this.direction.slope - this.direction.chosenSlope) < direction_gradient * 5) {
      	this.direction.chosenSlope = Math.random() * Math.PI * 2.0;
      }

    	// turn towards chosen direction
      if (this.direction.slope > this.direction.chosenSlope) {
      	this.direction.slope = this.direction.slope - Math.random() * direction_gradient;
      	// this.direction.slope = this.direction.slope - Math.random(0, Math.random()); // cool spirals
      	this.direction.slope = Math.max(0.001, this.direction.slope);
      } else {
      	this.direction.slope = this.direction.slope + Math.random() * direction_gradient;
      	// this.direction.slope = this.direction.slope + Math.random(0, Math.random());
      	this.direction.slope = Math.min((Math.PI * 2.0) - 0.0001, this.direction.slope);
      }

      // something went wrong
      if (this.direction.slope > Math.PI * 2.0 || this.direction.slope < 0.001) {
      	alert("Direction is off" + this.direction.slope);
      }
    };

    Particle.prototype.getPosition = function getPosition(movetime) {

      var time = Math.min(movetime / 1000, 3);
      // var time = movetime / 1000;
      // var time = 30;

      if (this.status == 'moving') {
        if (this.spotlightTimeStamp) {
          var deltaTime = time - this.spotlightTimeStamp,
            distance = (deltaTime * this.speed),
            // distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
        	direction_gradient = 0.01;


          var slope = this.direction.slope;

          this.turn(direction_gradient);

          if (Math.abs(this.direction.slope - slope) > direction_gradient) {
          	alert("error 2");
          }
          if (this.direction.slope == slope) {
          	alert("error 3");
          }


          // get x,y from radians
          this.direction.sin = Math.sin(this.direction.slope);
          this.direction.cos = Math.cos(this.direction.slope);
          // this.direction.cos += (Math.cos(this.direction.slope) - this.direction.cos);

          // scale x,y to distance
          var posy = this.direction.sin * distance,
            posx = this.direction.cos * distance;

          // move
          this.position = {
            x: posx + this.startPoint.x,
            y: posy + this.startPoint.y
          };

          // if (distance > this.direction.distance) {
          //   this.status = 'standing';
          //   this.spotlightTimeStamp = undefined;
          //   this.position = this.direction;
          // }

        } else {
          this.spotlightTimeStamp = time;
        }
        return this.position;
      } else {
        return false;
      }
    };

    module.exports = Particle;
  }, {}]
}, {}, ["./src/js/index.js"])