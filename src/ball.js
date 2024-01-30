// const canvas = document.getElementById("myCanvas");
// const ctx = canvas.getContext("2d");

class Ball {
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.lineWidth = 5;
        this.ballRadius = 10;
        this.x = this.canvas.width/2;
        this.y = this.canvas.height - 65;

        this.ballColor = "blue";
    }

    drawBall(posx, posy) {
        this.x = posx;
        this.y = posy;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.ballColor;
        this.ctx.fill();
        this.ctx.strokeStyle = "white" ;
        this.ctx.stroke();
    }

    changeBallColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++){
            color += letters[Math.floor(Math.random() * 16)];
        }
        this.ballColor = color;
    }
}



export default Ball;
