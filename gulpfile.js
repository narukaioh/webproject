const gulp 		= require("gulp"),
	util		= require("gulp-util"),
	less 		= require("gulp-less"),
	uglify 		= require("gulp-uglify"),
	concat 		= require("gulp-concat"),
	pug 		= require("gulp-pug");


//Função automatiza a compilação dos arquivos less, minifica e salva o compilado em template/build
gulp.task("html", function(){
	return gulp.src("views/*.pug")
		.pipe(pug())
		.pipe(gulp.dest("views/build"));
});

gulp.task("default",['html']);