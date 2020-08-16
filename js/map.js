const emojiFolder = "./images/openmoji/";
// const numbersFolder = "./images/numbers/";
const mapFolder = "./images/maps/";
const customEmojiFolder = "./images/companyemoji/";
const isMobileDevice = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
const copyLink = window.location.protocol + "//" + window.location.host + "/";
var mapUpdatingPaused = false;
var hdMap = !isMobileDevice;
var imglink = (hdMap === true ? mapFolder+"map.jpg" : mapFolder+"mobilemap.jpg");

const mapDiv = cel("div", {id: "map"});
document.body.appendChild(mapDiv);

const params = {
    "hideplayers": new URL(location.href).searchParams.get("hideplayers") === "",
    "hideicons": new URL(location.href).searchParams.get("hideicons") === "",
    "coords": (()=>{
        let paramx = new URL(location.href).searchParams.get("x");
        let paramy = new URL(location.href).searchParams.get("y");
        return !paramx || !paramy ? false : [paramx,paramy];
    })()
};
console.log("params =>",JSON.stringify(params))

mapDiv.style.height = window.innerHeight+"px";
window.onresize = function(event) {
    mapDiv.style.height = window.innerHeight+"px";
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









//canvas

L.canvasLayer()
.delegate(this)
.addTo(map);

const randomColor = (colorNum, colors) => "hsl(" + (colorNum * (360 / (colors < 1 ? 1 : colors)) % 360) + ",100%,50%)";
const randomColor2 = () => randomColor(Math.floor(Math.random() * 999), 20);
var globalMapInfo;

function onDrawLayer(mapInfo) {
    redrawTheMap(mapInfo);
};

function redrawTheMap(mapInfo){
    if(globalMapInfo === undefined) globalMapInfo = mapInfo;
    const ctx = mapInfo.canvas.getContext('2d');
    ctx.clearRect(0, 0, mapInfo.canvas.width, mapInfo.canvas.height);
    if(currentTrailMode === 2) return;

    Object.keys(playerMarkers).forEach(playerid => {

        if(playerMarkers[playerid].nova.color === undefined) playerMarkers[playerid].nova.color = randomColor2();
        if(playerMarkers[playerid].nova.positions.length<1)return;

        playerMarkers[playerid].nova.positions.forEach((coords,index)=>{
            if(playerMarkers[playerid].nova.positions[index-1] === undefined)return;
            
            const prevLatLng = playerMarkers[playerid].nova.positions[index-1];
            const oldpos = mapInfo.layer._map.latLngToContainerPoint(prevLatLng)
            const newpos = mapInfo.layer._map.latLngToContainerPoint(coords)

            // console.log(`length: ${Math.abs(prevLatLng.lat - coords.lat)} / ${Math.abs(prevLatLng.lng - coords.lng)}`);
            // if(Math.abs(oldpos.x - newpos.x) > 150 && Math.abs(oldpos.y - newpos.y) > 150)return;
            if(Math.abs(prevLatLng.lat - coords.lat) > 500 && Math.abs(prevLatLng.lng - coords.lng) > 500)return;

            ctx.beginPath();
            
            // ctx.lineWidth = 0;
            ctx.fill();
            ctx.arc(newpos.x, newpos.y, .9, 0, 2 * Math.PI);

            ctx.moveTo(oldpos.x,oldpos.y);
            ctx.lineTo(newpos.x,newpos.y);
            ctx.lineWidth = "2.5";
            ctx.strokeStyle = "black";
            ctx.stroke();

            ctx.lineWidth = "2";
            ctx.strokeStyle = playerMarkers[playerid].nova.color;
            ctx.stroke();

            ctx.closePath();
        });
    });
}