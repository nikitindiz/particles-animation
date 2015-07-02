var piByPi = Math.PI*2;

var Particle;

Particle = function(posx,posy,radius) {

    if(radius < 0) {
        throw "Ошибка! Дан радиус частицы "+radius+" пикселей, но радиус не может быть отрицательным!";
    }

    this.position = {
        x: posx || 0,
        y: posy || 0
    };

    if(typeof radius == 'function') {
        this.radius = radius();
    } else {
        this.radius = radius || 0;
    }

    this.status = 'standing'; // Статусы: standing || moving

    this.direction = this.position;

    this.speed = 1; // 1 пиксель в секунду

    this.spotlightTimeStamp = undefined;

};

Particle.prototype.stop = function() {
    this.status = 'standing';
    this.spotlightTimeStamp = undefined;
    this.direction = this.position;

    return this;
};

Particle.prototype.move = function(posx,posy,speed) {

    this.status = 'moving';

    this.spotlightTimeStamp = undefined;

    var deltaX = posx - this.position.x,
        deltaY = posy - this.position.y,
        distance = Math.sqrt(deltaX*deltaX + deltaY*deltaY);

    this.direction = {
        x: posx,
        y: posy,
        distance: distance,
        sin: deltaY / distance,
        cos: deltaX / distance
    };

    this.startPoint = this.position;

    this.speed = speed || 1;

    return this;

};

Particle.prototype.getPosition = function(movetime) {

    var time = movetime / 1000;

    if(this.status == 'moving') {
        if(this.spotlightTimeStamp) {
            var deltaTime = time - this.spotlightTimeStamp,
                distance = (deltaTime * this.speed);

            var posy = this.direction.sin * distance,
                posx = this.direction.cos * distance;

            this.position = {
                x: posx + this.startPoint.x,
                y: posy + this.startPoint.y
            };

            if(distance > this.direction.distance) {
                this.status = 'standing';
                this.spotlightTimeStamp = undefined;
                this.position = this.direction;
            }

        } else {
            this.spotlightTimeStamp = time;
        }
        return this.position;
    } else {
        return false;
    }
};

Particle.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x,this.position.y,this.radius,0,piByPi,false);
    ctx.closePath();
    ctx.fill();
};

module.exports = Particle;