var ballObj,courtObj;
var paddle;
var xcord,ycord;
var speed=1.5;
var distX,distY;
var maxscore=0;
var time;
var MAXTop,MAXBottom;
var rangle;
var cosangle;
var sinangle;

function initialize(){
    
	courtObj = document.getElementById("court");
	ballObj = document.getElementById("ball");
	paddle = document.getElementById("paddle");
	radios = document.getElementsByName('speed');

	rangle = Math.random()*Math.PI/2-Math.PI/4;
 	xcord=10; //x,y coordinate of ball
 	ycord=10;

 	ballObj.style.left='0px';   //after resetting
 	ballObj.style.top ='0px';

 	MAXBottom = parseInt(courtObj.getBoundingClientRect().bottom-ballObj.getBoundingClientRect().bottom);
    MAXTop= parseInt(courtObj.getBoundingClientRect().top-ballObj.getBoundingClientRect().top);
    MAXRight= parseInt(courtObj.getBoundingClientRect().right);
    MAXLeft =  parseInt(courtObj.getBoundingClientRect().left);
    
 	document.getElementById('score').innerText=maxscore;
	document.getElementById('strikes').innerText=0;

    maxscore=0;
	cosangle = Math.cos(rangle);
	sinangle = Math.sin(rangle);
}

function startGame(){
     
	//moving ball
	xcord=xcord+(speed*cosangle*15);
	ycord=ycord+(speed*sinangle*15);
	
    document.getElementById("ball").style.left = xcord + "px";
	document.getElementById("ball").style.top = ycord + "px";

     //leftBound
	if(xcord-ballObj.width/2-7<=MAXLeft){
		    cosangle=-cosangle;     
		}
	//top bottom bound
	 if( (ycord+ballObj.height/2 >= MAXBottom)||(ycord-ballObj.height/2- 5 <= MAXTop)){
		 	sinangle=-sinangle;	 	
		}
	//hits paddle
	 if(ballObj.getBoundingClientRect().x>=750 && 
	 	//ballObj.getBoundingClientRect().x<=770  &&
	 	ballObj.getBoundingClientRect().y > paddle.getBoundingClientRect().y && 
	 	ballObj.getBoundingClientRect().y< paddle.getBoundingClientRect().y+paddle.height
	 	){
	 	
		cosangle=-cosangle;
		sinangle = -sinangle;
        maxscore+=1;
		document.getElementById('strikes').innerText = maxscore; //increase strikes
		}
		
    //goes outside court(rightBound)
	if (xcord > 795){
       initialize();
       clearTimeout(time);
       return;
		}	
	//repeat every 100 ms
	time =setTimeout(startGame,100);  
	

} 

//speed buttons
function setSpeed(radioValue){
  	if(radioValue==0){
  		speed = 1.5;
  	}
  	else if(radioValue==1){
  		speed = 2;
  		}
  	else if(radioValue==2){
  		speed = 2.5;
  	}
  }

function movePaddle(evt){
	if(parseInt(evt.pageY-paddle.height)>0 && parseInt(evt.pageY-paddle.height)<400) 
		paddle.style.top = evt.pageY-paddle.height+"px";
       
}
function resetGame(){
    clearTimeout(time);
    radios[0].checked=true;
    speed =1.5;
	initialize();
}	