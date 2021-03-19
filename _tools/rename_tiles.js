const fs = require("fs");
// for photoshop adapting the tiles

// const imagesLocatedAt = "../images/maps/tiles/color/";
const imagesLocatedAt = "../images/maps/imagesc/"; //must end with "/"
const moveToFolderAt = "../images/maps/color-mode-tiles/";

//dark-mode-tiles

const tileSize = 288;
const suffix = ".jpg";
const startResolution = 9216;
const maxZoom = 7;
const minZoom = 2;

if(!fs.existsSync(imagesLocatedAt)){
    return console.log("folder/files do not exists?")
}
const total_files = fs.readdirSync(imagesLocatedAt).length;

for (let    index = maxZoom, resolution = startResolution; 
            index > minZoom; 
            index--, resolution *= 0.5) {

    console.log(index, resolution)
    convert_names("" + index + "_", resolution);
}

try{
    fs.renameSync(`${imagesLocatedAt}${minZoom}${suffix}`, `${imagesLocatedAt}${minZoom}_0_0${suffix}`);
}catch(err){}

if(moveToFolderAt){
    fs.renameSync(imagesLocatedAt, moveToFolderAt);
}


function convert_names(prefix = "7_", resolution = 9216){
    const column_count = resolution / tileSize;
    for (let i = 0, row = 0; i < total_files; i++) {
        const column = (i % (column_count));
        let old_file_name = prefix + (i < 9 ? "0" + (i + 1) : "" + (i + 1)) + suffix;

        console.log(`${imagesLocatedAt}${old_file_name}`, `${imagesLocatedAt}${prefix}${column}_${row}${suffix}`);
        try{
            fs.renameSync(`${imagesLocatedAt}${old_file_name}`, `${imagesLocatedAt}${prefix}${column}_${row}${suffix}`);
        }catch(err){}

        if(column === column_count - 1){
            row++;
        }
    }
}