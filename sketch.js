var survivaltime=0;

var play=1;
var end=0;
var gamestate=play;
var gameover,gOI,restart,rI;
var ground_image,ground,invisibleG;
var monkey , monkey_running,monkey_dead;
var banana ,bananaImage, obstacle, obstacleImage,oI1,oI2;
var bananaGroup, obstacleGroup;
var score;
var bgImage,bg;
var foodtaken=0;
function preload(){
  
  ground_image=
    loadImage("1.jpg");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_dead=loadAnimation("download (1).png");
  bananaImage = loadImage("banana.png");
  obstacelImage = loadImage("obstacle.png");
  oI1=loadImage("r.png");
  oI2=loadImage("rock.png");
  bgImage=loadImage("1 - Copy.jpg")
  gOI=loadImage("GAMEOVER.png");
  rI=loadImage("re.png");
}



function setup() {
  createCanvas(600,400);
  obstacleGroup=createGroup(); 
  bg=createSprite(300,100);
  bg.addImage(bgImage);
  
  bg.scale=1.5;
  
  
  ground=createSprite(300,380,600,5)
  ground.addImage(ground_image);
  
  ground.scale=1.5;
  
  monkey=createSprite(50,300,5,5);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.125;
  
  //monkey.debug=true;
  
  

  invisibleG=createSprite(100,335,300,5);
  bananaGroup=new Group();
  restart=createSprite(300,200,5,5);
  restart.addImage(rI);
  restart.scale=0.175;

  gameover=createSprite(300,100,5,5);
  gameover.addImage(gOI);
  gameover.scale=0.3;

  
  
}


function draw() {
   background("white");
  if(gamestate===play){
    if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      foodtaken=foodtaken+1;
    }
    obstacleGroup.setVelocityXEach(-(4+survivaltime/20)); 
    bg.velocityX=-(4+survivaltime/20); 
    
    if(bg.x<0){
      bg.x=width/2;
    }
    ground.velocityX=-(4+survivaltime/20);
    if(ground.x<0){
      ground.x=width/2;
    }
    if(keyDown("space")&& monkey.y > 323){
    monkey.velocityY = -20;
    }
    monkey.velocityY = monkey.velocityY + 0.8
  
  spawnObstacles();
  
  createBanana();
  restart.visible=false;
  gameover.visible=false;
   
  if(monkey.isTouching(obstacleGroup)){
    gamestate=end;
    
  }
  survivaltime=Math.ceil(frameCount/frameRate());
    
    
  }
  else if(gamestate===end){
              obstacleGroup.setVelocityXEach(0);
    bg.velocityX=0;
    ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);           
    restart.visible=true;
    gameover.visible=true; 
    bananaGroup.depth=restart.depth;
    bananaGroup.depth= gameover.depth;
    restart.depth=restart.depth+1;
    gameover.depth=gameover.depth+1;
   
    if(mousePressedOver(restart)){
      gamestate=play;
      foodtaken=0;
      obstacleGroup.destroyEach();
      bananaGroup.destroyEach();
      survivaltime=0;
      frameCount=0;
    }
    
    
    
  }
 
  
  

  
  

  
  
  
  
 
  
  monkey.collide(invisibleG);
  
  invisibleG.visible=false;
  

  drawSprites();
  textSize(15);
  fill("red");
  text("FoodTaken:"+foodtaken,480,25);
  text("SurvivalTime:"+survivaltime,300,25);
}

function spawnObstacles(){
  if (frameCount%150===0){
  obstacle=createSprite(600,305,5,5);
    
    obstacle.scale=0.205;
    var p=Math.round(random(1,3))
    switch(p){
      case 1:
        obstacle.addImage(obstacelImage);
        break;
        case 2:
         obstacle.addImage(oI1);
         break;
         case 3:
          obstacle.addImage(oI2);
          break;
      default:break;
        
    }
  obstacle.setCollider("rectangle",0,0,450,450);
  //obstacle.debug=true;
  obstacle.lifetime=160;
    
    
    obstacleGroup.add(obstacle);
    }
}
function createBanana(){
  if(frameCount%120===0){
    
    
    
  
    banana=createSprite(600,200,5,5);
    banana.addImage(bananaImage);
    banana.scale=0.07;
    banana.velocityX=-(5+survivaltime/20);
    banana.y=Math.round(random(10,150));
    banana.lifetime=130;
    
    bananaGroup.add(banana);
  }
}



