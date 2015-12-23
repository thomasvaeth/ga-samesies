'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var maps = require('gulp-sourcemaps');

gulp.task('concatStyles', function() {
	gulp.src([
		'public/app/css/ie10-viewport-bug-workaround.css',
		'public/app/css/main.css',
		'public/app/css/partials.css',
		'public/app/css/users.css'
	]).pipe(maps.init()
	).pipe(concat('samesies.css')
	).pipe(maps.write('./')
	).pipe(gulp.dest('public/app/css')
	);
});

gulp.task('minifyStyles', function() {
	gulp.src('public/app/css/samesies.css'
	).pipe(minifyCss({compatibility: 'ie8'})
	).pipe(rename('samesies.min.css')
	).pipe(gulp.dest('public/app/css')
	);
});

gulp.task('concatScripts', function() {
	gulp.src([
		'public/app/js/angular-validation-match.min.js',
		'public/app/js/angular-smooth-scroll.min.js',
		'public/app/services.js',
		'public/app/controllers.js',
		'public/app/app.js'
	]).pipe(maps.init()
	).pipe(concat('samesies.js')
	).pipe(maps.write('./')
	).pipe(gulp.dest('public/app/js')
	);
});

gulp.task('minifyScripts', function() {
	gulp.src('public/app/js/samesies.js'
	).pipe(uglify()
	).pipe(rename('samesies.min.js')
	).pipe(gulp.dest('public/app/js')
	);
});