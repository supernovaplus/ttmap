const base_folder = is_dev_environment ? "../" : "./";
const emoji_folder = base_folder + "images/openmoji/";
const map_folder = base_folder + "images/maps/";
const company_emoji_folder = base_folder + "images/companyemoji/";
const custom_emoji_folder = base_folder + "images/custom/";

const is_mobile_device =
  typeof window.orientation !== "undefined" ||
  navigator.userAgent.indexOf("IEMobile") !== -1;
let copy_link_url =
  window.location.protocol + "//" + window.location.host + "/";

const params = {
  hideplayers: new URL(location.href).searchParams.get("hideplayers") === "",
  hideicons: new URL(location.href).searchParams.get("hideicons") === "",
  alwaysactive: new URL(location.href).searchParams.get("alwaysactive") === "",
  expmap: new URL(location.href).searchParams.get("expmap") === "",
  //"plot_url": new URL(location.href).searchParams.get("plot_url") || false,
  coords: (() => {
    const paramx = new URL(location.href).searchParams.get("x");
    const paramy = new URL(location.href).searchParams.get("y");
    return !paramx || !paramy ? undefined : [paramx, paramy];
  })(),
};

if (localStorage.getItem("ttmap_options_1")) {
  localStorage.removeItem("ttmap_options_1");
}

window.lastCoords = [0, 0]; //for tt remote

// if(params.plot_url){
//     params.hideplayers = true;
// }

const max_inactivity_time_in_minutes = 30;

const options = {
  current_map_index: 1,
  sidebar_open: true,
  current_trail_index: 4,
  // current_trail_index: is_mobile_device ? 3 : 2,
  current_animation_speed_index: 0,
  timestamp: 0,

  markers: {
    //marker defaults
    business: true,
    garages: true,
    self_storage: true,
    houses: true,
    expmap: false,
    easteregg_weapons: isHalloweenEvent() //default on when event is active
  },
};

let currentTileLayer = null;

const save_options = () => {
  options.timestamp = Date.now();
  localStorage.setItem("ttmap_options_3", JSON.stringify(options));
};

try {
  const options_from_storage = localStorage.getItem("ttmap_options_3");
  if (options_from_storage) {
    Object.assign(options, JSON.parse(options_from_storage));

    if (params.hideicons) {
      for (const key in options.markers) {
        options.markers[key] = false;
      }
    }

    if (params.expmap) {
      options.markers["expmap"] = true;
    }

  }
  save_options(); //resave in case a new option came from query params
} catch (err) {
  console.error(err);
}

const div_map = cel("div", { id: "map" });
document.body.appendChild(div_map);

div_map.style.height = window.innerHeight + "px";
window.onresize = () => {
  div_map.style.height = window.innerHeight + "px";
};

L.CRS.Kebab = L.extend({}, L.CRS.Simple, {
  projection: {
    project: (latlng) => new L.Point(latlng.lat, latlng.lng), //reverse lat/lng for easier passing of x/y
    unproject: (point) => new L.LatLng(point.x, point.y),
    bounds: new L.Bounds([-180, -90], [180, 90]),
  },
  transformation: new L.Transformation(
    0.005175, //scale-x
    34.38, //shift-x
    -0.005173, //scale-y
    46.79355 //shift-y
  ),
});

window.mainMap = L.map("map", {
  renderer: L.canvas(),
  zoomControl: false,
  // zooms: [2,3,4,5,6,7,8,9],
  zooms: [2, 3, 4, 5, 6, 7, 8],
  minZoom: 2,
  maxZoom: 8,
  // zoomSnap: 1,
  fadeAnimation: true,
  zoomAnimation: true,
  crs: L.CRS.Kebab,
}).setView([0, 0], 5);

const map_list = [
  {
    name: "Color Mode",
    bgcolor: "#0fa8d1",
    tileLayer: L.tileLayer(
      base_folder + "images/maps/color-mode-tiles/{z}_{x}_{y}.jpg",
      {
        tileSize: 288,
        nativeZooms: [3, 4, 5, 6, 7],
        noWrap: true,
        bounds: [
          { lat: -6566, lng: -4735 },
          { lat: 7166, lng: 8906 },
        ],
        reuseTiles: true,
      }
    ),
  },
  {
    name: "Dark Mode",
    bgcolor: "#171717",
    tileLayer: L.tileLayer(
      base_folder + "images/maps/dark-mode-tiles/{z}_{x}_{y}.jpg",
      {
        tileSize: 288,
        nativeZooms: [3, 4, 5, 6, 7],
        noWrap: true,
        bounds: [
          { lat: -6566, lng: -4735 },
          { lat: 7166, lng: 8906 },
        ],
        reuseTiles: true,
      }
    ),
  },
];

L.control
  .zoom({
    position: "topright",
  })
  .addTo(window.mainMap);
