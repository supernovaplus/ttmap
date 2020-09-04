const menuDiv = cel("div", {id: "cmenu", hidden: true}, 
        ["b", {innerText: "Copy link to this position:"}], 
        ["br"],
        ["input", {type: "text", id: "copyLinkInputField", value: ""}],

        ["label", {for: "showPlayersCheck", innerText: "Show players:"}],
        ["input", {type: "checkbox", id: "showPlayersCheck", onclick: () => refreshLink()}],

        ["label", {for: "showPlayersCheck", innerText: "Show icons:"}],
        ["input", {type: "checkbox", id: "snowIconsCheck", onclick: () => refreshLink()}],
);
document.body.appendChild(menuDiv);

const creditsDiv = cel("div", {id: "credits", hidden: true});
document.body.appendChild(creditsDiv);

var players_showBoxes = true;
const tagStyle = cel(["style",{type: "text/css"}]);
document.head.append(tagStyle);

function create_gui_block(callback){
    map.addControl(new (L.Control.extend({
        options: {position: 'topleft'},
        onAdd: function(map) {
            return callback;
        }
    })));
}

//map options block
create_gui_block(cel(['div',['input', {type: 'button', value: 'Map Options', onclick: toggle_gui_block, className: 'toggleButton'}],['div', {className: 'divBlock', style: 'display: none;'}, 

    ['input', {type: 'button', className: 'btn', onclick: () => toggle_icons(), value: 'Toggle Markers'}],
    ['input', {type: 'button', className: 'btn', onclick: () => toggle_name_tags(), value: 'Toggle Name Tags', disabled: true}],
    ['input', {type: 'button', className: 'btn', onclick: (e) => toogle_image_quality(e.target), value: 'Toggle Map Quality \n' + (hdMap ? '(Medium)' : '(Low)')}],
    ['input', {type: 'button', className: 'btn', onclick: (e) => toggle_trail_mode(e.target), value: 'Toggle Trail Mode \n (Short Snake)'}],
]]));



function createServersListBlock(){
    //player finder block
    create_gui_block(cel(['div',['input', {type: 'button', value: 'Find Player', onclick: toggle_gui_block, className: 'toggleButton'}],['div', {className: 'divBlock', style: 'display: none;'}, 
    ['input', {type: 'text', id: 'findplayerinputfield', placeholder: 'Enter player\'s ID or name'}],
    ['input', {type: 'button', value: 'Find', onclick: (e) => findplayer(e.target)}],
    ]]));

    document.getElementById('findplayerinputfield').addEventListener("keydown", e => {
        if(!e) e = window.event;
        let keyCode = e.keyCode || e.which;
        if(keyCode === 13){
            findplayer(e.target.nextSibling);
            return false;
        }
    })

    create_gui_block(cel(['div',['input', {type: 'button', value: 'Servers', onclick: toggle_gui_block, className: 'toggleButton'}],['div', {className: 'divBlock', style: 'display: none;'}, 
        ['div', {id: 'servers'}],
        ['input', {type: 'button', className: 'btn', onclick: (e) => {
            e.target.disabled = true;
            setTimeout(() => {
                e.target.disabled = false;
            }, 6000);
            servers_check_all()
        }, value: 'Check All'}],
        ['br'],
        ['input', {type: 'button', className: 'btn', onclick: (e) => {
            e.target.disabled = true;
            setTimeout(() => {
                e.target.disabled = false;
            }, 6000);
            servers_uncheck_all()
        }, value: 'Uncheck All\n(Hide Players)'}]
    ]]));
}

function toggle_gui_block(el) {
    el.target.nextElementSibling.style.display = (el.target.nextElementSibling.style.display === "none" ? "block" : "none");
}


function findplayer(input){
    if(!input.previousSibling.value) return;
    const search_for = String(input.previousSibling.value).toLowerCase();
    let found;

    for (const server_id in nova_servers) {
        if(found) break;
        if(!nova_servers[server_id].disabled){
            for (const player_id in nova_servers[server_id]['players']) {
                if(String(nova_servers[server_id]['players'][player_id]['gameid']).toLowerCase().includes(search_for)){
                    found = nova_servers[server_id]['players'][player_id];
                    break;
                }
            }
        }
    }

    if(found){
        input.previousSibling.style.backgroundColor = "lime";
        
        map.flyTo(found.marker._latlng, -1, {
            animate: true,
            duration: .5
        });
        setTimeout(() => {
            found.marker.openPopup();
        }, 100);

        // found._popup.openOn(map)
        return false;
    }else{
        input.previousSibling.style.backgroundColor = "red";
    }
}

var copyLinkUrl = "";
map.on('contextmenu', function(event){
    menuDiv.style.top = event.originalEvent.y + "px";
    menuDiv.style.left = event.originalEvent.x + "px";
    copyLinkUrl = `${copyLink}?x=${event.latlng.lng.toFixed(3)}&y=${event.latlng.lat.toFixed(3)}`;
    refreshLink();
    menuDiv.hidden = false;
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
    menuDiv.hidden = true;
});

map.on('drag', function(){
    menuDiv.hidden = true;
});

function toggle_name_tags(){
    tagStyle.innerHTML = ( players_showBoxes === false ? 
                            ".leaflet-tooltip-top{display:block};" : 
                            ".leaflet-tooltip-top{display:none};" );
    players_showBoxes = !players_showBoxes;
}

function toogle_image_quality(target){
    hdMap = !hdMap;
    target.value = (hdMap === false ? "Toggle Map Quality\n(Low)" : "Toggle Map Quality\n(Medium)");
    image = L.imageOverlay(hdMap === true ? mapFolder+"map.jpg" : mapFolder+"mobilemap.jpg", bounds).addTo(map);
    // map.fitBounds(bounds);
}

function toggle_trail_mode(target){
    if(currentTrailMode === 0){
        target.value = "Toggle Trail Mode\n(Long Snake)";

    }else if(currentTrailMode === 1){
        target.value = "Toggle Trail Mode\n(Off)";

    }else{
        target.value = "Toggle Trail Mode\n(Short Snake)";
        currentTrailMode = 0;
        return;
    }
    currentTrailMode++;
}


fetch("./data/credits.txt").then(res=>res.text()).then(res=>{
    credits.appendChild(cel(["p", {innerText: res}]));
    credits.appendChild(cel(["div", {innerText: "Download the map: "},
            ["a", {href:"https://raw.githubusercontent.com/supernovaplus/ttmap/master/images/maps/map.jpg", innerText:"HD map (4000x4000)", target: "blank"}],
            ["a", {href:"https://raw.githubusercontent.com/supernovaplus/ttmap/master/images/maps/mobilemap.jpg", innerText:"Mobile map (2000x2000)", target: "blank"}]]));
    credits.appendChild(cel(["input",{type:"button", value:"close", onclick:show_credits}]));
})

function show_credits(){
    credits.hidden = !credits.hidden;
}

map.attributionControl.addAttribution(`<a href="#" onclick="show_credits(); return;">CREDITS | Download Map</a>`)