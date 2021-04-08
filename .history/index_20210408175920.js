var canvas
var ctx
var whaleX = 50;
var whaleY = 50;
var netY;
var netX;

window.onload = function(){
    canvas = document.getElementById('game');
    if(canvas.getContext){
        ctx = canvas.getContext("2d");
    }
}

function drawWhale(whaleX=50, whaleY=20){
    ctx.beginPath();
    ctx.rect(whaleX, whaleY, 50, 50);
    ctx.stroke();
}

function drawNet(){

}

function clearCanvas(){
    console.log("지우기");
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function moveWhale(direction){
    switch(direction){
        case 'up': y-=45; break;
        case 'down': y+=10; break;
        case 'right': x+=10; break;
        case 'left': x-=10; break;
    }
    clearCanvas()
    drawWhale(x,y);
}

function startGame(){
    var game = setInterval(function(){
        moveWhale('down');
        if(y >= 260){
            alert("게임오버");
            clearInterval(game);
            clearCanvas()
        }
    }, 150);
}