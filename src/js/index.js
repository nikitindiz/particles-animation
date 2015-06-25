var myDiv = document.querySelector('#place'),
    width = window.innerWidth,
    timerChecker;

window.resetPosition = function() {
    myDiv.style.left = '0px';
};


window.noTimer = function noTimer() {

    var myDiv = document.querySelector('#firstSquare');
    
    var position = parseInt(myDiv.style.left) || 0;
    
    while(position < (width / 2)) {        
        position += 20;
        myDiv.style.left = position + 'px';
        position = parseInt(myDiv.style.left);
    }
    
};

window.firstMoveRight = true;
window.seconMoveRight = true;

window.withSetTimeout = function withSetTimeout() {

    var myDiv = document.querySelector('#firstSquare');

    var position = +myDiv.style.transform.replace(/.*\((\d+).*/, "$1") || 30;
    
    if ( position >= (width / 2) && window.firstMoveRight ) {
        window.firstMoveRight = false;
    } else if (position <= 20) {
        window.firstMoveRight = true;
    }

    if (window.firstMoveRight) {
        position += 1;
        myDiv.style.transform = 'translateX(' + position + 'px)';
    } else {
        position -= 1;
        myDiv.style.transform = 'translateX(' + position + 'px)';
    }
    
    setTimeout(withSetTimeout, 0);

};

window.withRAF = function withRAF(time) {

    var myDiv = document.querySelector('#secondSquare');

    var position = +myDiv.style.transform.replace(/.*\((\d+).*/, "$1") || 30;
    
    if ( position >= (width / 2) && window.secondMoveRight ) {
        window.secondMoveRight = false;
    } else if (position <= 20) {
        window.secondMoveRight = true;
    }
   
    requestAnimationFrame(withRAF);

    withRAF.time = withRAF.time || time;

    var delta = (time - withRAF.time) || 1;
    
    if (window.secondMoveRight) {
        position += delta;
        myDiv.style.transform = 'translateX(' + position + 'px)';
    } else {
        position -= delta;
        myDiv.style.transform = 'translateX(' + position + 'px)';
    }

    withRAF.time = time;

    
    
};
