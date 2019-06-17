const gulp = require('gulp');
const less = require('gulp-less');
const gUtil = require('gulp-util');

// 构建less
gulp.task('build-less', function () {
    gulp.src('./src/style/nkutil.less')
        .pipe(less())
        .pipe(gulp.dest('./build/css'))
})