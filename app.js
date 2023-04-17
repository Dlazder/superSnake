const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 320;
canvas.height = 320;
let grid = 16;
let frame = 4;
let score = 0;
const scoreHeader = document.querySelector('.score');
const canvasOuter = document.querySelector('.canvas__outer');
const startMenu = document.querySelector('.startMenu');
const btnOnePlayer = document.querySelector('.onePlayer');
const btnTwoPlayers = document.querySelector('.twoPlayers');
const optionsMenu = document.querySelector('.optionsMenu');

class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = grid;
        this.dy = 0;
        this.tail = [];
        this.size = 4;
        this.isLive = true;
        this.isExists = false;
    };
    draw() {
        if (this.isLive) {
            this.tail.forEach(function(element, index) {
                if (index == 0) {
                    c.fillStyle = '#c5007f'
                } else c.fillStyle = '#530035';
                c.fillRect(element.x + 1, element.y + 1, grid - 2, grid - 2);
            });
        }
    };
    update() {
        if (this.isLive) {
            this.x += this.dx;
            this.y += this.dy;
            
            this.tail.unshift({x: this.x, y: this.y});
            if (this.tail.length > this.size) {
                this.tail.pop();
            }
            //death
            for (let i = 1; i < this.tail.length; i++) {
                if (this.tail[0].x === this.tail[i].x && this.tail[0].y === this.tail[i].y) {
                    this.isLive = false;
                    canvasOuter.style.transition = '.1s';
                    canvasOuter.style.backgroundColor = '#120c0c';
                    setTimeout(function() {canvasOuter.style.transition = '1s'}, 100)
                    setTimeout(function() {canvasOuter.style.backgroundColor = '#101010'}, 100);
                    for (let i = 1; i < this.tail.length; i++) {
                        this.tail[i].x = -10000;
                        setTimeout(function() {this.dx = 0; this.dy = 0;}, 1000);
                    }
                }
            }
            //borders
            if (this.x === canvas.width && this.isLive) this.x = -grid; else if (this.x < 0 && this.isLive) this.x = canvas.width;
            if (this.y === canvas.height && this.isLive) this.y = -grid; else if (this.y < 0 && this.isLive) this.y = canvas.height;
            this.draw();
        }
    }
}

class Apple {
    constructor() {
        this.x = Math.floor(Math.random() * (canvas.width/grid)) * grid;
        this.y = Math.floor(Math.random() * (canvas.height/grid)) * grid;
    }
    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.x + 4, this.y + 4, grid/2, grid/2);
    }
    update() {
        if (snake.isExists) {
            if (snake.tail[0].x === this.x && snake.tail[0].y === this.y) {
                this.x = Math.floor(Math.random() * (canvas.width/grid)) * grid;
                this.y = Math.floor(Math.random() * (canvas.height/grid)) * grid;
                snake.size++;
                score++;
                scoreHeader.innerHTML = score;
            }
        }
        
        if (snake2.isExists) {
            if (snake2.tail[0].x === this.x && snake2.tail[0].y === this.y) {
                this.x = Math.floor(Math.random() * (canvas.width/grid)) * grid;
                this.y = Math.floor(Math.random() * (canvas.height/grid)) * grid;
                snake2.size++;
                score++;
                scoreHeader.innerHTML = score;
            }
        }
        this.draw();
    }
}

btnOnePlayer.onclick = function() {
    snake.isExists = true;
    startMenu.classList.add('hidden');
}
btnTwoPlayers.onclick = function() {
    snake.isExists = true;
    snake2.isExists = true;
    startMenu.classList.add('hidden');
}
document.querySelector('.startGame').onclick = function() {
    optionsMenu.classList.add('hidden');
    canvas.width = document.querySelector('#input-canvas-width').value * 16;
    canvas.height = document.querySelector('#input-canvas-height').value * 16;
    snake.x = 0;
    snake.y = 16;
    snake2.x = canvas.width - grid;
    snake2.y = canvas.height - 2*grid;
    animate();
}
// canvas size inputs
document.querySelector('#input-canvas-width').onchange = function() {
    document.querySelector('.input-canvas-width-value').innerHTML = document.querySelector('#input-canvas-width').value;
}
document.querySelector('#input-canvas-height').onchange = function() {
    document.querySelector('.input-canvas-height-value').innerHTML = document.querySelector('#input-canvas-height').value;
}
document.querySelector('.input-canvas-width-value').innerHTML = document.querySelector('#input-canvas-width').value;
document.querySelector('.input-canvas-height-value').innerHTML = document.querySelector('#input-canvas-height').value;

