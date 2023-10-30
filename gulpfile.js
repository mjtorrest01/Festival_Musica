const { src, dest, watch } = require("gulp"); // src: para identificar un archivo, dest: para gurdarlos 
const sass = require('gulp-sass')(require('sass')); // 

function css(done){
    src("src/scss/app.scss") // identifica el archivo SASS 
        .pipe(sass()) // Complila Sass
        .pipe(dest("build/css")) // Guarda el archivo compilado en CSS

    done(); //Callback que avisa a gulp cuando llegamos al final
}

function dev(done){
    watch("src/scss/app.scss", css)

    done();
}

exports.css = css; // Mandamos  a llamar la funcion CSS
exports.dev = dev; // Mandamos  a llamar la funcion Dev y esta a sus vez CSS