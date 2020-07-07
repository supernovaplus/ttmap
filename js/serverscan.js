const playerMarkers = {};
fetch("./data/serversList.json").then(res=>res.json()).then(serversList=>{
    createServersListBlock(serversList);
    setInterval(scanServers, 5000);
    scanServers();
    setInterval(scanInactivePlayers, 6000);
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
    fetch("http://"+checkbox.value+"/status/map/positions.json").then(res=>res.json()).then(res=>{
        const timestamp = Date.now();
        for (let i = 0; i < res.players.length; i++) {
            if(res.players[i][3] === null)continue;
            if(res.players[i][0] === "null"){
                map.removeLayer(playerMarkers[res.players[i][2]])
                delete playerMarkers[res.players[i][2]];
                continue;
            }

            if(playerMarkers[res.players[i][2]] === undefined){
                playerMarkers[res.players[i][2]] = L.marker([
                        res.players[i][3].y,
                        res.players[i][3].x,
                    ],{
                        icon: generateIcon(res.players[i][4],res.players[i][5])
                    })
                .addTo(map)
                .bindPopup(parsePlayerInfo(res.players[i],checkbox))
                .bindTooltip(generateTag(res.players[i][5]["group"]) + res.players[i][0], {
                    permanent: true,
                    offset: [0, -5],
                    opacity: 0.8,
                    direction: "top"
                });

                playerMarkers[res.players[i][2]].nova = {
                    gameid: res.players[i][0]+"#"+res.players[i][2],
                    timestamp,
                    vehicle: res.players[i][4],
                    job: res.players[i][5],
                    positions: [{ lat: res.players[i][3].y, lng: res.players[i][3].x }]
                }

            }else{
                if(currentTrailMode !== 2){ 
                    playerMarkers[res.players[i][2]].nova.positions.push({ lat: res.players[i][3].y, lng: res.players[i][3].x });

                    if(currentTrailMode === 0){ //trail mode snake
                        while (playerMarkers[res.players[i][2]].nova.positions.length > 5){
                            playerMarkers[res.players[i][2]].nova.positions.shift();
                        }
                    }else{ //trail mode long
                        while (playerMarkers[res.players[i][2]].nova.positions.length > 100){
                            playerMarkers[res.players[i][2]].nova.positions.shift();
                        }
                    }
                }else{ //trail mode none
                    if(playerMarkers[res.players[i][2]].nova.positions.length > 0){
                        playerMarkers[res.players[i][2]].nova.positions = [];
                    }
                }

                playerMarkers[res.players[i][2]].setLatLng({ lat: res.players[i][3].y, lng: res.players[i][3].x });
                playerMarkers[res.players[i][2]].nova.timestamp = timestamp;
                playerMarkers[res.players[i][2]].bindPopup( parsePlayerInfo(res.players[i], checkbox) )

                if(playerMarkers[res.players[i][2]].nova.vehicle["vehicle_model"] !== res.players[i][4]["vehicle_model"]){
                    playerMarkers[res.players[i][2]].setIcon( generateIcon(res.players[i][4],res.players[i][5]) );
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