var canvas;
var ctx;

var whale = {
    x: 50,
    y: 20,
    status: 1,
    imgSrc: "asset/img/whale1.png",
    img: new Image(),
    isCollision: function(obj){
        console.log(obj.x+" "+obj.y);
        if(this.x < obj.x+50 && this.x+50 > obj.x && this.y < obj.y+100 && this.y+50 > obj.y){
            console.log("충돌처리");
            return true;
        }
        return false;
    }
};

var kelp = [];

kelp[0] = {
    name: "downKelp",
    x: 300,
    y: 200
    //img: new Image()
}

kelp[1] = {
    name: "upKelp",
    x: 300,
    y: 0
    //img: new Image()
}

window.onload = function(){
    canvas = document.getElementById('game');
    if(canvas.getContext){
        ctx = canvas.getContext("2d");
    }
}

function drawGameObject(gameObj){
    ctx.beginPath();
    if(gameObj.img != null){
        ctx.drawImage(gameObj.img, gameObj.x, gameObj.y);
    } else {
        ctx.rect(gameObj.x, gameObj.y, 50, 100);
    }
    ctx.stroke();
}

function drawWhale(){
    if(whale.status==1){
        whale.status = 2;
    } else{
        whale.status = 1;
    }
    whale.imgSrc = "asset/img/whale"+whale.status+".png"
    whale.img.src = whale.imgSrc;
    clearCanvas();
    drawGameObject(whale);
}

function drawKelp(){
    drawGameObject(kelp[1]);
    drawGameObject(kelp[0]);
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moveWhale(direction){
    switch(direction){
        case 'up': whale.y-=45; break;
        case 'down': whale.y+=7; break;
        case 'right': whale.x+=10; break;
        case 'left': whale.x-=10; break;
    }
    drawWhale();
}

function moveKelp(){
    if(kelp[0].x < -50 || kelp[1].x < -50){
        kelp[0].x = 300;
        kelp[1].x = 300;
    }
    kelp[0].x -= 10;
    kelp[1].x -= 10;
    drawKelp();
}

function Render(){
    clearCanvas();
    moveWhale('down');
    moveKelp();
}

function startGame(){
    gameInit();
    var game = setInterval(function(){
        Render();
        if(whale.y >= 260 || whale.y <= 0 || whale.isCollision(kelp[0]) || whale.isCollision(kelp[1])){
            alert("게임오버");
            clearInterval(game);
            clearCanvas();
        }
    }, 200);
}

function gameInit(){
    whale.x = 50;
    whale.y = 50;
    kelp[0].x = 300;
    kelp[1].x = 300;
    whale.imgSrc = "asset/img/whale1.png";
    whale.img.src = whale.imgSrc;
}