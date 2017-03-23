var ground;
var gorilla1;
var gorilla2;
var banana;
var bananaFlying;

var isGor1sTurn;

var isGameOver;
var winner;

function preload(){
  grass = loadImage("images/grass.png");
  gor1 = loadImage("images/Gorilla1.png");
  gor2 = loadImage("images/Gorilla2.png");
  ban = loadImage("images/banana.png");
  explosion = loadImage("images/explosion.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);

  grass.resize(width, 0);
  gor1.resize(0, 250);
  gor2.resize(0, 250);
  ban.resize(100,0);
  explosion.resize(0, 250);

  ground = createSprite(width/2, height - grass.height/2);
  ground.addImage(grass);
  ground.immovable=true;

  gorilla1 = createSprite();
  gorilla2 = createSprite();
  gorilla1.setCollider("circle",0,0,100);
  gorilla2.setCollider("circle",0,0,100);

  gorilla1.mass=120;
  gorilla2.mass=120;
  gorilla1.restitution=0.9;
  gorilla2.restitution=0.9;

  banana = createSprite();
  banana.addImage(ban);
  banana.setCollider("circle", 0, 0, 50);

  banana.mass=2;
  restartGame();
}

function draw() {
  drawBackground();

  if (! isGameOver ){
    if (bananaFlying) {
      banana.addSpeed(0.05, 90);
    }
    if (isBananaOut()){
      changeTurn();
    }

    if (banana.collide(gorilla1, gameOver) || banana.collide(gorilla2, gameOver)){
      isGameOver= true;
    }
    drawSprite(banana);
  } else {
    fill("red");
    textSize(24);
    text ("Game Over", width/2, height/2);
    winner.addSpeed(0.5, 90);
    winner.bounce(ground);

  }
  drawSprite(gorilla1);
  drawSprite(gorilla2);
}

function drawBackground(){
  background("deepskyblue");
  drawSprite(ground);
}

function mouseClicked(){
  if (isGameOver){
    restartGame();

  } else {
    if (! bananaFlying){
      bananaFlying = true;
      banana.setVelocity((mouseX-banana.position.x)/20, (mouseY-banana.position.y)/20);
      banana.rotationSpeed = 5;
    }
  }
}

function changeTurn(){
  banana.setVelocity(0,0);
  banana.rotationSpeed = 0;
  var banposX;
  var banposY;
  if (isGor1sTurn){
    banposX = gorilla1.position.x + gorilla1.width/2 + banana.width/2 + 10;
    banposY = gorilla1.position.y - gorilla1.height/2 + banana.height/2 - 10;
  } else {
    banposX = gorilla2.position.x - gorilla2.width/2 - banana.width/2 - 10;
    banposY = gorilla2.position.y - gorilla2.height/2 + banana.height/2 - 10;
  }

  banana.position.x = banposX;
  banana.position.y =  banposY;
  isGor1sTurn = ! isGor1sTurn;
  bananaFlying = false;
}

function isBananaOut(){
  return banana.position.x<0 || banana.position.x >width || banana.position.y > height || banana.collide(ground);
}

function restartGame(){

  bananaFlying = false;
  isGor1sTurn = true;
  isGameOver = false;
  gorilla1.addImage(gor1);
  gorilla2.addImage(gor2);
  gorilla1.setVelocity(0,0);
  gorilla2.setVelocity(0,0);
  gorilla1.position.x =  0 + gor1.width/2 ;
  gorilla1.position.y = height - grass.height/2 - gor1.height/2;
  gorilla2.position.x= width - gor2.width/2;
  gorilla2.position.y = height - grass.height/2 - gor2.height/2;
  changeTurn();
  winner = null;
}

function gameOver(banana, gorilla){
  winner = (gorilla===gorilla2)?gorilla1:gorilla2;
  loser  =(gorilla===gorilla2)?gorilla2:gorilla1; 
  loser.addImage(explosion);

}
