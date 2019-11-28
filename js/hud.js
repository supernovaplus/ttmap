// let el = document.createElement("div")
// el.style.position = "fixed";
// el.style.top = "10px";
// el.style.left = "100px"
// el.style.zIndex = "1000"
// el.innerHTML = "<b>test</b>"
// mapdiv.append(el);

// let el2 = document.createElement("div")
// el2.style.position = "fixed";
// el2.style.top = "10px";
// el2.style.left = "150px"
// el2.style.zIndex = "1200"
// el2.innerHTML = "<input type='text'>";
// mapdiv.append(el2);



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

map.on('contextmenu', function(event){
    // x: ${event.latlng.lat}<br>y:${event.latlng.lng}
    cmenu.style.top = event.originalEvent.y + "px";
    cmenu.style.left = event.originalEvent.x + "px";
    cmenu.innerHTML = `
    <ul>
    <li>{ lat: ${event.latlng.lat}, lng: ${event.latlng.lng} }</li>
    </ul> 
    `;
    cmenu.hidden = false;
});

map.on('click', function(event){
    cmenu.hidden = true;
});

map.on('drag', function(event){
    cmenu.hidden = true;
});

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



const serversSelection = document.createElement("div");
serversSelection.id = "serversSelection";
document.body.append(serversSelection);

serversSelection.innerHTML=`
<div id="server-selector-header" onclick="test();return false;">Server Selection:</div>
${serversList.map(item=>`<div class="playersonlinerow"><input type="checkbox" class="servers" value="${item[0]}" data-server="${item[1]}" checked> <span>${item[1]}</span> <span>-</span></div>`).join("")}
<button onclick="servers_checkall();return false;">Check All</button>
<br><button onclick="servers_checknone();return false;">Check None</button>
<br><br><button onclick="toggleNameTags();return false;">Toggle Name Tags</button>
<br><button onclick="toogleImageQuality(this);return false;">Toggle Image Quality<br>(${hdMap === true ? "Medium" : "Low"})</button>`;


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
    dom.innerHTML = (hdMap === false ? "Toggle Image Quality<br>(Low)" : "Toggle Image Quality<br>(Medium)");
    
    image = L.imageOverlay(hdMap === true ? mapFolder+"map.jpg" : mapFolder+"mobilemap.jpg", bounds).addTo(map);
    // map.fitBounds(bounds);
}




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