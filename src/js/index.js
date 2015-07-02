var Particle = require('./particles'),
    canvas = document.querySelector('#particlesField'),
    ctx = canvas.getContext('2d'),
    width = window.innerWidth,
    height = window.innerHeight,
    piByPi = Math.PI*2,
    particles = [],

    presetDefault = {
        count: 1000,
        size: 1,
        minSpeed: 10,
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
            x: width/2,
            y: height/2
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
            x: width/2,
            y: height/2
        }
    },

    settings = presetInsaneRandomSizeFromCenter;


window.generateParticles = function(count, size, originX, originY) {

    for (var i = 0; i <= count; i++) {
        var x = originX || Math.random() * window.innerWidth,
            y = originY || Math.random() * window.innerHeight;
        (function(particle){
            particles.push(particle);
        })(new Particle(x,y,size));
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

    if (particles) {

        for(var i = 0 ; i < particles.length; i++) {
            if(particles[i].position.x > width) {
                particles[i].stop();
                particles[i].position.x = width;
            }

            if(particles[i].position.y > height) {
                particles[i].stop();
                particles[i].position.y = height;
            }

        }
    }

}

function renderCanvas() {

    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,0.1)';

    ctx.fillRect(0,0,width,height);

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = "rgba(255,255,255,1)";



    if(particles) {
        for(var i = 0; i < particles.length; i++) {
            var ball = particles[i];
            ctx.beginPath();
            ctx.arc(ball.position.x,ball.position.y,ball.radius,0,piByPi,false);
            ctx.closePath();
            ctx.fill();
        }
    }

}

function animate(time) {
    requestAnimationFrame(animate);

    if(width !== canvas.width) {
        canvas.width = width;
    }

    if(height !== canvas.height) {
        canvas.height = height;
    }

    if(particles) {
        for(var i = 0; i < particles.length; i++) {
            var ball = particles[i];
            if(!ball.getPosition(time)) {
                var x = Math.random() * width,
                    y = Math.random() * height,
                    speed = Math.random() * (settings.maxSpeed / 2) + settings.minSpeed;
                ball.move(x,y,speed);
            }
        }
    }

    renderCanvas();
}



