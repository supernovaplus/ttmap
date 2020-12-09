const emoji_folder = "./images/openmoji/";
// const numbersFolder = "./images/numbers/";
const map_folder = "./images/maps/";
const custom_emoji_folder = "./images/companyemoji/";
const is_mobile_device = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
const copy_link_url = window.location.protocol + "//" + window.location.host + "/";

const params = {
    "hideplayers": new URL(location.href).searchParams.get("hideplayers") === "",
    "hideicons": new URL(location.href).searchParams.get("hideicons") === "",
    "plot_url": new URL(location.href).searchParams.get("plot_url") || false,
    "coords": (()=>{
        const paramx = new URL(location.href).searchParams.get("x");
        const paramy = new URL(location.href).searchParams.get("y");
        return !paramx || !paramy ? undefined : [paramx, paramy];
    })()
};

if(params.plot_url){
    params.hideplayers = true;
}

const options = {
    current_map_index: is_mobile_device ? 3 : 1,
    sidebar_open: true,
    current_trail_index: 1,
    timestamp: 0,

    markers: {
        "business": true,
        "garages": true,
        "self_storage": true
    }
};

const save_options = () => {
    options.timestamp = Date.now();
    localStorage.setItem("ttmap_options_1", JSON.stringify(options));
};

try{
    const options_from_storage =  localStorage.getItem("ttmap_options_1");
    if(options_from_storage){
        Object.assign(options, JSON.parse(options_from_storage));

        if(params.hideicons){
            for (const key in options.markers) {
                options.markers[key] = false;
            }
        }

        console.log("options", options);
    }
    save_options();
}catch(err){
    console.error(err);
};

const map_list = [
    { name: "Color HQ", link: map_folder + "map.jpg", bgcolor: "#0fa8d1", title: "Color Mode - High Quality" },
    { name: "Dark HQ", link: map_folder + "mapdark.jpg", bgcolor: "#171717", title: "Dark Mode - High Quality" },
    { name: "Color LQ ", link: map_folder + "mobilemap.jpg", bgcolor: "#0fa8d1", title: "Color Mode - Low Quality" },
    { name: "Dark LQ", link: map_folder + "mapdarkmobile.jpg", bgcolor: "#171717", title: "Dark Mode - Low Quality" },
];

const trail_modes = [
    { name: "LONG",     title: "100 points length"  },
    { name: "SHORT",    title: "5 points length"    },
    { name: "NONE",     title: "0 points length"    }
];

const markers_list = {
    "business": {
        title: 'Business', 
        link: './images/companyemoji/22px-Business_Owned.png',
        markers: []
    },
    "garages": {
        title: 'Garages', 
        link: './images/companyemoji/25px-Aircraft_Garage.png',
        markers: []
    },
    "self_storage": {
        title: 'Self Storages', 
        link: './images/companyemoji/22px-Self_Storage.png',
        markers: []
    },
}

const div_map = cel("div", {id: "map"});
document.body.appendChild(div_map);

div_map.style.height = window.innerHeight + "px";
window.onresize = () => {
    div_map.style.height = window.innerHeight + "px";
};

const map = L.map('map', {
    maxZoom: 2,
    minZoom: -4,
    zoomSnap: 0.25,
    crs: L.CRS.Simple,
    renderer: L.canvas(),
    zoomControl: false
});

L.control.zoom({
    position: 'topright'
}).addTo(map);

const map_bounds = [[-4664,-6310], [9000,7336]];
const map_overlay = L.imageOverlay(map_list[options.current_map_index].link, map_bounds).addTo(map);
map.fitBounds(map_bounds);
map.setView([2000,0], -3.5);