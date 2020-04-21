const gulp = require('gulp');
const eslint = require('gulp-eslint');
const { spawn } = require('child_process');

const allSrc = ['src/**/*.js', 'gulpfile.js'];

const watchFiles = ['src/**/*.js', 'gulpfile.js'];

let nodeProcess;

const clear = done => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  done();
};

const lint = () => {
  return gulp
    .src(allSrc)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};

const runNode = done => {
  if (nodeProcess) {
    nodeProcess.kill();
  }

  nodeProcess = spawn('node', ['src'], { stdio: 'inherit' });

  nodeProcess.on('close', code => {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes');
    }
  });

  done();
};

const watch = () => {
  return gulp.watch(watchFiles, gulp.series(clear, lint, runNode));
};

gulp.task('default', gulp.series(clear, lint, runNode, watch));
