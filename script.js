var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var jet1_img = new Image;
var jet2_img = new Image;
var jet3_img = new Image;
var bg_img = new Image;
var enemy_img = new Image;
var explode_img = new Image;
var bullet_img = new Image;
var random_shit = "hello";


jet1_img.src = "jet_1.png";
jet2_img.src = "jet_2.png";
jet3_img.src = "jet_3.png";
enemy_img.src = "enemy.png";
explode_img.src = "explode.png"
bg_img.src = "bg.png";
bullet_img.src = "bullet.png";

canvas.width = window.innerWidth - 15;
canvas.height = window.innerHeight - 15;

var overall_screen_counter = 1;
const keys = ["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp", " ", "a", "s", "d", "w"];// ArrowLeft -> 0, 1->5, c->8, a->10
var pressedKey = [false, false, false, false, false, false, false, false, false];
var score = 0; //SCORE counters
var time_left = 5000; //TIME LEFT FOR ENEMIES TO ARRIVE
var ready = false; //player is getReady
var jet_img = new Image; //FINAL PLAYER 1 IMG
var jet_speed = 6;
var jet_x = (canvas.width - 350) / 2 - 10;
var jet_y = 110;
var number_of_enemies = 5;
var enemy_x = [];
var enemy_y = [];
var enemy_speedx = [];
var enemy_speedy = [];
var gameOver = false;
var name = "0";
var shot_down = false;
var bullet_on_screen = false;
var mouse_x;
var mouse_y;
var bullet_x = -1000;
var bullet_y = -1000;
var probx;
var proby;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("click", updateMousePos);


function createEnemies() {
  for (let i = 0; i < number_of_enemies; i++) {

    probx = 6 + Math.floor(Math.random() * 936);
    proby = 200 + Math.floor(Math.random() * 435);
    while (distance(probx, proby, jet_x, jet_y) < 350) {
      probx = 6 + Math.floor(Math.random() * 936);
      proby = 200 + Math.floor(Math.random() * 435);
    }
    enemy_x.push(probx);
    enemy_y.push(proby);

    enemy_speedx.push(2 * Math.floor(2 * Math.random()) - 1);
    enemy_speedy.push(2 * Math.floor(2 * Math.random()) - 1);

  }
}


function keyDownHandler(e) {
  for (let i = 0; i < keys.length; i++) {
    if (e.key == keys[i] || e.key == keys[i + 8]) {
      pressedKey[i] = true;
    }
  }
}

function keyUpHandler(e) {
  for (let i = 0; i < keys.length; i++) {
    if (e.key == keys[i] || e.key == keys[i + 8]) {
      pressedKey[i] = false;
    }
  }
}

function updateMousePos(event) {
  mouse_x = event.clientX;
  mouse_y = event.clientY;
}

function warning_line() {
  ctx.beginPath();
  ctx.rect(0, 200, canvas.width - 350, 2);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();
  // ctx.font = "22px Quicksand";
  // ctx.fillStyle = "#000000"; 
  // ctx.textAlign = "center";
  // ctx.fillText("STAY ABOVE WARNING LINE UNTIL ENEMIES COME TO NOT DIE INSTANTLY ", canvas.width/2-175, 250);
}

function screen1() {
  ctx.font = "50px Quicksand";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.fillText("INSTRUCTIONS", canvas.width / 2, 100 - 50);
  ctx.font = "22px Quicksand";
  ctx.fillText("YOU ARE THE PILOT OF A SMALL FIGHTER AIRCRAFT", canvas.width / 2, 150 - 50);
  ctx.fillText("YOU NEED TO DODGE THE OTHER BIG BLACK FIGHTERS AND NOT CRASH INTO THEM", canvas.width / 2, 200 - 50);
  ctx.fillText("SCORE KEEPS INCREASING AS YOU KEEP SURVIVING", canvas.width / 2, 250 - 50);
  ctx.fillText("USE ARROW KEYS or WASD TO MOVE UP DOWN RIGHT LEFT", canvas.width / 2, 300 - 50);
  ctx.fillText("SHOOT THE ENEMIES WITH BULLETS USING SPACEBAR", canvas.width / 2, 350 - 50);
  // ctx.fillText("STAY ABOVE THE WARNING LINE UNTIL ENEMIES COME TO STAY SAFE", canvas.width/2, 400-50);
  ctx.fillText("BEWARE-ENEMIES CAN CAMOUFLAGE AND NEW ENEMIES SPAWN EVERY FEW SECONDS :)", canvas.width / 2, 400 - 50);
  ctx.fillText("IF U SUCESSFULLY SHOOT ENEMIES, THEY DIE", canvas.width / 2, 450 - 50);
  ctx.fillText("BUT IF U SHOOT AND MISS, ANOTHER ENEMY IS SPAWNED!", canvas.width / 2, 500 - 50);

  ctx.beginPath();
  ctx.rect(canvas.width / 2 - 100, 625 - 50 - 50, 200, 50);  //old = 625 , 50 (y direction)
  ctx.fillStyle = "A000A0";
  ctx.fill();
  ctx.closePath();

  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("START", canvas.width / 2, 656 - 50 - 50);

  if (name == "0") {
    name = window.prompt("Enter your name: ");
  }
}

