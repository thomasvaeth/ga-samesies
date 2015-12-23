'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');

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