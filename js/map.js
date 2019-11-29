const emojiFolder = "./images/openmoji/";
// const numbersFolder = "./images/numbers/";
const mapFolder = "./images/maps/";
const customEmojiFolder = "./images/companyemoji/";

var serversList = [
    ["server.tycoon.community:30120","Server #1"],
    ["server.tycoon.community:30122","Server #2"],
    ["server.tycoon.community:30123","Server #3"],
    ["server.tycoon.community:30124","Server #4"],
    ["server.tycoon.community:30125","Server #5 (Beta)"],
    ["na.tycoon.community:30120","Server #6"],
    ["na.tycoon.community:30122","Server #7"],
    ["na.tycoon.community:30123","Server #8"],
    ["na.tycoon.community:30124","Server #9"],
    ["na.tycoon.community:30125","Server #A"]
]

const isMobileDevice = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);

// console.log("mykey",new URL(location.href).searchParams.get("my_key"))
// console.log("mykey2s",new URL(location.href).searchParams.get("my_key2"))

var hdMap = !isMobileDevice;
var imglink = (hdMap === true ? mapFolder+"map.jpg" : mapFolder+"mobilemap.jpg");

const mapdiv = document.getElementById("map");
const cmenu = document.getElementById("cmenu");

mapdiv.style.height = window.innerHeight+"px";
window.onresize = function(event) {
    mapdiv.style.height = window.innerHeight+"px";
};


var map = L.map('map', {
    maxZoom: 2,
    minZoom: -4,
    zoomSnap: 0.25,
    crs: L.CRS.Simple//,
    //renderer: L.canvas()
});

var bounds = [[-4642,-6296],[8958,7318]];
var image = L.imageOverlay(imglink, bounds).addTo(map);
map.fitBounds(bounds);
map.setView([2000,0],-3.5);




// setTimeout(() => {
//     map.eachLayer(function (layer) { 
//         console.log(layer);
//     });
// }, 1000);

// fetch("./bussnessbonus2.json").then(res=>res.json()).then(res=>{
//     res[1].forEach(element => {
//         console.log(element[0])
//     });
// })

