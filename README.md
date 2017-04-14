<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
<h1>老師碎碎念</h1>

請到這份Google文件問問題：
https://docs.google.com/document/d/15KpMlCw7Sy9YjHOpx06BBQW4FKFoxlsdCUoVJNnjoAI/edit <br>
老師盡量回答大家的問題Der，請大家不要害羞喔喔～

歡迎同學透過以下連結，尋找那些未知惱人function的用法<br>
中文：http://pydoing.blogspot.tw/2012/10/javascript-tutorial.html<br>
英文：http://www.w3schools.com/js/

老師個人覺得英文寫的比較好，但覺得讀英文比較吃力也可以參考中文～

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
