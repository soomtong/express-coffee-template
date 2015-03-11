var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
var less = require('gulp-less'),
    coffee = require('gulp-coffee');


gulp.task('greet', function () {
    console.log('Hello world!');
});

gulp.task('server', function() {
    gulp.src('./src/server/*.coffee')
        .pipe(coffee({bare: true}).on('error', console.error))
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./'))
});

gulp.task('client', function() {
    gulp.src('./src/client/*.coffee')
        .pipe(coffee({bare: false}).on('error', console.error))
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/'))
});

gulp.task('less', function () {
    gulp.src('./src/client/less/*.less')
        .pipe(less())
        .pipe(uglify())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./public/'))
});

gulp.task('test', ['greet']);

gulp.task('build', ['server', 'client', 'less']);

gulp.task('default', ['test', 'build']);