const job_icons = {
	conductor: "🚂",
	busdriver: "🚌",
	cargopilot: "✈️",
	pilot: "✈️",
	racer: "🏎️",
	emergency: "🚑",
	helicopterpilot: "🚁",
	fisher: "🦈",
	trucker: "🚛",
	hunter: "🐗",
	mechanic: "🛠️",
	farmer: "🚜",
	leisurepilot: "⛱️",
	miner: "⛏️",
	garbage: "🗑️",
	cleanup: "🏖️",
	postop: "✉️",
	delivery_ups: "📦",
	taxi: "🚕",
	firefighter: "🚒",
	quarry: "💎",
	metermaid: "🅿️",
	aerialfire: "🚒✈️",
	dockhandler: "⚓",
	delivery_transformer: "⚡",

	// "bat_trucker": `<img src='${company_emoji_folder}bat_tag.png'> `,
	frllc_paramedic: `<img src='${company_emoji_folder}frllc_tag.png'> `,
	collinsco_cabbie_job: `<img src='${company_emoji_folder}coco_tag.png'> `,
	collinsco_plane_job: `<img src='${company_emoji_folder}coco_tag.png'> `,
	collinsco_train_job: `<img src='${company_emoji_folder}coco_tag.png'> `,
	collinsco_metro_job: `<img src='${company_emoji_folder}coco_tag.png'> `,
	collinsco_boat_job: `<img src='${company_emoji_folder}coco_tag.png'> `,
	ia_pilot: `<img src='${company_emoji_folder}ia_tag.png'> `,
	delivery_iaa: `<img src='${company_emoji_folder}ia_tag.png'> `,
	rts_job: `<img src='${company_emoji_folder}rts_tag.png'> `,
	rts_job_air: `<img src='${company_emoji_folder}rts_tag.png'> `,
	rts_professional: `<img src='${company_emoji_folder}rts_tag.png'> `,
	pigs_job: `<img src='${company_emoji_folder}pigs_tag.png'> `,
};

/*
has_trailer: false
owned_vehicles: Object { car: "ikarus250" }
trailer: ""
vehicle_class: 17
vehicle_label: "IKARUS250"
vehicle_model: -1042115685
vehicle_name: "Ikarus 250 Bus"
vehicle_spawn: "ikarus250"
vehicle_type: "land"
*/

const vehicle_icons = {
	//vehicle class id
	0: emoji_folder + "1F697.png", // 0 Compacts
	1: emoji_folder + "1F697.png", // 1 Sedans
	2: emoji_folder + "1F699.png", // 2 SUVs
	3: emoji_folder + "1F697.png", // 3 Coupes
	4: emoji_folder + "1F697.png", // 4 Muscle
	5: emoji_folder + "1F697.png", // 5 Sports (old?)
	6: emoji_folder + "1F3CE.png", // 6 Sports
	7: emoji_folder + "1F3CE.png", // 7 Super
	8: emoji_folder + "1F3CD.png", // 8 Motorcycles
	9: emoji_folder + "1F699.png", // 9 Off-Road
	10: emoji_folder + "1F697.png", // 10 Industrial
	11: emoji_folder + "1F69A.png", // 11 Utility
	12: emoji_folder + "1F69A.png", // 12 Vans
	13: emoji_folder + "1F6B2.png", // 13 Cycles
	14: custom_emoji_folder + "boat.png", // 14 Boats
	15: emoji_folder + "1F681.png", // 15 Helicopters
	16: emoji_folder + "1F6EB.png", // 16 Planes
	17: emoji_folder + "1F697.png", // 17 Service
	18: emoji_folder + "1F693.png", // 18 Emergency
	19: custom_emoji_folder + "trucktrailer.png", // 19 Military
	20: custom_emoji_folder + "trucktrailer.png", // 20 Commercial
	21: emoji_folder + "1F682.png", // 21 Trains
	//other
	101: emoji_folder + "1F6B6-200D-2642-FE0F.png", //human walking
	102: emoji_folder + "1F6F8.png", //flying saucer
	103: emoji_folder + "1F68C.png", //bus
	104: emoji_folder + "1F69C.png", //tractor
	105: custom_emoji_folder + "trashtruck.png", //trash collector //temp trashcan
	106: custom_emoji_folder + "towtruck.png", //tow truck //temp beacon
	107: emoji_folder + "1F692.png", //firetruck
	108: emoji_folder + "1F691.png", //ambulance
	109: custom_emoji_folder + "firefighter_airplane.png", //aeral firefighter
	110: custom_emoji_folder + "excavator.png", //excavator
	111: emoji_folder + "1F69B.png", //non trailer truck
};

const vehicle_classes = [
	"Compacts",
	"Sedans",
	"SUVs",
	"Coupes",
	"Muscle",
	"Sports",
	"Sports",
	"Super",
	"Motorcycles",
	"Off-Road",
	"Industrial",
	"Utility",
	"Vans",
	"Cycles",
	"Boats",
	"Helicopters",
	"Planes",
	"Service",
	"Emergency",
	"Military",
	"Commercial",
	"Trains",
];

function generate_icon(vehicle, job, size = 40) {
	let iconUrl = vehicle_icons[vehicle["vehicle_class"]] || vehicle_icons[0]; //car

	if (vehicle["vehicle_type"] === "land") {
		if (vehicle["vehicle_class"] === 17) {
			if (/(bus|coach|ikarus)/i.test(vehicle["vehicle_label"])) {
				iconUrl = vehicle_icons[103];
			} else if (vehicle["vehicle_label"] === "TRASH") {
				iconUrl = vehicle_icons[105];
			}
		} else if (vehicle["vehicle_class"] === 18) {
			if (vehicle["vehicle_label"] === "FIRETRUK") {
				iconUrl = vehicle_icons[107];
			} else if (
				/(GRANGER|emsnspeedo|AMBULAN|RETROAMBU)/i.test(vehicle["vehicle_label"])
			) {
				iconUrl = vehicle_icons[108];
			}
		} else if (
			vehicle["vehicle_class"] === 11 &&
			/tractor/i.test(vehicle["vehicle_label"])
		) {
			iconUrl = vehicle_icons[104];
		} else if (vehicle["vehicle_class"] === 10) {
			if (vehicle["vehicle_label"] === "excavator") {
				iconUrl = vehicle_icons[110];
			} else if (/flatbed/i.test(vehicle["vehicle_label"])) {
				iconUrl = vehicle_icons[106];
			}
		} else if (
			vehicle["vehicle_class"] === 20 &&
			/mule/i.test(vehicle["vehicle_label"])
		) {
			iconUrl = vehicle_icons[111];
		}
	} else if (vehicle["vehicle_type"] === "plane") {
		if (job["group"] === "aerialfire") {
			iconUrl = vehicle_icons[109];
		} else {
			iconUrl = vehicle_icons[16];
		}
	} else if (vehicle["vehicle_type"] === "deluxo") {
		iconUrl = vehicle_icons[102];
	} else if (vehicle["vehicle_type"] === "helicopter") {
		iconUrl = vehicle_icons[15];
	} else if (vehicle["vehicle_type"] === "train") {
		iconUrl = vehicle_icons[21];
	} else if (vehicle["vehicle_type"] === "boat") {
		iconUrl = vehicle_icons[14];
	} else {
		iconUrl = vehicle_icons[101]; //on foot
	}

	return L.icon({
		iconUrl,
		iconSize: [size, size],
		iconAnchor: [20, 20],
		popupAnchor: [0, -20],
	});
}
