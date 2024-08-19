const nova_servers = {};

const trail_modes = [
	// Trails values represent number of updates to keep
	{ name: "Infinite", title: "Forever", value: Infinity },
	{ name: "MASSIVE", title: "3 Hours", value: 1800 },
	{ name: "EXTREME", title: "1 Hour", value: 600 },
	{ name: "LONG", title: "30 Minutes", value: 300 },
	{ name: "MEDIUM", title: "15 Minutes", value: 150 },
	{ name: "SHORT", title: "5 Minutes", value: 50 },
	{ name: "NONE", title: "No Trail", value: 0 },
];

function handle_find_player(input) {
	if (!input.previousSibling.value) return;
	const search_for = String(input.previousSibling.value).toLowerCase();
	let found;

	for (const server_id in nova_servers) {
		if (found) break;
		if (!nova_servers[server_id].disabled) {
			for (const player_id in nova_servers[server_id]["players"]) {
				if (
					String(nova_servers[server_id]["players"][player_id]["gameid"])
						.toLowerCase()
						.includes(search_for)
				) {
					found = nova_servers[server_id]["players"][player_id];
					break;
				}
			}
		}
	}

	if (found) {
		input.previousSibling.style.backgroundColor = "lime";

		window.mainMap.flyTo(found.marker._latlng, 7, {
			animate: true,
			duration: 0.5,
		});

		setTimeout(() => {
			found.marker.openPopup();
		}, 100);

		// found._popup.openOn(map)
		return false;
	} else {
		input.previousSibling.style.backgroundColor = "red";
	}
}

function toggle_trail_mode(index) {
	options.current_trail_index = index;
	save_options();
	refresh_trail_mode_buttons();
}

function get_trail_value() {
	return trail_modes[options.current_trail_index].value;
}

function refresh_trail_mode_buttons() {
	let index = 0;
	for (const trail_button of document.querySelectorAll(".trails-btn")) {
		if (index === options.current_trail_index) {
			trail_button.classList.add("selected");
		} else {
			trail_button.classList.remove("selected");
		}
		index++;
	}
}

fetch(base_folder + "data/serversList.json")
	.then((res) => res.json())
	.then(async (servers_list) => {
		//hud
		create_sideblock_item(
			"Trail Mode",
			...trail_modes.map((trail, index) => [
				"input",
				assign_hud_hover_event({
					type: "button",
					className: "img-btn grow-item trails-btn",
					_title: trail.title,
					value: trail.name,
					onclick: () => toggle_trail_mode(index),
				}),
			])
		);

		refresh_trail_mode_buttons();

		create_sideblock_item(
			"Find Player",
			[
				"input",
				{
					type: "text",
					id: "find-player-input",
					placeholder: "Enter player's ID or name",
					onkeydown: ({ keyCode, target }) => {
						if (keyCode === 13) {
							handle_find_player(target.nextSibling);
						}
					},
				},
			],
			[
				"input",
				{
					type: "button",
					className: "btn img-btn",
					value: "Find",
					onclick: (e) => handle_find_player(e.target),
				},
			]
		);

		create_sideblock_item(
			"Servers",
			["div", { id: "servers" }],
			// ['input', {type: 'button', className: 'btn img-btn', onclick: (e) => {
			//     e.target.disabled = true;
			//     setTimeout(() => {
			//         e.target.disabled = false;
			//     }, 6000);
			//     servers_check_all()
			//     }, value: 'Check All'}],
			// ['br'],
			[
				"input",
				{
					type: "button",
					className: "btn img-btn",
					onclick: (e) => {
						e.target.disabled = true;
						setTimeout(() => {
							e.target.disabled = false;
						}, 6000);
						servers_uncheck_all();
					},
					value: "Uncheck All (Hide Players)",
					style: `width: -moz-available;`,
				},
			]
		);
		//hud end

		const servers_div = document.getElementById("servers");

		for (let i = 0; i < servers_list.length; i++) {
			const checkbox_block = cel([
				"div",
				{ className: "servercheckbox" },
				// ['input', {type: 'checkbox', checked: !params["hideplayers"]}],
				["input", { type: "checkbox", checked: false }],
				["span", { innerText: servers_list[i][0] }],
				is_mobile_device === false
					? [
							"a",
							assign_hud_hover_event({
								href: "fivem://connect/cfx.re/join/" + servers_list[i][1],
								_title: "Join: " + servers_list[i][1],
								innerText: "🎮",
							}),
					  ]
					: [],
			]);

			servers_div.appendChild(checkbox_block);

			nova_servers[servers_list[i][1]] = {
				name: servers_list[i][0],
				endpoint: servers_list[i][1],
				players: {},
				timestamp: 0,
				checkbox: checkbox_block.firstElementChild,
				disabled: true,
				timeout: null,
			};

			nova_servers[servers_list[i][1]].checkbox.addEventListener(
				"change",
				() => {
					if (nova_servers[servers_list[i][1]].disabled) {
						enable_server(nova_servers[servers_list[i][1]]);
					} else {
						disable_server(nova_servers[servers_list[i][1]]);
					}
				}
			);
		}

		if (!params["hideplayers"]) {
			//if OS is on, only check the os, else scan all the servers
			// const first_server_id = Object.keys(nova_servers)[0];

			enable_server(Object.values(nova_servers)[0]);

			// if(window.location.protocol === "https:"){
			//     enable_server(Object.values(nova_servers)[0]);
			// }else{
			//     fetch(`http://${nova_servers[first_server_id].endpoint}/status/widget/players.json`).then(res=>res.json()).then(res=>{
			//         if(res && res.players && res.players.length > 0){
			//             enable_server(nova_servers[first_server_id])
			//         }else{
			//             disable_server(nova_servers[first_server_id]);
			//         }

			//     }).catch(err=>{
			//         disable_server(nova_servers[first_server_id]);

			//         //scan servers via keyless api for disabled servers or servers with 0 player count;
			//         // for (const server_id in nova_servers) {
			//         //     if(server_id === first_server_id) continue;
			//         //     fetch(`http://${nova_servers[server_id].endpoint}/status/widget/players.json`).then(res=>res.json()).then(res=>{
			//         //         if(res && res.players && res.players.length > 0){
			//         //             enable_server(nova_servers[server_id])
			//         //         }else{
			//         //             disable_server(nova_servers[server_id]);
			//         //         }
			//         //     }).catch(err=>{
			//         //         disable_server(nova_servers[server_id]);
			//         //     });
			//         // }
			//     });
			// }
		}
	})
	.catch((err) => {
		console.log(err);
	});

