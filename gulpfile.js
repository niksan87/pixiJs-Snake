const gulp = require('gulp');
const tsPipeline = require('gulp-webpack-typescript-pipeline');

const PATHS = {
    DIST: {
        ROOT: 'dist/',
        CSS: 'dist/css'
    },
    SRC: {
        CSS: 'src/*.css',
        HTML: 'src/*.html'
    }
}

gulp.task('copy-html', () => {
    gulp.src(PATHS.SRC.HTML)
    .pipe(gulp.dest(PATHS.DIST.ROOT));
});

gulp.task('copy-css', () => {
    gulp.src(PATHS.SRC.CSS)
    .pipe(gulp.dest(PATHS.DIST.ROOT));
});

tsPipeline.registerBuildGulpTasks(
  gulp,
  {
    entryPoints: {
      'script': __dirname  + '/src/index.ts'
  },
  outputDir: __dirname  + '/dist'
});

gulp.task('build:dev', ['copy-html', 'copy-css', 'tsPipeline:build:dev']);