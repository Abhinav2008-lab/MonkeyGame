
var monkey , monkey_running;

var ground;

var banana ,bananaImage, obstacle, obstacleImage

var FoodGroup, obstacleGroup

var score

function preload(){
  
  monkey_running =                     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(500,400);
  
  var survivaltime = 0;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300,350,1200,10);
  ground.velocityX = -6;
  
  score = 0;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  
  background(250);
  
  if(ground.x < 0){
    ground.x = ground.width / 2;
  }
  
  if(keyDown("space")){
    monkey.velocityY = -15;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  spwanFood();
  spwanObstacles();
  
  drawSprites();
  
  if(obstacleGroup.isTouching(monkey)){
    obstacleGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    monkey.velocityY = 0;
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime = Math.round(frameCount/frameRate());
  text("survivalTime: " + survivaltime,200,50);
  
}

function spwanFood(){
  if(frameCount % 60 === 0){
    food = createSprite(600,200,20,20);
    food.addImage("food",bananaImage);
    food.scale = 0.08;
    food.y = Math.round(random(200,160));
    food.velocityX = -6;
    food.lifetime = 300;
    
    monkey.depth = food.depth+1;
    
    foodGroup.add(food);
  }
}

function spwanObstacles(){
  if(frameCount % 200 === 0){
    obstacle = createSprite(600,320,20,20);
    obstacle.addImage("obstacles",obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}