function continue_scanning(server) {
	if (!server.timeout) {
		server.timeout = setTimeout(() => {
			get_server_data(server);
			server.timeout = null;
		}, 6000);
	}
}

function get_server_data(server) {
	if (server.disabled === true) return;
	// fetch("http://localhost:5000/positions/" + server.endpoint).then(res=>res.json()).then(res => {
	fetch("https://d.ttstats.eu/positions/" + server.endpoint)
		.then((res) => res.json())
		.then((res) => {
			if (
				!res.data ||
				res.error ||
				res.data.players.length === 0 ||
				server.disabled === true
			) {
				console.log(
					server.name,
					res.error ? res.error : "no res data / no players / checkbox unmarked"
				);
				// disable_server(server);
				continue_scanning(server);
				return;
			}

			const timestamp = Date.now();
			server.timestamp = timestamp;
			const players = res.data.players;

			for (let i = 0; i < players.length; i++) {
				/**
				 * 0: Username
				 *
				 * 1: srcId
				 *
				 * 2: VRP ID
				 *
				 * 3: Positions in {x, y, z, h}
				 *
				 * 4: Vehicle in {vehicle_type, vehicle_label, vehicle_name, has_trailer, vehicle_spawn, trailer, }
				 *
				 * 5: Job in {name, group}
				 *
				 * 6: Position History in [[incremental index, x, y, z, h], ...]
				 */
				const currentPlayer = players[i];
				if (currentPlayer[3] === null) continue;

				const player_id = currentPlayer[2];

				if (currentPlayer[0] === "null") {
					if (server.players[player_id] !== undefined) {
						window.mainMap.removeLayer(server.players[player_id].marker);
						delete server.players[player_id];
					}
					continue;
				}

				// New player
				if (server.players[player_id] === undefined) {
					server.players[player_id] = {
						marker: null,
						gameid: currentPlayer[0] + "#" + player_id,
						timestamp,
						vehicle: currentPlayer[4],
						job: currentPlayer[5],
						positions_last_index: 0,
						color: randomColor2(),
						prevAnimation: null,
						prevLines: [],
					};
				} else {
					// Existing player

					server.players[player_id].timestamp = timestamp;

					if (
						server.players[player_id].vehicle["vehicle_model"] !==
						currentPlayer[4]["vehicle_model"]
					) {
						server.players[player_id].vehicle = currentPlayer[4];
					}
				}

				const posHist = currentPlayer[6];
				if (posHist && posHist.length) {
					const posRoute = [];
					for (let i = 0; i < posHist.length; i++) {
						const currentPost = posHist[i];
						if (currentPost[0] < server.players[player_id].positions_last_index)
							continue;
						posRoute.push({
							lat: currentPost[1],
							lng: currentPost[2],
						});
					}
					server.players[player_id].positions_last_index =
						posHist[posHist.length - 1][0];
					posRoute.push({ lat: currentPlayer[3].x, lng: currentPlayer[3].y });

					const posPolyline = L.motion
						.polyline(
							posRoute,
							{
								color:
									get_trail_value() == 0
										? "hsla(0, 0%, 0%, 0)" // invisible
										: server.players[player_id].color,
								smoothFactor: 0.3,
							},
							{},
							{
								icon: generate_icon(currentPlayer[4], currentPlayer[5], 40),
								removeOnEnd: false,
								// showMarker: true,
							}
						)
						.motionDuration(6250);
					posPolyline
						.addTo(window.mainMap)
						.bindTooltip(
							generate_job_tag(
								currentPlayer[5]["group"],
								server.players[player_id].gameid
							),
							{ sticky: true }
						)
						.bindPopup(
							generate_popup(
								currentPlayer,
								server,
								server.players[player_id].color
							),
							{
								offset: [
									-Math.cos(
										(Math.PI * (currentPlayer[3].h + 90)) / 180
									).toFixed(5) * 150,
									currentPlayer[3].h <= 45 || currentPlayer[3].h >= 315 // when going northish, popup far below icon
										? currentPlayer[4]["vehicle_label"] === "NULL"
											? 200
											: 300 // TODO: AND flip the popup arrow
										: Math.sin(
												(Math.PI * (currentPlayer[3].h + 90)) / 180
										  ).toFixed(5) * 75,
								],
							}
						);

					// console.log(posPolyline.removeFrom(window.mainMap));
					const last_anim = server.players[player_id]?.prevAnimation;
					// console.log(posPolyline);
					server.players[player_id].prevAnimation = posPolyline.motionStart();
					server.players[player_id].prevLines.push(posPolyline);

					if (last_anim) {
						if (last_anim.isPopupOpen()) {
							last_anim.closePopup();
							posPolyline.openPopup();
						}
						if (last_anim.isTooltipOpen()) {
							last_anim.closeTooltip();
							posPolyline.openTooltip();
						}
						// console.log(last_anim);

						last_anim.motionStop();
					}
					if (
						server.players[player_id].prevLines.length - 1 >
						get_trail_value()
					) {
						server.players[player_id].prevLines
							.shift()
							.motionStop()
							.removeFrom(window.mainMap);
					}
				}
			}

			server_cleanup(server);
			continue_scanning(server);
		})
		.catch((err) => {
			console.log(err);
			// disable_server(server);
			continue_scanning(server);
		});
}

