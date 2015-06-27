var Particle = require('../particles');


describe("Частица", function() {

    beforeEach(function() {
        brandNewParticle = new Particle(1,2,3);
    });

    it("должна быть экземпляром класса Particle",function(){
        expect(brandNewParticle instanceof Particle).toBeTruthy();
    });

    it("должна уметь создаваться через оператор new",function(){
        expect(typeof brandNewParticle).toBe('object');
        expect(typeof brandNewParticle).toBeDefined();
    });

    it("должна принимать параметры при создании (x, y, радиус)",function(){

        var x = Math.random() * 100,
            y = Math.random() * 100,
            radius = Math.random() * 100,
            anotherParticle = new Particle(x,y,radius);

        expect(anotherParticle.position.x).toBe(x);
        expect(anotherParticle.position.y).toBe(y);
        expect(anotherParticle.radius).toBe(radius);

    });

    it("должна уметь принимать отрицательные координаты (-x, -y, радиус)",function(){

        var x = Math.random() * 100 - 200,
            y = Math.random() * 100 - 200,
            radius = Math.random() * 100,
            anotherParticle = new Particle(x,y,radius);

        expect(anotherParticle.position.x).toBe(x);
        expect(anotherParticle.position.y).toBe(y);
        expect(anotherParticle.radius).toBe(radius);

    });

    it("должна бросать исключение при попытке создать частицу с отрицательным радиусом (x, y, отрицательный радиус)",function(){

        var x = Math.random() * 100 - 200,
            y = Math.random() * 100 - 200,
            radius = Math.random() * 100 - 200,
            createWrongParticle = function() {
                var wrongParticle = new Particle(x,y,radius);
            };

        expect(createWrongParticle).toThrow();

    });

    it("должна принимать координаты для перемещения через метод move(x, y, скорость в пикс/сек)",function(){

        var x = Math.random() * 100,
            y = Math.random() * 100,
            speed = Math.random() * 100;

        brandNewParticle.move(x,y,speed);

        expect(brandNewParticle.direction.x).toBe(x);
        expect(brandNewParticle.direction.y).toBe(y);
        expect(brandNewParticle.speed).toBe(speed);

    });

    it("должна менять свойство .status со 'standing' на 'moving' при вызове move() ",function(){

        expect(brandNewParticle.status).toBe('standing');

        var x = Math.random() * 100,
            y = Math.random() * 100,
            speed = Math.random() * 100;

        brandNewParticle.move(x,y,speed);

        expect(brandNewParticle.status).toBe('moving');

    });

    it("должна менять свойство .status с 'moving' на 'standing' при вызове stop() ",function(){

        var x = Math.random() * 100,
            y = Math.random() * 100,
            speed = Math.random() * 100;

        brandNewParticle.move(x,y,speed);

        expect(brandNewParticle.status).toBe('moving');

        brandNewParticle.stop();

        expect(brandNewParticle.status).toBe('standing');

    });

    it("должна считать началом совего перемещения вызов метода getPosition(timeStamp) ",function(){

        var x = Math.random() * 100,
            y = Math.random() * 100,
            speed = Math.random() * 100,
            timeStamp = Math.random() * 100;

        var oldPosition = brandNewParticle.position;

        brandNewParticle.move(x,y,speed);

        var newPosition = brandNewParticle.getPosition(timeStamp);

        expect(newPosition).toEqual(oldPosition);

    });

    //it("должна получать свои новые координаты исходя из направления, скорости, и дельты времени при getPosition(nextTimeStamp) ",function(){
    //
    //    var x = 4,
    //        y = 3,
    //        speed = Math.random() * 100,
    //        timeStamp = Math.random() * 100;
    //
    //    var oldPosition = brandNewParticle.position;
    //
    //    brandNewParticle.move(x,y,speed);
    //
    //    var newPosition = brandNewParticle.getPosition(timeStamp);
    //
    //    expect(newPosition).toEqual(oldPosition);
    //
    //});

});