function animate() {
    requestAnimationFrame(animate);
    if (++frame < 30) {
        frame++;
        return;
    }
    frame = 0;

    c.clearRect(0, 0, canvas.width, canvas.height);
    snake.update();
    if (snake2.isExists) {
        snake2.update();
        checkKill();
    }
    apple.update();
    apple2.update();
    
}
function checkKill() {
        for (let i = 0; i < snake2.tail.length; i++) {
            if (snake.tail[0].x === snake2.tail[i].x && snake.tail[0].y === snake2.tail[i].y) {
                snake.isLive = false;
                canvasOuter.style.transition = '.1s';
                canvasOuter.style.backgroundColor = '#120c0c';
                setTimeout(function() {canvasOuter.style.transition = '1s'}, 100)
                setTimeout(function() {canvasOuter.style.backgroundColor = '#101010'}, 100);
                for (let i = 0; i < snake.tail.length; i++) {
                    snake.tail[i].x = -10000;

                }
                snake.dx = 0;
                snake.dy = 0;
            }
        }
        for (let i = 0; i < snake.tail.length; i++) {
            if (snake2.tail[0].x === snake.tail[i].x && snake2.tail[0].y === snake.tail[i].y) {
                snake2.isLive = false;
                canvasOuter.style.transition = '.1s';
                canvasOuter.style.backgroundColor = '#120c0c';
                setTimeout(function() {canvasOuter.style.transition = '1s'}, 100)
                setTimeout(function() {canvasOuter.style.backgroundColor = '#101010'}, 100);
                for (let i = 0; i < snake2.tail.length; i++) {
                    snake2.tail[i].x = -20000;
                }
                snake2.dx = 0;
                snake2.dy = 0;
                }
            }
}

let snake = new Snake(0, 16);
let snake2 = new Snake(canvas.width - grid, canvas.height - 2*grid);
snake2.dx = -grid;
let apple = new Apple();
let apple2 = new Apple();




document.addEventListener("keydown", function(event) {
    switch (event.key) {
        case 'w':
            if (snake.dy != grid) {
                snake.dy = -grid;
		        snake.dx = 0;
            }
        break;
        case 'a':
            if (snake.dx != grid) {
                snake.dx = -grid;
                snake.dy = 0;
            }
        break;
        case 's':
            if (snake.dy != -grid) {
                snake.dy = grid;
		        snake.dx = 0;
            }
        break;
        case 'd':
            if (snake.dx != - grid) {
                snake.dx = grid;
                snake.dy = 0;
            }
        break;
    }
});
document.addEventListener("keydown", function(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (snake2.dy != grid) {
                snake2.dy = -grid;
		        snake2.dx = 0;
            }
        break;
        case 'ArrowLeft':
            if (snake2.dx != grid) {
                snake2.dx = -grid;
                snake2.dy = 0;
            }
        break;
        case 'ArrowDown':
            if (snake2.dy != -grid) {
                snake2.dy = grid;
		        snake2.dx = 0;
            }
        break;
        case 'ArrowRight':
            if (snake2.dx != - grid) {
                snake2.dx = grid;
                snake2.dy = 0;
            }
        break;
    }
});
document.querySelector('#btnUp').addEventListener('touchstart', function() {
    if (snake.dy != grid) {
        snake.dy = -grid;
        snake.dx = 0;
    }
});
document.querySelector('#btnLeft').addEventListener('touchstart', function() {
    if (snake.dx != grid) {
        snake.dx = -grid;
        snake.dy = 0;
    }
});
document.querySelector('#btnRight').addEventListener('touchstart', function() {
    if (snake.dx != - grid) {
        snake.dx = grid;
        snake.dy = 0;
    }
});
document.querySelector('#btnDown').addEventListener('touchstart', function() {
    if (snake.dy != -grid) {
        snake.dy = grid;
        snake.dx = 0;
    }
});