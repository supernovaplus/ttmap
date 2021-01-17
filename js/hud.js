//right click menu
const right_click_menu = cel("div", {id: "copy-menu", hidden: true}, 
    ["b", {innerText: "Copy link to this position:"}], 
    ["br"],
    ["input", {type: "text", id: "copy-link-input-field", value: "", onclick: e =>  e.target.select()}],

    ["label", {for: "hidePlayersCheck", innerText: "Hide Players:"}],
    ["input", {type: "checkbox", id: "hidePlayersCheck", checked: true, onclick: () => refresh_copy_link()}],

    ["label", {for: "hideIconsCheck", innerText: "Hide Icons:"}],
    ["input", {type: "checkbox", id: "hideIconsCheck", checked: false, onclick: () => refresh_copy_link()}],
);
document.body.appendChild(right_click_menu);

const div_credits = cel('div', {id: 'credits', hidden: true});
document.body.appendChild(div_credits);

const div_hud_popup = cel('div', {id: 'hud-popup', hidden: true})
document.body.appendChild(div_hud_popup);

var active_popup_timeout = null;

function assign_hud_hover_event (object) {
    return Object.assign(object, {
    onmouseover: (e) => {
        if(!e.target._title) return;

        div_hud_popup.hidden = false;
        div_hud_popup.innerText = e.target._title;

        let top_pos = (e.target.offsetTop + e.target.offsetHeight + 5);
        if(top_pos < 0) top_pos = 0;

        let left_pos = (e.target.offsetLeft + (e.target.offsetWidth * 0.5) - (div_hud_popup.offsetWidth * 0.5));
        if(left_pos < 0) left_pos = 0;

        div_hud_popup.style.top = top_pos + "px";
        div_hud_popup.style.left = left_pos + "px";

        if(is_mobile_device && !active_popup_timeout){
            active_popup_timeout = setTimeout(()=>{
                div_hud_popup.hidden = true;
                div_hud_popup.innerText = "";
                active_popup_timeout = null;
            }, 1000);
        }
    },
    onmouseleave: (e) => {
        div_hud_popup.hidden = true;
        div_hud_popup.innerText = "";
    }
})};

const div_sidebar = cel('div', {id: 'sidebar'});
document.body.appendChild(div_sidebar);

const sidebar_toggle = e => {
    if(div_sidebar_panel.style.display === "none"){
        e.target.className = "arrow-close";
        div_sidebar_panel.style.display = "block";
        //options.sidebar_open = true;
        //save_options();
    }else{
        e.target.className = "arrow-open";
        div_sidebar_panel.style.display = "none";
        //options.sidebar_open = false;
        //save_options();
    }
}

//----------

const div_sidebar_panel = cel('div', {id: 'sidebar-panel'});
div_sidebar.appendChild(div_sidebar_panel);

const div_sidebar_arrow = cel('a', {href: '#', id: 'sidebar-arrow', className: 'arrow-close', _title: 'Toggle Sidebar', onclick: sidebar_toggle});
div_sidebar.appendChild(div_sidebar_arrow);

// if(!options.sidebar_open){
//     sidebar_toggle({target: div_sidebar_arrow});
// }

function create_sideblock_item(name = 'N/A', ...callback){
    div_sidebar_panel.appendChild(cel(
        ["div", {className: 'block-item'},
            ['span', {className: 'block-item-head', innerText: name}], 
            ['div', {className: 'block-item-content'}, ...callback]
        ]
    ));
}

create_sideblock_item('Map Color Mode', 
        ...map_list.map((trail, index) => ['input', assign_hud_hover_event({type: 'button', className: 'img-btn image-select-btn', value: trail.name, _title: trail.title, onclick: () => toogle_image_quality(index)})] )
        );

//-------------------------

var current_copy_link_url = "";
map.on('contextmenu', function(e){
    right_click_menu.style.top = e.originalEvent.y + "px";
    right_click_menu.style.left = e.originalEvent.x + "px";
    current_copy_link_url = `${copy_link_url}?x=${e.latlng.lng.toFixed(3)}&y=${e.latlng.lat.toFixed(3)}`;
    refresh_copy_link();
    right_click_menu.hidden = false;
});

const copy_link_input_field = document.getElementById("copy-link-input-field");
const hide_players_checkbox = document.getElementById("hidePlayersCheck");
const hide_icons_checkbox = document.getElementById("hideIconsCheck");

function refresh_copy_link(){
    copy_link_input_field.value = current_copy_link_url + 
        (hide_players_checkbox.checked === true ? "&hideplayers" : "") + 
        (hide_icons_checkbox.checked === true ? "&hideicons" : "");
}

map.on('click', function(){
    right_click_menu.hidden = true;
});

map.on('drag', function(){
    right_click_menu.hidden = true;
});

//----------------------
toogle_image_quality(options.current_map_index);

function toogle_image_quality(index){
    map_overlay.setUrl(map_list[index].link);
    // L.imageOverlay(map_list[current_map_index].link, map_bounds).addTo(map);
    div_map.style.backgroundColor = map_list[index].bgcolor;
    options.current_map_index = index;
    save_options();
    refresh_image_quality_button();
}

function refresh_image_quality_button(){
    let index = 0;
    for (const image_select_button of document.querySelectorAll(".image-select-btn")) {
        if(index === options.current_map_index){
            image_select_button.classList.add("selected");
        }else{
            image_select_button.classList.remove("selected");
        }
        index++;
    }
}

fetch("./data/credits.txt").then(res=>res.text()).then(res=>{
    div_credits.appendChild(cel(["p", {innerText: res}]));
    div_credits.appendChild(cel(["div", {innerText: "Download the map: "},
            ["a", {href:"https://supernovaplus.github.io/ttmap/images/maps/mapdark.jpg", innerText:"DARK HD MAP (4000x4000)", target: "blank"}],
            ["a", {href:"https://supernovaplus.github.io/ttmap/images/maps/map.jpg", innerText:"COLOR HD MAP (4000x4000)", target: "blank"}],
            ["a", {href:"https://supernovaplus.github.io/ttmap/images/maps/mobilemap.jpg", innerText:"COLOR MOBILE MAP (2000x2000)", target: "blank"}]]));
    div_credits.appendChild(cel(["input",{type:"button", value:"close", onclick: show_credits}]));
})

function show_credits(){
    div_credits.hidden = !div_credits.hidden;
}

map.attributionControl.addAttribution(`<a href="#" onclick="show_credits(); return;">CREDITS | Download Map</a>`)