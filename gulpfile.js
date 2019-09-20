'use strict';

const gulp 			=	require ('gulp');
const del			=	require ('del');
const pug			=	require ('gulp-pug');
const sass 			=	require ('gulp-sass');
const cleanCss 		=	require ('gulp-clean-css');
const autoprefixer 	=	require ('gulp-autoprefixer');
const sourcemaps	=	require ('gulp-sourcemaps');
const babel			=	require ('gulp-babel');
const minify		=	require ('gulp-terser');
const imagemin		=	require ('gulp-imagemin');
const svgmin		=	require ('gulp-svgmin');
const browserSync 	=	require ('browser-sync').create();

function clear(done){
	del('build/css/*');
	del('build/svg/*');
	del('build/js/*');
	del('build/img/*');
	del('build/*.html');
	done();
}

function styles(){
	return gulp.src('./src/styles/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		overridebrowsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe((cleanCss))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./build/css'))
	.pipe(browserSync.stream());
}

function scripts() {
	return gulp.src('./src/scripts/**/*')
	.pipe(sourcemaps.init())
	.pipe(babel())
	.pipe(minify())
	.pipe(dest('./build/js'))
	.pipe(browserSync.stream());
}

function images(){
	return gulp.src('./src/images/**/*')
	.pipe(imagemin())
	.pipe(dest('./build/img'))
	.pipe(browserSync.stream());
}

function vectors(){
	return gulp.src('./src/vectors/*')
	.pipe(svgmin())
	.pipe(dest('./build/svg'))
	.pipe(browserSync.stream()); 
}

function pages(){
	return gulp.src('src/pages/*.pug')
	.pipe(pug({	
		pretty: true,
	}))
	.pipe(gulp.dest('./build'))
	.pipe(browserSync.stream());
}

function fonts (){ 
	return gulp.src('./src/fonts/**/*')
	.pipe(gulp.dest('./build/fonts'))
	.pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './build'
		}
	});

	gulp.watch('./src/styles/**/*.scss', styles);
	gulp.watch('./src/scripts/**/*.js', scripts);
	gulp.watch('./src/images/**/*', images);
	gulp.watch('./src/vectors/**/*', vectors);
	gulp.watch('./src/fonts/**/*', fonts);
	gulp.watch('./src/pages/**/*', pages);
}

exports.clear = clear;
exports.styles = styles;
exports.images = images;
exports.vectors = vectors;
exports.scripts = scripts;
exports.pages = pages;
exports.fonts = fonts;
exports.watch = watch;
