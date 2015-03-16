var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    concat = require('gulp-concat');
var less = require('gulp-less'),
    coffee = require('gulp-coffee');


gulp.task('greet', function () {
    console.log('Hello world!');
});

gulp.task('server', function() {
    gulp.src(['app.coffee', './lib/**/*.coffee'], { "base" : "." })
        .pipe(coffee({bare: true}).on('error', console.error))
        .pipe(gulp.dest('.'))
});

gulp.task('client', function() {
    gulp.src('./public/script/*.coffee')
        .pipe(coffee({bare: false}).on('error', console.error))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('public/'))
});

gulp.task('script', function () {
    gulp.src(['./public/components/jquery/dist/jquery.min.js', './public/components/kube/js/kube.min.js', './public/app.min.js'])
        .pipe(concat('app.pack.js'))
        .pipe(gulp.dest('public/'))
});

gulp.task('less', function () {
    gulp.src('./public/style/*.less')
        .pipe(less())
        .pipe(minify())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('public/'))
});

gulp.task('style', function () {
    gulp.src(['./public/components/fontawesome/css/font-awesome.min.css', './public/components/kube/css/kube.min.css', './public/app.min.css'])
        .pipe(concat('app.pack.css'))
        .pipe(gulp.dest('public'))
});

gulp.task('font', function () {
    gulp.src('./public/components/fontawesome/fonts/**/*')
        .pipe(gulp.dest('public/fonts'))
});

gulp.task('test', ['greet']);

gulp.task('build', ['server', 'client', 'script', 'less', 'style']);

gulp.task('default', ['test', 'build', 'font']);