function screen2() {
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#B266FF";
  ctx.fill();
  ctx.closePath();
  ctx.font = "50px Quicksand";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.fillText("CLICK YOUR FIGHTER", canvas.width / 2, 150);
  // ctx.fillText("PLANE 1", canvas.width/2-300, 250);
  // ctx.fillText("PLANE 2", canvas.width/2, 250);
  // ctx.fillText("PLANE 3", canvas.width/2+300, 250);

  ctx.drawImage(jet1_img, canvas.width / 2 - 370, 275);
  ctx.drawImage(jet2_img, canvas.width / 2 - 70, 275);
  ctx.drawImage(jet3_img, canvas.width / 2 + 230, 275);
}

function screen3() {
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.rect(canvas.width - 350, 0, 5, canvas.height);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.closePath();
  ctx.drawImage(bg_img, 0, 0, canvas.width - 350, canvas.height);
}

function getReady() {
  ctx.font = "22px Quicksand";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "left";
  ctx.fillText("ENEMIES ARRIVING IN : ", canvas.width - 350 + 30, 100);
  ctx.textAlign = "left"
  var fixedNum = parseFloat(time_left / 1000).toFixed(2);
  ctx.fillText(fixedNum, canvas.width - 350 + 30, 150);

}

function showScore(gameOver) {
  ctx.font = "22px Quicksand";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "left";
  if (gameOver) {
    ctx.font = "45px Quicksand";
    ctx.fillText("GAME OVER", canvas.width - 350 + 25, 100);
  }
  else {
    ctx.fillText("THE GAME HAS BEGUN !!!", canvas.width - 350 + 25, 100);
  }
  ctx.font = "40px Quicksand";
  ctx.textAlign = "left";
  ctx.fillText("Score : " + score, canvas.width - 350 + 25, 200);
}

function showName() {
  ctx.font = "40px Quicksand";
  ctx.textAlign = "left";
  ctx.fillText("Name :", canvas.width - 350 + 25, 270);
  ctx.fillText(name, canvas.width - 350 + 25, 320);
  ctx.font = "25px Quicksand";
  ctx.fillText("Number of enemies", canvas.width - 350 + 25, 420);
  ctx.fillText(number_of_enemies, canvas.width - 350 + 25, 460);



}

function showPlayer() {

  ctx.drawImage(jet_img, jet_x, jet_y, 50, 50);

}

function showEnemies(enemy_x, enemy_y, i) {

  ctx.drawImage(enemy_img, enemy_x, enemy_y);

}

function showBullet() {
  ctx.drawImage(bullet_img, bullet_x, bullet_y, 50, 50);
}

function movePlayer() {
  if ((pressedKey[0] || pressedKey[0 + 5]) & jet_x > 6) {
    jet_x -= jet_speed;
  }
  if ((pressedKey[2] || pressedKey[2 + 5]) & jet_x < canvas.width - 350 - 50) {
    jet_x += jet_speed;
  }
  if ((pressedKey[1] || pressedKey[1 + 5]) & jet_y < canvas.height - 55) {
    jet_y += jet_speed;
  }
  if ((pressedKey[3] || pressedKey[3 + 5]) & jet_y > 6) {
    jet_y -= jet_speed;
  }
}

function moveEnemy(i) {
  if (enemy_x[i] >= canvas.width - 350 - 50) {
    enemy_speedx[i] = -(2 + Math.floor(4 * Math.random()))
  }
  if (enemy_y[i] >= canvas.height - 55) {
    enemy_speedy[i] = -(2 + Math.floor(4 * Math.random()))
  }
  if (enemy_x[i] <= 6) {
    enemy_speedx[i] = (2 + Math.floor(4 * Math.random()))
  }
  if (enemy_y[i] <= 6) {
    enemy_speedy[i] = (2 + Math.floor(4 * Math.random()))
  }
  enemy_x[i] += enemy_speedx[i]
  enemy_y[i] += enemy_speedy[i]
}

