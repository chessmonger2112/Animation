var g = .4;
const PI = Math.PI;
const TAU = 2 * PI;
const DEBUG_MODE = true;
var heroWalkLeftFilePath = "images/walking_left.jpg";
var heroWalkRightFilePath = "images/walking_right.jpg";
var heroStandRightFilePath = "images/standing_right.jpg";
var heroStandLeftFilePath = "images/standing_left.jpg";
var enemyPicRightFilePath = "images/enemy_right.bmp";
var enemyPicLeftFilePath = "images/enemy_left.bmp";
var boomFilePath = "images/boom.png";
var deadLeftFilePath = "images/dead_left.jpg";
var spikesFilePath = "images/spikes.png";
var coinFilePath = "images/coin.png";
var treeFilePath = "images/tree.png";
var dockFilePath = "images/dock.png";
var oceanFilePath = "images/ocean.jpg";
var duckFilePath = "images/duck_boat.png";

var canvas = document.getElementById("c");
var canvasMargin = 18;
canvas.width = window.innerWidth - canvasMargin;
context = canvas.getContext("2d");

var leftCycle = [
  heroStandLeftFilePath,
  heroWalkLeftFilePath
];
var rightCycle = [
  heroStandRightFilePath,
  heroWalkRightFilePath
];
var animationIndex = 0;
var counter = 0;
var counterInterval = 5 ;
var xPos = 900;
var fireBalls = [];
var enemyBalls = [];
var isAlive = true;
var spikeLeft = 300;
var dontFall = false;
var haveCoin = false;
var treeFalling = false;

var mapCounter = 0;
var coinAmount = 0;
var coinLeft = 650;
var coinTop = 100;
var xSpeed = .18;

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
  w: canvas.width,
  h: 120
};
var duck = {
  x: dock.x - 400,
  y: ocean.y - 120,
  w: 300,
  h: 150
};
var mongerImg = {
    width: 100,
    height: 100
  };

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

