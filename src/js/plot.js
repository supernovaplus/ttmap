//hud
create_sideblock_item(
  "Custom Plot",
  [
    "input",
    {
      type: "button",
      className: "img-btn image-select-btn btn",
      value: "Show/Hide",
      onclick: () => {
        toggle_plot_window();
      },
    },
  ],
  [
    "div",
    { id: "plot-input", style: "display:none" },
    ["hr"],
    [
      "textarea",
      {
        id: "coordinates-input-window",
        style: "width: 170px",
        placeholder: "paste the coordinates here",
      },
    ],
    [
      "input",
      {
        type: "button",
        className: "btn img-btn",
        value: "try to plot the route",
        onclick: () => {
          convert_the_plot_coordinates();
        },
      },
    ],
    [
      "div",
      [
        "input",
        {
          type: "button",
          value: "clear",
          className: "btn img-btn",
          onclick: () => {
            clear_plotline(true);
          },
        },
      ],
      ["p", { id: "custom_plot_message", style: "margin: 0" }],
      [
        "input",
        {
          id: "known-routes-button",
          type: "button",
          value: "show known routes",
          className: "btn img-btn",
          style: "display:none; background-color:aquamarine",
          onclick: () => {
            toggle_known_routes();
          },
        },
      ],
      [
        "div",
        {
          id: "custom-lines-list",
          style: "display:none; color:black; background-color: aquamarine",
        },
      ],
    ],
  ]
);
const known_routes_block_div = document.getElementById("custom-lines-list");

function toggle_known_routes() {
  known_routes_block_div.style.display =
    known_routes_block_div.style.display === "none" ? "block" : "none";
}

// fetch("https://aca.lt/api_v1/snowplow/list.json").then(res=>res.json()).then(res=>{
//     // console.log(res);
//     const lines_div = document.getElementById("custom-lines-list");

//     lines_div.append(cel(["ul",...res.map(el => ["li",["a", {type: "src", href: "#", innerText: el[0], className: 'lines-list-item', onclick: () => {fetch_known_route(el[1])}}]])]))

//     document.getElementById("known-routes-button").style.display = "block";

// }).catch(err=>console.log(err));

function fetch_known_route(filename) {
  fetch("https://aca.lt/api_v1/snowplow/" + filename)
    .then((res) => res.text())
    .then((res) => {
      div_plot_textarea.value = res;
      convert_the_plot_coordinates();
    })
    .catch((err) => {
      console.log(err);
      div_custom_plot_message.innerText = "Server error";
    });
}

const div_custom_plot = document.getElementById("plot-input");
const div_custom_plot_message = document.getElementById("custom_plot_message");

// console.log(params.plot_url)

const div_plot_textarea = document.getElementById("coordinates-input-window");

function toggle_plot_window() {
  div_custom_plot.style.display =
    div_custom_plot.style.display === "none" ? "block" : "none";
}

div_plot_textarea.value = ``;

let custom_plot_line = null;
let custom_plot_line_joint = null;

function clear_plotline(clear_text = false) {
  if (custom_plot_line) {
    window.mainMap.removeLayer(custom_plot_line);
    window.mainMap.removeLayer(custom_plot_line_joint);
    custom_plot_line = null;
    custom_plot_line_joint = null;
  }
  if (clear_text === true) {
    div_plot_textarea.value = "";
    div_custom_plot_message.innerText = "";
  }
}

function convert_the_plot_coordinates() {
  let inital_string = div_plot_textarea.value;

  if (!inital_string || inital_string.length < 10) {
    div_custom_plot_message.innerText = "Invalid string";
  }

  const converted_data = [];
  let last_matched = "";
  let last_matched_counter = 0;
  while (inital_string) {
    try {
      let matched =
        /\{name = \"([\.a-zA-Z0-9\- \']+)\", x = (-?[0-9.]+), y = (-?[0-9.]+), z = (-?[0-9.]+), h = ([0-9.]+)\}/gm.exec(
          inital_string
        );

      if (matched) {
        // console.log(matched)
        if (
          matched[1] &&
          matched[2] &&
          matched[3] &&
          matched[4] &&
          !isNaN(matched[2]) &&
          !isNaN(matched[3]) &&
          !isNaN(matched[4])
        ) {
          converted_data.push({
            name: matched[1],
            x: parseFloat(matched[2]),
            y: parseFloat(matched[3]),
            h: parseFloat(matched[4]),
          });
        }

        if (last_matched_counter > 3) {
          break;
        } else if (matched[0] === last_matched) {
          last_matched_counter++;
        } else {
          last_matched_counter = 0;
        }
        last_matched = matched[0];

        inital_string = matched.input.replace(matched[1], "");
      } else {
        break;
      }
    } catch (err) {
      console.log(err);
      break;
    }
  }

  clear_plotline();

  if (converted_data.length > 1) {
    custom_plot_line = L.polyline(
      converted_data.map((m) => [m.x, m.y]),
      {
        color: "red",
        weight: 2,
      }
    ).addTo(window.mainMap);

    custom_plot_line_joint = L.polyline(
      [
        [converted_data[0].x, converted_data[0].y],
        [
          converted_data[converted_data.length - 1].x,
          converted_data[converted_data.length - 1].y,
        ],
      ],
      {
        color: "pink",
        weight: 2,
      }
    ).addTo(window.mainMap);

    const middle_index = parseInt(converted_data.length * 0.5);

    window.mainMap.flyTo(
      [converted_data[middle_index].x, converted_data[middle_index].y],
      5,
      {
        animate: true,
        duration: 0.5,
      }
    );

    div_custom_plot_message.innerText = "Done";
  } else {
    div_custom_plot_message.innerText = "Invalid data";
  }
}
