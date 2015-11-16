var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('styles', function() {
  gulp.src('./app/scss/main.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: true
    }))
    .pipe(gulp.dest('./www/styles'));
});

gulp.task('build', ['styles']);

gulp.task('watch', function(){
  gulp.watch('./app/scss/*.scss', ['styles']);
});

gulp.task('default', ['build']);
