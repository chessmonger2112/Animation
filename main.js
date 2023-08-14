var g = 10;
var walkLeft = "images/walking_left.jpg";
var walkRight = "images/walking_right.jpg";
var standRight = "images/standing_right.jpg";
var standLeft = "images/standing_left.jpg";
var enemyPicRight = "images/enemy_right.bmp";
var enemyPicLeft = "images/enemy_left.bmp";
var boom = "images/boom.jpg";
var dead = "images/dead_left.jpg";
var spikes = "images/spikes.bmp";
var coin = "images/coin.jpg";
var Tree = "images/tree.bmp";
var Dock = "images/dock.bmp";
var Ocean = "images/ocean.jpg";
var Duck = "images/duck_boat.jpg";

var canvas = document.getElementById("c");
context = canvas.getContext("2d");

var leftCycle = [
  standLeft,
  walkLeft
];
var rightCycle = [
  standRight,
  walkRight
];
var animationIndex = 0;
var counter = 0;
var counterInterval = 5 ;
var xPos = 900;
var initialvelocity = 40;
var groundCurrent = 0 ;
var dx = 0;
var dr = 0;
var drLast = -3;
var fireBalls = [];
var enemyBalls = [];
var aliveStatus = "alive";
var spikeLeft = 300;

var dontFall = false;
var mAboveE = false;
var haveCoin = false;
var treeFalling = false;

var mapCounter = 0;
var coinAmount = 0;
var coinLeft = 650;
var coinTop = 100;
var drValue= 3;
var yCount = 0;
var yCountInterval = 2;
var PI = Math.PI;
var TAU = 2 * PI;
var treeTheta = 0;
var tree = {
  x: 300,
  y: 150,
  w: 200,
  h: 400
};
var treeCenter = {
  x: tree.x,
  y: tree.y
};
var dock = {
  x: canvas.width - 300,
  y: canvas.height - 150,
  w: 300,
  h: 150
};
var ocean = {
  x: 0,
  y: canvas.height - 120,
  w: canvas.width - dock.w,
  h: 120
};
var duck = {
  x: dock.x - 400,
  y: ocean.y - 120,
  w: 300,
  h: 150
};

var dyPrime = null;
var map1 = [
  {x: 0, y: 150},
  {x: 500, y: 150},
  {x: 600, y: 0},
  {x: 700, y: 0},
  {x: 800, y: 150},
  {x: 895, y: 0},
  {x: 900, y: 500},
  {x: canvas.width, y: 150}
];

var map2 = [
  {x: 0, y: 150},
  {x: 500, y: 150},
  {x: 600, y: 500},
  {x: 700, y: 500},
  {x: 800, y: 150},
  {x: 880, y: 300},
  {x: 900, y: 150},
  {x: canvas.width, y: 150}];

var map3 = [
  {x: 0, y: 150},
  {x: 500, y: 150},
  {x: 600, y: 150},
  {x: 700, y: 150},
  {x: 701, y: 150},
  {x: 880, y: 150},
  {x: 900, y: 150},
  {x: canvas.width, y: 150}
];

var map4 = [
  {x: 0, y: 0},
  {x: dock.x - 1, y: 0},
  {x: dock.x, y: 299},
  {x: dock.x + 10, y: 300},
  {x: canvas.width, y: 150}
];

var height = [
  map1,
  map2,
  map3,
  map4
];

var img2 = new Image();
var img3 = new Image();
var imgSpike = new Image();
var imgCoin = new Image();
var imgTree = new Image();
var imgDock = new Image();
var imgOcean = new Image();
var imgDuck = new Image();

imgCoin.src = coin;
img2.src = walkLeft;
imgSpike.src = spikes;
imgTree.src = Tree;
imgDock.src = Dock;
imgOcean.src = Ocean;
imgDuck.src = Duck;
$("h3").hide();

function treeFall()
{
    var tX = tree.x + .5 * tree.w;
    var tY = tree.y + .5 * tree.h;

    if (treeTheta < PI / 2 )
    {
        treeTheta+=.01;
    }

    context.translate(tX, tY);
    context.rotate(treeTheta);

    context.drawImage(imgTree,-.5 * tree.w,-.5 * tree.h, tree.w + 100, tree.h);
    context.rotate(-treeTheta);
    context.translate(-tX,-tY);
}

function died()
{
    img2.src = dead;
    aliveStatus = "dead";
    $("#loseHeadline").text("YOU LOSE!!!!!!!");
}

