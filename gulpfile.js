const { src, dest, watch, parallel } = require("gulp"); // src: para identificar un archivo, dest: para gurdarlos

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes Webp
const webp = require('gulp-webp');

function css(done){
    src("src/scss/**/*.scss") // identifica el archivo SASS
        .pipe(plumber())
        .pipe(sass()) // Complila Sass
        .pipe(dest("build/css")) // Guarda el archivo compilado en CSS

    done(); //Callback que avisa a gulp cuando llegamos al final
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

function dev(done){
    watch("src/scss/**/*.scss", css);

    done();
}

exports.css = css; // Mandamos  a llamar la funcion CSS
exports.versionWebp = versionWebp; // Mandamos  a llamar la funcion versionWebp
exports.dev = parallel( versionWebp, dev ); // Mandamos  a llamar la funcion versionWebp y dev en paralelo 