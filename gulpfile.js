const { src, dest } = require("gulp");

const gulp = require("gulp");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const cleanCSS = require("gulp-clean-css");

const compress = (done) => {
  src("./assets/js/*.js").pipe(uglify()).pipe(dest("./public/assets/js/"));
  src("./index.html").pipe(htmlmin()).pipe(dest("./public/"));
  src("./assets/css/styles.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest("./public/assets/css/"));
  done();
};

exports.compress = compress;
