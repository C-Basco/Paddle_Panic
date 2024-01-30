// const canvas = document.getElementById("myCanvas");
// const ctx = canvas.getContext("2d");

class Paddle{
    constructor(){
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.paddleHeight = 15;
        this.paddleWidth = 75;
        this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
        this.paddlePosHeight = this.canvas.height - 50;
        
        
    }
    drawPaddle() {
        this.ctx.beginPath();
        this.ctx.rect(this.paddleX, this.paddlePosHeight, this.paddleWidth, this.paddleHeight);
        this.ctx.fillStyle = "green";
        this.ctx.fill();
        this.ctx.closePath();
    }
    
}

export default Paddle;