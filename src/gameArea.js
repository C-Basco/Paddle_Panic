import Game from "./index.js"

class GameArea extends Game {
    constructor(){
        super();
        
    }

    gameArea() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        this.ball.drawBall();
        this.paddle.drawPaddle();
        this.bricks.drawBricks();
        this.drawScore();
        this.drawLives();
    }
}