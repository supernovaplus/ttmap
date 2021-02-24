const nova_servers = {};

const trail_modes = [
    { name: "LONG",     title: "1000 points length",    value: 1000},
    { name: "MEDIUM",    title: "500 points length",     value: 500},
    { name: "SHORT",    title: "100 points length",     value: 100},
    { name: "NONE",     title: "0 points length",       value: 0}
];

function handle_find_player(input){
    if(!input.previousSibling.value) return;
    const search_for = String(input.previousSibling.value).toLowerCase();
    let found;

    for (const server_id in nova_servers) {
        if(found) break;
        if(!nova_servers[server_id].disabled){
            for (const player_id in nova_servers[server_id]['players']) {
                if(String(nova_servers[server_id]['players'][player_id]['gameid']).toLowerCase().includes(search_for)){
                    found = nova_servers[server_id]['players'][player_id];
                    break;
                }
            }
        }
    }

    if(found){
        input.previousSibling.style.backgroundColor = "lime";
        
        map.flyTo(found.marker._latlng, 7, {
            animate: true,
            duration: .5
        });

        setTimeout(() => {
            found.marker.openPopup();
        }, 100);

        // found._popup.openOn(map)
        return false;
    }else{
        input.previousSibling.style.backgroundColor = "red";
    }
}

function toggle_trail_mode(index){
    options.current_trail_index = index;
    save_options();
    refresh_trail_mode_buttons();
}

function refresh_trail_mode_buttons(){
    let index = 0;
    for (const trail_button of document.querySelectorAll(".trails-btn")) {
        if(index === options.current_trail_index){
            trail_button.classList.add("selected");
        }else{
            trail_button.classList.remove("selected");
        }
        index++;
    }
}

fetch(base_folder + "data/serversList.json").then(res=>res.json()).then(async servers_list=>{
    //hud
    create_sideblock_item('Trail Mode', 
    ...trail_modes.map((trail, index) => ['input', assign_hud_hover_event({type: 'button', className: 'img-btn grow-item trails-btn', _title: trail.title, value: trail.name, onclick: () => toggle_trail_mode(index)})])
    );

    refresh_trail_mode_buttons();

    create_sideblock_item('Find Player', 
        ['input', {type: 'text', id: 'find-player-input', placeholder: 'Enter player\'s ID or name', onkeydown: ({keyCode, target}) => {
            if(keyCode === 13){
                handle_find_player(target.nextSibling);
            }
        }}],
        ['input', {type: 'button', className: "btn img-btn", value: 'Find', onclick: (e) => handle_find_player(e.target)}]
    );

    create_sideblock_item('Servers', 
        ['div', {id: 'servers'}],
        ['input', {type: 'button', className: 'btn img-btn', onclick: (e) => {
            e.target.disabled = true;
            setTimeout(() => {
                e.target.disabled = false;
            }, 6000);
            servers_check_all()
            }, value: 'Check All'}],
        // ['br'],
        ['input', {type: 'button', className: 'btn img-btn', onclick: (e) => {
            e.target.disabled = true;
            setTimeout(() => {
                e.target.disabled = false;
            }, 6000);
            servers_uncheck_all()
            }, value: 'Uncheck All (Hide Players)',
            style: `width: -moz-available;`}]
        );
    //hud end

    const servers_div = document.getElementById("servers");
    for (let i = 0; i < servers_list.length; i++) {

        const checkbox_block = cel(
            ['div', {className: 'servercheckbox'}, 
            // ['input', {type: 'checkbox', checked: !params["hideplayers"]}],
            ['input', {type: 'checkbox', checked: false}],
            ['span', {innerText: servers_list[i][1]}],
            is_mobile_device === false ? ['a', assign_hud_hover_event({href: 'fivem://connect/' + servers_list[i][0], _title: 'Join: ' + servers_list[i][0], innerText: '🎮'})] : []
        ]);

        servers_div.appendChild(checkbox_block);

        nova_servers[servers_list[i][0]] = {
            name: servers_list[i][1],
            ip: servers_list[i][0],
            players: {},
            timestamp: 0,
            checkbox: checkbox_block.firstElementChild,
            disabled: true,
            timeout: null
        };

        nova_servers[servers_list[i][0]].checkbox.addEventListener("change", () => {
            if(nova_servers[servers_list[i][0]].disabled){
                enable_server(nova_servers[servers_list[i][0]]);
            }else{
                disable_server(nova_servers[servers_list[i][0]]);
            }
        })
    };

    if(!params["hideplayers"]){
        //if OS is on, only check the os, else scan all the servers
        const first_server_id = Object.keys(nova_servers)[0];

        if(window.location.protocol === "https:"){
            enable_server(Object.values(nova_servers)[0]);
        }else{
            fetch(`http://${nova_servers[first_server_id].ip}/status/widget/players.json`).then(res=>res.json()).then(res=>{
                if(res && res.players && res.players.length > 0){
                    enable_server(nova_servers[first_server_id])
                }else{
                    disable_server(nova_servers[first_server_id]);
                }
    
            }).catch(err=>{
                disable_server(nova_servers[first_server_id]);
    
                //scan servers via keyless api for disabled servers or servers with 0 player count;
                for (const server_id in nova_servers) {
                    if(server_id === first_server_id) continue;
                    fetch(`http://${nova_servers[server_id].ip}/status/widget/players.json`).then(res=>res.json()).then(res=>{
                        if(res && res.players && res.players.length > 0){
                            enable_server(nova_servers[server_id])
                        }else{
                            disable_server(nova_servers[server_id]);
                        }
                    }).catch(err=>{
                        disable_server(nova_servers[server_id]);
                    });
                }
            });
        }
    }
}).catch(err=>{
    console.log(err);
})

