var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var less        = require('gulp-less');
var minifyCSS   = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber     = require('gulp-plumber');
var jade        = require('gulp-jade');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var jshint      = require('gulp-jshint');

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './build'
    }
  });
});

gulp.task('less', function() {
  return gulp.src('css/src/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest('css/dist'))
    .pipe(reload({ stream: true }))
  ;
});

gulp.task('js', function() {
  return gulp.src('js/src/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('js/dist'))
    .pipe(reload({ stream: true }))
  ;
});

gulp.task('jade', function() {
  return gulp.src('jade/src/**/*.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('build'))
    .pipe(reload({ stream: true }))
  ;
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

// Default task to be run with `gulp`
gulp.task('default', ['jade', 'less', 'browser-sync'], function() {
  gulp.watch('css/src/*.less', ['less']);
  gulp.watch('jade/src/**/*.jade', ['jade']);
  gulp.watch('js/src/*.js', ['js']);
});
