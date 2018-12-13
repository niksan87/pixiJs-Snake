const gulp = require('gulp');
const tsPipeline = require('gulp-webpack-typescript-pipeline');

const PATHS = {
    DIST: {
        ROOT: 'dist/',
        CSS: 'dist/css',
        IMAGE: 'dist/img'
    },
    SRC: {
        CSS: 'src/*.css',
        HTML: 'src/*.html',
        IMAGE: 'src/img/*.jpg'
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

gulp.task('copy-images', () => {
    gulp.src(PATHS.SRC.IMAGE)
    .pipe(gulp.dest(PATHS.DIST.IMAGE));
});

tsPipeline.registerBuildGulpTasks(
  gulp,
  {
    entryPoints: {
      'script': __dirname  + '/src/index.ts'
  },
  outputDir: __dirname  + '/dist'
});

// http-server
gulp.task('build:dev', ['copy-html', 'copy-css', 'copy-images', 'tsPipeline:build:dev']);