"use strict";

const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");

const logo = new Image();
logo.src = "assets/img/logo.png";

let uovoSalto = new Array();

function uovaSaltoClass(x, speed, cost){
    this.uovo = new Image();
    this.uovo.src = "assets/img/uovo"+ cost +".png";
    this.uovo_x = x;
    this.uovo_y = cnv.height;
    this.speed = speed;

    this.mov = function(){
        this.uovo_y -= this.speed;
        this.speed = ((this.speed*10) - (0.2*10)) / 10;

        if(this.speed < -10){
            this.uovo_y = cnv.height;
            this.uovo_x = getRandomIntInclusive(0, 850);
            this.speed = getRandomIntInclusive(6, 10);
            this.uovo.src = "assets/img/uovo"+ getRandomIntInclusive(1, 16) +".png";
        }
    }

    this.draw = function(){
        ctx.drawImage(this.uovo, 
            this.uovo_x, 
            this.uovo_y, 
            80, 
            100);
    }
}

function logic(){

    for (let i = 0; i < uovoSalto.length; i++){
        uovoSalto[i].mov();
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
}

function draw(){

    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0, cnv.width, cnv.height);
    ctx.stroke();

    ctx.save();
    ctx.globalAlpha = 0.1;

    ctx.drawImage(logo, 
        (cnv.width/2) - (logo.width/2), 
        (cnv.height/2) - (logo.height/2));

    ctx.restore();

    ctx.textAlign = "center";

    //
    ctx.save();
    ctx.filter = 'blur(4px)';

    ctx.fillStyle="rgba(0,0,0,0.5)"; 
    ctx.fillText("Buona Pasqua", (cnv.width/2)+3, ((cnv.height/2) + 50)+5); 
    
    ctx.restore();
    //
    
    ctx.fillStyle = "#d4af37";
    ctx.font = "120px Snell Roundhand";             
    ctx.fillText("Buona Pasqua", cnv.width/2, (cnv.height/2) + 50);  

    for (let i = 0; i < uovoSalto.length; i++){
        uovoSalto[i].draw();
    }

}

function gameLoop(){
    logic();
    draw();

    requestAnimationFrame(gameLoop);
}

function init(){

    for (let i = 0; i < 6; i++){
        uovoSalto[i] = new uovaSaltoClass(
            getRandomIntInclusive(50, 800), 
            getRandomIntInclusive(6, 10), 
            getRandomIntInclusive(1, 16)
        );
    }

}

init();
gameLoop();