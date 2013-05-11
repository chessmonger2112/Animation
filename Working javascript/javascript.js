
var g = 10;
var b1 = document.getElementById("b1");
var b2 = document.getElementById("b2");
var bstop = document.getElementById("bstop");

b1.style.top="600px";
b2.style.top=b1.style.top;
b2.style.left=b1.style.left +100+"px";
var img1 =document.getElementById("image");

img1.style.top="400px";
img1.style.left="0px";
img1.style.height="100px";
img1.style.width="100px";

var walkLeft="walkingleft.jpg";
var walkRight="walkingright.jpg";
var standRight="standingright.jpg";
var standLeft="standingleft.jpg";
var leftCycle=[standLeft,walkLeft];
var rightCycle=[standRight, walkRight];
var animationIndex=0;
var counter=0;
var counterInterval=5;
var xpos = 0;
var initialvelocity=40;

var IronMonger = function() {
    var dy = 0;
    var dx = 0;
    var v0y=0;
    var t=0;
    var inflight=0;

    var ypos = 400;
    
    return {
        fall: function() {
            dy=(g*(.2*t+1)-v0y);
            t++;
          if(ypos+dy>ground(xpos+dx)&&ypos<ground(xpos)||ypos+dy===ground(xpos+dx))
			{
				ypos=ground(5);
			//	inflight=0;
				t=0;
            }
	
			else 
			{
                ypos+=dy;
			}
			b5.innerHTML=b5.innerHTML+"   "+ypos;	
            //*/
		},    
      
        moveLeft: function() {
            dx=-2;
        },
        
        moveRight: function() {
             dx=2;
             img1.src=standRight;
        },
        jump: function() {
            v0y=40;
             monger.fall();
        },
        stop: function() {
          //  img1.src=""
            dx=0;
            alert(ypos+"  "+ground())
        },
        
        update: function() {
            xpos+=dx;
            document.getElementById("b4").innerHTML=xpos;

            if (counter===0&&t===0)
            {

                if (dx>0)
                 {
                   img1.src=rightCycle[animationIndex];
                }
                 else if (dx<0)
                {
                   img1.src=leftCycle[animationIndex];
                }
            }
            counter = (counter + 1) % counterInterval;

            animationIndex = (animationIndex + 1) % leftCycle.length;



            ///*
            if (ypos<ground()&&t===0||ypos>ground()&&t===0)
            {
                v0y=0;
                monger.fall();

            }
            //*/
            img1.style.left=xpos+"px";
            img1.style.top=ypos+"px";
            if (t!=0)
            {
                monger.fall();
            }
                
        }
    }
}
function ground()
		{ 
			if (xpos<500)
			{
				return 400;
			}
			else
			{
				return 500;
			}
        }
var monger = IronMonger();


var interval = setInterval(monger.update, 1000 / 30)
//monger.update();
b1.addEventListener('click', monger.moveLeft, false);
b2.addEventListener('click', monger.moveRight, false);
b3.addEventListener('click', monger.jump, false);
bstop.addEventListener('click', monger.stop, false);
