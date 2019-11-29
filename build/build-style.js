const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-clean-css');
const rename = require('gulp-rename');
const Config = require('../src/config');

gulp.task('compile-css', () => {
    return gulp.src(['../src/style/index.less'])
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename(`${Config.filename}.css`))
        .pipe(gulp.dest('../dist/'));
});

gulp.task('default', ['compile-css']);