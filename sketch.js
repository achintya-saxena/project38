      //declaring all the variables
      var monkey,monkey_running;
      var banana ,bananaImage
      var obstacle,obstacleImage;
      var foodGroup,obstacleGroup;
      var score;
      var ground;
      var survivalTime=0;
      var score=0;
      var forest,forestImage;
      var collisions=0;
      var PLAY=1;
      var END=0;
      var gameState=PLAY;
      var gameOver,gameOverImage;
      var restart,restartImage;


function preload(){

            //loading the monkey animation with alot of images so that it looks like             it  is moving
                    monkey_running=loadAnimation("images/sprite_0.png","images/sprite_1.png","images/sprite_2.png","images/sprite_3.png","images/sprite_4.png","images/sprite_5.png","images/sprite_6.png","images/sprite_7.png","images/sprite_8.png");

             //loading the gameover and restart images
             gameOverImage =loadImage("images/gameOver.png");
             restartImage= loadImage("images/restart.png");

              //loading the banana and obstacle images
              bananaImage = loadImage("images/banana.png");
              obstacleImage = loadImage("images/obstacle.png");

              //loading the forest or background image
              forestImage=loadImage("images/forest.jpg");

                 }



function setup() {
            //creating the canvas of 400 by 400
            createCanvas(400,400);

            //creating the monkey sprite with location and size and adding its image
            monkey= createSprite(80,315,20,20);
            monkey.addAnimation("moving",monkey_running);
            monkey.scale=0.1;

            //creating the ground sprite with location and size and velocity
            ground= createSprite(400,370,900,50);
            ground.visible=false;
            ground.velocityX=-4;

            //creating and adding the background with velocity and size
            forest=createSprite(300,200,2000,2000);
            forest.addImage("jungle",forestImage);
            forest.scale=1.5;
           // forest.velocityX=-4;
 
            //creating and adding the game over animation with size and location and              setting its visibility to false 
            gameOver = createSprite(200,200,20,20);
            gameOver.addImage("over",gameOverImage);
            gameOver.visible=false;
            gameOver.scale=0.5;

            //creating and adding the restert button with size and location and                   setting its visibility to false 
            restart = createSprite(200,220,20,20);
            restart.addImage("res",restartImage);
            restart.visible=false;
            restart.scale=0.3;
  

           //creating the food and obstacles groups
           obstacleGroup = new Group();
           foodGroup= new Group();

           }


function draw() {
  
          //setting the background to green
          background("green");
           
          //setting the forest background's depth so that it is behind all the                 sprites  
          forest.depth=forest.depth-100;
         
         //making the monkey collide with the ground
          monkey.collide(ground);

          //giving infinite scroll to the background
          if (forest.x < 50){
          forest.x = forest.width/2;
           } 

          //condition of what will happen when the game state is play
         if(gameState===PLAY) {


          //giving infinite scroll to the ground
          ground.x=ground.width/2;

          //increasing the score by 2 when the monkey touches a banana and destroying           the banana
          if(monkey.isTouching(foodGroup)) {
          score=score+2
          foodGroup.destroyEach();
       }
       if(keyDown(RIGHT_ARROW)){
         monkey.x=monkey.x+5;
       }
       camera.position.x=monkey.x;
     console.log(camera.position.x);
     
         //increasing the size of the monkey when the score reaches 10,20 and 30               points
           switch(score){
             case 10 :monkey.scale=0.12;
             break;
             case 20 : monkey.scale=0.14;
             break;
             case 30 : monkey.scale=0.15;
             break;
            default: break;
             }

 
  
            //making the monkey jump when spacebar is pressed but it will not jump                higher than y location 225
                if(keyDown("space")&& monkey.y >= 225 ) {
                monkey.velocityY=-12;
                }
                
                //giving the monkey a gravity 
                monkey.velocityY=monkey.velocityY+0.8;


                //calling the obstacle and food functions
                spawnObstacles();
                spawnFood();
 
                //if monkey will touch the obstacles then its size would become                       normal and the game state would be end
               if(monkey.isTouching(obstacleGroup)) {
              monkey.scale=0.1;
               collisions=Math.round(frameCount/300);
                 gameState=END;
            }
            }
            //condition of what will happen when the game state is end
            else if(gameState===END) {
            //ground and forest velcity would be 0
            ground.velocityX=0;
            forest.velocityX=0;
           
            //game over and restart buttons will be visible
            gameOver.visible=true;
            restart.visible=true;
             
            //forest visibility would be false 
            forest.visible=false;
            
            //both the food and obstacle groups would get destroyed
            foodGroup.destroyEach();
            obstacleGroup.destroyEach();
              
           //monkeys velocity y would be 0
           monkey.velocityY=0;
    
              //if mouse would be pressed over restart button then the reset function              would work
              if(mousePressedOver(restart)) {
           reset();
          }
          }
         //drawing all the sprites
           drawSprites();
  
        //score condition
        if(gameState===PLAY) {
        stroke("white");
        textSize(20);
        fill("white");
        text("Score:"+score,200,20);

        stroke("white");
        textSize(20);
        fill("white");
        survivalTime= survivalTime+ Math.round(getFrameRate()/60);
        text("Survival Time:"+survivalTime,140,50);
        }
        }

//function to spawn the obstacles
function spawnObstacles() {
  
         //obstacles will get created at multiples of 300
          if(frameCount%300===0) {

            //creating the obstacle sprite,adding its Image with size and giving it a              velocity and lifetime
            obstacle=createSprite(375,330,20,20);
            obstacle.addAnimation("rocks",obstacleImage);
            obstacle.scale=0.1;
            obstacle.lifetime=200;
            obstacle.velocityX=-7;


            //adding the obstacles in the obstacle group
            obstacleGroup.add(obstacle);
          }
          }

//function to spawn the bananas/food
function spawnFood() {
  
      //banana will get created at multiples of 80
      if(frameCount%80===0) {

        //creating the banana sprite,adding its image with size,giving it a velocity         and lifetime
        banana=createSprite(375,330,20,20);
        banana.addImage("yum",bananaImage);
        banana.scale=0.1; 
        banana.lifetime=300;
        banana.velocityX=-5;
         

        //creating the banana at random y positions between 120 and 200
        banana.y =Math.round(random(100,200));

        //adding the banana in the food group
        foodGroup.add(banana);
      }
      }

//fucntion to reset the game
function reset() {
     //game state would be play
       gameState=PLAY;
      
    //visibility of the game over and restart button would be false/they will         disappear
       gameOver.visible=false;
       restart.visible=false;
       
      //food and obstacle groups would be destroyed for a while
       obstacleGroup.destroyEach();
       foodGroup.destroyEach();
       
      //forest would come back
      forest.visible=true;
       
       //score and survival time would be 0
       score=0;
       survivalTime=0;
       
       //forest and ground would move again
       forest.velocityX=-4;
       ground.velocityX=-4;
       
       //the function of creating the obstacle and bananas would work again
       spawnObstacles();
       spawnFood();
        }
