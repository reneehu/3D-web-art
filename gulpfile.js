// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('webserver', function() {
  return connect.server({
    liverload: true
  });
});

gulp.task('livereload', function() {
  return gulp.src(['dist/styles/*.css', 'dist/scripts/*.js'])
    .pipe(watch())
    .pipe(connect.reload());
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('scripts/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('scripts/*.js', ['lint', 'scripts']);
    gulp.watch('styles/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['webserver', 'lint', 'sass', 'scripts', 'watch']);