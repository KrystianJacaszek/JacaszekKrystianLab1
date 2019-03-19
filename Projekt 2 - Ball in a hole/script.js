function load(){

    let c = document.querySelector('#canvasArea')
    c.width=600
    c.height=300
    let ctx = c.getContext("2d");
   

    let restartBtn = document.querySelector('#restartBtn')

    restartBtn.addEventListener('click',function(e){

        alert('Zresetowales gre')
        ball.x=ballStart.x
        ball.y=ballStart.y
        dateTime=Date.now()
    

    })

    let numbersHoles=20

    let dateTime=Date.now()
    let time
    let timeDuration =0
    let stringTime

    let ball={
        x:25,
        y:150,
        r:5,
        color:'black'

    }

    let ballStart={
        x:25,
        y:150,
        r:5,
        color:'black'

    }

    randomStart()

    let finnalHole=[]
    randomFinnalHole()
    let hollsArray=[]    
    randomHoles(numbersHoles)


    let velocityVec={
        vX:0,
        vY:0
    }

        window.addEventListener('devicemotion', function(e){
            let acc=e.accelerationIncludingGravity

            velocityVec.vX+=-acc.x/10
            velocityVec.vY+=acc.y/10

        })

    window.addEventListener('keydown', function(e){

        console.log("Your key is: "+e.keyCode)

        e.keyCode==38 ? ball.y-=10 : 0
        e.keyCode==40 ? ball.y+=10 : 0
        e.keyCode==37 ? ball.x-=10 : 0
        e.keyCode==39 ? ball.x+=10 : 0

        e.keyCode==8 ? clearArea() : 0


    })

    function letRand(min,max){
        return Math.floor(Math.random() * (max - min) ) + min;
    }


    function randomFinnalHole(){

        finnalHole={
            x:letRand(500,590),
            y:letRand(10,290),
            r:10,
            color:"red"
        }

    }

    function checkAvail(tab, hole){

        if(tab.length==0){
            console.log("EMPTY")
            return false
        }else if(tab.length==undefined){
            if(collisionDetectCheckHoles(tab,hole)){
                return true
            }else
                return false
        }
        else{

            for(let i=0;i<tab.length;i++){

                let cache = tab[i]
    
                if(collisionDetectCheckHoles(cache,hole)){
                    console.log("fail")
                    return true
                }
                    
            }
            return false
        }

    }

    function randomStart(){

        ball= {
            x:letRand(10,30),
            y:letRand(10,290),
            r:5,
            color:"black"
        }

        ballStart.x=ball.x
        ballStart.y=ball.y

    }

    function randomHoles(length){

        hollsArray=[]

        for(let i =0;i<length;i++){
 
            randHole= {
                x:letRand(10,590),
                y:letRand(10,290),
                r:10,
                color:"blue"
            }

            if((!checkAvail(hollsArray,randHole))&&
                (!checkAvail(finnalHole,randHole))&&
                (!checkAvail(ballStart,randHole))){
                    
                    console.log(randHole)
                    hollsArray.push(randHole)

                }else{
                    --i
                }
      }
    }

    function gameRender(){
		
        c.width=600
        c.height=300
        let ctx = c.getContext("2d");

        for(let i=0;i<hollsArray.length;i++){

                renderHole(hollsArray[i])
            
        }

        renderHole(finnalHole)

        renderHole(ball)

    }

    function renderHole(hole){
        ctx.beginPath()
        ctx.fillStyle=hole.color
        ctx.arc(hole.x,hole.y,hole.r,0,2*Math.PI)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()

    }

    function updateBall(){

        let a=velocityVec.vX
        let b=velocityVec.vY

        ball.x+=a
        ball.y+=b

    }

    function clearArea(){

        ctx.clearRect(0,0,600,300)
        
    }

    function collisionBorderDetect(){

        if(ball.x+ball.r>=c.width ||
           ball.x-ball.r<=0)
                reversVelocityX()
        
        if(ball.y+ball.r>=c.height ||
            ball.y-ball.r<=0)
                reversVelocityY()
    }

    function reversVelocityX(){
        velocityVec.vX*=-1
    }
    function reversVelocityY(){
        velocityVec.vY*=-1
    }

    function collisionDetect(){

        for(let i=0;i<hollsArray.length;i++){

            let cache = hollsArray[i]

            if(collisionDetectCheck(cache,ball))
                failHoll()
        }

    }

    function collisionDetectCheck(A,B){
        return !(A.x + A.r < B.x ||
                 B.x + B.r < A.x ||
                 A.y + A.r < B.y ||
                 B.y + B.r < A.y)

    }

    function collisionDetectCheckHoles(A,B){
        return !(A.x + A.r+30 < B.x ||
                 B.x + B.r+30 < A.x ||
                 A.y + A.r+30 < B.y ||
                 B.y + B.r+30 < A.y)

    }

    function collisionWinDetect(){

        if(collisionDetectCheck(finnalHole,ball))
            winGame()

    }

    function restartGame(){
        velocityVec.vX=0
        velocityVec.vY=0
        ball.x=ballStart.x
        ball.y=ballStart.y
        dateTime=Date.now()
    }

    function winGame(){

        alert('WIN\nprzed czasem: '+stringTime+"\ntwoj czas to: "+timeToString(timeDuration))
      
        randomStart()
        randomFinnalHole()
        numbersHoles+=10
        randomHoles(numbersHoles)
        
        restartGame()

    }

    function failHoll(){
        
        alert('Wpdales do dziury, a twoj czas to: '+timeToString(timeDuration))
        restartGame()
        
    }
    function checkTime(){

        if (time<=0){
            alert("Koniec czasu 00:00:00")
            restartGame()

        }

    }

    function timer(){
        let tim=document.querySelector('#time')
        
        timeLimit=60000
        timeDuration=Date.now()-dateTime
        time=timeLimit-timeDuration

        stringTime=timeToString(time)           
        tim.innerHTML=stringTime

    }

    setInterval(function(){
        timer()

    },1)

    function timeToString(time){

        function checkZero(i){
            if(i<10 && i>=0)
                return ("0"+i)
            else
            return i
        }

        return(checkZero(Math.floor(time/60000))+":"+
        checkZero(Math.floor(time/1000))+":"+
        checkZero(time%600))
    }

    function gameLoop(){

        collisionBorderDetect()
        collisionDetect()
        collisionWinDetect()

        checkTime()

        updateBall()

        gameRender()

        requestAnimationFrame(gameLoop);
    }

    gameLoop()


}