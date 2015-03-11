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
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('public/'))
});

gulp.task('script', function () {
    gulp.src(['./public/components/jquery/dist/jquery.min.js', './public/kube/js/kube.min.js', './public/app.min.js'])
        .pipe(concat('app.pack.js'))
        .pipe(gulp.dest('public/'))
});

gulp.task('less', function () {
    gulp.src('./src/client/less/*.less')
        .pipe(less())
        .pipe(uglify())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('public/'))
});

gulp.task('style', function () {
    gulp.src(['./public/components/fontawesome/css/font-awesome.min.css', './public/kube/css/kube.min.css', './public/app.min.css'])
        .pipe(concat('app.pack.js'))
        .pipe(gulp.dest('public/css'))
});

gulp.task('font', function () {
    gulp.src('./public/components/fontawesome/fonts/**/*')
        .pipe(gulp.dest('public/fonts'))
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.coffee', ['build']);
    gulp.watch('src/client/less/**/*.less', ['build']);
    gulp.watch('view/**/*.html', ['build']);
});

gulp.task('test', ['greet']);

gulp.task('build', ['server', 'client', 'less']);

gulp.task('default', ['test', 'build', 'font']);