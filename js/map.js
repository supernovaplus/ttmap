const emojiFolder = "./images/openmoji/";
// const numbersFolder = "./images/numbers/";
const mapFolder = "./images/maps/";
const customEmojiFolder = "./images/companyemoji/";
const isMobileDevice = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
const mapdiv = document.getElementById("map");
const cmenu = document.getElementById("cmenu");
const copyLink = window.location.protocol + "//" + window.location.host + "/";
var mapUpdatingPaused = false;
var hdMap = !isMobileDevice;
var imglink = (hdMap === true ? mapFolder+"map.jpg" : mapFolder+"mobilemap.jpg");

const params = {
    "hideplayers": new URL(location.href).searchParams.get("hideplayers") === "",
    "hideicons": new URL(location.href).searchParams.get("hideicons") === "",
    "coords": (()=>{
        let paramx = new URL(location.href).searchParams.get("x");
        let paramy = new URL(location.href).searchParams.get("y");
        if(!paramx || !paramy) return false;
        return [paramx,paramy];
    })()
}
console.log("params =>",JSON.stringify(params))

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

map.attributionControl.addAttribution("<a href='https://github.com/supernovaplus/'>Created by Nova+</a>")