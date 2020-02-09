const hud = document.getElementById("hud");
// let el = document.createElement("div")
// el.style.position = "fixed";
// el.style.top = "10px";
// el.style.left = "100px"
// el.style.zIndex = "1000"
// el.innerHTML = "<b>test</b>"
// mapdiv.append(el);



function createGUIblock(callback){
    map.addControl(new (L.Control.extend({
        options: {position: 'topleft'},
        onAdd: function(map) {
            // const inputDiv = L.DomUtil.create('input');
            return callback(L.DomUtil.create("div"));
        }
    })));
}

createGUIblock(DIVBLOCK=>{
    // <div id="server-selector-header" onclick="toggleGUIblock(this);return false;">Server Selection:</div>

    DIVBLOCK.innerHTML=`
    <input type="button" value="Servers" onclick="toggleGUIblock(this);return;" class="toggleButton">
    <div class="divBlock">

    ${serversList.map(item=>`
        <div class="playersonlinerow">
        <input type="checkbox" class="servers" value="${item[0]}" data-server="${item[1]}" ${(params["hideplayers"] === true ? "" : "checked") /*if hidden players, remove hecked*/}> 
        <span>${item[1]}</span> 
        <span style="text-shadow: none;">${isMobileDevice === false ? `<a href="fivem://connect/${item[0]}" title="Join: ${item[0]}">🎮</a>` : ""}</span>
        </div>
    `).join("")}

    <button onclick="servers_checkall();return false;">Check All</button>
    <br><button onclick="servers_checknone();return false;">Check None<br>(Hide Players)</button>
    </div>`;
    
    toggleGUIblock(DIVBLOCK.children[0])

    serversSelectionCheckboxes = document.getElementsByClassName("servers");

    return DIVBLOCK;
});

createGUIblock(DIVBLOCK=>{
    DIVBLOCK.innerHTML=`
    <input type="button" value="Map Options" onclick="toggleGUIblock(this);return;" class="toggleButton">
    <div class="divBlock">
    <button onclick="pauseUnpause(this);return false;">Pause Updating</button>
    <br><button onclick="toggleNameTags();return false;">Toggle Name Tags</button>
    <br><button onclick="toogleImageQuality(this);return false;">Toggle Map Quality<br>(${hdMap === true ? "Medium" : "Low"})</button>
    <br><button onclick="toggleTrailMode(this);return false;">Toggle Trail Mode<br>(Snake)</button>
    </div> `;

    toggleGUIblock(DIVBLOCK.children[0])

    return DIVBLOCK;
});

createGUIblock(DIVBLOCK=>{

    DIVBLOCK.innerHTML = `
    <input type="button" value="Players" onclick="toggleGUIblock(this);return;" class="toggleButton">
    <div class="divBlock">
        <input type='text' id="findplayerinputfield" placeholder="enter player's id or name">
        <input type="submit" value="Find" onclick="findplayer(this);return false;">
    </div>
    `;

    toggleGUIblock(DIVBLOCK.children[0])

    return DIVBLOCK;
});











function toggleGUIblock (el) {
    el.nextElementSibling.style.display = (el.nextElementSibling.style.display === "none" ? "block" : "none");
}

document.getElementById('findplayerinputfield').onkeypress = function(e){
    if (!e) e = window.event;
    let keyCode = e.keyCode || e.which;
    if (keyCode === 13){
        findplayer(e.target.nextSibling);
        return false;
    }else{
        // e.target.style.backgroundColor = "white";
    }
}

function findplayer(input){
    if(!input.previousSibling.value) return;
    // console.log(input.previousSibling.value)
    let found = Object.values(playerMarkers).find(item=>(item.nova.gameid).toLowerCase().includes((input.previousSibling.value).toLowerCase()));
    if(found){
        input.previousSibling.style.backgroundColor = "lime";
        map.flyTo(found._latlng, -1, {
            animate: true,
            duration: .5
        });
        // found._popup.openOn(map)
        return false;
    }else{
        input.previousSibling.style.backgroundColor = "red";
    }
    
}


var copyLinkUrl = "";
map.on('contextmenu', function(event){
    cmenu.style.top = event.originalEvent.y + "px";
    cmenu.style.left = event.originalEvent.x + "px";
    copyLinkUrl = `${copyLink}?x=${event.latlng.lng.toFixed(3)}&y=${event.latlng.lat.toFixed(3)}`;
    refreshLink();
    cmenu.hidden = false;
});


const copyLinkInputField = document.getElementById("copyLinkInputField");
const copyLinkCheckbox = document.getElementById("showPlayersCheck");

function refreshLink(){
    copyLinkInputField.value = copyLinkCheckbox.checked === true ? copyLinkUrl : copyLinkUrl + "&hideplayers";
    return;
}

map.on('click', function(){
    cmenu.hidden = true;
});

