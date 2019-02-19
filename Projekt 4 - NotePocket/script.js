function basicFunc(){
    document.querySelector("section").innerHTML+='test<br>';
    console.log("test w konsoli");
    
}

let stickyArray=[];

function zapisz(){

    localStorage.setItem


}

function addNotes(){

    let notesBody=document.querySelector("#notesBody")
    let el =new Note("sd","d")
    //stickyArray.push(el)
    notesBody.appendChild(el)

}

function delNotes(x){


}

function showArray(){
    console.log(stickyArray)
}

function Note(_text, _title) {

    let ob = new createStickyEl()

    setData(_title,_text)

    function setData(title,text){
        stickyArray.push([title,text]);
        ob.ArrayIndex=(stickyArray.length-1)
        ob.title=title
        ob.text=text
        ob.stickyText.value=text
        ob.stickyTitle.value=title

    }

    function createStickyEl(){
        this.title=""
        this.text=""
        this.ArrayIndex
        this.colorId=0

        this.sticky = document.createElement('div')
        this.sticky.className="stickyBase"

        this.stickyConainerTop=document.createElement('div')
        this.stickyConainerTop.className="stickyContainerTop"
        this.sticky.appendChild(this.stickyConainerTop)
    
        this.stickyDelete = document.createElement('i')
        this.stickyDelete.className="far fa-calendar-times stickyButtons"
        this.stickyConainerTop.appendChild(this.stickyDelete)
    
        this.stickyTitle = document.createElement('input')
        this.stickyTitle.className="stickyTitle"
        this.stickyTitle.setAttribute('type', 'text');
        this.stickyTitle.setAttribute('maxlength', '15');
        this.stickyConainerTop.appendChild(this.stickyTitle)
    
        this.stickyChangeColor = document.createElement('i')
        this.stickyChangeColor.className="fas fa-fill-drip stickyButtons"
        this.stickyConainerTop.appendChild(this.stickyChangeColor)
    
        this.stickyText = document.createElement('textarea')
        this.stickyText.setAttribute('maxlength',500)
        this.stickyText.className="stickyText"
        this.sticky.appendChild(this.stickyText);

        this.changeTitle=function(){
            this.title=this.stickyTitle.value
        }
        this.changeText=function(){
            this.text=this.stickyText.value
        }


    }


        let colors=["#00FA9A","#00B2EE","#FFFACD","#FFB6C1","#FFA54F","#FF6666","#EEE685"]
        let colorId=0;
    
        ob.sticky.style.background=colors[colorId]
    
    
        ob.stickyText.addEventListener("input", function(e){
            ob.changeText();
            addToArray(ob.title,ob.text,ob.colorId);
           
        })
        ob.stickyTitle.addEventListener("input", function(e){
            ob.changeTitle()
            addToArray(ob.title,ob.text,ob.colorId);
        })
        
    
    
        ob.stickyChangeColor.addEventListener("click", function(e){
           
            if (ob.colorId<colors.length)
                ob.colorId++
            else
                ob.colorId=0
    
            ob.sticky.style.background=colors[ob.colorId]

        })
    
        ob.stickyDelete.addEventListener("click", function(e){
            
            sticky.parentNode.removeChild(sticky)
    
        })
    

    function addToArray(title,text,colorId){
        console.log("addToArray\ntitle: "+title+"\ntext: "+text)
        stickyArray.splice(ob.ArrayIndex,1,[title,text,colorId]);
    }

    return ob.sticky
    

}