function moveBullet() {
  bullet_y -= 12;
  if (bullet_y <= -99) {
    number_of_enemies++;
    enemy_speedx.push(2 * Math.floor(2 * Math.random()) - 1);
    enemy_speedy.push(2 * Math.floor(2 * Math.random()) - 1);
    probx = 6 + Math.floor(Math.random() * 936);
    proby = 200 + Math.floor(Math.random() * 435);
    while (distance(probx, proby, jet_x, jet_y) < 350) {
      probx = 6 + Math.floor(Math.random() * 936);
      proby = 200 + Math.floor(Math.random() * 435);
    }
    enemy_x.push(probx);
    enemy_y.push(proby);
    bullet_x = -1000;
    bullet_y = -1000;
    bullet_on_screen = false;
  }
}

function shootBullet() {
  if (bullet_x == -1000 && bullet_y == -1000) {
    bullet_x = jet_x;
    bullet_y = jet_y;
    bullet_on_screen = true;
  }
}

function bullet_collides() {
  for (let i = 0; i < number_of_enemies; i++) {
    if (distance(bullet_x, bullet_y, enemy_x[i], enemy_y[i]) < 40) {
      number_of_enemies--;
      enemy_x.splice(i, 1);
      enemy_y.splice(i, 1);
      enemy_speedx.splice(i, 1);
      enemy_speedy.splice(i, 1);
      shot_down = true;
      bullet_x = -1000;
      bullet_y = -1000;
      bullet_on_screen = false;
    }


  }
}

function distance(jet_x, jet_y, enemy_x, enemy_y) {

  return Math.sqrt((enemy_x - jet_x) * (enemy_x - jet_x) + (enemy_y - jet_y) * (enemy_y - jet_y));

}

function check_collision(jet_x, jet_y, enemy_x, enemy_y) {

  if (distance(jet_x, jet_y, enemy_x, enemy_y) < 50) {
    gameOver = true;
    ready = false;

  }

}

function retry() {
  overall_screen_counter = 2;
  score = 0;
  ready = false;
  gameOver = false;
  time_left = 5000;
  jet_x = (canvas.width - 350) / 2 - 10;
  jet_y = 110;
  enemy_x = [];
  enemy_y = [];
  enemy_speedx = [];
  enemy_speedy = [];
  // for (let i = 0; i < number_of_enemies; i++){
  //   probx = 6+Math.floor(Math.random()*936);
  //   proby = 200+Math.floor(Math.random()*435);
  //   while (distance(probx,proby,jet_x,jet_y)<350){
  //     probx = 6+Math.floor(Math.random()*936);
  //     proby = 200+Math.floor(Math.random()*435);
  //   }
  //   enemy_x.push(probx);
  //   enemy_y.push(proby); 

  //   enemy_speedx.push(2*Math.floor(2*Math.random())-1);
  //   enemy_speedy.push(2*Math.floor(2*Math.random())-1);
  // }
  bullet_x = -1000;
  bullet_y = -1000;
  mouse_x = 0;
  mouse_y = 0;
  number_of_enemies = 5;
}

