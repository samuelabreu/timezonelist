'use strict';

var gulp = require('gulp');
var zip = require('gulp-zip');

var p = require('./package.json')

var files = ['manifest.json', '**/popup/*', '**/resources/*.png', '**/_locales/*/*'];
var xpiName = p.name + '-' + p.version + '.xpi';

gulp.task('default', function () {
    gulp.src(files)
        .pipe(zip(xpiName))
        .pipe(gulp.dest('debug/'));
});

gulp.task('build', function () {
    gulp.src(files)
        .pipe(zip(xpiName))
        .pipe(gulp.dest('releases/'));
});