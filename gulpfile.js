const gulp = require('gulp');
const tsPipeline = require('gulp-webpack-typescript-pipeline');

// http-server
// gulp tsPipeline:build:dev
// gulp tsPipeline:watch

tsPipeline.registerBuildGulpTasks(
  gulp,
  {
    entryPoints: {
      'script': __dirname  + '/src/index.ts'
  },
  outputDir: __dirname  + '/dist'
});