function praise() {
  ctx.font = "30px Quicksand";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "left";
  let xcor = 10;
  let ycor = 40;
  //ctx.fillText("Name :",canvas.width-350+25 , 270);
  if ((score >= 690 && score < 700) || (score >= 6900 && score < 7000)) {
    ctx.fillText("Nice", xcor, ycor);
  }
  else if (score <= 500) {
    ctx.fillText("Noob", xcor, ycor);
  }
  else if (score <= 1000) {
    ctx.fillText("U are doing great!", xcor, ycor);
  }
  else if (score <= 1500) {
    ctx.fillText("Damn Boi", xcor, ycor);
  }
  else if (score <= 2000) {
    ctx.fillText("Lessgo", xcor, ycor);
  }
  else if (score <= 2500) {
    ctx.fillText("Hmm.. reached your limit?", xcor, ycor);
  }
  else if (score <= 3000) {
    ctx.fillText("Nope", xcor, ycor);
  }
  else if (score <= 3500) {
    ctx.fillText("You can't go higher", xcor, ycor);
  }
  else if (score <= 4000) {
    ctx.fillText("That was an order", xcor, ycor);
  }
  else if (score <= 4500) {
    ctx.fillText("Please", xcor, ycor);
  }
  else if (score <= 5000) {
    ctx.fillText("You shouldn't play this for so long", xcor, ycor);
  }
  else if (score <= 5500) {
    ctx.fillText("This message is a distraction", xcor, ycor);
  }
  else if (score <= 6000) {
    ctx.fillText("Ooo you are close", xcor, ycor);
  }
  else if (score <= 6500) {
    ctx.fillText("You are going to achieve it", xcor, ycor);
  }
  else if (score <= 7000) {
    ctx.fillText("Just a little more", xcor, ycor);
  }
  else if (score <= 7500) {
    ctx.fillText("You can leave now", xcor, ycor);
  }
  else if (score <= 8000) {
    ctx.fillText("Alt + F4 is a useful shortcut to increase your score", xcor, ycor);
  }
  else if (score <= 8500) {
    ctx.fillText("", xcor, ycor);
  }
  else if (score <= 9000) {
    ctx.fillText("Seems like you wont leave me", xcor, ycor);
  }
  else if (score <= 9500) {
    ctx.fillText("Pressing p pauses the game", xcor, ycor);
  }
  else if (score <= 10000) {
    ctx.fillText("I thought you would fall for it", xcor, ycor);
  }
  if (score > 10000) {
    ctx.fillText("Bruh stop cheating", xcor, ycor);
  }
}


