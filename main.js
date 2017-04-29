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
var isBuild = false;

//設定敵人
var enemy ={
   x:96,
   y:480-32,
   speedX:0,
   speedY:-64,
   pathDes:0,
   move:function(){
      if(isCollided(enemyPath[this.pathDes].x,enemyPath[this.pathDes].y,this.x,this.y,64/FPS,64/FPS)){
         
         this.x = enemyPath[this.pathDes].x;
         this.y = enemyPath[this.pathDes].y;      
         this.pathDes = this.pathDes + 1;
         
         if(enemyPath[this.pathDes].x > this.x){
            ____.speedX = __;
            ____.speedY = 0;
         }
         if(enemyPath[this.pathDes].x < this.x){
            ____.speedX = __;
            ____.speedY = __;
         }
         if(enemyPath[this.pathDes].y > this.y){
            ____.speedX = __;
            ____.speedY = __;
         }
         if(enemyPath[this.pathDes].y < this.y){
            ____.speedX = __;
            ____.speedY = __;
         }
         
         
      }
      else{
         this.x = this.x + this.speedX/FPS;
         this.y = this.y + this.speedY/FPS;   
      }
   }
};

var enemyPath=[
   {x:96, y:64},
   {x:384, y:64},
   {x:384, y:192},
   {x:224, y:192},
   {x:224, y:320},
   {x:544, y:320},
   {x:544, y:96}
]
//設定游標
var cursor = {
   x:0,
   y:0
}



$("#game-canvas").on("mousemove",function(event){
      cursor.x = event.offsetX
      cursor.y = event.offsetY
})

$("#game-canvas").on("click",function(event){
      if(isCollided(cursor.x,cursor.y,560,432,48,48)){
         isBuild=true;
      }
      else{
         isBuild = false;
      }
})

function draw(){
   //enemy.move();
   ctx.drawImage(bgImg,0,0);
   ctx.drawImage(enemyImg,enemy.x,enemy.y)
   ctx.drawImage(towerbtnImg,560,432,48,48)
   if(isBuild){
      ctx.drawImage(towerImg,cursor.x,cursor.y)
   }

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
