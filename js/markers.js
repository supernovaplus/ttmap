//hud
create_sideblock_item('Toggle Makers', 
        ...Object.entries(markers_list).map(data => 
            ['img', assign_hud_hover_event({className: 'img-btn toggle-markers', src: data[1].link, _key: data[0], _title: data[1].title, _title: data[1].title, onclick: () => toggle_markers(data[0])})]
        ));

//-------------------------
refresh_toggle_markers_buttons();

function toggle_markers(key){
    if(options.markers[key]){
        markers_list[key].markers.forEach(marker => {
            map.removeLayer(marker);
        })
        options.markers[key] = false;
    }else{
        markers_list[key].markers.forEach(marker => {
            map.addLayer(marker);
        })
        options.markers[key] = true;
    }

    save_options();
    refresh_toggle_markers_buttons();
}

function refresh_toggle_markers_buttons(){
    for (const button of document.querySelectorAll(".toggle-markers")) {
        if(options.markers[button._key]){
            button.classList.add("selected");
        }else{
            button.classList.remove("selected");
        }
    }
}

function create_data_marker_icon(name){
    return L.icon({
        iconUrl: bussness_icons[name],
        iconSize: [22, 23],
        iconAnchor: [11, 11.5],
        popupAnchor: [0, 0],
        className: "dataicon"
    });
}

fetch("./data/bizBlips.json").then(res=>res.json()).then(res=>{//business markers
    for (const key in res) {
        const marker = L.marker(
            [res[key].coordinates.y, res[key].coordinates.x],
            { icon:  create_data_marker_icon("Business") }
        )
        .bindPopup(`<div class="popup-header green-bg">${res[key].name}</div>
        Type: Business<hr>
        Price: ${res[key].price}<hr>
        Perks:<br>${res[key].perks.join("<br>")}<hr>
        Payout: ${res[key].payout}<br>
        <small>(in 24 hours / 8 stacks)</small>`);

        markers_list.business.markers.push(marker);

        if(options.markers["business"]){
            map.addLayer(marker);
        }
    }
})

    
fetch("./data/garageBlips.json").then(res=>res.json()).then(res=>{
    for (const key in res) {
        const marker = L.marker(
            [res[key].coordinates.y, res[key].coordinates.x],
            { icon:  create_data_marker_icon(res[key]["type"]) } 
        )
        .bindPopup(`<div class="popup-header blue-bg">${res[key].name}</div>
        Type: ${res[key].type}<hr>
        Spawns: ${res[key].spawns}`)

        marker._name = res[key].name;

        markers_list.garages.markers.push(marker);

        if(options.markers["garages"]){
            map.addLayer(marker);
        }
    }
})

fetch("./data/ssBlips.json").then(res=>res.json()).then(res=>{
    for (const key in res) {
        const marker = L.marker(
            [res[key].coordinates.y, res[key].coordinates.x],
            { icon:  create_data_marker_icon("Self Storage") } 
        )
        .bindPopup(`<div class="popup-header blue-bg">${res[key].name}</div>
        Type: Self Storage Unit<hr>
        Fee: ${res[key].fee}<hr>
        Capacity: ${res[key].capacity}`);

        markers_list.self_storage.markers.push(marker);

        if(options.markers["self_storage"]){
            map.addLayer(marker);
        }
    }
})

if(params.coords){
    L.marker(
        [params.coords[1], params.coords[0]], 
        {icon: create_data_marker_icon("point")})
    .bindTooltip('Location')
    .addTo(map);

    map.flyTo([params.coords[1],params.coords[0]], -1, {
        animate: true,
        duration: .5
    });
}