let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';

// load all images
let bg = document.createElement('img')
bg.src = './images/bg.png';

let fg = new Image();
fg.src = './images/fg.png';

let bird = new Image();
bird.src = './images/bird.png'

let pipeNorth = new Image();
pipeNorth.src = './images/pipeNorth.png'

let pipeSouth = new Image();
pipeSouth.src = './images/pipeSouth.png'

let intervalId = 0;
let isGameOver = false;
let score = 0; 
let birdY = 170, birdX = 30;
let falling = true;

let pipes = [
    { x: 110, y: -100},
    { x: 330, y: -80},
]

function draw(){
    ctx.drawImage(bg, 0, 0)
    ctx.drawImage(bird, birdX, birdY)
    let gap =  pipeNorth.height + 150

    for (let i =0; i<pipes.length; i++ ){
        ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y)
        ctx.drawImage(pipeSouth, pipes[i].x, pipes[i].y + gap)
        pipes[i].x--

        if (pipes[i].x + pipeNorth.width < 0) {
            pipes[i] = {
                x: 400,
                y: -Math.floor(Math.random() * pipeNorth.height)
            }
        }
        if (pipes[i].x == 0) {
            score++
        }

        let birdWithPipeStart = birdX + bird.width >= pipes[i].x 
        let birdWithPipeEnd =  birdX <= pipes[i].x + pipeNorth.width
        let birdPipeNorth = birdY <=  pipes[i].y + pipeNorth.height
        let birdPipeSouth = birdY + bird.height >=  pipes[i].y + gap

        if (( birdWithPipeStart && birdWithPipeEnd ) && 
            (birdPipeNorth ||birdPipeSouth ) 
        ) {
            isGameOver = true;
        }
    }

    
    if (falling) {
        birdY = birdY + 2;
    }
    else {
        birdY = birdY - 10
    }

    if (birdY + bird.height > canvas.height - fg.height) {
        isGameOver = true;
    }
    
    ctx.drawImage(fg, 0, canvas.height - fg.height)
    ctx.font = '22px Roboto';
    ctx.fillText(`Score: ${score}`, 20, canvas.height - 50);

    if (isGameOver) {
        cancelAnimationFrame(intervalId)
    }
    else {
        intervalId = requestAnimationFrame(draw)
    }
}

window.addEventListener('load', () => {
    draw()

    document.addEventListener('mousedown', () => {
        falling = false;
    })
    document.addEventListener('mouseup', () => {
        falling = true;
    })

})
