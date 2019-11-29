const hud = document.getElementById("hud");
// let el = document.createElement("div")
// el.style.position = "fixed";
// el.style.top = "10px";
// el.style.left = "100px"
// el.style.zIndex = "1000"
// el.innerHTML = "<b>test</b>"
// mapdiv.append(el);

let findplayerdom = document.createElement("div")
findplayerdom.style.position = "fixed";
findplayerdom.style.top = "10px";
findplayerdom.style.left = "150px"
findplayerdom.style.zIndex = "9999"
findplayerdom.style.color = "black";
findplayerdom.style.margin = "0";
findplayerdom.style.padding = "0";
// findplayerdom.style.paddingLeft = "3px";
findplayerdom.innerHTML = `<input type='text' id="findplayerinputfield" placeholder="Find Player" style="padding-left:5px;padding-right:5px;"><input type="submit" value="Search" onclick="findplayer(this);return false;">`;
hud.append(findplayerdom);

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
        input.previousSibling.style.backgroundColor  = "red";
    }
    
}




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


var copyLinkUrls = "";
map.on('contextmenu', function(event){
    cmenu.style.top = event.originalEvent.y + "px";
    cmenu.style.left = event.originalEvent.x + "px";
    copyLinkUrls = `${copyLink}?x=${event.latlng.lat.toFixed(3)}&y=${event.latlng.lng.toFixed(3)}`;
    refreshLink();
    cmenu.hidden = false;
});


const copyLinkInputField = document.getElementById("copyLinkInputField");
const copyLinkCheckbox = document.getElementById("showPlayersCheck");

function refreshLink(){
    copyLinkInputField.value = copyLinkCheckbox.checked === true ? copyLinkUrls : copyLinkUrls + "&hideplayers";
    return;
}

map.on('click', function(event){
    cmenu.hidden = true;
});

map.on('drag', function(event){
    cmenu.hidden = true;
});




const serversSelection = document.createElement("div");
serversSelection.id = "serversSelection";
document.body.append(serversSelection);

const defaultServerSelectorState = (params["hideplayers"] === true ? "" : "checked");//"checked" //checked or "";

serversSelection.innerHTML=`
<div id="server-selector-header" onclick="test();return false;">Server Selection:</div>
${serversList.map(item=>`<div class="playersonlinerow"><input type="checkbox" class="servers" value="${item[0]}" data-server="${item[1]}" ${defaultServerSelectorState}> <span>${item[1]}</span> <span>-</span></div>`).join("")}
<button onclick="servers_checkall();return false;">Check All</button>
<br><button onclick="servers_checknone();return false;">Check None</button>
<br><br><button onclick="toggleNameTags();return false;">Toggle Name Tags</button>
<br><button onclick="toogleImageQuality(this);return false;">Toggle Map Quality<br>(${hdMap === true ? "Medium" : "Low"})</button>`;


const serversSelectionCheckboxes = document.getElementsByClassName("servers")
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


function servers_checkall(){
    for (const i of serversSelectionCheckboxes) {
        if(i.disabled === true)continue;
        i.checked = true;
    }
    // serversSelectionCheckboxes.forEach(element => {
    //     element.checked = true;
    // });
}

function servers_checknone(){
    for (const i of serversSelectionCheckboxes) {
        i.checked = false;
    }
}

function toogleImageQuality(dom){
    hdMap = !hdMap;
    dom.innerHTML = (hdMap === false ? "Toggle Map Quality<br>(Low)" : "Toggle Map Quality<br>(Medium)");
    
    image = L.imageOverlay(hdMap === true ? mapFolder+"map.jpg" : mapFolder+"mobilemap.jpg", bounds).addTo(map);
    // map.fitBounds(bounds);
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