var map5 = [
  // {x: 2, y: 586},{x: 3, y: 584},{x: 4, y: 583},{x: 7, y: 580},{x: 9, y: 578},{x: 11, y: 575},{x: 14, y: 572},{x: 16, y: 570},{x: 18, y: 567},{x: 20, y: 565},{x: 22, y: 564},{x: 24, y: 563},{x: 25, y: 561},{x: 27, y: 560},{x: 28, y: 559},{x: 29, y: 558},{x: 30, y: 557},{x: 31, y: 556},{x: 32, y: 555},{x: 34, y: 553},{x: 36, y: 551},{x: 38, y: 549},{x: 40, y: 547},{x: 43, y: 545},{x: 46, y: 543},{x: 49, y: 540},{x: 52, y: 538},{x: 56, y: 536},{x: 60, y: 533},{x: 63, y: 530},{x: 67, y: 527},{x: 72, y: 524},{x: 76, y: 520},{x: 79, y: 517},{x: 84, y: 514},{x: 89, y: 509},{x: 93, y: 506},{x: 100, y: 501},{x: 104, y: 499},{x: 108, y: 496},{x: 113, y: 494},{x: 117, y: 492},{x: 122, y: 489},{x: 127, y: 487},{x: 131, y: 485},{x: 136, y: 483},{x: 140, y: 480},{x: 145, y: 478},{x: 148, y: 476},{x: 154, y: 473},{x: 156, y: 473},{x: 159, y: 471},{x: 162, y: 470},{x: 168, y: 469},{x: 171, y: 468},{x: 173, y: 467},{x: 177, y: 466},{x: 180, y: 466},{x: 183, y: 465},{x: 185, y: 464},{x: 188, y: 463},{x: 190, y: 463},{x: 193, y: 462},{x: 195, y: 462},{x: 196, y: 461},{x: 199, y: 460},{x: 201, y: 459},{x: 203, y: 458},{x: 204, y: 458},{x: 205, y: 458},{x: 205, y: 458},{x: 208, y: 456},{x: 211, y: 455},{x: 216, y: 452},{x: 226, y: 448},{x: 240, y: 442},{x: 254, y: 436},{x: 268, y: 431},{x: 280, y: 426},{x: 288, y: 424},{x: 295, y: 420},{x: 301, y: 418},{x: 305, y: 416},{x: 308, y: 415},{x: 310, y: 413},{x: 312, y: 412},{x: 313, y: 412},{x: 314, y: 411},{x: 317, y: 410},{x: 322, y: 407},{x: 325, y: 406},{x: 329, y: 405},{x: 336, y: 401},{x: 343, y: 399},{x: 349, y: 397},{x: 354, y: 395},{x: 359, y: 394},{x: 366, y: 392},{x: 371, y: 390},{x: 376, y: 389},{x: 380, y: 388},{x: 385, y: 386},{x: 390, y: 384},{x: 396, y: 382},{x: 402, y: 380},{x: 406, y: 378},{x: 412, y: 376},{x: 419, y: 373},{x: 425, y: 371},{x: 432, y: 368},{x: 440, y: 365},{x: 447, y: 364},{x: 453, y: 362},{x: 461, y: 359},{x: 466, y: 357},{x: 474, y: 355},{x: 482, y: 351},{x: 488, y: 350},{x: 495, y: 347},{x: 501, y: 346},{x: 509, y: 345},{x: 515, y: 344},{x: 521, y: 343},{x: 526, y: 343},{x: 531, y: 343},{x: 536, y: 343},{x: 541, y: 343},{x: 551, y: 343},{x: 555, y: 343},{x: 560, y: 343},{x: 565, y: 343},{x: 570, y: 343},{x: 574, y: 344},{x: 579, y: 345},{x: 585, y: 346},{x: 591, y: 348},{x: 595, y: 350},{x: 602, y: 353},{x: 606, y: 354},{x: 613, y: 355},{x: 614, y: 355},{x: 616, y: 355},{x: 619, y: 355},{x: 625, y: 354},{x: 636, y: 352},{x: 656, y: 349},{x: 669, y: 348},{x: 686, y: 346},{x: 711, y: 341},{x: 726, y: 337},{x: 742, y: 333},{x: 755, y: 331},{x: 767, y: 329},{x: 777, y: 328},{x: 786, y: 326},{x: 791, y: 325},{x: 802, y: 323},{x: 809, y: 322},{x: 816, y: 321},{x: 823, y: 321},{x: 831, y: 320},{x: 839, y: 320},{x: 844, y: 319},{x: 854, y: 318},{x: 860, y: 318},{x: 868, y: 318},{x: 875, y: 318},{x: 883, y: 318},{x: 889, y: 318},{x: 894, y: 318},{x: 902, y: 318},{x: 909, y: 319},{x: 914, y: 320},{x: 919, y: 321},{x: 926, y: 322},{x: 931, y: 324},{x: 936, y: 325},{x: 941, y: 327},{x: 948, y: 328},{x: 953, y: 329},{x: 958, y: 331},{x: 963, y: 332},{x: 971, y: 334},{x: 974, y: 335},{x: 984, y: 338},{x: 992, y: 341},{x: 1001, y: 344},{x: 1006, y: 345},{x: 1011, y: 347},{x: 1013, y: 347},{x: 1015, y: 347},{x: 1020, y: 347},{x: 1025, y: 347},{x: 1035, y: 347},{x: 1046, y: 347},{x: 1056, y: 348},{x: 1067, y: 349},{x: 1078, y: 350},{x: 1089, y: 352},{x: 1099, y: 355},{x: 1108, y: 358},{x: 1116, y: 361},{x: 1122, y: 364},{x: 1129, y: 368},{x: 1135, y: 371},{x: 1141, y: 374},{x: 1144, y: 376},{x: 1150, y: 379},{x: 1155, y: 381},{x: 1159, y: 383},{x: 1163, y: 385},{x: 1167, y: 386},{x: 1172, y: 388},{x: 1176, y: 389},{x: 1180, y: 391},{x: 1184, y: 393},{x: 1189, y: 395},{x: 1193, y: 397},{x: 1197, y: 399},{x: 1201, y: 401},{x: 1206, y: 403},{x: 1212, y: 406},{x: 1215, y: 407},{x: 1219, y: 410},{x: 1223, y: 413},{x: 1227, y: 416},{x: 1232, y: 420},{x: 1236, y: 422},{x: 1239, y: 424},{x: 1241, y: 425},{x: 1241, y: 425},{x: 1246, y: 428},{x: 1252, y: 433}, {x: canvas.width, y: 433}
  {x: 1, y: 586},{x: 1, y: 584},{x: 1, y: 583},{x: 2, y: 580},{x: 4, y: 577},{x: 5, y: 575},{x: 6, y: 573},{x: 7, y: 570},{x: 8, y: 569},{x: 10, y: 564},{x: 12, y: 561},{x: 13, y: 558},{x: 15, y: 555},{x: 17, y: 552},{x: 19, y: 548},{x: 22, y: 544},{x: 26, y: 538},{x: 27, y: 535},{x: 30, y: 531},{x: 33, y: 526},{x: 35, y: 525},{x: 37, y: 522},{x: 40, y: 517},{x: 42, y: 514},{x: 43, y: 512},{x: 47, y: 508},{x: 50, y: 504},{x: 53, y: 501},{x: 56, y: 498},{x: 59, y: 495},{x: 63, y: 491},{x: 67, y: 487},{x: 77, y: 479},{x: 82, y: 475},{x: 87, y: 471},{x: 89, y: 469},{x: 97, y: 462},{x: 106, y: 454},{x: 112, y: 449},{x: 127, y: 437},{x: 133, y: 433},{x: 150, y: 424},{x: 156, y: 422},{x: 170, y: 413},{x: 174, y: 411},{x: 175, y: 410},{x: 179, y: 408},{x: 180, y: 407},{x: 183, y: 406},{x: 185, y: 404},{x: 187, y: 403},{x: 193, y: 400},{x: 194, y: 399},{x: 202, y: 397},{x: 206, y: 396},{x: 210, y: 394},{x: 216, y: 393},{x: 218, y: 392},{x: 223, y: 391},{x: 225, y: 390},{x: 227, y: 389},{x: 230, y: 389},{x: 231, y: 388},{x: 238, y: 386},{x: 243, y: 384},{x: 249, y: 382},{x: 256, y: 379},{x: 263, y: 376},{x: 268, y: 375},{x: 272, y: 373},{x: 286, y: 368},{x: 293, y: 365},{x: 300, y: 363},{x: 302, y: 362},{x: 309, y: 361},{x: 312, y: 360},{x: 313, y: 360},{x: 314, y: 360},{x: 315, y: 360},{x: 316, y: 360},{x: 318, y: 359},{x: 323, y: 358},{x: 329, y: 356},{x: 336, y: 353},{x: 342, y: 351},{x: 349, y: 348},{x: 357, y: 345},{x: 382, y: 335},{x: 385, y: 334},{x: 394, y: 330},{x: 401, y: 326},{x: 406, y: 325},{x: 413, y: 323},{x: 415, y: 322},{x: 421, y: 321},{x: 423, y: 320},{x: 426, y: 319},{x: 429, y: 318},{x: 434, y: 317},{x: 437, y: 316},{x: 439, y: 316},{x: 447, y: 313},{x: 451, y: 313},{x: 455, y: 312},{x: 461, y: 311},{x: 466, y: 310},{x: 475, y: 308},{x: 480, y: 307},{x: 491, y: 305},{x: 512, y: 299},{x: 532, y: 297},{x: 533, y: 297},{x: 540, y: 297},{x: 543, y: 297},{x: 545, y: 297},{x: 548, y: 297},{x: 551, y: 297},{x: 553, y: 297},{x: 556, y: 299},{x: 560, y: 301},{x: 563, y: 303},{x: 567, y: 305},{x: 580, y: 312},{x: 589, y: 318},{x: 594, y: 320},{x: 601, y: 326},{x: 602, y: 327},{x: 605, y: 328},{x: 606, y: 329},{x: 613, y: 335},{x: 615, y: 338},{x: 617, y: 340},{x: 618, y: 344},{x: 620, y: 352},{x: 620, y: 356},{x: 620, y: 358},{x: 620, y: 360},{x: 620, y: 369},{x: 617, y: 376},{x: 615, y: 379},{x: 614, y: 381},{x: 612, y: 382},{x: 610, y: 384},{x: 605, y: 388},{x: 598, y: 393},{x: 589, y: 402},{x: 586, y: 405},{x: 575, y: 413},{x: 572, y: 416},{x: 555, y: 425},{x: 552, y: 427},{x: 542, y: 432},{x: 531, y: 437},{x: 524, y: 440},{x: 518, y: 444},{x: 511, y: 450},{x: 508, y: 454},{x: 504, y: 459},{x: 502, y: 463},{x: 502, y: 465},{x: 502, y: 473},{x: 501, y: 480},{x: 501, y: 481},{x: 501, y: 482},{x: 503, y: 483},{x: 504, y: 484},{x: 509, y: 488},{x: 515, y: 492},{x: 520, y: 494},{x: 526, y: 497},{x: 531, y: 500},{x: 536, y: 502},{x: 541, y: 503},{x: 545, y: 505},{x: 550, y: 506},{x: 557, y: 507},{x: 560, y: 508},{x: 564, y: 509},{x: 569, y: 510},{x: 573, y: 511},{x: 582, y: 512},{x: 598, y: 514},{x: 611, y: 516},{x: 615, y: 517},{x: 619, y: 517},{x: 627, y: 517},{x: 630, y: 517},{x: 636, y: 517},{x: 646, y: 517},{x: 650, y: 517},{x: 660, y: 517},{x: 678, y: 516},{x: 689, y: 514},{x: 708, y: 511},{x: 716, y: 511},{x: 719, y: 510},{x: 721, y: 510},{x: 731, y: 508},{x: 736, y: 506},{x: 739, y: 506},{x: 745, y: 504},{x: 749, y: 502},{x: 750, y: 502},{x: 753, y: 501},{x: 756, y: 500},{x: 762, y: 497},{x: 770, y: 494},{x: 791, y: 489},{x: 801, y: 487},{x: 822, y: 484},{x: 843, y: 481},{x: 847, y: 480},{x: 850, y: 479},{x: 864, y: 476},{x: 878, y: 473},{x: 889, y: 471},{x: 896, y: 471},{x: 903, y: 470},{x: 906, y: 470},{x: 917, y: 468},{x: 922, y: 468},{x: 931, y: 467},{x: 934, y: 467},{x: 945, y: 467},{x: 955, y: 466},{x: 961, y: 466},{x: 970, y: 467},{x: 982, y: 469},{x: 988, y: 470},{x: 998, y: 473},{x: 1002, y: 474},{x: 1016, y: 477},{x: 1020, y: 478},{x: 1022, y: 479},{x: 1033, y: 481},{x: 1039, y: 482},{x: 1050, y: 486},{x: 1066, y: 491},{x: 1081, y: 497},{x: 1090, y: 500},{x: 1095, y: 502},{x: 1097, y: 503},{x: 1097, y: 503},{x: 1097, y: 503},{x: 1099, y: 503},{x: 1101, y: 503},{x: 1104, y: 504},{x: 1108, y: 505},{x: 1109, y: 505},{x: 1110, y: 505},{x: 1111, y: 505},{x: 1114, y: 505},{x: 1117, y: 505},{x: 1121, y: 505},{x: 1123, y: 505},{x: 1128, y: 506},{x: 1138, y: 507},{x: 1152, y: 509},{x: 1157, y: 509},{x: 1164, y: 510},{x: 1169, y: 510},{x: 1174, y: 510},{x: 1178, y: 510},{x: 1183, y: 511},{x: 1187, y: 511},{x: 1201, y: 512},{x: 1224, y: 514},{x: 1230, y: 515},{x: 1240, y: 516},{x: 1256, y: 517},{x: 1263, y: 517},{x: 1265, y: 521},{x: 1264, y: 521},{x: 1263, y: 521},{x: 1263, y: 521},{x: 1263, y: 521},{x: 1262, y: 521},{x: 1262, y: 521},{x: 1262, y: 521},{x: 1262, y: 521},
];

