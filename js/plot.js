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

plot_text_area.value = `{name = "Pacific Ocean - Staunton Blv.", x = -3978.183838, y = 7659.266602, z = 38.394279, h = 181.351700}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3981.919678, y = 7597.948730, z = 33.394222, h = 123.219582}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -4046.786377, y = 7593.560059, z = 33.393345, h = 120.270950}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -4051.289063, y = 7553.834473, z = 33.394070, h = 231.755005}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -4004.465820, y = 7544.490234, z = 30.406565, h = 253.166229}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3919.227051, y = 7504.140137, z = 20.364889, h = 231.804794}, -- Vody (261005)
{name = "Shoreside Vale - City Center", x = -3861.259766, y = 7447.510254, z = 11.822918, h = 214.939819}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3833.932861, y = 7382.464844, z = 4.925377, h = 183.101257}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3830.889160, y = 7308.209961, z = 3.394897, h = 188.015167}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3800.041992, y = 7221.060547, z = 3.396295, h = 208.306717}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3734.105957, y = 7144.279297, z = 3.394439, h = 225.136139}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3659.489258, y = 7085.211914, z = 3.394276, h = 249.569595}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3592.073975, y = 7074.277344, z = 3.393086, h = 269.747192}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3542.537598, y = 7080.052734, z = 3.396075, h = 321.750977}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3533.796875, y = 7131.035645, z = 3.395143, h = 342.148743}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3511.905029, y = 7198.097656, z = 3.393866, h = 355.698151}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3511.563477, y = 7305.681152, z = 3.394713, h = 0.085429}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3512.022705, y = 7373.827637, z = 3.394201, h = 1.616226}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3543.037354, y = 7389.564941, z = 3.394045, h = 89.385582}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3621.015381, y = 7389.723145, z = 3.393283, h = 88.825996}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3658.783936, y = 7385.520508, z = 3.394463, h = 145.729218}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3662.078125, y = 7295.919922, z = 3.376134, h = 179.867920}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3657.910645, y = 7207.941895, z = 3.394323, h = 233.287506}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3584.531494, y = 7205.879883, z = 3.387475, h = 270.480652}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3521.321289, y = 7203.324707, z = 3.395749, h = 231.104706}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3535.350830, y = 7145.935059, z = 3.386250, h = 158.540802}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3545.136719, y = 7085.522461, z = 3.395809, h = 127.970718}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3617.631348, y = 7081.921387, z = 3.394563, h = 80.351189}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3689.605225, y = 7109.577148, z = 3.394380, h = 53.068356}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3763.283936, y = 7180.791992, z = 3.375466, h = 43.973488}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3814.005127, y = 7268.949219, z = 3.393736, h = 20.331621}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3826.870117, y = 7370.934570, z = 3.674413, h = 5.178815}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3841.594482, y = 7428.479004, z = 8.754567, h = 26.515120}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3886.999756, y = 7483.367188, z = 16.406635, h = 45.204376}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3959.993408, y = 7534.782227, z = 25.806099, h = 66.232353}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -4047.690186, y = 7558.483398, z = 33.394714, h = 45.793854}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -4045.026855, y = 7586.353027, z = 33.394207, h = 294.212280}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3979.321045, y = 7591.972656, z = 33.394951, h = 307.897400}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3971.325684, y = 7657.589355, z = 38.329437, h = 0.903006}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3939.570313, y = 7667.053223, z = 42.146702, h = 260.073242}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3844.778320, y = 7655.172363, z = 59.642925, h = 267.916534}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3738.711426, y = 7654.245605, z = 74.567520, h = 272.872986}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3629.257568, y = 7669.737305, z = 77.554794, h = 277.032410}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3534.242188, y = 7661.640625, z = 86.581329, h = 256.480560}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3468.643066, y = 7655.724121, z = 88.259964, h = 275.282043}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3392.798584, y = 7669.090332, z = 78.991585, h = 279.023438}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3369.434814, y = 7658.019043, z = 78.393242, h = 183.923111}, -- Vody (261005)
{name = "Staunton Island - Staunton Blv.", x = -3395.885498, y = 7587.675293, z = 67.437508, h = 154.699493}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3429.126465, y = 7531.909668, z = 58.429173, h = 97.291389}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3519.277344, y = 7530.918945, z = 67.305336, h = 91.085403}, -- Vody (261005)
{name = "Shoreside Vale - City Center", x = -3606.315186, y = 7530.776367, z = 66.751640, h = 89.717392}, -- Vody (261005)
{name = "Shoreside Vale - City Center", x = -3706.099854, y = 7531.016113, z = 58.379803, h = 87.364159}, -- Vody (261005)
{name = "Shoreside Vale - City Center", x = -3777.975098, y = 7531.657715, z = 53.393101, h = 88.539864}, -- Vody (261005)
{name = "Shoreside Vale - City Center", x = -3853.885254, y = 7530.495605, z = 48.394844, h = 100.503372}, -- Vody (261005)
{name = "Shoreside Vale - City Center", x = -3816.931152, y = 7524.501465, z = 50.692280, h = 269.039063}, -- Vody (261005)
{name = "Shoreside Vale - City Center", x = -3734.442627, y = 7523.871582, z = 55.933434, h = 268.607086}, -- Vody (261005)
{name = "Shoreside Vale - City Center", x = -3633.379883, y = 7523.856445, z = 64.039619, h = 272.316101}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3565.632568, y = 7522.627441, z = 68.388847, h = 270.641846}, -- Vody (261005)
{name = "Shoreside Vale - Staunton Blv.", x = -3468.510010, y = 7523.357422, z = 62.245319, h = 266.669250}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3415.661621, y = 7532.113770, z = 58.392017, h = 321.313629}, -- Vody (261005)
{name = "Staunton Island - Staunton Blv.", x = -3381.417236, y = 7602.285156, z = 70.375748, h = 333.201019}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3361.742432, y = 7659.269043, z = 78.391655, h = 0.280460}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3384.581787, y = 7674.336426, z = 78.565422, h = 94.625214}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3459.176025, y = 7660.537598, z = 87.419044, h = 94.347969}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3546.353516, y = 7668.654785, z = 84.613960, h = 74.597290}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3651.319092, y = 7670.528320, z = 77.578171, h = 101.330177}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3772.196533, y = 7657.994629, z = 70.658607, h = 89.870697}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3941.956543, y = 7672.357422, z = 41.672943, h = 79.568214}, -- Vody (261005)
{name = "Pacific Ocean - Staunton Blv.", x = -3977.653564, y = 7669.564453, z = 38.392544, h = 177.628738}, -- Vody (261005)
`;

let custom_plot_line = null;
let custom_plot_line_joint = null;

function clear_custom_plot_line(){
    if(custom_plot_line){
        map.removeLayer(custom_plot_line);
        map.removeLayer(custom_plot_line_joint);
        custom_plot_line = null;
        custom_plot_line_joint = null;
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
            let matched = (/\{name = \"([\.a-zA-Z0-9\- \']+)\", x = (-?[0-9.]+), y = (-?[0-9.]+), z = (-?[0-9.]+), h = ([0-9.]+)\}/gm.exec(inital_string));

            if(matched){
                // console.log(matched)
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
        map.removeLayer(custom_plot_line_joint);
        custom_plot_line = null;
        custom_plot_line_joint = null;
    }

    if(converted_data.length > 1){

        custom_plot_line = L.polyline(converted_data.map( m => [m.y, m.x]), {
            color: "red",
            weight: 2
        }).addTo(map);

        custom_plot_line_joint = L.polyline([ [converted_data[0].y, converted_data[0].x], [converted_data[converted_data.length-1].y, converted_data[converted_data.length-1].x]  ], {
            color: "pink",
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