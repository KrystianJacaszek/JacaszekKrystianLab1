function basicFunc(){
    document.querySelector("section").innerHTML+='test<br>';
    console.log("test w konsoli");
    
}

let stickyArray=[,];

function zapisz(){

    localStorage.setItem


}

function addNotes(){

    let notesBody=document.querySelector("#notesBody")
    let el =new Note("","")
    //stickyArray.push(el)
    notesBody.appendChild(el)

}

function delNotes(x){


}

function showArray(){
    console.log(stickyArray)
}

function Note(text, title) {

    createStickyEl()
    createLiseners()
    
    this.text=text
    this.title=title

    setData(text,title)

    function setData(text,title){
        this.stickyText.value=text
        this.stickyTitle.value=title

    }
   
    function createStickyEl(){
        this.sticky = document.createElement('div')
        sticky.className="stickyBase"

        this.stickyConainerTop=document.createElement('div')
        stickyConainerTop.className="stickyContainerTop"
        sticky.appendChild(stickyConainerTop)
    
        this.stickyDelete = document.createElement('i')
        stickyDelete.className="far fa-calendar-times stickyButtons"
        stickyConainerTop.appendChild(stickyDelete)
    
        this.stickyTitle = document.createElement('input')
        stickyTitle.className="stickyTitle"
        stickyTitle.setAttribute('type', 'text');
        stickyTitle.setAttribute('maxlength', '15');
        stickyConainerTop.appendChild(stickyTitle)
    
        this.stickyChangeColor = document.createElement('i')
        stickyChangeColor.className="fas fa-fill-drip stickyButtons"
        stickyConainerTop.appendChild(stickyChangeColor)
    
        this.stickyText = document.createElement('textarea')
        stickyText.setAttribute('maxlength',500)
        stickyText.className="stickyText"
        sticky.appendChild(stickyText);


    }

    function createLiseners(){

        let colors=["#00FA9A","#00B2EE","#FFFACD","#FFB6C1","#FFA54F","#FF6666","#EEE685"]
        let colorId=0;
    
        sticky.style.background=colors[colorId]
    
    
        stickyText.addEventListener("input", function(e){
            //alert(stickyText.value)
            this.text=stickyText.value
            addToArray();
        })
    
        stickyTitle.addEventListener("input", function(e){
            //alert(stickyTitle.value)
            this.title=stickyTitle.value
            addToArray();
        })
    
    
        stickyChangeColor.addEventListener("click", function(e){
           
            if (colorId<colors.length)
                colorId++
            else
                colorId=0
    
            sticky.style.background=colors[colorId]
        })
    
        stickyDelete.addEventListener("click", function(e){
            
            sticky.parentNode.removeChild(sticky)
    
        })
    }

    function addToArray(){

        stickyArray.push(this.text,this.title);
    }

    return sticky
    

}