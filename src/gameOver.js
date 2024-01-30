import {Game} from "./internal"


export class GameOver extends Game{
    constructor(nlives, nscore, nbrc, nbcc){
        const junction_font = new FontFace('VT323', 'url(/images/assets/fonts/VT323-Regular.ttf)');
        junction_font.load().then((loaded_face) => {
            // loaded_face holds the loaded FontFace
            document.fonts.add(loaded_face);
            document.body.style.fontFamily = '"VT323", Sans-Serif';
        }).catch(function(error) {
            // error occurred
            console.error('Font loading error:', error);
        });
   
        super();
        this.lives = nlives;
        this.score = nscore;
        this.brc = nbrc;
        this.bcc = nbcc;
    }   
    
     
    gameOver(nlives, nscore, nbrc, nbcc){
        this.lives = nlives;
        this.score = nscore;
        this.brc = nbrc;
        this.bcc = nbcc;

        const c = document.getElementById("gameover");
        const cnv = c.getContext("2d");
        c.width = 200;
        c.height = 350;

        c.addEventListener("dblclick", this.reload);

        this.bgLayer(cnv, c);

        cnv.font = "30px VT323";
        cnv.fillStyle = "red";
        cnv.textAlign = "center";

        cnv.fillText("Score", c.width - 55, c.height / 3.7);
        cnv.fillText("Lives", c.width - 145, c.height / 3.7);
        cnv.fillText(`${this.score}`, c.width - 55, c.height / 3);
        cnv.fillText(`${this.lives}`, c.width -145, c.height / 3);
        

        cnv.fillText("Game Over", c.width / 2, c.height / 2);
        cnv.font = "25px VT323";
        cnv.fillText("[Double-Click]", c.width / 2, 255);

        if (this.score === this.brc * this.bcc){
            this.youWon(cnv, c);
        } else {
            this.youLose(cnv, c);
        }

    // Draw text on the canvas
    }

    youWon(cnv, c){
        cnv.fillText("YOU WON!", c.width / 2, c.height / 1.5);
    }

    youLose(cnv, c){
        cnv.fillText("YOU LOSE!", c.width / 2, c.height / 1.5);
    }

    bgLayer(cnv, c){
        cnv.lineWidth = 1;
        cnv.rect(25, 50, 150, 250);
        cnv.fillStyle = "black";
        cnv.fill();
        cnv.strokeStyle = "green" ;
        cnv.stroke();
        cnv.shadowColor = "green";
        cnv.shadowBlur = 5;
    }

    reload(){
        document.location.reload();
    }
}


