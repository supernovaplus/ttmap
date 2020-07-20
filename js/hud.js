const hud = document.getElementById("hud");
const credits = document.getElementById("credits")
var serversSelectionCheckboxes;
var players_showBoxes = true;
const tagStyle = cel(["style",{type: "text/css"}]);
document.head.append(tagStyle);

function createGUIblock(callback){
    map.addControl(new (L.Control.extend({
        options: {position: 'topleft'},
        onAdd: function(map) {
            // const inputDiv = L.DomUtil.create('input');
            return callback(L.DomUtil.create("div"));
        }
    })));
}

function createServersListBlock(serversList){

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
}

createGUIblock(DIVBLOCK=>{
    DIVBLOCK.innerHTML=`
    <input type="button" value="Map Options" onclick="toggleGUIblock(this);return;" class="toggleButton">
    <div class="divBlock">
        <button onclick="toggleIcons(this);return false;">Toggle Icons</button>
        <br><button onclick="toggleNameTags();return false;">Toggle Name Tags</button>
        <br><button onclick="toogleImageQuality(this);return false;">Toggle Map Quality<br>(${hdMap === true ? "Medium" : "Low"})</button>
        <br><button onclick="toggleTrailMode(this);return false;">Toggle Trail Mode<br>(Short Snake)</button>
    </div> `;

    toggleGUIblock(DIVBLOCK.children[0])

    return DIVBLOCK;
});

createGUIblock(DIVBLOCK=>{

    DIVBLOCK.innerHTML = `
    <input type="button" value="Find Player" onclick="toggleGUIblock(this);return;" class="toggleButton">
    <div class="divBlock">
        <input type='text' id="findplayerinputfield" placeholder="enter player's id or name">
        <input type="submit" value="Find" onclick="findplayer(this);return false;">
    </div>
    `;

    toggleGUIblock(DIVBLOCK.children[0])

    return DIVBLOCK;
});

if(location.protocol !== "http:"){

    createGUIblock(DIVBLOCK=>{

        DIVBLOCK.innerHTML = `
        <input type="button" value="Warning" onclick="toggleGUIblock(this);return;" class="toggleButton">
        <div class="divBlock" style="max-width: 300px;padding: 3px;margin: 3px;">
            <p>WARNING: You are using HTTPS site, we can't communicate with TT using HTTPS, you have to switch to HTTP protocol <a href="http://ttmap.online"><span style="color:red">http://ttmap.online</span></a>. If that doesn't work you probably using some HTTPS everywhere addon.</p>
        </div>
        `;
    
        // toggleGUIblock(DIVBLOCK.children[0])
    
        return DIVBLOCK;
    });

}

function toggleGUIblock (el) {
    el.nextElementSibling.style.display = (el.nextElementSibling.style.display === "none" ? "block" : "none");
}

document.getElementById('findplayerinputfield').addEventListener("keydown", e => {
    if (!e) e = window.event;
    let keyCode = e.keyCode || e.which;
    if (keyCode === 13){
        findplayer(e.target.nextSibling);
        return false;
    }else{
        // e.target.style.backgroundColor = "white";
    }
})

// document.getElementById('findplayerinputfield').onkeypress = function(e){

// }

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
const showPlayersCheck = document.getElementById("showPlayersCheck");
const showIconsCheck = document.getElementById("snowIconsCheck");

function refreshLink(){
    copyLinkInputField.value = copyLinkUrl + 
                                (showPlayersCheck.checked === true ? "" : "&hideplayers") + 
                                (showIconsCheck.checked === true ? "" : "&hideicons");
    return;
}

map.on('click', function(){
    cmenu.hidden = true;
});

map.on('drag', function(){
    cmenu.hidden = true;
});



function toggleNameTags(){
    tagStyle.innerHTML = ( players_showBoxes === false ? 
        ".leaflet-tooltip-top{display:block};" : 
        ".leaflet-tooltip-top{display:none};" );

    players_showBoxes = !players_showBoxes;
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
        dom.innerText = "Toggle Trail Mode\n(Long Snake)";

    }else if(currentTrailMode === 1){
        dom.innerText = "Toggle Trail Mode\n(Off)";

    }else{
        dom.innerText = "Toggle Trail Mode\n(Short Snake)";
        currentTrailMode = 0;
        return;
    }
    currentTrailMode++;
}


fetch("./credits.txt").then(res=>res.text()).then(res=>{
    credits.appendChild(cel(["p",{innerText: res}]));
    credits.appendChild(cel(["div",{innerText: "Download map: "},
            ["a",{href:"https://raw.githubusercontent.com/supernovaplus/ttmap/master/images/maps/map.jpg", innerText:"HD map (4000x4000)", target: "blank"}],
            ["a",{href:"https://raw.githubusercontent.com/supernovaplus/ttmap/master/images/maps/mobilemap.jpg", innerText:"Mobile map (2000x2000)", target: "blank"}]]));
    credits.appendChild(cel(["input",{type:"button",value:"close",onclick:showCredits}]));
})

function showCredits(){
    credits.hidden = !credits.hidden;
}

map.attributionControl.addAttribution(`<a href="#" onclick="showCredits();return;">CREDITS | Download Map</a>`)