function continuous_running() {

  if (overall_screen_counter == 1) {
    screen1();
    if (mouse_x > canvas.width / 2 - 100 && mouse_x < canvas.width / 2 + 100 && mouse_y < 675 - 100 && mouse_y > 625 - 100) {//canvas.width/2-100, 625, 200, 50
      overall_screen_counter = 2;
    }
  }

  else if (overall_screen_counter == 2) {
    screen2();
    if (mouse_x > canvas.width / 2 - 370 && mouse_x < canvas.width / 2 - 240 && mouse_y < 425 && mouse_y > 275) {
      console.log("1")
      jet_img = jet1_img;
      overall_screen_counter = 3;
    }
    if (mouse_x > canvas.width / 2 - 70 && mouse_x < canvas.width / 2 + 60 && mouse_y < 425 && mouse_y > 275) {
      console.log("2")
      jet_img = jet2_img; //jet2_img, canvas.width/2-70, 275
      overall_screen_counter = 3;
    }
    if (mouse_x > canvas.width / 2 + 230 && mouse_x < canvas.width / 2 + 360 && mouse_y < 425 && mouse_y > 275) {
      console.log("3")
      jet_img = jet3_img;
      overall_screen_counter = 3;
    }
  }

  else if (overall_screen_counter == 3) {
    screen3();
    showPlayer();
    showName();
    if (ready == false && gameOver == false) {
      //warning_line();
      movePlayer();
      if (time_left >= 10) {
        time_left -= 10;
      }
      if (time_left >= 0) {
        getReady();
      }
    }
    if (time_left <= 0) {
      ready = true;
    }
    if (ready == true && gameOver == false) {
      createEnemies();
      movePlayer();
      showScore(gameOver);
      praise()
      if (number_of_enemies > 4) {
        if (score % 1000 == 0) {
          number_of_enemies++;
          enemy_speedx.push(2 * Math.floor(2 * Math.random()) - 1);
          enemy_speedy.push(2 * Math.floor(2 * Math.random()) - 1);
          probx = 6 + Math.floor(Math.random() * 936);
          proby = 200 + Math.floor(Math.random() * 435);
          while (distance(probx, proby, jet_x, jet_y) < 350) {
            probx = 6 + Math.floor(Math.random() * 936);
            proby = 200 + Math.floor(Math.random() * 435);
          }
          enemy_x.push(probx);
          enemy_y.push(proby);
        }

      }
      if (number_of_enemies <= 4) {

        if (score % 1000 == 0 && score > 0) {
          number_of_enemies++;
          enemy_speedx.push(2 * Math.floor(2 * Math.random()) - 1);
          enemy_speedy.push(2 * Math.floor(2 * Math.random()) - 1);
          probx = 6 + Math.floor(Math.random() * 936);
          proby = 200 + Math.floor(Math.random() * 435);
          while (distance(probx, proby, jet_x, jet_y) < 350) {
            probx = 6 + Math.floor(Math.random() * 936);
            proby = 200 + Math.floor(Math.random() * 435);
          }
          enemy_x.push(probx);
          enemy_y.push(proby);
          number_of_enemies++;
          enemy_speedx.push(2 * Math.floor(2 * Math.random()) - 1);
          enemy_speedy.push(2 * Math.floor(2 * Math.random()) - 1);
          probx = 6 + Math.floor(Math.random() * 936);
          proby = 200 + Math.floor(Math.random() * 435);
          while (distance(probx, proby, jet_x, jet_y) < 350) {
            probx = 6 + Math.floor(Math.random() * 936);
            proby = 200 + Math.floor(Math.random() * 435);
          }
          enemy_x.push(probx);
          enemy_y.push(proby);
        }


      }

      if (number_of_enemies <= 1) {

        if (score % 600 == 0 && score > 0) {
          number_of_enemies++;
          enemy_speedx.push(2 * Math.floor(2 * Math.random()) - 1);
          enemy_speedy.push(2 * Math.floor(2 * Math.random()) - 1);
          probx = 6 + Math.floor(Math.random() * 936);
          proby = 200 + Math.floor(Math.random() * 435);
          while (distance(probx, proby, jet_x, jet_y) < 350) {
            probx = 6 + Math.floor(Math.random() * 936);
            proby = 200 + Math.floor(Math.random() * 435);
          }
          enemy_x.push(probx);
          enemy_y.push(proby);
          number_of_enemies++;
          enemy_speedx.push(2 * Math.floor(2 * Math.random()) - 1);
          enemy_speedy.push(2 * Math.floor(2 * Math.random()) - 1);
          probx = 6 + Math.floor(Math.random() * 936);
          proby = 200 + Math.floor(Math.random() * 435);
          while (distance(probx, proby, jet_x, jet_y) < 350) {
            probx = 6 + Math.floor(Math.random() * 936);
            proby = 200 + Math.floor(Math.random() * 435);
          }
          enemy_x.push(probx);
          enemy_y.push(proby);
          number_of_enemies++;
          enemy_speedx.push(2 * Math.floor(2 * Math.random()) - 1);
          enemy_speedy.push(2 * Math.floor(2 * Math.random()) - 1);
          probx = 6 + Math.floor(Math.random() * 936);
          proby = 200 + Math.floor(Math.random() * 435);
          while (distance(probx, proby, jet_x, jet_y) < 350) {
            probx = 6 + Math.floor(Math.random() * 936);
            proby = 200 + Math.floor(Math.random() * 435);
          }
          enemy_x.push(probx);
          enemy_y.push(proby);
        }
        

      }

      score++;

      if (pressedKey[4]) {
        shootBullet();
      }
      if (bullet_on_screen) {
        showBullet();
        moveBullet();
      }
      bullet_collides();

      for (let i = 0; i < number_of_enemies; i++) {
        check_collision(jet_x, jet_y, enemy_x[i], enemy_y[i])
        moveEnemy(i);

        showEnemies(enemy_x[i], enemy_y[i], i);
      }
    }
    if (gameOver) {
      praise();
      showScore(gameOver);
      ctx.drawImage(explode_img, jet_x - 50, jet_y - 50, 200, 200);
      for (let j = 0; j < number_of_enemies; j++) {
        enemy_y[j] = 2500;
        enemy_x[j] = 2500;
        enemy_speedx[j] = 0;
        enemy_speedy[j] = 0;
      }
      ctx.beginPath();
      ctx.rect(canvas.width - 350 + 23, canvas.height - 100, 200, 50);
      ctx.fillStyle = "FFFFFF";
      ctx.fill();
      ctx.closePath();

      ctx.font = "30px Quicksand";
      ctx.fillStyle = "#000000";
      ctx.fillText("RETRY", canvas.width - 350 + 75, canvas.height - 65);

      ctx.beginPath();
      ctx.rect(canvas.width/2 - 350 + 23, canvas.height - 100, 200, 50);
      ctx.fillStyle = "FFFFFF";
      ctx.fill();
      ctx.closePath();

      ctx.font = "30px Quicksand";
      ctx.fillStyle = "#000000";
      ctx.fillText("RETRY", canvas.width - 350 + 75, canvas.height - 65);


      if (mouse_x > canvas.width - 350 + 23 && mouse_x < canvas.width - 350 + 23 + 200 && mouse_y < canvas.height - 50 && mouse_y > canvas.height - 100) {
        retry();
        // location.assign('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1s');
        // clearInterval(interval);

      }

    }

  }

}


var interval = setInterval(continuous_running, 10);