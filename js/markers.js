function create_data_marker(name){
    return L.icon({
        iconUrl: bussness_icons[name],
        iconSize: [22, 23],
        iconAnchor: [11, 11.5],
        popupAnchor: [0, 0],
        className: "dataicon"
    });
}

const icons_list = [];
let allow_icons = params.hideicons ? false : true;
toggle_icons();

function toggle_icons(){
    if(!allow_icons){
        for (let i = 0; i < icons_list.length; i++) {
            map.removeLayer(icons_list[i]);
        }
        icons_list.length = 0;
    }else{
        drawIcons();
    }
    allow_icons = !allow_icons;
}

function drawIcons(){
    fetch("./data/bizBlips.json").then(res=>res.json()).then(res=>{//business markers
        for (const key in res) {
            const icon = L.marker([res[key].coordinates.y, res[key].coordinates.x],
                { icon:  create_data_marker("Business")})
            .bindPopup(`<div class="markerHead">Business</div>
            <b>Name:</b> ${res[key].name}<hr>
            <b>Price</b>: ${res[key].price}<hr>
            <b>Perks:</b><br>${res[key].perks.join("<br>")}<hr>
            <b>Payout:</b> ${res[key].payout}<br>
            <small>(in 24 hours / 8 stacks)</small>`);

            icons_list.push(icon);
            map.addLayer(icon);
        }
    })
    
    fetch("./data/garageBlips.json").then(res=>res.json()).then(res=>{
        for (const key in res) {
            const icon = L.marker(
                [res[key].coordinates.y,res[key].coordinates.x],
                { icon:  create_data_marker(res[key]["type"]) } 
            )
            .bindPopup(`<div class="markerHead">${res[key].type}</div>
            <b>Name:</b> ${res[key].name}<hr>
            <b>Spawns:</b> ${res[key].spawns}`)

            icons_list.push(icon);
            map.addLayer(icon);
        }
    })
    
    fetch("./data/ssBlips.json").then(res=>res.json()).then(res=>{
        for (const key in res) {
            const icon = L.marker(
                [res[key].coordinates.y,res[key].coordinates.x],
                { icon:  create_data_marker("Self Storage") } 
            )
            .bindPopup(`<div class="markerHead">Self Storage Unit</div>
            Name: <b>${res[key].name}</b><hr>
            Fee: <b>${res[key].fee}</b><hr>
            Capacity: <b>${res[key].capacity}</b>`);

            icons_list.push(icon);
            map.addLayer(icon);
        }
    })
}

if(params.coords !== false){
    L.marker([params.coords[1], params.coords[0]], {icon: create_data_marker("point")}).addTo(map)
    .bindTooltip('Location');

    map.flyTo([params.coords[1],params.coords[0]], -1, {
        animate: true,
        duration: .5
    });
}

