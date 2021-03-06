var gulp = require('gulp')
var postcss = require('gulp-postcss')
var cssnext = require('postcss-cssnext')
var cssnested = require('postcss-nested')
var mixins = require('postcss-mixins')
var atImport = require('postcss-import')
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
  var processors = [
    atImport(),
    mixins(),
    cssnested,
    cssnext()
  ]
  return gulp.src('./src/invie.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
})

//Tarea para vigilar los cambios
gulp.task('watch', function () {
  gulp.watch('./src/*.css', ['css'])
  gulp.watch('./dist/*.html').on('change', browserSync.reload)
})

gulp.task('default', ['watch', 'serve'])