function get_server_data(server){
    if(server.disabled === true) return;
    fetch("https://novaplus.herokuapp.com/positions/" + server.ip).then(res=>res.json()).then(res => {
        if(!res.data || res.error || res.data.players.length === 0 || server.disabled === true) {
            console.log(server.name, res.error ? res.error : "no res data / no players / checkbox unmarked");
            disable_server(server);
            return;
        }

        const timestamp = Date.now();
        server.timestamp = timestamp;
        const players = res.data.players;

        for (let i = 0; i < players.length; i++) {
            if(players[i][3] === null) continue;

            const player_id = players[i][2];

            if(players[i][0] === "null"){
                if(server.players[player_id] !== undefined){
                    map.removeLayer(server.players[player_id].marker)
                    delete server.players[player_id];
                }
                continue;
            }

            if(server.players[player_id] === undefined){
                server.players[player_id] = {
                    marker: null,
                    polyline: null,
                    gameid: players[i][0] + "#" + player_id,
                    timestamp,
                    vehicle: players[i][4],
                    job: players[i][5],
                    positions_cache: [],
                    positions_cache_last_index: 0,
                    color: randomColor2()
                }

                server.players[player_id].marker = L.marker(
                        [players[i][3].x, players[i][3].y],
                        {icon: generate_icon(players[i][4], players[i][5], 40)})
                    .addTo(map)
                    .bindPopup( generate_popup(players[i], server, server.players[player_id].color))
                    .bindTooltip( generate_job_tag(players[i][5]["group"], server.players[player_id].gameid), {
                        permanent: false,
                        offset: [0, -5],
                        opacity: 0.8,
                        direction: "top"
                }).setZIndexOffset(1000);
                
                if(options.current_trail_index !== 3 && players[i][6] && players[i][6].length > 1){
                    server.players[player_id].positions_cache_last_index = players[i][6][players[i][6].length - 1][0];

                    //reset the trail if distance between points is too long
                    for(let j = 0; j < players[i][6].length; j++){
                        const _currentPos = players[i][6][j];
                        const _nextPos = players[i][6][j+1];
                        
                        if(_nextPos && getDistance([_currentPos[1], _currentPos[2]], [_nextPos[1], _nextPos[2]]) > 200){
                            server.players[player_id].positions_cache.length = 0;
                        }else{
                            server.players[player_id].positions_cache.push([_currentPos[1], _currentPos[2]]);
                        }
                    }
                    // server.players[player_id].positions_cache = players[i][6].map(arr => [arr[1], arr[2]]);
                }
            
                server.players[player_id].polyline = L.polyline(server.players[player_id].positions_cache, {
                    color: server.players[player_id].color,
                    weight: 2
                }).addTo(map);

                //if trail was clicked, show who clicked
                server.players[player_id].polyline.on("click", e => {
                    server.players[player_id].marker.openPopup();
                    setTimeout(() => {
                        map.flyTo(server.players[player_id].marker._latlng, 7, {
                            animate: true,
                            duration: .5
                        });
                    }, 100);
                })
            }else{
                //TRAILS
                if(options.current_trail_index !== 3 && players[i][6] && players[i][6].length > 2){
                    // players[i][6].forEach(newpos => {
                    //     if(newpos[0] > server.players[player_id].positions_cache_last_index){
                    //         server.players[player_id].positions_cache.push([newpos[1], newpos[2]]);
                    //     }
                    // })

                    //reset the trail if distance between points is too long
                    for(let j = 0; j < players[i][6].length; j++){
                        if(players[i][6][j][0] <= server.players[player_id].positions_cache_last_index) continue;
                        const _currentPos = players[i][6][j];
                        const _nextPos = players[i][6][j+1];

                        if(_nextPos && getDistance([_currentPos[1], _currentPos[2]], [_nextPos[1], _nextPos[2]]) > 200){
                            server.players[player_id].positions_cache.length = 0;
                        }else{
                            server.players[player_id].positions_cache.push([_currentPos[1], _currentPos[2]]);
                        }
                    }

                    server.players[player_id].positions_cache_last_index = players[i][6][players[i][6].length - 1][0];
                }

                while(server.players[player_id].positions_cache.length > trail_modes[options.current_trail_index].value){
                    server.players[player_id].positions_cache.shift();
                }

                server.players[player_id].polyline.setLatLngs(server.players[player_id].positions_cache);
                server.players[player_id].timestamp = timestamp;

                // MARKER POSITION
                server.players[player_id].marker.setLatLng({ lat: players[i][3].x, lng: players[i][3].y });

                // POPUP UPDATE
                let refresh_popup = false;

                if(server.players[player_id].vehicle["vehicle_model"] !== players[i][4]["vehicle_model"]){
                    server.players[player_id].marker.setIcon( generate_icon(players[i][4], players[i][5]) );
                    server.players[player_id].vehicle = players[i][4];
                    refresh_popup = true;
                }

                if(server.players[player_id].job["name"] !== players[i][5]["name"]){
                    server.players[player_id].marker._tooltip.setContent( generate_job_tag(players[i][5]["group"], server.players[player_id].gameid) )
                    server.players[player_id].job = players[i][5];
                    refresh_popup = true;
                }

                if(refresh_popup || players[i][4]["vehicle_type"] === "plane" || players[i][4]["vehicle_type"] === "helicopter"){
                    server.players[player_id].marker.setPopupContent( generate_popup(players[i], server, server.players[player_id].color) );
                }
            }
        }

        server_cleanup(server);

        if(!server.timeout){
            server.timeout = setTimeout(() => {
                get_server_data(server);
                server.timeout = null;
            }, 6000);
        }

    }).catch(err=>{
        console.log(err);
        disable_server(server);
    });
}

