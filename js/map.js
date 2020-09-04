const emojiFolder = "./images/openmoji/";
// const numbersFolder = "./images/numbers/";
const mapFolder = "./images/maps/";
const customEmojiFolder = "./images/companyemoji/";
const isMobileDevice = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
const copyLink = window.location.protocol + "//" + window.location.host + "/";
var mapUpdatingPaused = false;
var hdMap = !isMobileDevice;
var imglink = mapFolder + (hdMap === true ? "map.jpg" : "mobilemap.jpg");
var currentTrailMode = 0;

const mapDiv = cel("div", {id: "map"});
document.body.appendChild(mapDiv);

const params = {
    "hideplayers": new URL(location.href).searchParams.get("hideplayers") === "",
    "hideicons": new URL(location.href).searchParams.get("hideicons") === "",
    "coords": (()=>{
        const paramx = new URL(location.href).searchParams.get("x");
        const paramy = new URL(location.href).searchParams.get("y");
        return !paramx || !paramy ? false : [paramx, paramy];
    })()
};

// console.log("params =>",JSON.stringify(params))

mapDiv.style.height = window.innerHeight+"px";
window.onresize = function() {
    mapDiv.style.height = window.innerHeight+"px";
};

const map = L.map('map', {
    maxZoom: 2,
    minZoom: -4,
    zoomSnap: 0.25,
    crs: L.CRS.Simple,
    renderer: L.canvas()
});

// var bounds = [[-4642,-6296],[8958,7318]]; //og
var bounds = [[-4664,-6310],[9000,7336]];
L.imageOverlay(imglink, bounds).addTo(map);
map.fitBounds(bounds);
map.setView([2000,0],-3.5);