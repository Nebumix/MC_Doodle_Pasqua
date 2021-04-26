"use strict";

const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");

const logo = new Image();
logo.src = "assets/img/logo.png";

const uovo = new Image();
uovo.src = "assets/img/uovo1.png";


// let uovo_x = 0;
// let uovo_y = cnv.height - 50;

let uovaBase = new Array();
let uovaSalto = new Array();

function uovaBaseClass(x){
    this.uovo_x = x;
    this.uovo_y = cnv.height - 50;

    this.mov = function(){
        this.uovo_y += getRandomIntInclusive(-1,1);
        this.uovo_x += getRandomIntInclusive(-1,1);
    
        if(this.uovo_y > cnv.height){
            this.uovo_y = this.uovo_y - 10;
        }
    
        if(this.uovo_y < cnv.height - 100){
            this.uovo_y = this.uovo_y + 10;
        }
    }
    this.draw = function(){
        ctx.drawImage(uovo, 
            this.uovo_x, 
            this.uovo_y, 
            80, 
            100);
    }
}


function uovaSaltoClass(x){
    this.uovo_x = x;
    this.uovo_y = cnv.height - 10;
    this.speed = 0;

    this.mov = function(){
        this.uovo_y 
    }

    this.draw = function(){
        ctx.drawImage(uovo, 
            this.uovo_x, 
            this.uovo_y, 
            80, 
            100);
    }
}


function logic(){
    for(let i = 0; i < uovaBase.length; i++){
        uovaBase[i].mov(); 
    }

    for(let i = 0; i < uovaSalto.length; i++){
        uovaSalto[i].mov(); 
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
}

function draw(){
    ctx.fillStyle = "#24a2ec";
    ctx.fillRect(0,0, cnv.width, cnv.height);
    ctx.stroke();

    ctx.drawImage(logo, 
        (cnv.width/2) - (logo.width/2), 
        (cnv.height/2) - (logo.height/2));

    // ctx.drawImage(uovo, 
    //     uovo_x, 
    //     uovo_y, 
    //     80, 
    //     100);
    
    for(let i = 0; i < uovaBase.length; i++){
        uovaBase[i].draw(); 
    }

    for(let i = 0; i < uovaSalto.length; i++){
        uovaSalto[i].draw(); 
    }

}

function gameLoop(){
    logic();
    draw();

    requestAnimationFrame(gameLoop);
}

function init(){
    for(let i = 0; i < 20; i++){
        uovaBase[i] = new uovaBaseClass(
            getRandomIntInclusive(0, 850)
        );
    }

    for(let i = 0; i < 50; i++){
        uovaSalto[i] = new uovaSaltoClass(
            getRandomIntInclusive(0, 850)
        );
    }
}

init();
gameLoop();