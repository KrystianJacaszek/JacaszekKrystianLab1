let stickyArray=[];

function addNotes(){

    let el =new Note("","",0)

}

function saveLocal(){
    
    localStorage.setItem('sticky',JSON.stringify(stickyArray))
        
}

function loadLocal(){

    let stickyArray = localStorage.getItem('sticky') ? JSON.parse(localStorage.getItem('sticky')) : [];

        if (stickyArray.length!=0 ){
            for (let i=0; i<stickyArray.length;i++){
                let el=new Note(stickyArray[i][0],
                                stickyArray[i][1],
                                stickyArray[i][2],)

            }

        }
    
}

function refreshSticky(){
    let notesBody=document.querySelector("#notesBody")
    while (notesBody.firstChild){
        notesBody.removeChild(notesBody.firstChild)
    }

    stickyArray=[]

    loadLocal()

}


function showArray(){
    console.log(stickyArray)
}

function Note(_title, _text,_color) {

    let notesBody=document.querySelector("#notesBody")

    let ob = new createStickyEl()

    let colors=["#00FA9A","#00B2EE","#FFFACD","#FFB6C1","#FFA54F","#FF6666","#EEE685"]

    notesBody.appendChild(ob.sticky)

    setData(_title,_text,_color)

    function setData(title,text,color){
        stickyArray.push([title,text,color]);
        ob.ArrayIndex=(stickyArray.length-1)
        ob.title=title
        ob.colorId=color
        ob.text=text
        ob.sticky.style.background=colors[color]
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

        this.stickyPinUp = document.createElement('i')
        this.stickyPinUp.className="fas fa-thumbtack stickyButtons"
        this.stickyConainerTop.appendChild(this.stickyPinUp)
    
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

            addToArray(ob.title,ob.text,ob.colorId);

        })
    
        ob.stickyDelete.addEventListener("click", function(e){
            
            ob.sticky.parentNode.removeChild(ob.sticky)
            delToArray()
                
        })

        ob.stickyPinUp.addEventListener("click", function(e){
            delToArray()
            pinToArray(ob.title,ob.text,ob.colorId);
            refreshSticky()

        })
    

        function addToArray(title,text,colorId){
            stickyArray.splice(ob.ArrayIndex,1,[title,text,colorId])
            saveLocal()
        }

        function delToArray(){
            stickyArray.splice(ob.ArrayIndex,1)
            saveLocal()
        }
        function pinToArray(title,text,colorId){
            stickyArray.splice(0,0,[title,text,colorId])
            saveLocal()
        }

    return ob.sticky
    

}