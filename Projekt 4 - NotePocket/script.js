function basicFunc(){
    document.querySelector("section").innerHTML+='test<br>';
    console.log("test w konsoli");
    
}

function addNotes() {

    let notesBody=document.querySelector("#notesBody")
    let sticky = document.createElement('div')
    sticky.className="stickyBase"
    notesBody.appendChild(sticky)


    let stickyConainerTop=document.createElement('div')
    sticky.className="stickyContainerTop"
    

    let stickyDelete = document.createElement('div')
    stickyDelete.className="stickyDelete"
    sticky.appendChild(stickyDelete)

    let stickyTitle = document.createElement('div')

    let stickyChangeColor = document.createElement('div')
    stickyChangeColor.className="stickyChangeColor"
    sticky.appendChild(stickyChangeColor)

    let stickyText = document.createElement('textarea')
    stickyText.setAttribute('maxlength',500)
    stickyText.className="stickyText"
    sticky.appendChild(stickyText);

    let colors=["#00FA9A","#00B2EE","#FFFACD","#FFB6C1","#FFA54F","#FF6666","#EEE685"]
    let colorId=0;

    sticky.style.background=colors[colorId];

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