var monger = new IronMonger();
var evil = new Enemy(0, 200);
enemyBalls.push(evil);
var enemy1 = enemyBalls[0];
myInterval = setInterval(updateEverything, 1000 / 60);

function updateEverything() {
  monger.update();
  context.clearRect(0, 0, 2 * canvas.width, 2 * canvas.height);
  var herox = monger.x();
  var heroY = monger.y();
  context.drawImage(heroImg, herox - .5 * mongerImg.width, heroY - mongerImg.height, mongerImg.width, mongerImg.height);
  updateFireBalls();
  updateEnemyBalls(herox, heroY);
  updateMapCounter();
  drawLevel();
  intersection();
  $("#coinHeader").text("Coins you have : " + coinAmount);
}

function updateMapCounter() {
  if (xPos < 0) {
    if (mapCounter < heightObjs.length - 1) {
      mapCounter ++;
      xPos = canvas.width;
    }
    else {
        dx = 0;
        $("#loseHeadline").text("You win!!!");
    }
  }
  else if (xPos > canvas.width) {
    if (mapCounter != 0) {
      mapCounter --;
      xPos = 0;
    }
  else if (mapCounter === 0) {
    dx = 0;
    }
  }
}

function updateEnemyBalls(herox, heroY) {
  for (key in enemyBalls)
  {
    enemyBalls[key].update(herox, heroY);
  }
}

