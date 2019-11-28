
// =====
// var LCANVAS = new L.canvas();
// map._addLayers(LCANVAS);


// map.on("load",()=>{
    
//     let ctx2 = LCANVAS._ctx
//     ctx2.fillRect(20, 20, 150, 100);
//     let lalala;
//     setTimeout(() => {
//         lalala = ctx2.fillRect(20, 20, 150, 100);
//         console.log(lalala)
//         setTimeout(() => {
//         console.log(lalala)
//         }, 2000);
//     }, 1000);


    
//     console.log("ctx2",ctx2)
//     LCANVAS._container.style.zIndex = 9999;
//     console.log("map",map._layers)
// })
// =====
// for (const key in LCANVAS) {
//     console.log(key)
// }
// const LCANVAS_CTX = LCANVAS._ctx.getContext("2d");



// let canvas = document.createElement("canvas");
// canvas.style.position = 'absolute';

// canvas.style.top = 0;
// canvas.style.left = 0;
// canvas.style.pointerEvents = "none";
// canvas.style.zIndex = 500;
// canvas.setAttribute("class","leaflet-proxy leaflet-zoom-animated")

// let ctx = canvas.getContext("2d");
// ctx.beginPath();
// ctx.rect(20, 20, 150, 100);
// ctx.stroke();

// mapdiv.append(canvas);


//==========

//====
// let mapaf = document.querySelector("leaflet-pane leaflet-map-pane")
//====
// let elem = mapdiv.childNodes[1]
// map.on('drag', function(event) { 
//     // let ogpos1 = canvas.style.top;
//     // let ogpos2 = canvas.style.left;
//     // canvas.style.position = "fixed";
//     // canvas.style.top = ogpos1+event["originalEvent"]["clientY"]+"px";
//     // canvas.style.left = ogpos2+event["originalEvent"]["clientX"]+"px";
//     canvas.style.transform = elem.style.transform;

//     canvas.style.zIndex = 9999;
//     // canvas.style = mapdiv.lastChild.style;
//     // canvas.style.position = "fixed";
//     //console.log(canvas.style = map._container.style)
// });
//====

//==========

// var shelter1 = L.marker([55.08, 11.62], {icon: shelterIcon});

// var shelterMarkers = new L.FeatureGroup();

// shelterMarkers.addLayer(shelter1);

// map.on('zoomend', function() {
//     if (map.getZoom() <7){
//             map.removeLayer(shelterMarkers);
//     }
//     else {
//             map.addLayer(shelterMarkers);
//         }
// });

//==========


// //for aligning the map

// document.onkeydown = checkKey;

// let move = 2;
// function checkKey(e) {

//     e = e || window.event;

//     if (e.keyCode == '87') {
//         bounds[0][0] -= move; 
//     }
//     else if (e.keyCode == '68') {
//         bounds[0][1] -= move; 
//     }
//     else if (e.keyCode == '83') {
//         bounds[1][0] -= move; 
//     }
//     else if (e.keyCode == '65') {
//         bounds[1][1] -= move; 
//     }


//     if (e.keyCode == '104') {
//         bounds[0][0] += move; 
//     }
//     else if (e.keyCode == '102') {
//         bounds[0][1] += move; 
//     }
//     else if (e.keyCode == '101') {
//         bounds[1][0] += move; 
//     }
//     else if (e.keyCode == '100') {
//         bounds[1][1] += move; 
//     }

//     image.remove();
//     image = L.imageOverlay(imglink, bounds).addTo(map);
//     bounds = [[Number(val[0]),Number(val[1])],[Number(val[2]),Number(val[3])]]
//     map.fitBounds(bounds);
// }