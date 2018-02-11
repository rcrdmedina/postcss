var gulp = require('gulp')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var browserSync = require('browser-sync').create()

// Server de desarrollo
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
})

//Tarea para procesar el css
gulp.task('css', function () {
  return gulp.src('./src/*.css')
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
})

//Tarea para vigilar los cambios
gulp.task('watch', function () {
  gulp.watch('./src/*.css', ['css'])
  gulp.watch('./dist/*.html').on('change', browserSync.reload)
})

gulp.task('default', ['watch', 'serve'])