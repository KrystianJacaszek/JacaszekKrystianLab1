let uluru, map, marker
let ws
let players = {}
let nick = '1'

function initMap() {
    uluru = { lat: -25.363, lng: 131.044 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: uluru,
        keyboardShortcuts: false
    });
    
    marker = new google.maps.Marker({
        position: uluru,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: 'marker2.png'
    });
    getLocalization()
    nick=prompt('Podaj swój nick');
    if(!nick || nick == "")
      nick =(Math.floor(Math.random()*100000 + 1))
    startWebSocket()
    document.querySelector('#sendMess').addEventListener('click', chatBoxSend)
    addKeyboardEvents()
}

function addKeyboardEvents() {
    window.addEventListener('keydown', poruszMarkerem)
}
function poruszMarkerem(ev) {
    let lat = marker.getPosition().lat()
    let lng = marker.getPosition().lng()

    switch (ev.code) {
        case 'ArrowUp':
            lat += 0.1
            break;
        case 'ArrowDown':
            lat -= 0.1
            break;
        case 'ArrowLeft':
            lng -= 0.1
            break;
        case 'ArrowRight':
            lng += 0.1
            break;
    }
    let position = {
        lat,
        lng
    }
    let wsData = {
        type: 'user',
            data : {
                lat: lat,
                lng: lng,
                id: nick
            }
    }
    map.setCenter(new google.maps.LatLng( position ) );
    marker.setPosition(position)
    ws.send(JSON.stringify(wsData))
    
}
function startWebSocket() {
    let url = 'ws://localhost:8080'
    ws = new WebSocket(url)
    ws.addEventListener('open', onWSOpen)
    ws.addEventListener('message', onWSMessage)
}

function onWSOpen(data) {
    console.log(data)
}
function onWSMessage(e) {
    let eData = JSON.parse(e.data)
    console.log("EDATA")
    console.log(eData)
    console.log(eData[0].type)

        if(eData[0].type === 'user'){
            for(let i =0;i<eData.length;i++){
                let entry=eData[i].data
                if (!players['user' + entry.id]) {
                    console.log(eData[i].data.id)
                    if(eData[i].data.id!=nick){
                        players['user' + entry.id] = new google.maps.Marker({
                            position: { lat: entry.lat, lng: entry.lng },
                            map: map,
                            animation: google.maps.Animation.DROP,
                           
                        })
                    }
                    
                    
                } else {
                    players['user' + entry.id].setPosition({
                        lat: entry.lat,
                        lng: entry.lng
                    })
                }
            }
    }
    
    if(eData[0].type === 'chat'){
        refreshChatBox(eData)
    }
    }



function getLocalization() {
    navigator.geolocation.getCurrentPosition(geoOk, geoFail)

}

function geoOk(data) {
    let coords = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
    }
    map.setCenter(coords)
    marker.setPosition(coords)
}

function geoFail(err) {
    console.log(err)
}

function chatBoxSend(){
    let dateNow=new Date()
    let messValue = document.querySelector('#inputMess').value
    let inputMess={type: 'chat',
                    data: {
                        id: nick,
                        text:messValue,
                        date: dateNow}
                    }

    ws.send(JSON.stringify(inputMess))

    document.querySelector('#inputMess').value=''
    
}

function refreshChatBox(chatText){
    let chatBoxShow = document.querySelector('#chatBoxShow')
    chatBoxSend.innerHTML=' '

 
    while (chatBoxShow.firstChild) {
        chatBoxShow.removeChild(chatBoxShow.firstChild);
}
    
    for(let i =0;i<chatText.length;i++){

        let pDate =  document.createElement('div')
        pDate.innerHTML=chatText[i].data.date+"</br>"
        pDate.classList='genMess'
        pDate.style.justifyContent="center"
        chatBoxShow.appendChild(pDate)

        let pPlayer =  document.createElement('div')
        pPlayer.innerHTML="User: "+chatText[i].data.id+"</br>"
        pPlayer.style.color="red"
        pPlayer.classList='genMess'
        chatBoxShow.appendChild(pPlayer)

        let pMessUnit =  document.createElement('div')
        pMessUnit.innerHTML=chatText[i].data.text+"</br></br>"
        pMessUnit.classList='genMess'
        chatBoxShow.appendChild(pMessUnit)


    }



}
