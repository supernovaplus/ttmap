const job_icons = {
    "conductor": "🚂",
    "busdriver": "🚌",
    "cargopilot": "✈️",
    "pilot": "✈️",
    "racer": "🏎️",
    "emergency": "🚑",
    "helicopterpilot": "🚁",
    "fisher": "🦈",
    "trucker": "🚛",
    "hunter": "🐗",
    "mechanic": "🛠️",
    "farmer": "🚜",
    "leisurepilot": "⛱️",
    "miner": "⛏️",
    "garbage": "🗑️",
    "cleanup": "🏖️",
    "postop": "✉️",
    "delivery_ups": "📦",
    "taxi": "🚕",
    "firefighter": "🚒",

    // "bat_trucker": `<img src='${customEmojiFolder}bat_tag.png'> `,
    "frllc_paramedic": `<img src='${customEmojiFolder}frllc_tag.png'> `,
    "collinsco_cabbie_job": `<img src='${customEmojiFolder}coco_tag.png'> `,
    "collinsco_plane_job": `<img src='${customEmojiFolder}coco_tag.png'> `,
    "collinsco_train_job": `<img src='${customEmojiFolder}coco_tag.png'> `,
    "collinsco_metro_job": `<img src='${customEmojiFolder}coco_tag.png'> `,
    "ia_pilot": `<img src='${customEmojiFolder}ia_tag.png'> `,
    "delivery_iaa": `<img src='${customEmojiFolder}ia_tag.png'> `,
    "rts_job": `<img src='${customEmojiFolder}rts_tag.png'> `,
    "rts_job_air": `<img src='${customEmojiFolder}rts_tag.png'> `,
    "rts_professional": `<img src='${customEmojiFolder}rts_tag.png'> `,
    "pigs_job": `<img src='${customEmojiFolder}pigs_tag.png'> `,
}

const vehicle_icons = {
    //vehicle class id
    0: emojiFolder+"1F697.png", // 0 Compacts
    1: emojiFolder+"1F697.png", // 1 Sedans
    2: emojiFolder+"1F699.png", // 2 SUVs
    3: emojiFolder+"1F697.png", // 3 Coupes
    4: emojiFolder+"1F697.png", // 4 Muscle
    5: emojiFolder+"1F697.png",// 5 Sports (old?)
    6: emojiFolder+"1F3CE.png",// 6 Sports
    7: emojiFolder+"1F3CE.png",// 7 Super
    8: emojiFolder+"1F3CD.png",// 8 Motorcycles
    9: emojiFolder+"1F699.png",// 9 Off-Road
    10: emojiFolder+"1F697.png",// 10 Industrial
    11: emojiFolder+"1F69A.png",// 11 Utility
    12: emojiFolder+"1F690.png",// 12 Vans
    13: emojiFolder+"1F6B2.png",// 13 Cycles
    14: emojiFolder+"1F6F6.png",// 14 Boats
    15: emojiFolder+"1F681.png",// 15 Helicopters
    16: emojiFolder+"1F6EB.png",// 16 Planes
    17: emojiFolder+"1F697.png",// 17 Service
    18: emojiFolder+"1F693.png", // 18 Emergency
    19: emojiFolder+"1F69B.png", // 19 Military
    20: emojiFolder+"1F69A.png", // 20 Commercial
    21: emojiFolder+"1F682.png", // 21 Trains
    //other
    101: emojiFolder+"1F6B6-200D-2642-FE0F.png",//human walking
    102: emojiFolder+"1F6F8.png",//flying saucer
    103: emojiFolder+"1F68C.png",//bus
    104: emojiFolder+"1F69C.png",//tractor
    105: emojiFolder+"1F5D1.png",//trash collector //temp trashcan
    106: emojiFolder+"1F6A8.png",//tow truck //temp beacon
    107: emojiFolder+"1F692.png",//firetruck
}

const bussness_icons = {
    "Business": `${customEmojiFolder}22px-Business_Owned.png`,
    "Watercraft Garage": `${customEmojiFolder}25px-Boat_Garage.png`,
    "Helicopter Garage": `${customEmojiFolder}25px-Helicopter_Garage.png`,
    "Aircraft Garage": `${customEmojiFolder}25px-Aircraft_Garage.png`,
    "Vehicle Garage": `${customEmojiFolder}25px-Garage.png`,
    "Car Garage": `${customEmojiFolder}25px-Garage.png`,
    "Self Storage": `${customEmojiFolder}22px-Self_Storage.png`,
    "point": `${customEmojiFolder}point22px.png`,
}

const vehicle_classes = ["Compacts", "Sedans", "SUVs", "Coupes", "Muscle", "Sports", "Sports", 
"Super", "Motorcycles", "Off-Road", "Industrial", "Utility", "Vans", "Cycles", 
"Boats", "Helicopters", "Planes", "Service", "Emergency", "Military", "Commercial", "Trains"];

function generate_icon(vehicle, job, size = 40){
    let iconlink = vehicle_icons[0]; //car

    if(vehicle["vehicle_type"] === "land"){
        if(vehicle["vehicle_class"] === 17){

            if(vehicle["vehicle_label"].match(/(bus|coach)/gi)){
                iconlink = vehicle_icons[103];

            }else if(vehicle["vehicle_label"] === "TRASH"){
                iconlink = vehicle_icons[105];

            }else{
                iconlink = vehicle_icons[ vehicle["vehicle_class"] ];
            }
        }else if(vehicle["vehicle_class"] === 18 && vehicle["vehicle_label"] === "FIRETRUK"){
            iconlink = vehicle_icons[107];
        }else if(vehicle["vehicle_class"] === 11 && vehicle["vehicle_label"].match(/tractor/gi)){
            iconlink = vehicle_icons[104];
        }else if(vehicle["vehicle_class"] === 10 && vehicle["vehicle_label"].match(/flatbed/gi)){
            iconlink = vehicle_icons[106];
        }else{
            iconlink = vehicle_icons[ vehicle["vehicle_class"] ];
        }

    }else if(vehicle["vehicle_type"] === "plane"){
        iconlink = vehicle_icons[16];

    }else if(vehicle["vehicle_type"] === "deluxo"){
        iconlink = vehicle_icons[102];

    }else if(vehicle["vehicle_type"] === "helicopter"){
        iconlink = vehicle_icons[15];

    }else if(vehicle["vehicle_type"] === "train"){
        iconlink = vehicle_icons[21];

    }else if(vehicle["vehicle_type"] === "boat"){
        iconlink = vehicle_icons[14];

    }else{
        iconlink = vehicle_icons[101];//on foot
    }

    return L.icon({
        iconUrl: iconlink,
        iconSize: [size, size],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    });
}
