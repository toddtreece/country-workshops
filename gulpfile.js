const gulp = require('gulp'),
      babel = require('gulp-babel');

gulp.task('default', ['es7']);

gulp.task('es7', () => {
  return gulp.src(['src/*.js', 'src/*/*.js'])
    .pipe(babel({
      presets: ['stage-0', 'es2015-node']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['default']);
});
