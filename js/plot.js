create_sideblock_item('Custom Plot', 
        ['input', {type: 'button', className: 'img-btn image-select-btn', value: "Show/Hide", onclick: () => { toggle_plot_window() }}],
            ["div", {id: "plot-input", style:"display:none"}, 
                ["hr"],
                ["textarea", {id: "coordinates-input-window", style:"width: 170px", placeholder: "paste the coordinates here"}],
                ["input", {type:"button", value: "try to plot the route", onclick: () => {
                    convert_the_plot_coordinates();
                }}],
                ["input", {type:"button", value: "clear", onclick: () => { clear_custom_plot_line(); }}],
                ["p", {id: "custom_plot_message", style: "margin: 0"}]
            ]
        );

const div_custom_plot = document.getElementById("plot-input");
const div_custom_plot_message = document.getElementById("custom_plot_message");

console.log(params.plot_url)

const plot_text_area = document.getElementById("coordinates-input-window");

function toggle_plot_window () {
    div_custom_plot.style.display = (div_custom_plot.style.display === "none" ? "block" : "none");
}

plot_text_area.value = `{name = "Grapeseed - Seaview Rd", x = 2155.323242, y = 4754.255371, z = 40.522671, h = 96.739655}, -- FORCES 178 (258032)
{name = "Grapeseed - Grapeseed Main St", x = 1745.736328, y = 4588.978516, z = 39.309105, h = 49.772968}, -- FORCES 178 (258032)
{name = "Grapeseed - Grapeseed Main St", x = 1671.791748, y = 4846.059570, z = 41.332966, h = 6.142921}, -- FORCES 178 (258032)
{name = "Grapeseed - Grapeseed Main St", x = 1759.319824, y = 4946.051758, z = 43.100990, h = 219.617767}, -- FORCES 178 (258032)
{name = "Grapeseed - Grapeseed Main St", x = 1807.774536, y = 4953.770508, z = 44.564648, h = 306.670563}, -- FORCES 178 (258032)
{name = "Grapeseed - Grapeseed Main St", x = 1839.484619, y = 5011.708984, z = 54.319183, h = 35.271999}, -- FORCES 178 (258032)
{name = "Grapeseed - Grapeseed Main St", x = 1825.631104, y = 5068.393066, z = 57.004597, h = 306.002167}, -- FORCES 178 (258032)
{name = "Grapeseed - Joad Ln", x = 1974.649048, y = 5125.215332, z = 42.419315, h = 217.625900}, -- FORCES 178 (258032)
{name = "Grapeseed - Joad Ln", x = 2095.270996, y = 5036.029297, z = 40.139187, h = 316.677368}, -- FORCES 178 (258032)
{name = "Grapeseed - Joad Ln", x = 2127.596924, y = 5105.483398, z = 44.732613, h = 38.642277}, -- FORCES 178 (258032)
{name = "Grapeseed - Union Rd", x = 2072.905273, y = 5208.024902, z = 54.549328, h = 298.188599}, -- FORCES 178 (258032)
{name = "Grapeseed - Union Rd", x = 2302.437744, y = 5189.882813, z = 59.121178, h = 309.575775}, -- FORCES 178 (258032)
{name = "Grapeseed - O'Neil Way", x = 2386.028809, y = 5137.262207, z = 46.708427, h = 152.222336}, -- FORCES 178 (258032)
{name = "Grapeseed - O'Neil Way", x = 2273.437256, y = 5015.839355, z = 42.483746, h = 146.601349}, -- FORCES 178 (258032)
{name = "Grapeseed - O'Neil Way", x = 2303.702637, y = 4960.267090, z = 40.604095, h = 223.611954}, -- FORCES 178 (258032)
{name = "Grapeseed - Grapeseed Ave", x = 2508.036133, y = 4777.598145, z = 34.174755, h = 229.467606}, -- FORCES 178 (258032)
{name = "Grapeseed - Grapeseed Ave", x = 2535.361328, y = 4694.372559, z = 32.958649, h = 132.829453}, -- FORCES 178 (258032)
{name = "Grapeseed - Seaview Rd", x = 2453.137695, y = 4578.697754, z = 36.219383, h = 203.661804}, -- FORCES 178 (258032)
{name = "Grapeseed - Seaview Rd", x = 2481.393066, y = 4414.750000, z = 35.202415, h = 170.860687}, -- FORCES 178 (258032)
{name = "Grapeseed - East Joshua Road", x = 2499.105957, y = 4107.003906, z = 37.624119, h = 158.046783}, -- FORCES 178 (258032)
{name = "Sandy Shores - East Joshua Road", x = 2197.857910, y = 3800.349121, z = 32.949066, h = 118.703491}, -- FORCES 178 (258032)
{name = "Sandy Shores - Marina Dr", x = 2049.669678, y = 3745.563232, z = 31.926434, h = 18.769011}, -- FORCES 178 (258032)
{name = "Sandy Shores - Niland Ave", x = 1858.017822, y = 3928.756592, z = 32.344597, h = 192.376724}, -- FORCES 178 (258032)
{name = "Sandy Shores - Alhambra Dr", x = 1940.678955, y = 3717.505371, z = 31.638367, h = 122.454727}, -- FORCES 178 (258032)
{name = "Sandy Shores - Mountain View Dr", x = 1797.415527, y = 3665.648193, z = 33.576374, h = 27.623714}, -- FORCES 178 (258032)
{name = "Sandy Shores - Zancudo Ave", x = 1856.698608, y = 3726.157959, z = 32.443367, h = 338.879822}, -- FORCES 178 (258032)
{name = "Sandy Shores - Armadillo Ave", x = 1848.761475, y = 3752.456787, z = 32.411415, h = 31.613392}, -- FORCES 178 (258032)
{name = "Sandy Shores - Marina Dr", x = 1718.898315, y = 3914.221924, z = 34.090496, h = 123.413383}, -- FORCES 178 (258032)
{name = "Sandy Shores - Mountain View Dr", x = 1684.442017, y = 3835.399658, z = 34.250584, h = 236.699188}, -- FORCES 178 (258032)
{name = "Sandy Shores - Alhambra Dr", x = 1799.844727, y = 3628.239258, z = 33.597652, h = 127.126900}, -- FORCES 178 (258032)
{name = "Sandy Shores - Zancudo Ave", x = 1663.831543, y = 3617.273193, z = 34.804344, h = 298.100281}, -- FORCES 178 (258032)
{name = "Sandy Shores - Lolita Ave", x = 1706.495117, y = 3665.390625, z = 34.322502, h = 33.113628}, -- FORCES 178 (258032)
{name = "Sandy Shores - Algonquin Blvd", x = 1633.177246, y = 3702.872070, z = 33.392754, h = 132.716782}, -- FORCES 178 (258032)
{name = "Sandy Shores - Panorama Dr", x = 1614.291138, y = 3648.364258, z = 34.049026, h = 209.948883}, -- FORCES 178 (258032)
{name = "Grand Senora Desert - Panorama Dr", x = 1721.691650, y = 3454.567627, z = 38.366230, h = 205.528473}, -- FORCES 178 (258032)
{name = "Grand Senora Desert - Panorama Dr", x = 1811.221313, y = 3302.887207, z = 42.593864, h = 210.546219}, -- FORCES 178 (258032)
{name = "Grand Senora Desert - Panorama Dr", x = 1975.884033, y = 3125.358887, z = 46.914185, h = 232.502243}, -- FORCES 178 (258032)
{name = "Grand Senora Desert - Route 68", x = 2016.698242, y = 2994.162842, z = 45.172348, h = 108.469551}, -- FORCES 178 (258032)
{name = "Harmony - Route 68", x = 335.289154, y = 2650.945068, z = 44.662903, h = 107.847702}, -- FORCES 178 (258032)
{name = "Harmony - Joshua Rd", x = 280.765442, y = 2654.230225, z = 44.556808, h = 13.263564}, -- FORCES 178 (258032)
{name = "Grand Senora Desert - Joshua Rd", x = 258.121002, y = 3361.456299, z = 38.751263, h = 326.393616}, -- FORCES 178 (258032)
{name = "Grand Senora Desert - Marina Dr", x = 930.012024, y = 3548.149414, z = 33.934040, h = 354.129761}, -- FORCES 178 (258032)
{name = "Alamo Sea - Marina Dr", x = 943.375427, y = 3631.366211, z = 33.408741, h = 270.908234}, -- FORCES 178 (258032)
{name = "Alamo Sea - Marina Dr", x = 1257.156982, y = 3635.146973, z = 34.109276, h = 283.446381}, -- FORCES 178 (258032)
{name = "Sandy Shores - Panorama Dr", x = 1549.637451, y = 3743.731934, z = 34.380856, h = 224.695297}, -- FORCES 178 (258032)
{name = "Sandy Shores - Algonquin Blvd", x = 1550.563843, y = 3645.810059, z = 34.412380, h = 114.208717}, -- FORCES 178 (258032)
{name = "Sandy Shores - Lesbos Ln", x = 1471.204590, y = 3637.566650, z = 34.589806, h = 20.979465}, -- FORCES 178 (258032)
`;

