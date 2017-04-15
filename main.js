//設定畫布環境
var bgImg = document.createElement("img");
var enemyImg = document.createElement("img");
var towerbtnImg= document.creatElement("img")

bgImg.src="images/map.png";
enemyImg.src="images/jason.gif"
towerbtnImg.src="images/tower-btn.png"
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

//設定敵人
var enemy ={
   x:96,
   y:480-32
};

function draw(){
   ctx.drawImage(bgImg,0,0);
   ctx.drawImage(enemyImg,enemy.x,enemy.y)
   ctx.drawImage(towerbtnImg,560,432,48,48)



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
