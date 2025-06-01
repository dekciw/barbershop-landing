'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const clean = require('gulp-clean');
const fs = require('fs');
const path = require('path');

const paths = {
    styles: {
        src: './src/styles/*.scss',
        dest: './dist'
    }
};

// Task for cleaning up the CSS files in the dest folder before running other tasks
gulp.task('clean', () => {
    if (fs.existsSync(paths.styles.dest)) {
        return gulp.src(`${paths.styles.dest}/*`, {read: false, allowEmpty: true})
            .pipe(clean());
    } else {
        return Promise.resolve();
    }
});

// Task for compiling Sass, concatenating, and minifying CSS files
gulp.task('sass', () => {
    if (!fs.existsSync(paths.styles.dest)) {
        fs.mkdirSync(paths.styles.dest, { recursive: true });
    }

    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss("style.css"))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest));
});

// Task for watching changes in Sass files
gulp.task('watch', () => {
    gulp.watch(paths.styles.src, gulp.series('sass'));
});

// Define the default task
gulp.task('default', gulp.series('clean', 'sass'));
