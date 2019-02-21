function changeColors(){

    let root = document.documentElement

    if(root.style.getPropertyValue('--primary-0')!='#45C0C6'){

        root.style.setProperty('--primary-0','#45C0C6')
        root.style.setProperty('--primary-1','#793B12')
        root.style.setProperty('--primary-2','#1E7679')
        root.style.setProperty('--primary-3','#5FF8FF')
        root.style.setProperty('--primary-4','#C67845')

    }else{
        root.style.setProperty('--primary-0','rgba( 75,145, 48,1)')
        root.style.setProperty('--primary-1','rgba( 69, 72, 68,1)')
        root.style.setProperty('--primary-2','rgba( 45, 94, 26,1)')
        root.style.setProperty('--primary-3','rgba( 61,224,  0,1)')
        root.style.setProperty('--primary-4','rgba(221,230,217,1)')

    }
}

onChann1=false;
onChann2=false;
onChann3=false;
onChann4=false;

function load(){

    recBtn=document.querySelector('#recBtn')
    let isRec=false
    let recStart
    recBtn.addEventListener('click',function(){

        recStart=Date.now()

        isRec ? (isRec=false,this.classList.remove('btnPress')) : (isRec=true,this.classList.add('btnPress'))
    })

    channels = document.querySelector('#channels')
    channelsBtn=channels.querySelectorAll('button')

    let isOnArr=[
            isOnChann1=false,
            isOnChann2=false,
            isOnChann3=false,
            isOnChann4=false]
    
    let soundChannArr=[
            channel1=[],
            channel2=[],
            channel3=[],
            channel4=[]
    ]

    

    for (let i=0;i<channelsBtn.length;i++){
       
        channelsBtn[i].addEventListener('click',function(e){

            isOnArr[i] ? (isOnArr[i]=false, this.classList.remove('btnPress')) : (isOnArr[i]=true, this.classList.add('btnPress'))

        })
        
    }

    audioKeyboard = document.querySelectorAll("#keyboard")
    audioButtons=audioKeyboard[0].querySelectorAll('button')

    for( let i=0;i<audioButtons.length;i++)
    {
        audioButtons[i].addEventListener('click', function(e){

            const audio = document.querySelector(`audio[data-key="${audioButtons[i].getAttribute('data-key')}"]`);
            if (!audio) return;
            audio.currentTime = 0;
            audio.play();

            for(let i=0;i<soundChannArr.length;i++){

                if(isOnArr[i]){
                    if(isRec){
                        soundChannArr[i].push({
                            time:Date.now()-recStart,
                            sound:audio.getAttribute('src')
                        })
                    }
                }
    
            }

        })

    }

    channelsPlay = document.querySelector('#channelsPlay')
    channelsPlayBtn=channelsPlay.querySelectorAll('button')

    for (let i=0;i<channelsPlayBtn.length;i++){
       
        channelsPlayBtn[i].addEventListener('click',function(e){
            
            soundChannArr[i].forEach(music=>{
                setTimeout(
                    () => {
                        musicPlay = document.querySelector(`audio[src="${music.sound}"]`)
                        musicPlay.currentTime=0
                        musicPlay.play()
                    },music.time
                )
            })

        })
        
    }

    playAll = document.querySelector('#playAll')

    playAll.addEventListener('click', function(){

        for (let i=0;i<channelsPlayBtn.length;i++){
      
            soundChannArr[i].forEach(music=>{
                setTimeout(
                    () => {
                        musicPlay = document.querySelector(`audio[src="${music.sound}"]`)
                        musicPlay.currentTime=0
                        musicPlay.play()
                    },music.time
                )
            })
        }

    })


    window.addEventListener('keydown', function(e) {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const btn = document.querySelector(`button[data-key="${e.keyCode}"]`);
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
        btn.classList.add('pressedKey')


        for(let i=0;i<soundChannArr.length;i++){

            if(isOnArr[i]){
                if(isRec){
                    soundChannArr[i].push({
                        time:Date.now()-recStart,
                        sound:audio.getAttribute('src')
                    })
                }
            }

        }


    })



    window.addEventListener('keyup', function(e) {
        const btn = document.querySelector(`button[data-key="${e.keyCode}"]`);
        setInterval(function(){ 
            btn.classList.remove('pressedKey')
         }, 150);
        
    })

    function play(){
        let audio = document.getElementById("audio");
        audio.play();
    }
    
}

