function load(){

    let c = document.querySelector('#canvasArea')
    c.width=600
    c.height=300
    let ctx = c.getContext("2d");

    let restartBtn = document.querySelector('#restartBtn')

    restartBtn.addEventListener('click',function(e){

        alert('Zresetowales gre')
        ball.x=25
        ball.y=150
        dateTime=Date.now()
    

    })

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

    let finnalHole={
        x:570,
        y:270,
        r:5,
        color:'red'

    }

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

    hollsArray=[{
        x:100,
        y:25,
        r:10,
        color:"blue"
    },
    {
        x:100,
        y:125,
        r:10,
        color:"blue"
    },
    {
        x:100,
        y:225,
        r:10,
        color:"blue"
    },
    {
        x:300,
        y:75,
        r:10,
        color:"blue"
    },
    {
        x:300,
        y:175,
        r:10,
        color:"blue"
    },
    {
        x:300,
        y:275,
        r:10,
        color:"blue"
    },
    {
        x:500,
        y:75,
        r:10,
        color:"blue"
    },
    {
        x:500,
        y:175,
        r:10,
        color:"blue"
    },
    {
        x:555,
        y:265,
        r:10,
        color:"blue"
    },


    ]

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

    function collisionWinDetect(){

        if(collisionDetectCheck(finnalHole,ball))
            winGame()

    }

    function restartGame(){
        velocityVec.vX=0
        velocityVec.vY=0
        ball.x=25
        ball.y=150
        dateTime=Date.now()
    }

    function winGame(){

        alert('WIN\nprzed czasem: '+stringTime+"\ntwoj czas to: "+timeToString(timeDuration))
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