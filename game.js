if (!window.requestAnimationFrame) { // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
        }
}

var fps = 60;
var step = 1 / fps;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = 500; //TODO don't hardcode
var height = 300;

const KEYS = { UP: 38, DOWN: 40 };

var player = {dy: 0};

ctx.fillStyle = '#FFFFF0';
// ctx.fillRect(0, 0, 20, 20);


ctx.beginPath();
ctx.moveTo(0, 50);
ctx.lineTo(20, 65);
ctx.lineTo(0, 80);
ctx.fill();

function keyChange(event, keyCode, pressed) {
    switch (keyCode) {
        case KEYS.UP: player.up = pressed; event.preventDefault(); return;
        case KEYS.DOWN: player.down = pressed; event.preventDefault(); return;
    }
}

document.addEventListener('keydown', (ev) => { return keyChange(ev, ev.keyCode, true) });
document.addEventListener('keyup', (ev) => { return keyChange(ev, ev.keyCode, false) });

function update(dt) {
    updatePlayer(dt);
}

function updatePlayer(dt) {
    if (player.up) {
        //move player up
        player.dy -= 2;
    }
    else if (player.down) {
        //move player down
        player.dy += 2;
    }
}

function drawPlayer() {
    ctx.beginPath();
    ctx.moveTo(0, 50+player.dy);
    ctx.lineTo(20, 65+player.dy);
    ctx.lineTo(0, 80+player.dy);
    ctx.fill();
}

function render(ctx, counter, dt) {
    ctx.clearRect(0, 0, width, height);
    drawPlayer();
}

function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}
function bound(x, min, max) {
    return Math.max(min, Math.min(max, x));
}

var counter = 0, dt = 0, now, last = timestamp();

function processFrame() {
    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    while (dt > step) {
        dt = dt - step;
        update(step);
    }
    render(ctx, counter, dt);
    last = now;
    counter++;
    requestAnimationFrame(processFrame, canvas);
}

processFrame()