var canvas;
var ctx;

var score = 0;
var upBtnClicked = false;

var whale = {
    x: 50,
    y: 20,
    status: 1,
    imgSrc: "asset/img/whale1.png",
    img: new Image(),
    isCollision: function(obj) {
        if(this.x < obj.x + 50 && this.x + 40 > obj.x && this.y < obj.y + 100 && this.y + 40 > obj.y){
            return true;
        }
        return false;
    }
};

var kelp = [
    {
        name: "downKelp1",
        x: 300,
        y: 200
        //img: new Image()
    },
    {
        name: "upKelp1",
        x: 300,
        y: 0
        //img: new Image()
    },
    {
        name: "downKelp2",
        x: 540,
        y: 200
        //img: new Image()
    },
    {
        name: "upKelp2",
        x: 540,
        y: 0
        //img: new Image()
    }
];

//캔버스 초기화
window.onload = function(){
    canvas = document.getElementById('game');
    if(canvas.getContext){
        ctx = canvas.getContext("2d");
    }
}

//오브젝트 생성
function drawGameObject(gameObj){
    ctx.beginPath();
    if(gameObj.img != null){
        ctx.drawImage(gameObj.img, gameObj.x, gameObj.y);
    } else {
        ctx.rect(gameObj.x, gameObj.y, 50, 100);
    }
    ctx.stroke();
}

//고래 생성
function drawWhale(){
    if(whale.status==1){
        whale.status = 2;
    } else{
        whale.status = 1;
    }
    whale.imgSrc = "asset/img/whale"+whale.status+".png"
    whale.img.src = whale.imgSrc;
    drawGameObject(whale);
}

//장애물 생성
function drawKelp(){
    drawGameObject(kelp[0]);
    drawGameObject(kelp[1]);
    drawGameObject(kelp[2]);
    drawGameObject(kelp[3]);
}

// 캔버스 클리어
function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 고래 위치 계산
function calcWhale(direction){
    switch(direction){
        case 'up': whale.y-=30; break;
        case 'down': whale.y+=7; break;
    }
}

// 장애물 위치 계산
function calcKelp(){
    if(kelp[0].x < -50 || kelp[1].x < -50){
        kelp[0].x = 300;
        kelp[1].x = 300;
    }
    if(kelp[2].x < -50 || kelp[3].x < -50){
        kelp[2].x = 300;
        kelp[3].x = 300;
    }
    kelp[0].x -= 20;
    kelp[1].x -= 20;
    kelp[2].x -= 20;
    kelp[3].x -= 20;
}

// 오브젝트 위치 계산
function calcObjPos() {
    calcWhale('down');
    if(upBtnClicked) {
        calcWhale('up');
    }
    calcKelp();
}

//렌더링
function Render(){
    clearCanvas();
    drawWhale();
    drawKelp();
}

function upBtnEvent() {
    upBtnClicked = true;
}

function startGame(){
    gameInit();
    var game = setInterval(function(){
        calcObjPos();
        Render();

        // 충돌처리
        if(whale.y > 300 || whale.y < -40 || whale.isCollision(kelp[0]) || whale.isCollision(kelp[1]) || whale.isCollision(kelp[2]) || whale.isCollision(kelp[3])){
            alert("게임오버");
            clearInterval(game);
        }
        upBtnClicked = false;
    }, 200);
}

// 게임 초기화
function gameInit(){
    score = 0;
    whale.x = 50;
    whale.y = 50;
    kelp[0].x = 300;
    kelp[1].x = 300;
    kelp[2].x = 500;
    kelp[3].x = 500;
    whale.imgSrc = "asset/img/whale1.png";
    whale.img.src = whale.imgSrc;
}