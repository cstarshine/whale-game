var canvas
var ctx
var x = 50;
var y = 50;
window.onload = function(){
    canvas = document.getElementById('game');
    if(canvas.getContext){
        ctx = canvas.getContext("2d");
    }
}

function drawSquare(x=50, y=20){
    ctx.beginPath();
    ctx.rect(x,y,50,50);
    ctx.stroke();
}

function eraseSquare(){
    console.log("지우기");
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function move(direction){
    switch(direction){
        case 'up': y-=20; break;
        case 'down': y+=10; break;
        case 'right': x+=10; break;
        case 'left': x-=10; break;
    }
    eraseSquare()
    drawSquare(x,y);
}

function startGame(){
    var game = setInterval(function(){
        move('down');
        if(y==260){
            alert("게임오버");
            clearInterval(game);
        }
    }, 100);
}