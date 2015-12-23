'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('concatScripts', function() {
	gulp.src([
		'public/app/js/angular-validation-match.min.js',
		'public/app/js/angular-smooth-scroll.min.js',
		'public/app/services.js',
		'public/app/controllers.js',
		'public/app/app.js'
	]).pipe(concat('samesies.js')
	).pipe(gulp.dest('public/app/js')
	);
});

gulp.task('minifyScripts', function() {
	gulp.src('public/app/js/samesies.js'
	).pipe(uglify()
	).pipe(gulp.dest('public/app/js')
	);
});