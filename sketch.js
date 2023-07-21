let player1 //Player 1 PongStick
let player2 //Player 2 PongStick

let score = 0; //Player 1 Point
let enemyScore = 0; //Player 2 Point
let myLeft, myRight, myTop, myBottom; 
let enemyLeft, enemyRight, enemyTop, enemyBottom;
let ball //The bouncing ball
let ballYPos = 250;
let gameState; //State 1, 2, 3
let aiDifficulty;
function setup() {
    createCanvas(500, 500);
    player1 = new PongStick(30, 300, 6);
    player2 = new PongStick(470, 300, 6);
    ball = new Ball(250, 250, Math.round(random(-4,4)), Math.round(random(-4,4)))
    if (ball.speedX ==0){
        ball.speedX = 3;
    }
    if (ball.speedY ==0){
        ball.speedY=3;
    }
    gameState = 0;
   noStroke();
   rectMode(CENTER);
   aiDifficulty = 3;
}

function draw() {
    //Game state detection to see what should appear on screen
    background(0);

    
    //gameState 0 is the opening screen
    if (gameState == 0) {
        fill(255, 255, 255);
        textSize(40);
        text("Retro Pong", 150, 200)  
        textSize(20)
        text("Press up to start game with 2 players", 100, 300)     
        text("Press down to start game with AI", 120, 350)
        textSize(15)
        text("Player 1 Control: W,S     Player 2 Control: Up Arrow, Down Arrow", 35, 40)
        text("By: Zhejie Jiang, Papa Kofi Insaidoo, Vishnu", 120, 450)          

        if (keyIsDown(UP_ARROW)) {
            gameState =1;
        }
        if (keyIsDown(DOWN_ARROW)) {
            gameState =4;
        }
        
    }
   if (gameState == 1){fill(0, 0, 255);
   rect(player2.x, player2.y, 5, 50);

   fill(255, 0, 0);
   rect(player1.x, player1.y, 5, 50);
    fill(255,255,255); 
    circle(ball.x, ball.y, 15)

    //Player 1 movement
    if (keyIsDown(87)) {
        player1.y-=player1.speed;
   }
   if (keyIsDown(83)) {
        player1.y += player1.speed;
   }
   //Player 2 movement
   if (keyIsDown(UP_ARROW)) {
       player2.y -= player2.speed;
   }


   if (keyIsDown(DOWN_ARROW)) {
       player2.y += player2.speed;
   }
   textSize(10);

   
   console.log('ball', ball)
   ball.x+=ball.speedX;
   ball.y+=ball.speedY;
   if (ball.y>=485 || ball.y<=15) {
        ball.speedY = -ball.speedY;
   }

   //Hit detection definition
   myLeft = player1.x-7.5;
   myRight = player1.x + 7.5;
   myTop = player1.y-50;
   myBottom = player1.y + 50;


   enemyLeft = player2.x-7.5;
   enemyRight = player2.x + 7.5;
   enemyTop = player2.y-50;
   enemyBottom = player2.y + 50;

   ballLeft = ball.x - 15;
   ballRight = ball.x + 15;
   ballTop = ball.y - 1;
   ballBottom = ball.y + 2;
   //Player 1 gets point
   if (ball.x>485) {
    ball.x = 250;
    ball.y=250;
    ball.speedX = Math.round(random(-5,5));
    ball.speedY = Math.round(random(-5,5));
    if (ball.speedX ==0){
        ball.speedX = 3;
    }
    if (ball.speedY ==0){
        ball.speedY=3;
    }
    score++;
   }
   //Player 2 gets point
   if (ball.x<15) {
    ball.x = 250;
    ball.y=250;
    ball.speedX = Math.round(random(-4,4));
    ball.speedY = Math.round(random(-4,4));
    if (ball.speedX ==0){
        ball.speedX = 3;
    }
    if (ball.speedY ==0){
        ball.speedY=3;
    }
    enemyScore++;
   }

    //Ball hits Player2 hit detection 
   if (enemyLeft > ballRight || enemyRight < ballLeft || enemyTop > ballBottom || enemyBottom < ballTop) {
   }
   else {
        ball.speedX *= -1;
        (ball.speedX<0) ? ball.speedX -=random(0,0.5) : ball.speedX += random(0,0.5);
        (ball.speedY<0) ? ball.speedY -=random(0,0.5) : ball.speedY += random(0,0.5);
    }

    //Ball hits Player1 hit detection 
    if (myLeft > ballRight || myRight < ballLeft || myTop > ballBottom || myBottom < ballTop) {
    }
    else {
         ball.speedX *= -1;
         (ball.speedX<0) ? ball.speedX -=random(0,0.5) : ball.speedX += random(0,0.5);
         (ball.speedY<0) ? ball.speedY -=random(0,0.5) : ball.speedY += random(0,0.5);
     }            
 
   fill(255,255,255)
   text(`Player 1 Score: ${score}`, 10, 20);
   text(`Player 2 Score: ${enemyScore}`, 400, 20);
   
     //Game over
    if(score >= 3 || enemyScore >=3) {
        gameState = 2;
        
    }}
    if (gameState ==2){
        background(0);
        fill(255);
        textSize(40);
        if(score == 3){text("Player 1 won!", 130, 250);}
        else{text("Player 2 won!", 130, 250);}
    }
    // AI opponent
    if (gameState ==3) {
        player2.speed =aiDifficulty;
        fill(0, 0, 255);
   rect(player2.x, player2.y, 5, 50);

   fill(255, 0, 0);
   rect(player1.x, player1.y, 5, 50);
    fill(255,255,255); 
    circle(ball.x, ball.y, 15)

    //Player 1 movement
    if (keyIsDown(87)) {
        player1.y-=player1.speed;
   }
   if (keyIsDown(83)) {
        player1.y += player1.speed;
   }
   //AI Movement
   if (player2.y>=ball.y) {
       player2.y -= player2.speed;
   } else {
       player2.y += player2.speed;
   }
   textSize(10);

   
   console.log('ball', ball)
   ball.x+=ball.speedX;
   ball.y+=ball.speedY;
   if (ball.y>=485 || ball.y<=15) {
        ball.speedY = -ball.speedY;
   }

   //Hit detection definition
   myLeft = player1.x-7.5;
   myRight = player1.x + 7.5;
   myTop = player1.y-50;
   myBottom = player1.y + 50;


   enemyLeft = player2.x-7.5;
   enemyRight = player2.x + 7.5;
   enemyTop = player2.y-50;
   enemyBottom = player2.y + 50;

   ballLeft = ball.x - 15;
   ballRight = ball.x + 15;
   ballTop = ball.y - 1;
   ballBottom = ball.y + 2;
   //Player 1 gets point
   if (ball.x>485) {
    ball.x = 250;
    ball.y=250;
    ball.speedX = Math.round(random(-5,5));
    ball.speedY = Math.round(random(-5,5));
    if (ball.speedX ==0){
        ball.speedX = 3;
    }
    if (ball.speedY ==0){
        ball.speedY=3;
    }
    score++;
   }
   //Player 2 gets point
   if (ball.x<15) {
    ball.x = 250;
    ball.y=250;
    ball.speedX = Math.round(random(-4,4));
    ball.speedY = Math.round(random(-4,4));
    if (ball.speedX ==0){
        ball.speedX = 3;
    }
    if (ball.speedY ==0){
        ball.speedY=3;
    }
    enemyScore++;
   }

    //Ball hits Player2 hit detection 
   if (enemyLeft > ballRight || enemyRight < ballLeft || enemyTop > ballBottom || enemyBottom < ballTop) {
   }
   else {
        ball.speedX *= -1;
        (ball.speedX<0) ? ball.speedX -=random(0,0.5) : ball.speedX += random(0,0.5);
        (ball.speedY<0) ? ball.speedY -=random(0,0.5) : ball.speedY += random(0,0.5);
    }

    //Ball hits Player1 hit detection 
    if (myLeft > ballRight || myRight < ballLeft || myTop > ballBottom || myBottom < ballTop) {
    }
    else {
         ball.speedX *= -1;
         (ball.speedX<0) ? ball.speedX -=random(0,0.5) : ball.speedX += random(0,0.5);
         (ball.speedY<0) ? ball.speedY -=random(0,0.5) : ball.speedY += random(0,0.5);
     }            
 
   fill(255,255,255)
   text(`Player 1 Score: ${score}`, 10, 20);
   text(`Player 2 Score: ${enemyScore}`, 400, 20);
   
     //Game over
    if(score >= 3 || enemyScore >=3) {
        gameState = 2;
    }
    }
    // AI Difficulty
    if (gameState ==4) {
        fill(255, 255, 255);
        textSize(40);
        text("Choose the AI Difficulty: ", 40, 200)  
        textSize(20)
        text("Press up for Easy AI", 160, 300)     
        text("Press left for Medium AI", 145, 350)
        text("Press right for Hard AI", 155, 400)

        if (keyIsDown(UP_ARROW)) {
            gameState = 3;
            aiDifficulty = 3;
        }
        if (keyIsDown(LEFT_ARROW)) {
            gameState = 3;
            aiDifficulty = 6;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            gameState = 3;
            aiDifficulty =8;
        }
    }
}

//PongStick Class
class PongStick {
    constructor(x,y,speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
}
//Ball Class
class Ball {
    constructor(x, y, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
    }
}