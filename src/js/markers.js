const business_icons = {
    "Business": `${company_emoji_folder}22px-Business_Owned.png`,
    "Watercraft Garage": `${company_emoji_folder}25px-Boat_Garage.png`,
    "Helicopter Garage": `${company_emoji_folder}25px-Helicopter_Garage.png`,
    "Aircraft Garage": `${company_emoji_folder}25px-Aircraft_Garage.png`,
    "Vehicle Garage": `${company_emoji_folder}25px-Garage.png`,
    "Car Garage": `${company_emoji_folder}25px-Garage.png`,
    "Self Storage": `${company_emoji_folder}22px-Self_Storage.png`,
    "House": `${company_emoji_folder}22px-House.png`,
    "Exp": `${company_emoji_folder}22px-exp.png`,
    "Custom Point": `${company_emoji_folder}point22px.png`,
}

const static_markers_list = {
    "business": {
        title: 'Businesses', 
        image: business_icons["Business"],
        markers: []
    },
    "garages": {
        title: 'Garages', 
        image: business_icons["Vehicle Garage"],
        markers: []
    },
    "self_storage": {
        title: 'Self Storages', 
        image: business_icons["Self Storage"],
        markers: []
    },
    "houses": {
        title: 'Houses', 
        image: business_icons["House"],
        markers: []
    },
    "expmap": {
        title: 'EXP Pickup Locations', 
        image: business_icons["Exp"],
        markers: []
    },
}

//hud
create_sideblock_item('Toggle Makers', 
        ...Object.entries(static_markers_list).map(data => 
            ['img', assign_hud_hover_event({className: 'img-btn toggle-markers', src: data[1].image, _key: data[0], _title: data[1].title, _title: data[1].title, onclick: () => toggle_markers(data[0])})]
        ));

//-------------------------
refresh_toggle_markers_buttons();

function toggle_markers(key){
    if(options.markers[key]){
        static_markers_list[key].markers.forEach(marker => {
            window.mainMap.removeLayer(marker);
        })
        options.markers[key] = false;
    }else{
        static_markers_list[key].markers.forEach(marker => {
            window.mainMap.addLayer(marker);
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
        iconUrl: business_icons[name],
        iconSize: [22, 23],
        iconAnchor: [11, 11.5],
        popupAnchor: [0, 0],
        className: "dataicon"
    });
};

fetch(base_folder + "data/bizBlips.json").then(res=>res.json()).then(res=>{//business markers
    for (const key in res) {
        const marker = L.marker(
            [res[key].coordinates.x, res[key].coordinates.y],
            { icon:  create_data_marker_icon("Business") }
        ).bindPopup(`<div class="popup-header green-bg">${res[key].name}</div>
        Type: Business<hr>
        Price: ${res[key].price}<hr>
        Perks:<br>${res[key].perks.join("<br>")}<hr>
        Payout: ${res[key].payout}<br>
        <small>(in 24 hours / 8 stacks)</small>`);

        static_markers_list.business.markers.push(marker);
        if(options.markers["business"]) window.mainMap.addLayer(marker);
    };
});

    
fetch(base_folder + "data/garageBlips.json").then(res=>res.json()).then(res=>{
    for (const key in res) {
        const marker = L.marker(
            [res[key].coordinates.x, res[key].coordinates.y],
            { icon:  create_data_marker_icon(res[key]["type"]) } 
        ).bindPopup(`<div class="popup-header blue-bg">${res[key].name}</div>
        Type: ${res[key].type}<hr>
        Spawns: ${res[key].spawns}`)

        marker._name = res[key].name;
        static_markers_list.garages.markers.push(marker);
        if(options.markers["garages"]) window.mainMap.addLayer(marker);
    };
});

fetch(base_folder + "data/ssBlips.json").then(res=>res.json()).then(res=>{
    for (const key in res) {
        const marker = L.marker(
            [res[key].coordinates.x, res[key].coordinates.y],
            { icon:  create_data_marker_icon("Self Storage") } 
        ).bindPopup(`<div class="popup-header blue-bg">${res[key].name}</div>
        Type: Self Storage Unit<hr>
        Fee: ${res[key].fee}<hr>
        Capacity: ${res[key].capacity}`);

        static_markers_list.self_storage.markers.push(marker);
        if(options.markers["self_storage"]) window.mainMap.addLayer(marker);
    };
});


fetch(base_folder + "data/houses.json").then(res=>res.json()).then(res=>{
    res.data.forEach(house => {
        const marker = L.marker(
            [house.position.x, house.position.y],
            { icon:  create_data_marker_icon("House") } 
        ).bindPopup(`<div class="popup-header blue-white">${house.name}</div>
        Buy Price: $${Number(house.buy_price).toLocaleString()}<br>
        Sell Price: $${Number(house.sell_price).toLocaleString()}`);

        static_markers_list.houses.markers.push(marker);
        if(options.markers["houses"]) window.mainMap.addLayer(marker);
    });
});

fetch(base_folder + "data/expmap.json").then(res=>res.json()).then(data => {
    data.forEach(([x, y, z, str, dis]) => {
        const marker = L.circle([x, y], {radius: 5, color: 'red', fill: false})
            .bindPopup(`<div class="popup-header" style="background-color: orange;">EXP Pickup</div>${str} | ${dis}`);

        static_markers_list.expmap.markers.push(marker);
        if(options.markers["expmap"]) window.mainMap.addLayer(marker);
    });
});

if(params.coords){
    L.marker(
        params.coords, 
        {icon: create_data_marker_icon("Custom Point")})
    .bindTooltip('Location')
    .addTo(window.mainMap);

    window.mainMap.flyTo(params.coords, 6, {
        animate: true,
        duration: .5
    });
}
