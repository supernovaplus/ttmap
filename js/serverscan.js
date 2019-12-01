const playerMarkers = {};
setInterval(scanServers, 5000);
scanServers();

setInterval(scanInactivePlayers, 6000);

function scanInactivePlayers(skipCheck = false){
    if(mapUpdatingPaused === true || Object.keys(playerMarkers).length === 0) return;
    let timeNow = Date.now();

    for (const key in playerMarkers) {
        if(skipCheck === true || timeNow - playerMarkers[key].nova.timestamp > 7000){
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
}





function getServerData(checkbox){
    fetch("http://"+checkbox.value+"/status/map/positions.json").then(res=>res.json()).then(res=>{

        // el.innerHTML = "";
        let looptimestamp = Date.now();
        for (let i = 0; i < res.players.length; i++) {
            // if (res.players[i][2] !== 123456)continue;

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


                playerMarkers[res.players[i][2]].nova = {}
                playerMarkers[res.players[i][2]].nova.gameid = res.players[i][0]+"#"+res.players[i][2];
                playerMarkers[res.players[i][2]].nova.timestamp = looptimestamp;
                playerMarkers[res.players[i][2]].nova.vehicle = res.players[i][4];
                playerMarkers[res.players[i][2]].nova.job = res.players[i][5];



                
            }else{
                playerMarkers[res.players[i][2]].setLatLng({ lat: res.players[i][3].y, lng: res.players[i][3].x });
                playerMarkers[res.players[i][2]].nova.timestamp = looptimestamp;
                playerMarkers[res.players[i][2]].bindPopup( parsePlayerInfo(res.players[i],checkbox) )

                if(playerMarkers[res.players[i][2]].nova.job.name !== res.players[i][5]["name"] ||
                    playerMarkers[res.players[i][2]].nova.vehicle["vehicle_model"] !== res.players[i][4]["vehicle_model"]
                    ){
                    playerMarkers[res.players[i][2]].setIcon( generateIcon(res.players[i][4],res.players[i][5]) );
                    
                }

                // console.log(playerMarkers[res.players[i][2]]._tooltip._content)


            }


            
        }
    }).catch(err=>{
        console.log(err);
        checkbox.checked = false;
        checkbox.disabled = true;
    });
}

const parse = true;
function parsePlayerInfo(data,checkbox){
    if(parse === false) return JSON.stringify(data);
    // [
    //     "Name",
    //     163,
    //     123123,
    //     {"x":-577.3232421875,"y":-79.943832397461,"z":41.891296386719},
    //     {"vehicle_model":-1,"vehicle_type":"foot","vehicle_class":-1,"vehicle_name":"None","vehicle_label":"NULL"},
    //     {"group":"garbage","name":"Garbage Collector"}
    // ]

    // return `<b>Name:</b> ${data[0]}<br>
    // <b>ID:</b> ${data[2]}<br>
    // <b>Job:</b> ${data[5].name || "N/A"}<br>
    // <b>Vehicle:</b> ${(data[4]["vehicle_label"] === "NULL"? 
    //         "N/A" : 
    //         `${data[4]["vehicle_name"]} (${vehicle_classes[data[4]["vehicle_class"]]})`)}<br>
    // <b>${checkbox.dataset.server}</b>`;

    return `<div class="markerHead">Player Info</div>
            <b>Name:</b> ${data[0]}<hr>
            <b>ID:</b> ${data[2]}<hr>
            <b>Job:</b> ${data[5].name || "N/A"}<hr>
            <b>Vehicle</b>: ${(data[4]["vehicle_label"] === "NULL"? 
                            "N/A" : 
                            `${data[4]["vehicle_name"]} (${vehicle_classes[data[4]["vehicle_class"]]})`)}<hr>
            <b>${checkbox.dataset.server}</b> <a href="fivem://connect/${checkbox.value}" title="Join: ${checkbox.value}">JOIN</a>`
}