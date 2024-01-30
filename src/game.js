import Ball from "./ball.js"
import Paddle from "./paddle.js"
import Bricks from "./bricks.js"
import { GameOver } from "./internal"


export class Game {
    constructor(){
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.shadowColor = "grey";
        this.ctx.shadowOffsetY = 10;
        this.ctx.shadowBlur = 10;
        this.ball = new Ball();
        this.paddle = new Paddle();
        this.bricks = new Bricks();

        this.GAMEOVER = false;

        this.dx = 2;
        this.dy = -2;

        this.lives = 3;
        this.rightPressed = false;
        this.leftPressed = false;

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 65;

        this.lives = 3;
        this.score = 0;

        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
        
    }
    gameLoop() {
        self = this;
        self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
        this.gameover = new GameOver();
        
        function loop() {
            self.gameArea();
            self.gameover.gameOver();
            self.collisionDetection();

            self.moveBall();
            self.movePaddle();

            if(self.GAMEOVER === false){
                requestAnimationFrame(loop);
            }
            
        }
        loop();   
    }
    toggleStart(id, toggle) {
        const element = document.getElementById(id);
        const display = (toggle) ? 'block' : 'none';
        element.style.display = display;
    }

    keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = true;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = true;
        }
    }

    keyUpHandler(e){
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = false;
        }
    }

    collisionDetection() {
        let brick = this.bricks.bricks;
        for (let c = 0; c < this.bricks.brickColumnCount; c++) {
            for (let r = 0; r < this.bricks.brickRowCount; r++) {
                const b = brick[c][r];
                if (b.status === 1) {
                    if (
                        this.x > b.x &&
                        this.x < b.x + this.bricks.brickWidth &&
                        this.y > b.y &&
                        this.y < b.y + this.bricks.brickHeight
                    ) {
                        this.dy = -this.dy;
                        b.status = 0;
                        this.ball.ballColor = this.ball.changeBallColor();
                        this.score++;
                        if (this.score === this.bricks.brickRowCount * this.bricks.brickColumnCount) {
                            this.GAMEOVER = true;
                            this.toggleStart("gameover", true);
                            this.gameover.gameOver(this.lives, this.score, this.bricks.brickRowCount, this.bricks.brickColumnCount);
                            // alert("YOU WIN, CONGRATULATIONS!");
                            // document.location.reload();

                        }
                }
            }
        }
        }
    }

    moveBall(){
        //Check for collisions with the walls
        if (this.x + this.dx > this.canvas.width - this.ball.ballRadius || this.x + this.dx < this.ball.ballRadius) {
            this.dx = -this.dx;
        }
        if (this.y + this.dy < this.ball.ballRadius) {
            this.dy = -this.dy;
        }else if (this.y + this.dy > this.paddle.paddlePosHeight - this.ball.ballRadius) {
            if (this.x > this.paddle.paddleX && this.x <this.paddle.paddleX + this.paddle.paddleWidth){
                // When paddle hits the ball
                this.dy = -(this.dy*1.2);
                this.ball.changeBallColor();
            }else{
                this.lives--;
                if (!this.lives) {
                    //alert("GAME OVER");
                    this.GAMEOVER = true;
                    this.toggleStart("gameover", true);
                    this.gameover.gameOver(this.lives, this.score, this.bricks.brickRowCount, this.bricks.brickColumnCount);
                    //document.getElementById("gameover").onload = function() {this.gameover.gameOver()}
                    //document.location.reload();
                } else {
                this.x = this.canvas.width / 2;
                this.y = this.canvas.height - 65;
                this.dx = 2;
                this.dy = -2;
                this.paddle.paddleX = (this.canvas.width - this.paddle.paddleWidth) / 2;
                }
            }  
        }
        this.x += this.dx;
        this.y += this.dy;

        this.ball.drawBall(this.x, this.y);
    }

    movePaddle(){
        if (this.rightPressed){
            this.paddle.paddleX = Math.min(this.paddle.paddleX + 2.5, this.canvas.width - this.paddle.paddleWidth);
        } else if (this.leftPressed){
            this.paddle.paddleX = Math.max(this.paddle.paddleX - 2.5, 0);
        }
    }

    drawScore() {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Score: ${this.score}`, 8, 20);
    }

    drawLives() {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Lives: ${this.lives}`, this.canvas.width - 65, 20);
    }

    gameArea() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(bgImg, 0, 0, this.canvas.width, this.canvas.height);
        this.ball.drawBall();
        this.paddle.drawPaddle();
        this.bricks.drawBricks();
        this.drawScore();
        this.drawLives();
    }

    

    // startGame(){
    //     game.gameLoop();
    // }
    
}