function disable_server(server) {
	server.checkbox.checked = false;
	server.disabled = true;
	if (server.timeout) {
		clearTimeout(server.timeout);
		server.timeout = null;
	}
	server_cleanup(server, true);
}

function enable_server(server) {
	server.checkbox.checked = true;
	server.disabled = false;
	if (!server.timeout) {
		get_server_data(server);
	}
}

function servers_check_all() {
	for (const server_id in nova_servers) {
		if (nova_servers[server_id].disabled) {
			enable_server(nova_servers[server_id]);
		}
	}
}

function servers_uncheck_all() {
	for (const server_id in nova_servers) {
		if (!nova_servers[server_id].disabled) {
			disable_server(nova_servers[server_id]);
		}
	}
}

function server_cleanup(server, force_cleanup = false) {
	for (const player_id in server.players) {
		//clean up players that left
		if (
			force_cleanup ||
			server.players[player_id].timestamp < Date.now() - 49000
		) {
			window.mainMap.removeLayer(server.players[player_id].marker);
			delete server.players[player_id];
		}
	}
}

function generate_popup(data, server, color) {
	const spawn_label =
		data[4]["vehicle_label"] === "NULL"
			? ""
			: String(data[4]["vehicle_label"]).toLowerCase().replace(/ /g, "_");

	return `<div class="popup-header" ${
		color ? `style="background-color: ${color}"` : ""
	}>${data[0]}</div>
        <b>ID:</b> ${data[2]}<hr>
        <b>Job:</b> ${
					(data[5].name || "N/A") + " " + generate_job_tag(data[5]["group"])
				}<hr>
        ${
					data[4]["vehicle_type"] === "plane" ||
					data[4]["vehicle_type"] === "helicopter"
						? `<b>Height</b>: ${parseInt(data[3]["z"])}<hr>`
						: ""
				}
        <b>Vehicle</b>: ${
					data[4]["vehicle_label"] === "NULL"
						? "N/A"
						: `${data[4]["vehicle_name"]} (${
								vehicle_classes[data[4]["vehicle_class"]]
						  })`
				}
        ${
					data[4]["vehicle_label"] === "NULL"
						? ""
						: `<hr><a href="https://cdn.tycoon.community/dealership/vehicles/${spawn_label}.png" target="_blank" class="car-img-link"><img src="https://cdn.tycoon.community/dealership/vehicles/${spawn_label}.png" class="veh-img" alt="[no vehicle image found]"/></a>`
				}
        <hr>
        <b>${server.name}</b> ${
		is_mobile_device
			? ""
			: `<a href="fivem://connect/cfx.re/join/${server.endpoint}" title="Join: ${server.name}" class="join-btn">JOIN</a>`
	}`;
}

function generate_job_tag(job, player_name_and_id = "") {
	return job_icons[job] === undefined
		? player_name_and_id
		: job_icons[job] + player_name_and_id;
}