function disable_server(server){
    server.checkbox.checked = false;
    server.disabled = true;
    if(server.timeout){
        clearTimeout(server.timeout);
        server.timeout = null;
    }
    server_cleanup(server, true);
}

function enable_server(server){
    server.checkbox.checked = true;
    server.disabled = false;
    if(!server.timeout){
        get_server_data(server);
    }
}

function servers_check_all(){
    for (const server_id in nova_servers) {
        if(nova_servers[server_id].disabled){
            enable_server(nova_servers[server_id]);
        }
    }
}

function servers_uncheck_all(){
    for (const server_id in nova_servers) {
        if(!nova_servers[server_id].disabled){
            disable_server(nova_servers[server_id]);
        }
    }
}

function server_cleanup(server, force_cleanup = false){
    for(const player_id in server.players){ //clean up players that left
        if(force_cleanup || server.players[player_id].timestamp < Date.now() - 49000){
            map.removeLayer(server.players[player_id].marker)
            if(server.players[player_id].polyline) map.removeLayer(server.players[player_id].polyline);
            delete server.players[player_id];
        }
    }
}

function generate_popup(data, server, color){
    return `<div class="popup-header" ${color ? `style="background-color: ${color}"` : ""}>${data[0]}</div>
        <b>ID:</b> ${data[2]}<hr>
        <b>Job:</b> ${(data[5].name || "N/A") + " " + generate_job_tag(data[5]["group"])}<hr>
        <b>Vehicle</b>: ${(data[4]["vehicle_label"] === "NULL"? "N/A" : 
                        `${data[4]["vehicle_name"]} (${vehicle_classes[data[4]["vehicle_class"]]})`)}<hr>
        ${data[4]["vehicle_type"] === "plane" || data[4]["vehicle_type"] === "helicopter" ? `<b>Height</b>: ${parseInt(data[3]['z'])}<hr>` : ''}
        
        <b>${server.name}</b> ${is_mobile_device ? "" : `<a href="fivem://connect/${server.ip}" title="Join: ${server.name}">JOIN</a>`}`;
}

function generate_job_tag(job, player_name_and_id = ""){
    return job_icons[job] === undefined ? player_name_and_id : job_icons[job] + player_name_and_id;
}