function updateFireBalls() {
  for (key in fireBalls)
  {
    fireBalls[key].update();
  }
}

function HeightObj(map, mapFunction) {
  this.map = map;
  this.mapFunction = mapFunction;
}

var heightObj1 = new HeightObj(map1, map1Func);
var heightObj2 = new HeightObj(map2, map2Func);
var heightObj3 = new HeightObj(map3, map3Func);
var heightObj4 = new HeightObj(map4, map4Func);
var heightObj5 = new HeightObj(map5);
var heightObj6 = new HeightObj(map1, map1Func);

var heightObjs = [
  heightObj1,
  heightObj2,
  heightObj3,
  heightObj4,
  heightObj5,
  heightObj6
];

function map1Func() {
  // evil = Enemy(0, 200);
  // enemyBalls.push(evil);
  // var enemy1 = enemyBalls[0];
    context.drawImage(imgSpike, spikeLeft, canvas.height - 250, 100, 100);
    var xHeroPosition = monger.x();
    var yHeroPosition = monger.y();
    var xIsInSpike = xHeroPosition > spikeLeft && xHeroPosition < spikeLeft + 100
    var yIsInSpike = yHeroPosition <= ground(xPos) && yHeroPosition >= ground(xPos) - 100
    var isInSpike = xIsInSpike && yIsInSpike;

    if (isInSpike)
    {
        died();
    }
    if (haveCoin === false)
    {
        context.drawImage(imgCoin, coinLeft, coinTop, 50, 50);
    }
  }
