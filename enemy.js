var Enemy=function(x1,y1)
{
var pos ={x:x1,y:y1,w:50,h:50};
var speed = 5;
var threshold=speed+1;
var exploded = false;

    function direction(coordinate, mongerCoordinate)
    {
        var difference = mongerCoordinate-coordinate;
        if (Math.abs(difference)>threshold)
        {
            return difference/(Math.abs(difference));
        }

        else
        {
            return 0;
        }
    }
    return{

        update: function(mongerX,mongerY)
        {
            var directionX = direction(pos.x,mongerX);
            var directionY = direction(pos.y,mongerY);

            if (!exploded)
            {
                pos.x+= speed * directionX;
                pos.y+= speed * directionY;

                if (directionX<0)
                {
                    img3.src=enemyPicLeft;
                }
                else if (directionX>0)
                {
                    img3.src=enemyPicRight;
                }
                if (Math.abs(pos.x-mongerX)<=threshold&&(Math.abs(pos.y-mongerY)<=threshold))
                {
                    died();
                }
            }
            if (mapCounter===0)
            {
                context.drawImage(img3,pos.x-.5*pos.h,pos.y-.5*pos.w,pos.w,pos.h);
            }
        },
        getCoordinates:function(){
            return pos;
        },
        died:function(){
            exploded=true;
            img3.src=boom;
        },
        deadStatus: function(){

            return exploded;
        }
    }
}