map.on('drag', function(){
    cmenu.hidden = true;
});






var serversSelectionCheckboxes;

// console.log(serversSelectionCheckboxes);

//animation
// setTimeout(() => {
//     serversSelection.style.display = "none";
//     // serversSelection.style.left = -500+"px";
// }, 1000);
// setTimeout(() => {
//     serversSelection.style.display = "block";
//     // serversSelection.style.left = 0+"px";
// }, 3000);


var players_showBoxes = true;
const customstyle = document.createElement('style');
customstyle.type = "text/css";
document.head.append(customstyle);


function toggleNameTags(){
    customstyle.innerHTML = ( players_showBoxes === false ? 
        ".leaflet-tooltip-top{display:block};" : 
        ".leaflet-tooltip-top{display:none};" )

    players_showBoxes = !players_showBoxes;
}

function pauseUnpause(button){
    button.innerText = (mapUpdatingPaused === false ? "🟡 Unpause" : "🟢 Pause");
    mapUpdatingPaused = !mapUpdatingPaused;
}


function servers_checkall(){
    for (const i of serversSelectionCheckboxes) {
        if(i.disabled === true)continue;
        i.checked = true;
    }

    scanServers();
    // serversSelectionCheckboxes.forEach(element => {
    //     element.checked = true;
    // });
}

function servers_checknone(){
    for (const i of serversSelectionCheckboxes) {
        i.checked = false;
    }
    scanInactivePlayers(true);
}

function toogleImageQuality(dom){
    hdMap = !hdMap;
    dom.innerHTML = (hdMap === false ? "Toggle Map Quality<br>(Low)" : "Toggle Map Quality<br>(Medium)");
    
    image = L.imageOverlay(hdMap === true ? mapFolder+"map.jpg" : mapFolder+"mobilemap.jpg", bounds).addTo(map);
    // map.fitBounds(bounds);
}

var currentTrailMode = 0;

function toggleTrailMode(dom){
    if(currentTrailMode === 0){
        dom.innerText = "Toggle Trail Mode\n(Long)";

    }else if(currentTrailMode === 1){
        dom.innerText = "Toggle Trail Mode\n(None)";

    }else{
        dom.innerText = "Toggle Trail Mode\n(Snake)";
        currentTrailMode = 0;
        return;
    }
    currentTrailMode++;
}

// setInterval(joinServer, 1000);

// setTimeout(joinServer,2000);

// function joinServer(){
//     cmenu.style.top = window.innerHeight/2 + "px";
//     cmenu.style.left = 0;
//     cmenu.style.width = "100%";
//     cmenu.style.margin = "0 auto !important";
//     cmenu.innerHTML = `
//     <span style="text-align:center;padding:100px;margin:0 auto;">
//     server info
//     </span>
//     `;
//     cmenu.hidden = false;
// }



// map.on('zoomend', function() {
//     console.log(map.getZoom());
//     // var zoomlevel = map.getZoom();
//     //     if (zoomlevel  <10){
//     //         if (map.hasLayer(points)) {
//     //             map.removeLayer(points);
//     //         } else {
//     //             console.log("no point layer active");
//     //         }
//     //     }
//     //     if (zoomlevel >= 10){
//     //         if (map.hasLayer(points)){
//     //             console.log("layer already added");
//     //         } else {
//     //             map.addLayer(points);
//     //         }
//     //     }
//     // console.log("Current Zoom Level =" + zoomlevel)
// });


// var helloPopup = L.popup().setContent('Hello World!');

// L.easyButton('fa-globe', function(btn, map){
//     helloPopup.setLatLng(map.getCenter()).openOn(map);
//     console.log(map.getCenter());
// }).addTo( map );
// // =====
// L.easyButton("X", function(btn, map){
//     image.remove();
//     image = L.imageOverlay((hdMap === true ? "https://i.imgur.com/6T9UmkS.jpg" : imglink), bounds).addTo(map);

//     hdMap = !hdMap;

// }).addTo( map );






// L.easyButton({
//     states: [{
//             stateName: 'zoom-to-forest',        // name the state
//             icon:      'fa-tree',               // and define its properties
//             title:     'zoom to a forest',      // like its title
//             onClick: function(btn, map) {       // and its callback
//                 map.setView([46.25,-121.8],10);
//                 btn.state('zoom-to-school');    // change state on click!
//             }
//         }, {
//             stateName: 'zoom-to-school',
//             icon:      'fa-university',
//             title:     'zoom to a school',
//             onClick: function(btn, map) {
//                 map.setView([42.3748204,-71.1161913],16);
//                 btn.state('zoom-to-forest');
//             }
//     }]
// }).addTo( map );



// document.addEventListener('contextmenu', function(event) {
//     cmenu.style.top = event.y + "px";
//     cmenu.style.left = event.x + "px";
//     event.preventDefault();
//     cmenu.hidden = false;
// }, false);