function drawLevel()
{
  if (mapCounter < height.length)
  {
      for(var j = 0; j < height[mapCounter].length - 1; j ++)
      {
          context.beginPath();
          context.moveTo(height[mapCounter][j].x, -1 * height[mapCounter][j].y + canvas.height);
          context.lineTo(height[mapCounter][j + 1].x, -1 * height[mapCounter][j + 1].y + canvas.height);
          context.stroke();
          context.closePath();
      }
  }
   document.getElementById("b4").innerHTML = monger.x();
  if (mapCounter === 0 || mapCounter === 1)
  {
    context.drawImage(imgSpike, spikeLeft, canvas.height - 250, 100, 100);
    if (haveCoin === false && mapCounter === 0)
    {
        context.drawImage(imgCoin, coinLeft, coinTop, 50, 50);
    }
  }

  if (mapCounter === 2)
  {
    if (treeFalling === false)
    {
      context.drawImage(imgTree, tree.x, tree.y, tree.w, tree.h);
      if (xPos < 650)
      {
        treeFalling = true;
        treeFall();
      }
    }
    else if (treeFalling === true)
    {
      treeFall();
    }
  }
  else if (mapCounter === 3)
  {
    context.drawImage(imgDock, dock.x, dock.y, dock.w, dock.h);
    context.drawImage(imgOcean, ocean.x, ocean.y, ocean.w, ocean.h);
    context.drawImage(imgDuck, duck.x, duck.y, duck.w, duck.h);
  }
}

var IronMonger = function() {
  var dy = 0;
  var v0y = 0;
  var t = 0;
  var yPos = 100;
  var status = "above";
  var dxPrime = 0;

  var mongerImg = {width: 100, height: 100};
  var shotsFired = 0;
  var onEnemy = false;
  var angle = 0;

  function uphill()
  {
    var deltaVertGround = (groundSpecific(xPos + dr)-yPos);
    var speedCache = (Math.sqrt(dr * dr + deltaVertGround * deltaVertGround));
    var magnitude = Math.abs(dr);

    dxPrime = dr * magnitude/ speedCache;
    dyPrime = deltaVertGround * magnitude/ speedCache;

    xPos += dxPrime;
    yPos += dyPrime;
    dyPrime = 0;

   console.log(dyPrime);
  }

    function moveLateral ()
    {
        xPos += dr;
    }

    return {
        x: function()
        {
            return xPos;
        },
        y: function()
        {
            return yPos;
        },

        fall: function() {

            if (status != "end")
            {
                if (yCount === 0)
                {
                    dy = (g * (.2 * t + 1)-v0y);
                    t ++;
                }

                yCount = (yCount + 1) % yCountInterval;

                xPos += dr;
                yPos += dy / 2 ;

                if (yPos - enemy1.getCoordinates().y < 0)
                {
                    mAboveE = true;
                }

                if ((Math.abs(xPos - enemy1.getCoordinates().x) < enemy1.getCoordinates().w) && enemy1.deadStatus() === true)
                {
                    if (yPos - enemy1.getCoordinates().y > 0)
                    {
                        if (mAboveE === true)
                        {
                            t = 0;
                            status = "end";
                            onEnemy = true;
                        }
                        mAboveE = false;
                    }
                }

             if (yPos >= ground())
                {
                    if (status === "above")
                    {
                        yPos = ground();
                        t = 0;
                        status = "end";
                    }
                }
                else if (yPos <= ground())
                {
                    status = "above";
                }
            }
        },

        moveLeft: function() {
            if (t === 0 && aliveStatus != "dead")
            {
                dr=-drValue;
                drLast = dr;
            }
        },
         moveRight: function() {
            if (t === 0 && aliveStatus != "dead")
            {
                dr = drValue;
                drLast = dr;
            }
        },
        jump: function() {
            v0y = 40;
            status="above";

            if (aliveStatus != "dead")
            {
                yCount = 0;
                monger.fall();
            }
        },
        stop: function() {
            if (aliveStatus != "dead")
            {
               // console.log(ground());
                dr = 0;
            }
        },

        shoot: function()
        {
            if (aliveStatus != "dead")
            {
                var fire = FireballMonger(xPos, yPos, drLast);
                fireBalls.push(fire);
                shotsFired ++;
                document.getElementById("b5").innerHTML = "Fireballs shot: " + shotsFired;
            }
        },

        update: function() {
            var now = + new Date;
            if (dr != 0)
            {
                console.log(groundSpecific(xPos + dr / 10) < ground());
                console.log("future ", groundSpecific(xPos + dr / 10),"current ", ground());
            }
            if (window.lastUpdate)
            {
               // console.log(now - window.lastUpdate);
            }
            window.lastUpdate = now;


            if (onEnemy === true)
            {
                if(Math.abs(xPos - enemy1.getCoordinates().x) < enemy1.getCoordinates().w)
                {
                    moveLateral();
                }

                else
                {
                    onEnemy = false;
                }
            }
            else if (onEnemy != true)
            {
                if (t === 0)
                {
                    //if(dr != 0 && groundSpecific(xPos + dr) <= ground() && aliveStatus != "dead" && dyPrime <= 0)
                    if(dr != 0 && groundSpecific(xPos + dr / 100) < ground() && aliveStatus != "dead" && dyPrime <= 0)
                    {
                        uphill();
                    }

                    //else if (dr != 0 && yPos === ground() && groundSpecific(xPos + dr) > ground())
                    else if (dr != 0 && yPos === ground() && groundSpecific(xPos + dr / 100)>=ground())
                    {
                      moveLateral();
                      dyPrime = 0 ;
                    }

                    else if (yPos != ground())
                    {
                      v0y = 0 ;
                      status = "above";
                      monger.fall();
                      dyPrime = 0 ;
                    }
                }
                else if (t != 0)
                {
                    monger.fall();
                }
            }

            if (counter === 0 && t === 0 && aliveStatus != "dead")
            {
                if (dr > 0)
                {
                   img2.src = rightCycle[animationIndex];
                }
                 else if (dr < 0)
                {
                   img2.src = leftCycle[animationIndex];
                }
            }
            counter = (counter + 1) % counterInterval;
            animationIndex = (animationIndex + 1) % leftCycle.length;

            var tx = xPos + .5 * mongerImg.width;
            var ty = yPos;
            angle += .01

            context.clearRect(0, 0, 2 * canvas.width, 2 * canvas.height);
            /*
            context.translate(tx, ty);
            context.rotate(angle);
            context.drawImage(img2,-.5 * mongerImg.width,-.5 * mongerImg.height, mongerImg.width, mongerImg.height);
            context.rotate(-angle);
            context.translate(-tx,-ty);
            */
            context.drawImage(img2, xPos - .5 * mongerImg.width, yPos - mongerImg.height, mongerImg.width, mongerImg.height);

            for (key in fireBalls)
            {
                fireBalls[key].update();
            }

            for (key in enemyBalls)
            {
                enemyBalls[key].update(xPos, yPos);
            }

            if (xPos < 0)
            {
                if (mapCounter < height.length - 1)
                {
                    mapCounter ++;
                    xPos = canvas.width;
                }
                else
                {
                    dr = 0;
                    $("#loseHeadline").text("You win!!!");
                }

            }
            else if (xPos > canvas.width)
            {
                if (mapCounter != 0)
                {
                    mapCounter --;
                    xPos = 0;
                }
                else if (mapCounter === 0)
                {
                    dr = 0;
                }
            }
            $("#coinHeader").text("Coins you have : " + coinAmount);
            drawLevel();
            intersection();
        }
    }
}
function ground()
{
    var n = 0 ;
    if (mapCounter < height.length)
    {
        var heighty = height[mapCounter];
        if(xPos < heighty[0].x)
        {
            return  -1 * heighty[0].y + canvas.height;
        }
        else
        {
            for (var i = 0 ; i < heighty.length - 1; i ++)
            {
                if (xPos >= heighty[i].x && xPos < heighty[i + 1].x)
                {
                    n = i ;
                    break;
                }
            }
        }

    var m = (heighty[n + 1].y - heighty[n].y) / (heighty[n + 1].x - heighty[n].x);
    var b = heighty[n + 1].y - (m * heighty[n + 1].x);
    return canvas.height - (m * xPos) - b;
    }
}

