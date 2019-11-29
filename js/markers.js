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

        // shadowUrl: '',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
    });
}




fetch("./data/bizBlips.json").then(res=>res.json()).then(res=>{
    for (const key in res) {
        L.marker([res[key].coordinates.y,res[key].coordinates.x],
            { icon:  createDataIcon("Business")})
        .addTo(map)
        .bindPopup(`<b>${res[key].name}</b><br>${res[key].description}`);
    }
})

// (\s+"description": "<b>Type:</b> )(.+)(<br/>.+)
// $1$2$3\n"type":"$2",
fetch("./data/garageBlips.json").then(res=>res.json()).then(res=>{
    for (const key in res) {
        L.marker(
            [res[key].coordinates.y,res[key].coordinates.x],
            { icon:  createDataIcon(res[key]["type"]) } 
        )
        .addTo(map)
        .bindPopup(`<b>${res[key].name}</b><br>${res[key].description}`)
    }
})

fetch("./data/ssBlips.json").then(res=>res.json()).then(res=>{
    for (const key in res) {
        L.marker(
            [res[key].coordinates.y,res[key].coordinates.x],
            { icon:  createDataIcon("Self Storage") } 
        )
        .addTo(map)
        .bindPopup(`<b>${res[key].name}</b><br>${res[key].description}`)
    }
})

if(params.coords !== false){
    L.marker(params.coords,{ icon:createDataIcon("point")}).addTo(map)
    .bindTooltip('Location');


    map.flyTo(params.coords, -1, {
        animate: true,
        duration: .5
    });
}


// var markers = [


// L.marker([100, 1500])
// .addTo(map)
// .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')


// ]

// let openedListObj;

// for (let i = 0; i < markers.length; i++) {
//     markers[i].openedManually = false;

//     markers[i].on('click', function (e) {
//         this.openPopup();
//         markers[i].openedManually = true;
//         openedListObj = this;
//     });
// }



// for (var i = 0; i < markers.length; i++) {

//     markers[i].on('mouseover', function (e) {
//         this.openPopup();
//     });

//     // markers[i].on('mouseout', function (e) {
//     //     if(this.openedManually === false){
//     //         this.closePopup();
//     //     }
//     // });
// }


// L.marker([100, 0],{ icon:  fontAwesomeIcon}).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
// =====
// const emojiList = document.getElementById('emoji-list');
// console.log(emojiList.children[0]);

// var pin = L.marker([0, 0],  L.divIcon({
//     html: '<i class="fa fa-map-marker fa-4x">test</i>',
//     iconSize: [20, 20],
//     className: 'myDivIcon'
// }))
// .addTo(map);


// L.marker([0, 0]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');
// console.log(emojiList);
// return;


// L.marker([-368.431, -1869.958])
// .addTo(map)
// .bindTooltip("-1869.958, -368.431", { permanent: true, offset: [0, 12] });
// L.marker([-1322.353, -1388.808])
// .addTo(map)
// .bindTooltip("-1388.808, -1322.353", { permanent: true, offset: [0, 12] });

// L.marker([0, 0])
// .addTo(map)
// .bindTooltip("0,0", { permanent: true, offset: [0, 12] });

// // =====
// L.marker([100, 1500])
// .addTo(map)
// .bindTooltip("text here", { permanent: true, offset: [0, 12] });



// let fa = L.marker({ lat: -2995.25, lng: -353.5 }, {icon: carIcon}).addTo(map)
// .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');
// fa.on("drag",(ev)=>{
//     ev.target._icon.style[L.DomUtil.TRANSFORM] = ` rotateZ(90 deg)`;
// })



// let c = L.marker({ lat: 0, lng: 0 }, {icon: carIconServer("1")}).addTo(map)
// // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
// // .bindTooltip("tool tip is bound");
// console.log("c",c);




// =====
//[y,x]

// L.marker([0, 0]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');

// L.marker([0, 0]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');

// L.marker([-1059.849, -1599.786]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');

//     L.marker([-3334.376,299.011]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');

//     L.marker([ 4602.949,1795.585]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');

    // map.on('click', ()=>{
    //     click
    // });
// =====






// L.marker([50.505, 30.57], {icon: 
//     L.icon({
//     iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
//     iconSize: [38, 95],
//     iconAnchor: [22, 94],
//     popupAnchor: [-3, -76],
//     // shadowUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
//     // shadowSize: [68, 95],
//     // shadowAnchor: [22, 94]
//     })}
// ).addTo(map)
// .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');