function map2Func() {
  var xHeroPosition = monger.x();
  var yHeroPosition = monger.y();
  var xIsInSpike = xHeroPosition > spikeLeft && xHeroPosition < spikeLeft + 100
  var yIsInSpike = yHeroPosition<= ground(xPos) && yHeroPosition >= ground(xPos) - 100
  var isInSpike = xIsInSpike && yIsInSpike;

  if (isInSpike)
  {
      died();
  }

  context.drawImage(imgSpike, spikeLeft, canvas.height - 250, 100, 100);
}
function map3Func() {
  if (treeFalling === false)
    {
      context.drawImage(imgTree, tree.x, tree.y, tree.w, tree.h);
      if (xPos < 650)
      {
        treeFalling = true;
        treeFall();
      }
    }
    else if (treeFalling)
    {
      treeFall();
    }
}
function map4Func() {
  context.drawImage(imgOcean, ocean.x, ocean.y, ocean.w, ocean.h);
  context.drawImage(imgDock, dock.x, dock.y, dock.w, dock.h);
  context.drawImage(imgDuck, duck.x, duck.y, duck.w, duck.h);
}

var heroImg = new Image();
var enemyImg = new Image();
var imgSpike = new Image();
var imgCoin = new Image();
var imgTree = new Image();
var imgOcean = new Image();
var imgDock = new Image();
var imgDuck = new Image();

