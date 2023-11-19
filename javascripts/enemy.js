console.log("enemy js file");
var Enemy = function(x, y) {
var w = 50;
var h = 50;

var pos ={
  x,
  y,
  w,
  h
};

var speed = 5;
var threshold = speed + 1;
var exploded = false;

    function direction(coordinate, mongerCoordinate)
    {
        var difference = mongerCoordinate - coordinate;
        if (Math.abs(difference) > threshold)
        {
            return difference / (Math.abs(difference));
        }

        else
        {
            return 0;
        }
    }
    return {

        update: function(mongerX, mongerY)
        {
            var directionX = direction(pos.x, mongerX);
            var directionY = direction(pos.y, mongerY);

            if (exploded === false)
            {
                pos.x += speed * directionX;
                pos.y += speed * directionY;

                if (directionX < 0)
                {
                    enemyImg.src = enemyPicLeftFilePath;
                }
                else if (directionX > 0)
                {
                    enemyImg.src = enemyPicRightFilePath;
                }
                if (Math.abs(pos.x - mongerX) <= threshold && (Math.abs(pos.y - mongerY) <= threshold))
                {
                    died();
                }
            }
            if (mapCounter === 0) //This needs to be done better
            {
                context.drawImage(enemyImg, pos.x - .5 * pos.h, pos.y - .5 * pos.w, pos.w, pos.h);
            }
        },
        getCoordinates:function(){
            return pos;
        },
        died:function(){
            exploded=true;
            enemyImg.src=boomFilePath;
        },
        deadStatus: function(){

            return exploded;
        }
    }
}
