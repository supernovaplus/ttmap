const emojiFolder = "./images/openmoji/";
// const numbersFolder = "./images/numbers/";
const mapFolder = "./images/maps/";

var serversList = [
    ["145.239.150.71:30120","Server #1"],
    ["145.239.150.71:30122","Server #2"],
    ["145.239.150.71:30123","Server #3"],
    ["145.239.150.71:30124","Server #4"],
    ["145.239.150.71:30125","Server #5 (Beta)"],
    ["54.37.88.125:30120","Server #6"],
    ["54.37.88.125:30122","Server #7"],
    ["54.37.88.125:30123","Server #8"],
    ["54.37.88.125:30124","Server #9"],
    ["54.37.88.125:30125","Server #A"]
]

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

var hdMap = true;
var imglink = (isMobileDevice() === false ? mapFolder+"map.jpg" : mapFolder+"mobilemap.jpg");

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

