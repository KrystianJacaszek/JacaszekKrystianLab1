function basicFunc(){
    document.querySelector("section").innerHTML+='test<br>';
    console.log("test w konsoli");
    
}

function load(){

    let ball={
        x:100,
        y:100,
        width:10,
        height:10

    }


    collisionArray=[
        {   x:275,
            y:100,
            width:50,
            height:200},

            {   x:0,
                y:0,
                width:600,
                height:10
            },
            {   x:0,
                y:290,
                width:600,
                height:10
            },
            {   x:0,
                y:0,
                width:10,
                height:300
            },
            {   x:590,
                y:0,
                width:10,
                height:300
            },
    ]

    let c = document.querySelector('#canvasArea')
    c.width=600
    c.height=300
    let ctx = c.getContext("2d");

    function gameRender(){
		
        c.width=600
        c.height=300
        let ctx = c.getContext("2d");

        for(let i=0;i<collisionArray.length;i++){

            let cache=collisionArray[i]
            ctx.fillStyle="#000"
            ctx.fillRect(cache.x,cache.y,cache.width,cache.height)

        }


        ballRender()

    }

    function ballRender(){

        ctx.beginPath
        ctx.fillStyle='black'
        ctx.arc(ball.x,ball.y,ball.width,0,2*Math.PI)
        ctx.fill()
        ctx.stroke()
        ctx.endPath

    }

    function clearArea(){

        ctx.clearRect(0,0,600,300)
        
    }

    function collisionDetect(){

        for(let i=0;i<collisionArray.length;i++){

            let cache=collisionArray[i]
            if(collisionDetectCheck(cache,ball))
                console.log("kolizja")

        }

    }

    function collisionDetectCheck(A,B){
        return !(A.x + A.width < B.x ||
                 B.x + B.width < A.x ||
                 A.y + A.height < B.y ||
                 B.y + B.height < A.y)

    }

    window.addEventListener('keydown', function(e){

        console.log("Your key is: "+e.keyCode)

        e.keyCode==38 ? ball.y-=10 : 0
        e.keyCode==40 ? ball.y+=10 : 0
        e.keyCode==37 ? ball.x-=10 : 0
        e.keyCode==39 ? ball.x+=10 : 0

        e.keyCode==8 ? clearArea() : 0


    })


    function gameLoop(){

        clearArea()

        collisionDetect()

        gameRender()

        setTimeout(function(){ gameLoop()}, 1000/144)
    }

    gameLoop()


}