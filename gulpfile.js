const gulp 		= require("gulp"),
	util		= require("gulp-util"),
	less 		= require("gulp-less"),
	uglify 		= require("gulp-uglify"),
	concat 		= require("gulp-concat"),
	pug 		= require("gulp-pug");


//Função automatiza a compilação dos arquivos less, minifica e salva o compilado em template/build
gulp.task("css", function(){
	return gulp.src("client/templates/*.less")
		.pipe(less())
		.pipe(minifyCSS())
		.pipe(gulp.dest("client/template/build"));
});

gulp.task("default",['css']);