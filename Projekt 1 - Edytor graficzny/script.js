
function onLoad(){

    let base = document.querySelector('section')
    let c = document.querySelector("#canImg")
    let ctx =c.getContext('2d')
    let img = new Image(500,333)
    img.onload=drawImageEdit
    img.src='car.jpg'
    let imgEdited = new Image(500,333)
    imgEdited.onload=drawImageEdit
    img.src='car.jpg'

    let imageDataBackup

    function drawImageEdit(){

        c.width=this.naturalWidth
        c.height=this.naturalHeight

        ctx.drawImage(this,0,0)

        imageDataBackup = makeBackup()

    }

    function makeBackup(){
        return ctx.getImageData(0,0,c.width,c.height)
 
    }

    rBright = document.querySelector('#rBright')
    rContrast = document.querySelector('#rContrast')
    rSaturation = document.querySelector('#rSaturation')

    rBright.addEventListener('change', function(){

        changeBrightness(imageDataBackup,makeBackup(),rBright.value)
        changeContrast(makeBackup(),rContrast.value)
        changeSaturation(makeBackup(),rSaturation.value)
        drawLine()


    })


    rContrast.addEventListener('change', function(){

        changeBrightness(imageDataBackup,makeBackup(),rBright.value)
        changeContrast(makeBackup(),rContrast.value)
        changeSaturation(makeBackup(),rSaturation.value)
        drawLine()


    })

    
    rSaturation.addEventListener('change', function(){

        changeBrightness(imageDataBackup,makeBackup(),rBright.value)
        changeContrast(makeBackup(),rContrast.value)
        changeSaturation(makeBackup(),rSaturation.value)
        drawLine()

    })

    function changeBrightness(imageDataBefore,imageDataAfter,factor){

        factor = parseInt(factor)
        for(let i =0; i<imageDataBefore.data.length; i+=4){

                imageDataAfter.data[i] =imageDataBefore.data[i]+255*(factor/100)
                imageDataAfter.data[i+1] =imageDataBefore.data[i+1]+255*(factor/100)
                imageDataAfter.data[i+2] =imageDataBefore.data[i+2]+255*(factor/100)

             }
             ctx.putImageData(imageDataAfter, 0,0);
        }

    function truncateColor(value) {
            if (value < 0) {
              value = 0
            } else if (value > 255) {
              value = 255
            }
          
            return value;
        }

    function changeContrast(imageData,contrast){

        let factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast))

        for (let i = 0; i < imageData.data.length; i+= 4) {
          imageData.data[i] = truncateColor(factor * (imageData.data[i] - 128.0) + 128.0);
          imageData.data[i+1] = truncateColor(factor * (imageData.data[i+1] - 128.0) + 128.0);
          imageData.data[i+2] = truncateColor(factor * (imageData.data[i+2] - 128.0) + 128.0);
        }

        ctx.putImageData(imageData, 0,0);
    }

    function changeSaturation(imageData,saturation){

        for (let i = 0; i < imageData.data.length; i+= 4) {

            let max = Math.max(imageData.data[i], imageData.data[i+1], imageData.data[i+2])
            
            imageData.data[i] +=(max -imageData.data[i])*(saturation/-100)
            imageData.data[i+1] +=(max -imageData.data[i+1])*(saturation/-100)
            imageData.data[i+2] +=(max -imageData.data[i+1])*(saturation/-100)
        }

        ctx.putImageData(imageData, 0,0);
    }

    document.querySelector('#resetPic').addEventListener('click',function(){

        rBright.value=0
        rContrast.value=0
        rSaturation.value=0
        paint=[]

        ctx.putImageData(imageDataBackup,0,0)

    })

    let paintColor = 'red'

    document.querySelector('#redBtn').addEventListener('click',()=>{ paintColor='red'})
    document.querySelector('#blueBtn').addEventListener('click',()=>{ paintColor='blue'})
    document.querySelector('#greenBtn').addEventListener('click',()=>{ paintColor='green'})

    let isDown = false
    let xx=0
    let yy=0
    let x=0
    let y=0

    let paint=[]
    
    c.addEventListener('mousedown',function(e){
        isDown=true
        
        x=e.clientX-c.offsetLeft
        y=e.clientY-c.offsetTop

    })
    c.addEventListener('mouseup',function(e){
        isDown=false
    })

    c.addEventListener('mousemove', function(e){

        if(isDown){

            xx=x
            yy=y            
            x=e.clientX-c.offsetLeft
            y=e.clientY-c.offsetTop
            
            paint.push({x,y,xx,yy,paintColor})
            draw(x,y,xx,yy,paintColor)
            

        }

    }, false)

    function draw(x,y,xx,yy,paintColor) {

        ctx.beginPath();
        ctx.moveTo(xx, yy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = paintColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    function drawLine(){

        if(paint.length!=0){

            for(let i = 0;i<paint.length;i++){

                draw(paint[i].x,
                    paint[i].y,
                    paint[i].xx,
                    paint[i].yy,
                    paint[i].paintColor)

            }
        }
    }




}