var gulp = require('gulp');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var gutil = require('gulp-util');


gulp.task('script', function() {
  return gulp
    .src(['routes/*','models/*'])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
   
;
})

gulp.task('test', function() {
  return gulp
    .src('test/*.js',{ read: false })
    .pipe(mocha({ reporter: 'list' }))
    .pipe(istanbul.writeReports())
    .on('error', gutil.log);
})

gulp.task('watch', function() {
  gulp.watch(['routes/*','models/*'], ['script']);
  gulp.watch('test/*.js', ['test']);
})

gulp.task('default', ['test', 'script', 'watch']);