function xFinder(dy, yNow)
{
    for (var f = 0; f <= 800; f ++)
    {
        var m = dy / dr;
        var b = yNow - (m * xPos)

        var y = m *(xPos + f / 100) + b;

        if (y >= groundSpecific(xPos + f / 100))
        {
            return y;
            break;
        }
    }
}

function groundSpecific(var1)
{
    xInitial = xPos;
    xPos = var1;
    groundCalculated = ground();
    xPos = xInitial;
    return groundCalculated;
}

function intersection()
{
    var threshold = 75;
    var centerCoinLeft = coinLeft + 25;
    var centerCoinTop = coinTop + 25;
    for (enemyIndex in enemyBalls)
    {
        var enemy = enemyBalls[enemyIndex];
        for (fireIndex in fireBalls)
        {
            var fire = fireBalls[fireIndex]

            var xDifference = Math.abs(fire.getCoordinates().x - enemy.getCoordinates().x)
            var yDifference = Math.abs(fire.getCoordinates().y - enemy.getCoordinates().y)

            var proximityX = fire.getCoordinates().r + .5 * enemy.getCoordinates().w;
            var proximityY = fire.getCoordinates().r + .5 * enemy.getCoordinates().h;
            if (xDifference < proximityX && yDifference < proximityY)
            {
                enemy.died();
            }
        }
     }

    if (monger.x() > spikeLeft && monger.x() < spikeLeft + 100)
    {
        if(monger.y() <= ground() && monger.y()>=ground() - 100 && (mapCounter === 0 || mapCounter === 1))
        {
            died();
        }
    }

    if (Math.abs(coinLeft - monger.x()) <= threshold&&(Math.abs(coinTop - monger.y()) <= threshold))
    {
        if (haveCoin === false && mapCounter === 0)
        {
      $("#loseHeadline").text("GOT COIN!!!");
            haveCoin = true;
            coinAmount ++;
        }
    }
}

var monger = IronMonger();
var evil = Enemy(0, 200);
enemyBalls.push(evil);
var enemy1 = enemyBalls[0];
var interval = setInterval(monger.update, 1000 / 600);

$(document).on('keydown', function(e){
    var key = e.keyCode;
    if (key === 37)
    {
        monger.moveLeft();
    }
    else if (key === 39)
    {
        monger.moveRight();
    }
    else if (key === 32)
    {
      monger.shoot();
    }
    else if (key === 38)
    {
      monger.jump();
    }
    else if (key === 40)
    {
      monger.stop();
    }
    else if (key === 51)
    {
        mapCounter = 2;
    }
});
