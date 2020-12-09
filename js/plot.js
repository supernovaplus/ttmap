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

// console.log(params.plot_url)

const plot_text_area = document.getElementById("coordinates-input-window");

function toggle_plot_window () {
    div_custom_plot.style.display = (div_custom_plot.style.display === "none" ? "block" : "none");
}

plot_text_area.value = `{name = "Lago Zancudo - Great Ocean Hwy", x = -2688.578369, y = 2388.264648, z = 16.036152, h = 351.108612}, -- 🦊PIT.ula🦊 (256912)
{name = "Lago Zancudo - Great Ocean Hwy", x = -2655.362793, y = 2610.738770, z = 15.996974, h = 353.835052}, -- 🦊PIT.ula🦊 (256912)
{name = "Lago Zancudo - Great Ocean Hwy", x = -2617.797363, y = 2853.895264, z = 16.012695, h = 351.518250}, -- 🦊PIT.ula🦊 (256912)
{name = "Lago Zancudo - Great Ocean Hwy", x = -2593.213379, y = 3076.019775, z = 14.913754, h = 351.938629}, -- 🦊PIT.ula🦊 (256912)
{name = "North Chumash - Great Ocean Hwy", x = -2571.822021, y = 3298.326904, z = 12.734577, h = 352.304901}, -- 🦊PIT.ula🦊 (256912)
{name = "North Chumash - Great Ocean Hwy", x = -2497.471680, y = 3545.162109, z = 14.088567, h = 335.847168}, -- 🦊PIT.ula🦊 (256912)
{name = "North Chumash - Great Ocean Hwy", x = -2450.928467, y = 3773.069092, z = 18.627541, h = 342.815460}, -- 🦊PIT.ula🦊 (256912)
{name = "North Chumash - Great Ocean Hwy", x = -2362.552002, y = 3987.892334, z = 25.239511, h = 337.784943}, -- 🦊PIT.ula🦊 (256912)
{name = "North Chumash - Great Ocean Hwy", x = -2257.730469, y = 4227.331543, z = 42.693489, h = 323.982056}, -- 🦊PIT.ula🦊 (256912)
{name = "North Chumash - Great Ocean Hwy", x = -2142.268066, y = 4438.386230, z = 62.947311, h = 282.097534}, -- 🦊PIT.ula🦊 (256912)
{name = "Raton Canyon - Great Ocean Hwy", x = -1973.886597, y = 4540.046875, z = 56.349384, h = 313.152985}, -- 🦊PIT.ula🦊 (256912)
{name = "Chiliad Mountain State Wilderness - Great Ocean Hwy", x = -1811.663696, y = 4698.010742, z = 56.338261, h = 313.781097}, -- 🦊PIT.ula🦊 (256912)
{name = "Chiliad Mountain State Wilderness - Great Ocean Hwy", x = -1609.813110, y = 4877.386719, z = 60.399303, h = 317.652588}, -- 🦊PIT.ula🦊 (256912)
{name = "Chiliad Mountain State Wilderness - Great Ocean Hwy", x = -1367.362793, y = 5098.894043, z = 60.567616, h = 304.332886}, -- 🦊PIT.ula🦊 (256912)
{name = "Chiliad Mountain State Wilderness - Great Ocean Hwy", x = -1272.772949, y = 5253.943359, z = 50.647858, h = 293.573364}, -- 🦊PIT.ula🦊 (256912)
{name = "Paleto Forest - Great Ocean Hwy", x = -1008.527649, y = 5371.156250, z = 41.401752, h = 308.416107}, -- 🦊PIT.ula🦊 (256912)
{name = "Paleto Forest - Great Ocean Hwy", x = -781.932556, y = 5478.162109, z = 33.583099, h = 301.718719}, -- 🦊PIT.ula🦊 (256912)
{name = "Paleto Forest - Great Ocean Hwy", x = -567.184082, y = 5676.217773, z = 37.251846, h = 333.132904}, -- 🦊PIT.ula🦊 (256912)
{name = "Paleto Forest - Great Ocean Hwy", x = -388.630127, y = 5984.482910, z = 30.870747, h = 317.771667}, -- 🦊PIT.ula🦊 (256912)
{name = "Paleto Bay - Paleto Blvd", x = -398.958771, y = 6031.195801, z = 30.737068, h = 45.898460}, -- 🦊PIT.ula🦊 (256912)
{name = "Paleto Bay - Paleto Blvd", x = -399.119751, y = 6131.055176, z = 30.843214, h = 315.256805}, -- 🦊PIT.ula🦊 (256912)
{name = "Paleto Bay - Procopio Dr", x = -399.874817, y = 6186.058105, z = 30.915226, h = 40.175316}, -- 🦊PIT.ula🦊 (256912)
{name = "Paleto Bay - Procopio Dr", x = -372.436768, y = 6298.821777, z = 29.032757, h = 307.630615}, -- 🦊PIT.ula🦊 (256912)
{name = "Paleto Bay - Cascabel Ave", x = -173.182999, y = 6472.367676, z = 29.784460, h = 327.858490}, -- 🦊PIT.ula🦊 (256912)
{name = "Paleto Bay - Procopio Dr", x = 26.241362, y = 6642.865234, z = 30.890581, h = 272.615112}, -- 🦊PIT.ula🦊 (256912)
{name = "Paleto Bay - Procopio Dr", x = 60.101006, y = 6611.289551, z = 30.748781, h = 185.139816}, -- 🦊PIT.ula🦊 (256912)
{name = "Paleto Bay - Paleto Blvd", x = -111.786293, y = 6423.854492, z = 30.677193, h = 136.177689}, -- 🦊PIT.ula🦊 (256912)
{name = "Paleto Bay - Paleto Blvd", x = -255.655701, y = 6285.664063, z = 30.638706, h = 135.049881}, -- 🦊PIT.ula🦊 (256912)
{name = "Paleto Bay - Duluoz Ave", x = -253.159485, y = 6174.468262, z = 30.637167, h = 221.765152}, -- 🦊PIT.ula🦊 (256912)
{name = "Paleto Bay - Great Ocean Hwy", x = -141.803223, y = 6224.694336, z = 30.507458, h = 314.098663}, -- 🦊PIT.ula🦊 (256912)
{name = "Paleto Bay - Great Ocean Hwy", x = 75.141975, y = 6443.142090, z = 30.602621, h = 316.426453}, -- 🦊PIT.ula🦊 (256912)
{name = "Paleto Bay - Great Ocean Hwy", x = 421.914093, y = 6562.910156, z = 26.531866, h = 266.694153}, -- 🦊PIT.ula🦊 (256912)
{name = "Mount Chiliad - Great Ocean Hwy", x = 788.323303, y = 6494.075195, z = 23.601093, h = 263.484314}, -- 🦊PIT.ula🦊 (256912)
{name = "Mount Chiliad - Great Ocean Hwy", x = 1214.335815, y = 6482.835938, z = 20.191555, h = 270.288177}, -- 🦊PIT.ula🦊 (256912)
{name = "Mount Chiliad - Senora Fwy", x = 1717.164673, y = 6350.412598, z = 33.320015, h = 253.727783}, -- 🦊PIT.ula🦊 (256912)
{name = "Mount Chiliad - Senora Fwy", x = 2050.153320, y = 6078.214844, z = 47.885323, h = 225.616089}, -- 🦊PIT.ula🦊 (256912)
{name = "Braddock Tunnel - Senora Fwy", x = 2291.097412, y = 5869.928711, z = 47.369049, h = 220.285080}, -- 🦊PIT.ula🦊 (256912)
{name = "Mount Gordo - Senora Fwy", x = 2503.054688, y = 5478.050781, z = 43.890396, h = 197.362961}, -- 🦊PIT.ula🦊 (256912)
{name = "San Chianski Mountain Range - Senora Fwy", x = 2594.236084, y = 5128.610840, z = 44.058956, h = 194.516876}, -- 🦊PIT.ula🦊 (256912)
{name = "Grapeseed - Union Rd", x = 2397.522705, y = 5162.310547, z = 47.562401, h = 29.644190}, -- 🦊PIT.ula🦊 (256912)
{name = "Grapeseed - Union Rd", x = 2252.199219, y = 5192.115723, z = 59.619160, h = 69.266579}, -- 🦊PIT.ula🦊 (256912)
{name = "Grapeseed - Union Rd", x = 1979.776245, y = 5147.138184, z = 43.226318, h = 128.741653}, -- 🦊PIT.ula🦊 (256912)
{name = "Grapeseed - Grapeseed Main St", x = 1925.305542, y = 5148.246094, z = 43.776154, h = 110.086182}, -- 🦊PIT.ula🦊 (256912)
{name = "Grapeseed - Grapeseed Main St", x = 1675.042969, y = 4951.978516, z = 41.640503, h = 133.868088}, -- 🦊PIT.ula🦊 (256912)
{name = "Grapeseed - Grapeseed Ave", x = 1674.779663, y = 4766.368164, z = 41.271530, h = 191.768448}, -- 🦊PIT.ula🦊 (256912)
{name = "Grapeseed - Grapeseed Main St", x = 1737.461914, y = 4590.886719, z = 39.883705, h = 224.742783}, -- 🦊PIT.ula🦊 (256912)
{name = "Mount Chiliad - North Calafia Way", x = 1538.592529, y = 4559.662598, z = 50.806614, h = 114.306091}, -- 🦊PIT.ula🦊 (256912)
{name = "Mount Chiliad - North Calafia Way", x = 1336.550049, y = 4487.055664, z = 59.397392, h = 128.774506}, -- 🦊PIT.ula🦊 (256912)
{name = "Mount Chiliad - North Calafia Way", x = 1082.470581, y = 4441.342773, z = 59.393433, h = 69.540779}, -- 🦊PIT.ula🦊 (256912)
{name = "Mount Chiliad - North Calafia Way", x = 816.003296, y = 4495.910156, z = 51.825031, h = 131.359222}, -- 🦊PIT.ula🦊 (256912)
{name = "Alamo Sea - North Calafia Way", x = 861.767212, y = 4243.215332, z = 49.673370, h = 165.973892}, -- 🦊PIT.ula🦊 (256912)
{name = "Alamo Sea - North Calafia Way", x = 791.234009, y = 4267.034180, z = 55.732761, h = 81.119438}, -- 🦊PIT.ula🦊 (256912)
{name = "Alamo Sea - North Calafia Way", x = 519.723083, y = 4265.569336, z = 52.580959, h = 46.618916}, -- 🦊PIT.ula🦊 (256912)
{name = "Mount Chiliad - North Calafia Way", x = 479.797394, y = 4359.645508, z = 60.575092, h = 65.060043}, -- 🦊PIT.ula🦊 (256912)
{name = "Mount Chiliad - North Calafia Way", x = 339.070251, y = 4500.460449, z = 61.298492, h = 45.810326}, -- 🦊PIT.ula🦊 (256912)
{name = "Mount Chiliad - North Calafia Way", x = 151.309998, y = 4421.085938, z = 74.979996, h = 74.038322}, -- 🦊PIT.ula🦊 (256912)
{name = "Mount Chiliad - North Calafia Way", x = -43.405426, y = 4419.897461, z = 57.054863, h = 128.701569}, -- 🦊PIT.ula🦊 (256912)
{name = "Calafia Bridge - North Calafia Way", x = -199.334579, y = 4220.853027, z = 44.024860, h = 116.419571}, -- 🦊PIT.ula🦊 (256912)
{name = "Raton Canyon - Cassidy Trail", x = -375.730621, y = 4270.736328, z = 47.109898, h = 45.718132}, -- 🦊PIT.ula🦊 (256912)
{name = "Raton Canyon - Cassidy Trail", x = -509.305603, y = 4360.243164, z = 66.797379, h = 73.879517}, -- 🦊PIT.ula🦊 (256912)
{name = "Cassidy Creek - Cassidy Trail", x = -739.968872, y = 4415.182129, z = 20.082518, h = 87.909294}, -- 🦊PIT.ula🦊 (256912)
{name = "Cassidy Creek - Cassidy Trail", x = -858.483765, y = 4400.541016, z = 20.314610, h = 114.081589}, -- 🦊PIT.ula🦊 (256912)
{name = "Cassidy Creek - Cassidy Trail", x = -1042.587524, y = 4365.050781, z = 11.440428, h = 74.580254}, -- 🦊PIT.ula🦊 (256912)
{name = "Cassidy Creek - Cassidy Trail", x = -1172.812744, y = 4363.976074, z = 6.728160, h = 87.686310}, -- 🦊PIT.ula🦊 (256912)
{name = "Cassidy Creek - Cassidy Trail", x = -1552.354248, y = 4324.851563, z = 3.869154, h = 62.819023}, -- 🦊PIT.ula🦊 (256912)
{name = "Raton Canyon - Cassidy Trail", x = -1747.380249, y = 4459.506348, z = 4.251165, h = 59.958874}, -- 🦊PIT.ula🦊 (256912)
{name = "Raton Canyon - Cassidy Trail", x = -1847.235107, y = 4502.501465, z = 21.393408, h = 85.499908}, -- 🦊PIT.ula🦊 (256912)
{name = "North Chumash - Cassidy Trail", x = -1945.466064, y = 4458.580078, z = 34.275169, h = 92.163315}, -- 🦊PIT.ula🦊 (256912)
{name = "North Chumash - Great Ocean Hwy", x = -2020.607788, y = 4516.974121, z = 27.704853, h = 62.979103}, -- 🦊PIT.ula🦊 (256912)
{name = "North Chumash - Great Ocean Hwy", x = -2179.772461, y = 4511.927246, z = 34.544399, h = 120.088081}, -- 🦊PIT.ula🦊 (256912)
{name = "North Chumash - Great Ocean Hwy", x = -2253.927490, y = 4300.542480, z = 46.423061, h = 200.815765}, -- 🦊PIT.ula🦊 (256912)
{name = "North Chumash - Great Ocean Hwy", x = -2450.597412, y = 3815.655762, z = 21.163534, h = 158.951294}, -- 🦊PIT.ula🦊 (256912)
{name = "North Chumash - Great Ocean Hwy", x = -2478.500000, y = 3672.398926, z = 13.200145, h = 172.750748}, -- 🦊PIT.ula🦊 (256912)
{name = "North Chumash - Great Ocean Hwy", x = -2415.657227, y = 3624.791504, z = 14.283827, h = 217.192001}, -- 🦊PIT.ula🦊 (256912)
{name = "North Chumash - Great Ocean Hwy", x = -2315.168457, y = 3390.531250, z = 30.196838, h = 229.869904}, -- 🦊PIT.ula🦊 (256912)
{name = "Fort Zancudo - Great Ocean Hwy", x = -2183.715332, y = 3364.366699, z = 32.443977, h = 265.930786}, -- 🦊PIT.ula🦊 (256912)
{name = "Fort Zancudo - Fort Zancudo Approach Rd", x = -1920.548584, y = 3240.632568, z = 32.215794, h = 237.842453}, -- 🦊PIT.ula🦊 (256912)
{name = "Fort Zancudo - Fort Zancudo Approach Rd", x = -1718.985474, y = 3122.978516, z = 32.235943, h = 219.090042}, -- 🦊PIT.ula🦊 (256912)
{name = "Fort Zancudo - Fort Zancudo Approach Rd", x = -1596.730713, y = 2796.391846, z = 16.179535, h = 221.803085}, -- 🦊PIT.ula🦊 (256912)
{name = "Fort Zancudo - Fort Zancudo Approach Rd", x = -1344.760986, y = 2573.650635, z = 16.984783, h = 230.161758}, -- 🦊PIT.ula🦊 (256912)
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
    let last_matched = "";
    let last_matched_counter = 0;
    while(inital_string){
        try{
            let matched = (/\{name = \"([a-zA-Z0-9\- \']+)\", x = (-?[0-9.]+), y = (-?[0-9.]+), z = (-?[0-9.]+), h = ([0-9.]+)\}/gm.exec(inital_string));

            if(matched){
                if(matched[1] && matched[2] && matched[3] && matched[4] && !isNaN(matched[2]) && !isNaN(matched[3]) && !isNaN(matched[4])){
                    converted_data.push({
                        name: matched[1],
                        x: parseFloat(matched[2]),
                        y: parseFloat(matched[3]),
                        h: parseFloat(matched[4]),
                    })
                }

                if(last_matched_counter > 3){
                    break;
                }else if(matched[0] === last_matched){
                    last_matched_counter++;
                }else{
                    last_matched_counter = 0;
                }
                last_matched = matched[0];
    
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