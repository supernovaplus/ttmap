const gulp = require("gulp");
const concat = require("gulp-concat");
// const sourcemaps =  require('gulp-sourcemaps');
// const minify = require("gulp-minify");
const cleancss = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const fs = require("fs");
const terser = require("gulp-terser");

(async () => {
  console.log("==================");
  const time_now = Date.now();

  //JS
  let js_file_saved = false;
  const new_js_file_name_minified = `bundle-js-${time_now}-min.js`;
  await new Promise((resolve) => {
    // gulp.src(['../src/js/*.js', '!../src/js/debug.js'])
    gulp
      .src([
        "../src/js/leaflet@1.7.1.js",
        "../src/js/Leaflet.ContinuousZoom.js",
        "../src/js/leaflet.motion.min.js",
        "../src/js/misc.js",
        "../src/js/main.js",
        "../src/js/hud.js",
        // "../src/js/plot.js",
        "../src/js/servers_icons.js",
        "../src/js/markers.js",
        "../src/js/servers.js",
      ])
      // .pipe(sourcemaps.init())
      .pipe(concat(new_js_file_name_minified))
      //   .pipe(minify())
      // .pipe(sourcemaps.write())
      .pipe(terser())
      .pipe(
        gulp.dest("../").on("end", () => {
          js_file_saved = true;
          console.log("js minified => " + new_js_file_name_minified);
          resolve();
        })
      );
  });

  if (!js_file_saved) return console.log("js file wasnt saved");

  //CSS

  const new_css_file_name = `bundle-css-${time_now}.css`;
  await new Promise((resolve) => {
    gulp
      .src(["../src/css/leaflet@1.7.1.css", "../src/css/style.css"])
      .pipe(concat(new_css_file_name))
      .pipe(cleancss())
      .pipe(
        gulp.dest("../").on("end", () => {
          console.log("css minified => " + new_css_file_name);
          resolve();
        })
      );
  });

  //HTML

  const html = fs
    .readFileSync("../src/index.html", "utf-8")
    .replace(`<link rel="stylesheet" href="css/leaflet@1.7.1.css" />`, "")
    .replace(
      `<link rel="stylesheet" href="css/style.css" />`,
      `<link rel="stylesheet" href="${new_css_file_name}" />`
    )
    .replace(
      /<body[^>]*>((.|[\n\r])*)<\/body>/gm,
      `<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <script>const fileUpdatedAt = ${Date.now()}, is_dev_environment = false;</script>
    <script src="${new_js_file_name_minified}"></script>
  </body>`
    );

  fs.writeFileSync("../index.html", html);
  console.log("html converted => index.html");

  await new Promise((resolve) => {
    gulp
      .src(["../index.html"])
      .pipe(concat("index.html"))
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(
        gulp.dest("../").on("end", () => {
          console.log("html minified => index.html");
          resolve();
        })
      );
  });

  console.log("==================");

  //FILE CLEANUP
  fs.readdirSync("../").map((file) => {
    if (file.startsWith("bundle-js-") && file !== new_js_file_name_minified) {
      fs.unlink("../" + file, () => {
        console.log(file + " file deleted");
      });
    } else if (file.startsWith("bundle-css-") && file !== new_css_file_name) {
      fs.unlink("../" + file, () => {
        console.log(file + " file deleted");
      });
    }
  });
})();