imgCoin.src = coinFilePath;
heroImg.src = heroWalkLeftFilePath;
imgSpike.src = spikesFilePath;
imgTree.src = treeFilePath;
imgOcean.src = oceanFilePath;
imgDock.src = dockFilePath;
imgDuck.src = duckFilePath;

if (DEBUG_MODE === false) {
  $("h3").hide();
}

function treeFall()
{
    var tX = tree.x + .5 * tree.w;
    var tY = tree.y + .5 * tree.h;

    if (treeTheta < PI / 2)
    {
        treeTheta += .01;
    }

    context.translate(tX, tY);
    context.rotate(treeTheta);
    context.drawImage(imgTree, -.5 * tree.w, -.5 * tree.h, tree.w + 100, tree.h);
    context.rotate(-treeTheta);
    context.translate(-tX,-tY);
}

function died()
{
  heroImg.src = deadLeftFilePath;
  isAlive = false;
  $("#loseHeadline").text("YOU LOSE!!!!!!!");
}

function drawLevel()
{
  if (mapCounter < heightObjs.length)
  {
    var currentMapObj = heightObjs[mapCounter];
    var currentFunction = currentMapObj.mapFunction;
    var currentMap = currentMapObj.map;
      for (var j = 0; j < currentMap.length - 1; j ++)
      {
          context.beginPath();
          context.moveTo(currentMap[j].x, -1 * currentMap[j].y + canvas.height);
          context.lineTo(currentMap[j + 1].x, -1 * currentMap[j + 1].y + canvas.height);
          context.stroke();
          context.closePath();
      }
  }
  var roundedxPos = Math.round(xPos);
  document.getElementById("b4").innerHTML = roundedxPos;

  if (currentFunction) {
    currentFunction();
  }
}

function getAboveEnemy(enemyPosition, xPos, yPos) {
  var enemyx = enemyPosition.x;
  var enemyY = enemyPosition.y;
  var enemyW = enemyPosition.w;

  var yAboveEnemy = yPos - enemyY < 0;
  var xWithinEnemy = Math.abs(xPos - enemyx) < enemyW;
  var enemyIsDead = enemy1.deadStatus();

  var aboveEnemy = yAboveEnemy && xWithinEnemy && enemyIsDead;
  return aboveEnemy;
}

function getIsLandingOnPlatform(xPos, yPos, aboveEnemy, enemyPosition) {
  var enemyx = enemyPosition.x;
  var enemyY = enemyPosition.y;
  var enemyW = enemyPosition.w;
  var yBelowEnemy = yPos - enemyY >= 0;
  var xWithinEnemy = Math.abs(xPos - enemyx) < enemyW;
  var enemyIsDead = enemy1.deadStatus();
  var enemyIsInLevel = mapCounter === 0; // This is a bad solution

  var onEnemy = yBelowEnemy && xWithinEnemy && enemyIsDead && aboveEnemy && enemyIsInLevel;
  return onEnemy;
}

