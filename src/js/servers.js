const nova_servers = {};

const trail_modes = [
  // Trails values represent number of updates to keep
  { name: "Infinite", title: "no limit", value: Infinity },
  // { name: "Extreme", title: "1 hour", value: 600 },
  { name: "Long", title: "30 minutes", value: 300 },
  { name: "Medium", title: "15 minutes", value: 150 },
  { name: "Short", title: "5 minutes", value: 50 },
  { name: "Tiny", title: "1 minute", value: 10 },
  { name: "Tiny+", title: "30 seconds", value: 5 },
  { name: "Tiny++", title: "6 seconds", value: 1 },
  { name: "None", title: "none", value: 0 },
];

const animation_speed_options = [
  { name: "Slow (default)", value: 6250 },
  { name: "Medium", value: 3000 },
  { name: "Fast", value: 500 },
];

fetch(base_folder + "data/serversList.json")
  .then((res) => res.json())
  .then(async (servers_list) => {
    //hud
    create_sideblock_item("Options", [
      "div",
      { className: "options-block" },
      ["div", { innerText: "Trail length", className: "options-title" }],
      [
        "select",
        { onchange: (e) => handle_trail_mode_change(Number(e.target.value)) },
        ...trail_modes.map((trail, index) => [
          "option",
          {
            value: index,
            innerText: `${trail.name} (${trail.title})`,
            selected: index === options.current_trail_index,
          },
        ]),
      ],
      ["div", { innerText: "Animation speed", className: "options-title" }],
      [
        "select",
        {
          onchange: (e) =>
            handle_animation_speed_change(Number(e.target.value)),
        },
        ...animation_speed_options.map((trail, index) => [
          "option",
          {
            value: index,
            innerText: `${trail.name}`,
            selected: index === options.current_animation_speed_index,
          },
        ]),
      ],
    ]);

    create_sideblock_item(
      "Find Player",
      [
        "input",
        {
          type: "text",
          id: "find-player-input",
          placeholder: "enter player's id or name",
          onkeydown: ({ keyCode, target }) => {
            if (keyCode === 13) {
              handle_find_player_button(target.nextSibling);
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
          onclick: (e) => handle_find_player_button(e.target),
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
      enable_server(Object.values(nova_servers)[0]);
    }
  })
  .catch((err) => {
    console.log(err);
  });

//activity detection - pause the map after 30 minutes
let inactivity_timer_last_active_at = Date.now();
function inactivity_timer_reset() {
  inactivity_timer_last_active_at = Date.now();
}

//check last activity every minute, pause if it's longer than 30 minutes
if (!params.alwaysactive) {
  setInterval(() => {
    const diff = Date.now() - inactivity_timer_last_active_at;
    if (diff > 1000 * 60 * max_inactivity_time_in_minutes) {
      // check if it's longer than 30 minutes
      const is_any_server_active = Object.values(nova_servers).some(
        (server) => !server.disabled
      );

      if (is_any_server_active) {
        alert(
          `Paused after ${max_inactivity_time_in_minutes} minutes due to inactivity... \nWasting my charges is not nice.`
        );
        servers_uncheck_all();
      }

      inactivity_timer_reset();
    }
  }, 1000 * 60); //every minute check time difference

  document.addEventListener("click", inactivity_timer_reset);
  document.addEventListener("wheel", inactivity_timer_reset);

  // document.addEventListener("visibilitychange", function() {
  //   if (document.hidden) {
  //       console.log("User has switched to another tab.");
  //   } else {
  //       console.log("User is viewing your website.");
  //   }
  // });
}

function handle_find_player_button(input) {
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

    window.mainMap.flyTo(found.prevAnimation.__marker._latlng, 7, {
      animate: true,
      duration: 0.5,
    });

    setTimeout(() => {
      found.prevAnimation.openPopup();
    }, 100);

    // found._popup.openOn(map)
    return false;
  } else {
    input.previousSibling.style.backgroundColor = "red";
  }
}

function handle_trail_mode_change(index) {
  options.current_trail_index = index;
  if (get_current_trail_value() >= max_inactivity_time_in_minutes * 10) {
    alert(
      `Keep in mind that the map will pause after ${max_inactivity_time_in_minutes} minutes if you become inactive`
    );
  }
  save_options();
}

function handle_animation_speed_change(index) {
  options.current_animation_speed_index = index;
  save_options();
}

function get_current_trail_value() {
  return trail_modes[options.current_trail_index].value;
}

function get_current_animation_speed_value() {
  return animation_speed_options[options.current_animation_speed_index].value;
}

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
            clean_player(server, player_id);
          }
          continue;
        }

        // New player
        if (server.players[player_id] === undefined) {
          server.players[player_id] = {
            gameid: currentPlayer[0] + "#" + player_id,
            timestamp,
            vehicle: currentPlayer[4],
            job: currentPlayer[5],
            positions_last_index: 0,
            color: randomColor2(),
            prevAnimation: null,
            prevLines: [],
            lastPos: null,
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
          if (
            server.players[player_id].lastPos &&
            server.players[player_id].lastPos.x === currentPlayer[3].x &&
            server.players[player_id].lastPos.y === currentPlayer[3].y &&
            server.players[player_id].lastPos.z === currentPlayer[3].z &&
            server.players[player_id].lastPos.h === currentPlayer[3].h
          ) {
            continue;
          }

          const posRoute = generateRoute(
            posHist,
            server,
            currentPlayer,
            player_id
          );

          const popupOffset = get_offset_from_heading(
            currentPlayer[3].h,
            150,
            currentPlayer[4]["vehicle_label"] === "NULL" ? 90 : 130
          );

          const posPolyline = generatePolyline(
            posRoute,
            server,
            currentPlayer,
            player_id,
            popupOffset
          );

          const last_anim = server.players[player_id]?.prevAnimation;
          transitionAnimation(server, player_id, posPolyline, last_anim);
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

function generateRoute(posHist, server, currentPlayer, player_id) {
  let posRoute = [];
  for (let i = 0; i < posHist.length; i++) {
    const currentPost = posHist[i];
    if (currentPost[0] < server.players[player_id].positions_last_index)
      continue;
    posRoute.push({
      lat: currentPost[1],
      lng: currentPost[2],
    });
  }

  server.players[player_id].lastPos = {
    x: currentPlayer[3].x,
    y: currentPlayer[3].y,
    z: currentPlayer[3].z,
    h: currentPlayer[3].h,
  };

  server.players[player_id].positions_last_index =
    posHist[posHist.length - 1][0];

  posRoute = posRoute.concat(
    new Array(posRoute.length > 0 ? 1 : 2).fill({
      lat: currentPlayer[3].x,
      lng: currentPlayer[3].y,
    })
  );

  return posRoute;
}

function generatePolyline(
  posRoute,
  server,
  currentPlayer,
  player_id,
  popupOffset
) {
  return L.motion
    .polyline(
      posRoute,
      {
        color:
          get_current_trail_value() == 0
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
    .motionDuration(get_current_animation_speed_value())
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
        server.players[player_id].color,
        popupOffset[0]
      ),
      {
        offset: popupOffset,
      }
    );
}

function transitionAnimation(server, player_id, posPolyline, last_anim) {
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

    last_anim.motionStop();
  }

  while (
    server.players[player_id].prevLines.length - 1 >
    get_current_trail_value()
  ) {
    server.players[player_id].prevLines
      .shift()
      .motionStop()
      .removeFrom(window.mainMap);
  }
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
      server.players[player_id].timestamp < Date.now() - 60000
    ) {
      clean_player(server, player_id);
    }
  }
}

