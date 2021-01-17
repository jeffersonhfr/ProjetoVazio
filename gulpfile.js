const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
let rename = require("gulp-rename");
let uglify = require('gulp-uglify-es').default;

function compilaSass(){
  return gulp.src('.lib/scss/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer({ cascade: false }))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream());
}

gulp.task('sass', compilaSass);

function gulpJS(){
  return gulp
  .src('.lib/js/main/*.js')
  .pipe(concat('main.js'))
  .pipe(babel({ presets: ['@babel/env'] }))
  .pipe(gulp.dest('.lib/js/'))
  
}

function jsMin(){
  return gulp
  .src('.lib/js/main.js')
  .pipe(concat('main-min.js'))
  .pipe(uglify(/* options */))
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream());
}

gulp.task('mainjs', gulpJS);
gulp.task('minificajs', jsMin);




function browser(){
  browserSync.init({
    server:{
      baseDir:"./"
    }
  })
}

gulp.task('browser-sync', browser)

function watch(){
  gulp.watch('.lib/scss/**/*.scss', compilaSass);
  gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);
  gulp.watch('.lib/js/main/*.js', gulpJS);
  gulp.watch('.lib/js/main.js', jsMin);
}

gulp.task('watch', watch);
gulp.task('default', gulp.parallel('watch','browser-sync', 'sass', 'mainjs'));