function getIsFalling(enemyPosition, xPos, yPos) {
  var enemyx = enemyPosition.x;
  var enemyY = enemyPosition.y;
  var enemyW = enemyPosition.w;

  var heroOnEnemyY = yPos === enemyY;
  var xDifference = xPos - enemyx;
  var xAbsoluteDifference = Math.abs(xDifference);
  var heroWithInEnemyWidth = xAbsoluteDifference < enemyW;
  var enemyIsDead = enemy1.deadStatus();
  var onTheEnemy = heroOnEnemyY && heroWithInEnemyWidth && enemyIsDead;
  var belowGround = yPos >= ground(xPos);
  var isOnSomething = belowGround || onTheEnemy;
  var isFalling = !isOnSomething;
  return isFalling;
}

function IronMonger() {
  var v0y = 0;
  var xVelocity = 0;
  var yVelocity = 0;
  var t = 0;
  var yPos = 100;
  var shotsFired = 0;
  var onEnemy = false;
  var once = false;
  var aboveEnemy = false;
  var directionFacing = -1;

  function uphill(dr) {
    var newOriginalHeight = ground(xPos + dr);
    var deltaVertGround = newOriginalHeight - yPos;
    var originalHypotenuse = Math.hypot(dr, deltaVertGround);
    var magnitude = Math.abs(dr);

    var cosTheta = magnitude / originalHypotenuse;
    var sinTheta = deltaVertGround / originalHypotenuse;

    var dxPrime = dr * cosTheta;
    var dyPrime = magnitude * sinTheta;

    yPos += dyPrime;

    return dxPrime;
  }

  this.x = function() {
      return xPos;
  },
  this.y = function() {
      return yPos;
  },

  this.fall = function(dx) {
    var dy = g * t - v0y;
    t ++;

    yPos += dy;

    var enemyPosition = enemy1.getCoordinates();
    var enemyY = enemyPosition.y;

    var isLandingOnPlatform = getIsLandingOnPlatform(xPos + dx, yPos, aboveEnemy, enemyPosition);
    aboveEnemy = getAboveEnemy(enemyPosition, xPos + dx, yPos)

    var groundHeight = ground(xPos + dx);
    var isLandingOnGround = yPos >= groundHeight;
    var isLanding = isLandingOnPlatform || isLandingOnGround;

    if (isLanding) {
      t = 0;
      v0y = 0;
      var yNewPos = isLandingOnPlatform ?
        enemyY :
        groundHeight;

      yPos = yNewPos;
    }
    return dy;
  },

  this.moveLeft = function() {
    var enemyPos = enemy1.getCoordinates();
    var isFalling = getIsFalling(enemyPos, xPos, yPos);
    var onGround = !isFalling;

    var isAbleToMoveLeft = onGround  && isAlive;
      if (isAbleToMoveLeft) {
        xVelocity = -xSpeed;
        directionFacing = -1
      }
  },
   this.moveRight = function() {
    var enemyPos = enemy1.getCoordinates();
    var isFalling = getIsFalling(enemyPos, xPos, yPos);
    var onGround = !isFalling;

    var isAbleToMoveRight = onGround && isAlive;
      if (isAbleToMoveRight) {
        xVelocity = xSpeed;
        directionFacing = 1
      }
  },
  this.jump = function() {
      if (isAlive) {
        v0y = 12.3;
        var dx = xVelocity * deltaTime;
        monger.fall(dx);
      }
  },
  this.stop = function() {
      if (isAlive) {
          dx = 0;
          xVelocity = 0;
      }
  },
  this.shoot = function() {
      if (isAlive) {
          var fire = new FireballMonger(xPos, yPos, directionFacing);
          fireBalls.push(fire);
          shotsFired ++;
          document.getElementById("b5").innerHTML = "Fireballs shot: " + shotsFired;
      }
  },
  this.update = function() {
    var newCurrentTime = Date.now();

    if (typeof currentTime != "undefined") {
      deltaTime = newCurrentTime - currentTime;
      if (once === false) {
        console.log(`deltaTime: ${deltaTime}`);
        once = true;
      }
    }
    var dx = 0;
    var dy = 0;

    if (typeof deltaTime != "undefined") {
      dx = xVelocity * deltaTime;
      // dx = xVelocity === 0 ? 0 //This is for debugging
      //   : xVelocity > 0 ? 3 : -3;
    }

    // Should I use window.lastUpdate instead?

    currentTime = newCurrentTime;

    var now = + new Date;
    if (window.lastUpdate) {
    }
    window.lastUpdate = now;

    var enemyPos = enemy1.getCoordinates();

    var notOnGroundExactly = yPos != groundHeight;
    if (notOnGroundExactly) {
      var yPositionRounded = yPos.toFixed(11);
      var groundHeight = ground(xPos);
      var groundHeightRounded = groundHeight.toFixed(11);

      var shouldChangePositionToNewGround = yPositionRounded === groundHeightRounded;

      if (shouldChangePositionToNewGround) {
        yPos = groundHeight;
      }
    }

    var isFalling = getIsFalling(enemyPos, xPos, yPos);

    if (isFalling) {
      dy = monger.fall(dx);
    }
    else {
      var futureGroundHeight = ground(xPos + dx / 100);
      var isOnEnemy = yPos === enemyPos.y;
      var groundNotUphillAhead = futureGroundHeight >= groundHeight;
      var shouldGoLateral = isOnEnemy ||groundNotUphillAhead && dx != 0;
      var shouldGoUpHill = dx != 0 && futureGroundHeight  < groundHeight && isAlive && isOnEnemy === false;

      if (shouldGoUpHill) {
        dx = uphill(dx);
      }
      else if (shouldGoLateral) {
      }
      else if (yPos > groundHeight) //This is a last resort and means something went wrong
      {
        yPos = groundHeight;
      }
    }

    xPos += dx;

    var shouldUpdateHeroAnimationFrame = counter === 0 && isFalling === false && isAlive;
    if (shouldUpdateHeroAnimationFrame)
    {
        if (dx > 0)
        {
           heroImg.src = rightCycle[animationIndex];
        }
        else if (dx < 0)
        {
           heroImg.src = leftCycle[animationIndex];
        }
    }
    counter = (counter + 1) % counterInterval;
    animationIndex = (animationIndex + 1) % leftCycle.length;
  }
}
function ground(xPos)
{
    var n = 0 ;
    if (mapCounter < heightObjs.length)
    {
        var heighty = heightObjs[mapCounter].map;
        if (xPos < heighty[0].x)
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
    var calculatedGround = canvas.height - (m * xPos) - b;
    return calculatedGround;
    }
}

function xFinder(dy, yNow)
{
    for (var f = 0; f <= 800; f ++)
    {
        var m = dy / dx;
        var b = yNow - (m * xPos)

        var y = m *(xPos + f / 100) + b;

        if (y >= ground(xPos + f / 100))
        {
            return y;
            break;
        }
    }
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

    var xPosWithInCoin = Math.abs(coinLeft - monger.x()) <= threshold;
    var yPosWithInCoin = Math.abs(coinTop - monger.y()) <= threshold
    var posWithInCoin = xPosWithInCoin && yPosWithInCoin;
    var shouldGetCoin2 = haveCoin === false && mapCounter === 0;
    var shouldGetCoin = posWithInCoin && shouldGetCoin2
    if (shouldGetCoin)
    {
        $("#loseHeadline").text("GOT COIN!!!");
        haveCoin = true;
        coinAmount ++;
    }
}

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
