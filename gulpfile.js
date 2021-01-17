const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

function compilaSass(){
  return gulp.src('css/scss/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer({ cascade: false }))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream());
}

gulp.task('sass', compilaSass);

function gulpJS(){
  return gulp
  .src('js/**/*.js')
  .pipe(concat('main.js'))
  .pipe(gulp.dest('js/'))
}

gulp.task('mainjs', gulpJS);

function browser(){
  browserSync.init({
    server:{
      baseDir:"./"
    }
  })
}

gulp.task('browser-sync', browser)

function watch(){
  gulp.watch('css/scss/**/*.scss', compilaSass);
  gulp.watch(['*html', '*.php']).on('change', browserSync.reload);
}

gulp.task('watch', watch);
gulp.task('default', gulp.parallel('watch','browser-sync'));