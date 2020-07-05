const jobsEmojiList = {
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

const vehicleIconList = {
    //vehicle class id
    0: emojiFolder+"E1C2.png", // 0 Compacts
    1: emojiFolder+"E1C2.png", // 1 Sedans
    2: emojiFolder+"1F699.png", // 2 SUVs
    3: emojiFolder+"E1C2.png", // 3 Coupes
    4: emojiFolder+"E1C2.png", // 4 Muscle
    5: emojiFolder+"E1C2.png",// 5 Sports (old?)
    6: emojiFolder+"1F3CE.png",// 6 Sports
    7: emojiFolder+"1F3CE.png",// 7 Super
    8: emojiFolder+"1F3CD.png",// 8 Motorcycles
    9: emojiFolder+"1F699.png",// 9 Off-Road
    10: emojiFolder+"E1C2.png",// 10 Industrial
    11: emojiFolder+"1F69A.png",// 11 Utility
    12: emojiFolder+"1F690.png",// 12 Vans
    13: emojiFolder+"1F6B2.png",// 13 Cycles
    14: emojiFolder+"1F6F6.png",// 14 Boats
    15: emojiFolder+"1F681.png",// 15 Helicopters
    16: emojiFolder+"1F6EB.png",// 16 Planes
    17: emojiFolder+"E1C2.png",// 17 Service
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
}

const vehicle_classes = ["Compacts", "Sedans", "SUVs", "Coupes", "Muscle", "Sports", "Sports", 
"Super", "Motorcycles", "Off-Road", "Industrial", "Utility", "Vans", "Cycles", 
"Boats", "Helicopters", "Planes", "Service", "Emergency", "Military", "Commercial", "Trains"];

function generateTag(job){
    return jobsEmojiList[job] === undefined ? "" : jobsEmojiList[job];
}

function generateIcon(vehicle,job){
    let iconlink = vehicleIconList[0]; //car

    if(vehicle["vehicle_type"] === "land"){
        if(vehicle["vehicle_class"] === 17){

            if(vehicle["vehicle_label"].match(/(bus|coach)/gi)){
                iconlink = vehicleIconList[103];

            }else if(vehicle["vehicle_label"] === "TRASH"){
                iconlink = vehicleIconList[105];

            }else{
                iconlink = vehicleIconList[ vehicle["vehicle_class"] ];
            }

        }else if(vehicle["vehicle_class"] === 11){
            if(vehicle["vehicle_label"].match(/tractor/gi)){
                iconlink = vehicleIconList[104];

            }else{
                iconlink = vehicleIconList[ vehicle["vehicle_class"] ];
            }


        }else if(vehicle["vehicle_class"] === 10){
            if(vehicle["vehicle_label"].match(/flatbed/gi)){
                iconlink = vehicleIconList[106];

            }else{
                iconlink = vehicleIconList[ vehicle["vehicle_class"] ];
            }

        }else{
            iconlink = vehicleIconList[ vehicle["vehicle_class"] ];
        }
        

    }else if(vehicle["vehicle_type"] === "plane"){
        iconlink = vehicleIconList[16];

    }else if(vehicle["vehicle_type"] === "deluxo"){
        iconlink = vehicleIconList[102];

    }else if(vehicle["vehicle_type"] === "helicopter"){
        iconlink = vehicleIconList[15];

    }else if(vehicle["vehicle_type"] === "train"){
        iconlink = vehicleIconList[21];

    }else if(vehicle["vehicle_type"] === "boat"){
        iconlink = vehicleIconList[14];

    }else{
        iconlink = vehicleIconList[101];//on foot
        
    }

    return L.icon({
        iconUrl: iconlink,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    });;
}
