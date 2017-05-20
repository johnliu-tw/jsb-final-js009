//設定畫布環境
var bgImg = document.createElement("img");
var enemyImg = document.createElement("img");
var towerbtnImg= document.createElement("img")
var towerImg= document.createElement("img") 
var crosshairImage = document.createElement("img") 

crosshairImage.src = "images/crosshair.png"
bgImg.src="images/map.png";
enemyImg.src="images/jason.gif"
towerbtnImg.src="images/tower-btn.png"
towerImg.src="images/tower.png"

var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var isBuild = false;
var FPS = 60;
var clock =0
var HP = 100;
var score =0;
var Money =25;
ctx.fillStyle="white"
ctx.font = "24px Arial"
//設定敵人

function Enemy(){
   this.x = 96;
   this.y = 480-32;
   this.speedX = 0;
   this.speedY = -64;
   this.pathDes = 0;  
   this.hp = 10;   
   this.move = function(){
      if(isCollided(enemyPath[this.pathDes].x,enemyPath[this.pathDes].y,this.x,this.y,64/FPS,64/FPS)){
         
         if(this.pathDes===enemyPath.length-1){
            this.hp = 0;
            HP = HP - 10;
         }
         
         this.x = enemyPath[this.pathDes].x;
         this.y = enemyPath[this.pathDes].y;      
         this.pathDes = this.pathDes + 1;
         
         if(enemyPath[this.pathDes].x > this.x){
            this.speedX = 64;
            this.speedY = 0;
         }
         if(enemyPath[this.pathDes].x < this.x){
            this.speedX = -64;
            this.speedY = 0;
         }
         if(enemyPath[this.pathDes].y > this.y){
            this.speedX = 0;
            this.speedY = 64;
         }
         if(enemyPath[this.pathDes].y < this.y){
            this.speedX = 0;
            this.speedY = -64;
         }         
      }
      else{
         this.x = this.x + this.speedX/FPS;
         this.y = this.y + this.speedY/FPS;   
      }
   }
}

var enemies=[];

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

function Tower() {
   this.range = 96;
   aimingEnemyId:null,
   searchEnemy: function(){
      
      this.readyToShootTime =this.readyToShootTime - 1/FPS
      
      for(var i=0;i<enemies.length;i++){
         var distance =  Math.sqrt(
             Math.pow(this.x - enemies[i].x,2) + Math.pow(this.y - enemies[i].y,2)
         )
         if(distance < this.range){
            this.aimingEnemyId = i;
            
            if(this.readyToShootTime <= 0){
             this.shoot(i);
             this.readyToShootTime = this.fireRate
            }            
            return;
         }
      }
      this.aimingEnemyId = null;      
   },
   shoot: function(id){
      ctx.beginPath();
      ctx.moveTo(this.x,this.y);
      ctx.lineTo(enemies[id].x,enemies[id].y);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.stroke(); 
      enemies[id].hp = enemies[id].hp - this.damage
   },
   fireRate : 1,
   readyToShootTime: 1,
   damage: 5
   
}

$("#game-canvas").on("mousemove",function(event){
      cursor.x = event.offsetX
      cursor.y = event.offsetY
})

$("#game-canvas").on("click",function(event){
        if(isCollided(cursor.x,cursor.y,560,432,48,48)){
        	isBuild = true
        }
        else if(isBuild && !isCollided(cursor.x,cursor.y,560,432,48,48)){
        	tower.x = cursor.x-cursor.x%32;
         tower.y = cursor.y-cursor.y%32;
        }
        else{
          isBuild = false
        }
})

function draw(){
   
   ctx.drawImage(bgImg,0,0);
   if(clock%80==0){
      var newEnemy = new Enemy();
      enemies.push(newEnemy);
   }
   for(var i = 0; i<enemies.length;i++){
      
      if(enemies[i].hp<1){
         enemies.splice(i,1);         
         money = money + 25
         score = score + 8
      }
      else{
      enemies[i].move();
      ctx.drawImage(enemyImg,enemies[i].x,enemies[i].y)
      }
   }
   ctx.drawImage(towerbtnImg,560,432,48,48)
   if(isBuild){
      ctx.drawImage(towerImg,cursor.x,cursor.y)
   }
   ctx.drawImage(towerImg,tower.x,tower.y)  
   tower.searchEnemy();
   if(tower.aimingEnemyId!=null){
      var id = tower.aimingEnemyId;
      ctx.drawImage(crosshairImage, enemies[id].x,enemies[id].y)
   }
   
   ctx.fillText("HP: "+HP,20,20)
   ctx.fillText("Score: "+score,20,40) 
   ctx.fillText("Money: "+money,20,60)   
   clock = clock + 1;
   

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
