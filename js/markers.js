const bussnessIcons = {
    "Business": `${customEmojiFolder}22px-Business_Owned.png`,
    "Watercraft Garage": `${customEmojiFolder}25px-Boat_Garage.png`,
    "Helicopter Garage": `${customEmojiFolder}25px-Helicopter_Garage.png`,
    "Aircraft Garage": `${customEmojiFolder}25px-Aircraft_Garage.png`,
    "Vehicle Garage": `${customEmojiFolder}25px-Garage.png`,
    "Car Garage": `${customEmojiFolder}25px-Garage.png`,
    "Self Storage": `${customEmojiFolder}22px-Self_Storage.png`,
    "point": `${customEmojiFolder}point22px.png`,
}

function createDataIcon (name){
    return L.icon({
        iconUrl: bussnessIcons[name],
        iconSize: [22, 23],
        iconAnchor: [11, 11.5],
        popupAnchor: [0, 0],
        className: "dataicon"
    });
}

const iconsList = [];
let allowIcons = params.hideicons ? false : true;
toggleIcons();

function toggleIcons(){
    if(!allowIcons){
        for (let i = 0; i < iconsList.length; i++) {
            map.removeLayer(iconsList[i]);
        }
        iconsList.length = 0;
    }else{
        drawIcons();
    }
    allowIcons = !allowIcons;
}

function drawIcons(){
    fetch("./data/bizBlips.json").then(res=>res.json()).then(res=>{//business markers
        for (const key in res) {
            const icon = L.marker([res[key].coordinates.y, res[key].coordinates.x],
                { icon:  createDataIcon("Business")})
            .bindPopup(`<div class="markerHead">Business</div>
            <b>Name:</b> ${res[key].name}<hr>
            <b>Price</b>: ${res[key].price}<hr>
            <b>Perks:</b><br>${res[key].perks.join("<br>")}<hr>
            <b>Payout:</b> ${res[key].payout}<br>
            <small>(in 24 hours / 8 stacks)</small>`);

            iconsList.push(icon);
            map.addLayer(icon);
        }
    })
    
    fetch("./data/garageBlips.json").then(res=>res.json()).then(res=>{
        for (const key in res) {
            const icon = L.marker(
                [res[key].coordinates.y,res[key].coordinates.x],
                { icon:  createDataIcon(res[key]["type"]) } 
            )
            .bindPopup(`<div class="markerHead">${res[key].type}</div>
            <b>Name:</b> ${res[key].name}<hr>
            <b>Spawns:</b> ${res[key].spawns}`)

            iconsList.push(icon);
            map.addLayer(icon);
        }
    })
    
    fetch("./data/ssBlips.json").then(res=>res.json()).then(res=>{
        for (const key in res) {
            const icon = L.marker(
                [res[key].coordinates.y,res[key].coordinates.x],
                { icon:  createDataIcon("Self Storage") } 
            )
            .bindPopup(`<div class="markerHead">Self Storage Unit</div>
            Name: <b>${res[key].name}</b><hr>
            Fee: <b>${res[key].fee}</b><hr>
            Capacity: <b>${res[key].capacity}</b>`);

            iconsList.push(icon);
            map.addLayer(icon);
        }
    })
}

if(params.coords !== false){
    L.marker([params.coords[1], params.coords[0]],{icon: createDataIcon("point")}).addTo(map)
    .bindTooltip('Location');

    map.flyTo([params.coords[1],params.coords[0]], -1, {
        animate: true,
        duration: .5
    });
}