function clean_player(server, player_id) {
  while (server.players[player_id].prevLines.length > 0) {
    server.players[player_id].prevLines
      .shift()
      .motionStop()
      .removeFrom(window.mainMap);
  }
  delete server.players[player_id];
}

function generate_popup(data, server, color, xoffset) {
  const spawn_label =
    data[4]["vehicle_label"] === "NULL"
      ? ""
      : String(data[4]["vehicle_label"]).toLowerCase().replace(/ /g, "_");

  return ` ${get_directional_arrow(xoffset, color)}
  <div class="popup-header" ${
    color ? `style="background-color: ${color}"` : ""
  }>${data[0]}</div>
        <b>ID:</b> ${data[2]}<hr>
        <b>Job:</b> ${
          (data[5].name || "N/A") + " " + generate_job_tag(data[5]["group"])
        }<hr>
        ${
          data[4]["vehicle_type"] === "plane" ||
          data[4]["vehicle_type"] === "helicopter"
            ? `<b>Height</b>: ${parseInt(data[3]["z"])}m.<hr>`
            : ""
        }
        <div class="popup-vehicle-label">
        <b>Vehicle</b>: ${
          data[4]["vehicle_label"] === "NULL"
            ? "N/A"
            : `${data[4]["vehicle_name"]} (${
                vehicle_classes[data[4]["vehicle_class"]]
              })`
        }</div>
        ${
          data[4]["vehicle_label"] === "NULL"
            ? ""
            : `<hr><a href="https://cdn.tycoon.community/dealership/vehicles/${data[4]["vehicle_spawn"]}.png" target="_blank" class="car-img-link"><img src="https://ttdata.transporttycoon.eu/vehicles/veh_images_min/${data[4]["vehicle_spawn"]}.jpg" class="veh-img" alt="${spawn_label}" onerror="this.src = 'https://ttdata.transporttycoon.eu/vehicles/veh_images_min/unk.jpg';" /></a>`
        }
        <hr>
        <b>${server.name}</b> ${
    is_mobile_device
      ? ""
      : `<a href="fivem://connect/cfx.re/join/${server.endpoint}" title="Join: ${server.name}" class="join-btn">JOIN</a>`
  }`;
}

function on_vehicle_image_load_error(e) {
  e.parentElement.outerHTML = `<span style="color:gray;">no vehicle image found</span>`;
}

function generate_job_tag(job, player_name_and_id = "") {
  return job_icons[job] === undefined
    ? player_name_and_id
    : job_icons[job] + player_name_and_id;
}

function get_offset_from_heading(heading, offsetx, offsety) {
  const x = Math.cos(((heading + 90) * Math.PI) / 180);
  const y = Math.sin(((heading + 90) * Math.PI) / 180);
  // when player moving very north or south, popup closer in x axis
  const aoffsetx = Math.abs(y) > 0.5 ? offsetx * 0.85 : offsetx;

  if (x < 0) {
    // offset to the left
    return [aoffsetx, offsety];
  }
  // to the right
  return [-aoffsetx, offsety];
}

function get_directional_arrow(xoffset, color) {
  return `<span class="popup-directional-arrow" style="${
    xoffset < 0
      ? `border-left: 10px solid ${color}; right: -10px;`
      : `border-right: 10px solid ${color}; left: -10px;`
  }"></span>`;
}
