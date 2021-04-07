const gulp       =  require('gulp');
const concat     =  require('gulp-concat');
// const sourcemaps =  require('gulp-sourcemaps');
const minify =      require('gulp-minify');
const cleancss =    require('gulp-clean-css');
const htmlmin =     require('gulp-htmlmin');

const fs = require("fs");

(async () => {
  console.log("==================");
  const time_now = Date.now();
  
  //JS
  let js_file_saved = false
  const new_js_file_name = `bundle-js-${time_now}.js`;
  const new_js_file_name_minified = `bundle-js-${time_now}-min.js`;
  await new Promise(resolve => {
    // gulp.src(['../dev/js/*.js', '!../dev/js/debug.js'])
    gulp.src([
      "../dev/js/leaflet@1.7.1.js",
      "../dev/js/Leaflet.ContinuousZoom.js",
      "../dev/js/misc.js",
      "../dev/js/main.js",
      "../dev/js/hud.js",
      // "../dev/js/plot.js",
      "../dev/js/servers_icons.js",
      "../dev/js/markers.js",
      "../dev/js/servers.js"
    ])
    // .pipe(sourcemaps.init())
    .pipe(concat(new_js_file_name))
    .pipe(minify())
    // .pipe(sourcemaps.write())
    .pipe(
        gulp.dest('../').on('end', ()=> {
            js_file_saved = true;
            console.log("js minified => " +  new_js_file_name);
            resolve();
        })
    );
  })

  if(!js_file_saved) return console.log("js file wasnt saved");

  //CSS

  const new_css_file_name = `bundle-css-${time_now}.css`;
  await new Promise(resolve => {
    gulp.src([
      "../dev/css/leaflet@1.7.1.css",
      "../dev/css/style-dev.css"
    ])
    .pipe(concat(new_css_file_name))
    .pipe(cleancss())
    .pipe(
        gulp.dest('../').on('end', ()=> {
          console.log("css minified => " + new_css_file_name);
          resolve()
        })
    );
  })

  //HTML

  const html = fs.readFileSync("../dev/index-dev.html", "utf-8")
    .replace(`<link rel="stylesheet" href="css/leaflet@1.7.1.css">`,"")
    .replace(`<link rel="stylesheet" href="css/style-dev.css">`, `<link rel="stylesheet" href="${new_css_file_name}">`)
    .replace(/<body[^>]*>((.|[\n\r])*)<\/body>/gm, `<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <script>const fileUpdatedAt = ${Date.now()}, is_dev_environment = false;</script>
    <script src="${new_js_file_name_minified}"></script>
    <!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "3414887ce78947639e0939df00482af5"}'></script><!-- End Cloudflare Web Analytics -->
  </body>`);

  fs.writeFileSync("../index.html", html);
  console.log("html converted => index.html");

  await new Promise(resolve => {
    gulp.src([
      "../index.html"
    ])
    .pipe(concat("index.html"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(
        gulp.dest('../').on('end', ()=> {
          console.log("html minified => index.html");
          resolve()
        })
    );
  })

  console.log("==================");

  //FILE CLEANUP
  fs.readdirSync("../").map(file=>{
    // if(file.startsWith("bundle-js-") && (file !== new_js_file_name && file !== new_js_file_name_minified)){
    if(file.startsWith("bundle-js-") && file !== new_js_file_name_minified){
      fs.unlink("../" + file, () => {
        console.log(file + " file deleted")
      })
    }else if(file.startsWith("bundle-css-") && file !== new_css_file_name){
      fs.unlink("../" + file, () => {
        console.log(file + " file deleted")
      })
    }
  })

})();