let custom_plot_line = null;

function clear_custom_plot_line(){
    if(custom_plot_line){
        map.removeLayer(custom_plot_line);
        custom_plot_line = null;
    }
    plot_text_area.value = "";
    div_custom_plot_message.innerText = "";
}

function convert_the_plot_coordinates() {
    let inital_string = plot_text_area.value;

    if(!inital_string || inital_string.length < 10) {
        div_custom_plot_message.innerText = "Invalid string";
    }
    
    const converted_data = [];
    while(inital_string){
        try{
            let matched = (/\{name = \"([a-zA-Z0-9\- \']+)\", x = ([0-9.]+), y = ([0-9.]+), z = ([0-9.]+), h = ([0-9.]+)\}/gm.exec(inital_string));

            if(matched){
                if(matched[1] && matched[2] && matched[3] && matched[4] && !isNaN(matched[2]) && !isNaN(matched[3]) && !isNaN(matched[4])){
                    converted_data.push({
                        name: matched[1],
                        x: parseFloat(matched[2]),
                        y: parseFloat(matched[3]),
                        h: parseFloat(matched[4]),
                    })
                }
    
                inital_string = matched.input.replace(matched[1],"");
            }else{
                break;
            }
        }catch(err){
            console.log(err);
            break;
        }
    }

    if(custom_plot_line){
        map.removeLayer(custom_plot_line);
        custom_plot_line = null;
    }

    if(converted_data.length > 1){
        custom_plot_line = L.polyline(converted_data.map( m => [m.y, m.x]), {
            color: "red",
            weight: 2
        }).addTo(map);

        const middle_index = parseInt(converted_data.length * 0.5);

        map.flyTo([converted_data[middle_index].y,converted_data[middle_index].x], -2, {
            animate: true,
            duration: .5
        });

        div_custom_plot_message.innerText = "Done";

    }else{
        div_custom_plot_message.innerText = "Invalid string #1";
    }

}