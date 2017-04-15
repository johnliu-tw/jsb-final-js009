//設定畫布環境
var bgImg = document.createElement("img");
var enemyImg = document.createElement("img");
var towerbtnImg= document.createElement("img")
var towerImg= document.createElement("img") 

bgImg.src="images/map.png";
enemyImg.src="images/jason.gif"
towerbtnImg.src="images/tower-btn.png"
towerImg.src="images/tower.png"

var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

//設定敵人
var enemy ={
   x:96,
   y:480-32
};

var cursor = {
   x:0,
   y:0
}

$("#game-canvas").on("mousemove",function(event){
      cursor.x = event.offsetX
      cursor.y = event.offsetY
})

function draw(){
   ctx.drawImage(bgImg,0,0);
   ctx.drawImage(enemyImg,enemy.x,enemy.y)
   ctx.drawImage(towerbtnImg,560,432,48,48)
   ctx.drawImage(towerImg,cursor.x,cursor.y)
}


setInterval(draw,16);

function isCollided(pointX, pointY, targetX, targetY, targetWidth, targetHeight) {
    if(     pointX >= targetX
        &&  pointX <= targetX + targetWidth
        &&  pointY >= targetY
        &&  pointY <= targetY + targetHeight
    ){
        return true;
    } else {
        return false;
    }
}
