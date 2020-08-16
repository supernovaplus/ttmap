const playerMarkers = {};
fetch("./data/serversList.json").then(res=>res.json()).then(serversList=>{
    createServersListBlock(serversList);
    setInterval(scanServers, 5000);
    scanServers();
    setInterval(scanInactivePlayers, 10000);
}).catch(err=>{
    console.log(err);
})

function scanInactivePlayers(skipCheck = false){
    if(mapUpdatingPaused === true || Object.keys(playerMarkers).length === 0) return;

    for (const key in playerMarkers) {
        if(skipCheck === true || Date.now() - playerMarkers[key].nova.timestamp > 7000){
            map.removeLayer(playerMarkers[key])
            delete playerMarkers[key];
        }
    }
}

function scanServers(){
    if(mapUpdatingPaused === true) return;
    for (const checkbox of serversSelectionCheckboxes) {
        if(checkbox.checked === true){
            getServerData(checkbox);
        }
    }
    setTimeout(()=>redrawTheMap(globalMapInfo),500)
}

function getServerData(checkbox){
    // fetch("http://"+checkbox.value+"/status/map/positions.json").then(res=>res.json()).then(res=>{
    fetch("https://novaplus.herokuapp.com/positions/" + checkbox.value).then(res=>res.json()).then(res=>{
        if(res.error){
            checkbox.checked = false;
            checkbox.disabled = true;
            return;
        }
        if(!res.data) return;

        const timestamp = Date.now();
        const players = res.data.players;

        for (let i = 0; i < players.length; i++) {
            if(players[i][3] === null)continue;
            if(players[i][0] === "null"){
                map.removeLayer(playerMarkers[players[i][2]])
                delete playerMarkers[players[i][2]];
                continue;
            }

            if(playerMarkers[players[i][2]] === undefined){
                playerMarkers[players[i][2]] = L.marker([
                        players[i][3].y,
                        players[i][3].x,
                    ],{
                        icon: generateIcon(players[i][4],players[i][5])
                    })
                .addTo(map)
                .bindPopup(parsePlayerInfo(players[i], checkbox))
                .bindTooltip(generateTag(players[i][5]["group"]) + players[i][0], {
                    permanent: true,
                    offset: [0, -5],
                    opacity: 0.8,
                    direction: "top"
                });

                playerMarkers[players[i][2]].nova = {
                    gameid: players[i][0]+"#"+players[i][2],
                    timestamp,
                    vehicle: players[i][4],
                    job: players[i][5],
                    positions: [{ lat: players[i][3].y, lng: players[i][3].x }]
                }

            }else{

                //TRAILS
                if(currentTrailMode !== 2){ 
                    playerMarkers[players[i][2]].nova.positions.push({ lat: players[i][3].y, lng: players[i][3].x });

                    if(currentTrailMode === 0){ //trail mode snake
                        while (playerMarkers[players[i][2]].nova.positions.length > 5){
                            playerMarkers[players[i][2]].nova.positions.shift();
                        }
                    }else{ //trail mode long
                        while (playerMarkers[players[i][2]].nova.positions.length > 100){
                            playerMarkers[players[i][2]].nova.positions.shift();
                        }
                    }
                }else{ //trail mode none
                    if(playerMarkers[players[i][2]].nova.positions.length > 0){
                        playerMarkers[players[i][2]].nova.positions = [];
                    }
                }
                //TRAILS END

                playerMarkers[players[i][2]].setLatLng({ lat: players[i][3].y, lng: players[i][3].x });
                playerMarkers[players[i][2]].nova.timestamp = timestamp;
                playerMarkers[players[i][2]].bindPopup( parsePlayerInfo(players[i], checkbox) )

                if(playerMarkers[players[i][2]].nova.vehicle["vehicle_model"] !== players[i][4]["vehicle_model"]){
                    playerMarkers[players[i][2]].setIcon( generateIcon(players[i][4], players[i][5]) );
                    playerMarkers[players[i][2]].nova.vehicle = players[i][4];
                }

                if(playerMarkers[players[i][2]].nova.job["name"] !== players[i][5]["name"]){
                    playerMarkers[players[i][2]]._tooltip.setContent(generateTag(players[i][5]["group"]) + players[i][0])
                    playerMarkers[players[i][2]].nova.job = players[i][5];
                }
            }
        }

    }).catch(err=>{
        // console.log(err);
        checkbox.checked = false;
        checkbox.disabled = true;
    });
}

const debugparse = true;
function parsePlayerInfo(data, checkbox){
    if(debugparse === false) return JSON.stringify(data);

    return `<div class="markerHead">Player Info</div>
            <b>Name:</b> ${data[0]}<hr>
            <b>ID:</b> ${data[2]}<hr>
            <b>Job:</b> ${data[5].name || "N/A"}<hr>
            <b>Vehicle</b>: ${(data[4]["vehicle_label"] === "NULL"? 
                            "N/A" : 
                            `${data[4]["vehicle_name"]} (${vehicle_classes[data[4]["vehicle_class"]]})`)}<hr>
            <b>${checkbox.dataset.server}</b> <a href="fivem://connect/${checkbox.value}" title="Join: ${checkbox.value}">JOIN</a>`;
}