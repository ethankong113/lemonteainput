var gulp = require('gulp');
var livereload = require('gulp-livereload');

var HTML_PATH = '**/*.html';
var JS_PATH = 'assets/**/*.js';
var CSS_PATH = 'assets/**/stylesheet.css';

gulp.task('html', function(){
  return gulp.src(HTML_PATH)
          .pipe(livereload());
});

gulp.task('js', function(){
  return gulp.src(JS_PATH)
          .pipe(livereload());
});

gulp.task('css', function(){
  return gulp.src(CSS_PATH)
          .pipe(livereload());
});

gulp.task('watch', function(){
  console.log("starting watch task.");
  require('./app.js');
  livereload.listen();
  gulp.watch(HTML_PATH, ['html']);
  gulp.watch(JS_PATH, ['js']);
  gulp.watch(CSS_PATH, ['css']);
});
