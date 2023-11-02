const { src, dest, watch, parallel } = require("gulp"); // src: para identificar un archivo, dest: para gurdarlos

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes Webp
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){
    src("src/scss/**/*.scss") // identifica el archivo SASS
        .pipe(plumber())
        .pipe(sass()) // Complila Sass
        .pipe(dest("build/css")) // Guarda el archivo compilado en CSS

    done(); //Callback que avisa a gulp cuando llegamos al final
}

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    };
    src("src/img/**/*.{png,jpg}")
        .pipe( cache( imagemin(opciones) ) )
        .pipe(dest("build/img"))
    done();
}

function versionWebp(done){
    const opciones = {
        quality: 50
    };

    src("src/img/**/*.{png,jpg}")
        .pipe( webp(opciones) )
        .pipe( dest("build/img") );

    done();
}

function versionAvif(done){
    const opciones = {
        quality: 50
    };

    src("src/img/**/*.{png,jpg}")
        .pipe( avif(opciones) )
        .pipe( dest("build/img") );

    done();
}

function dev(done){
    watch("src/scss/**/*.scss", css);

    done();
}

exports.css = css; // Mandamos  a llamar la funcion CSS
exports.imagenes = imagenes;
exports.versionWebp = versionWebp; // Mandamos  a llamar la funcion versionWebp
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, dev ); // Mandamos  a llamar la funcion versionWebp y dev en paralelo 