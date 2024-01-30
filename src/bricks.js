// const canvas = document.getElementById("myCanvas");
// const ctx = canvas.getContext("2d");

class Bricks {
    constructor(){
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.brickRowCount = 3;
        this.brickColumnCount = 5;
        this.brickWidth = 65;
        this.brickHeight = 20;
        this.brickPadding = 10;
        this.brickOffsetTop = 30;
        this.brickOffsetLeft = 15; 

        this.bricks = this.buildBricks();
    }

    buildBricks() {
        const bricks = [];
        for (let c = 0; c < this.brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < this.brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
          }
        }
        return bricks;
    }

    drawBricks() {
        for (let c = 0; c < this.brickColumnCount; c++) {
          for (let r = 0; r < this.brickRowCount; r++) {
            if (this.bricks[c][r].status === 1) {
                const brickX = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
                const brickY = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
            
            this.bricks[c][r].x = brickX;
            this.bricks[c][r].y = brickY;
            this.ctx.beginPath();
            this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
            this.ctx.fillStyle = "#0095DD";
            this.ctx.fill();
            this.ctx.closePath();
            }
          }
        }
      }
}

export default Bricks;