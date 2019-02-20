function basicFunc(){
    document.querySelector("section").innerHTML+='test<br>';
    console.log("test w konsoli");
    
}

function onLoad(){

    let base = document.querySelector('section')
    let c = document.querySelector("#canImg")
    let ctx =c.getContext('2d')
    let img = new Image(500,333)
    img.onload=drawImageEdit
    img.src='car.jpg'

    function drawImageEdit(){

        c.width=this.naturalWidth
        c.height=this.naturalHeight

        ctx.drawImage(this,0,0)

    }
}