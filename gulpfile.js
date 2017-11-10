var gulp = require('gulp');
var uglify = require('gulp-uglify');
var stripedebug = require('gulp-strip-debug');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');

// folders
folder = {
    main: './',
    src: 'src/',
    build: 'build/'
};

/*** REGULAR FILES ***/

// Other HTML files minified:
gulp.task('html', function() {
    return gulp.src(folder.src + '*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(folder.main));
});

gulp.task('js', function() {
    return gulp.src(folder.src + 'js/*.js')
            .pipe(stripedebug())
            // .pipe(uglify()) // creates issues with jslint
            .pipe(gulp.dest(folder.build + 'js/'));
});

gulp.task('css', function() {
    return gulp.src(folder.src + 'css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(folder.build + './css/'));
});


// convert scss to css


/** RUN AND WATCH TASKS ***/

// run all tasks
gulp.task('run', ['js', 'html', 'css']);

// watch for changes
gulp.task('watch', function() {
    gulp.watch(folder.src + '*.html', ['html']);
    gulp.watch(folder.src + '/js/**/*', ['js']);
    gulp.watch(folder.src + 'css/**/*', ['css']);
    // gulp.watch(folder.src + 'img/**/*', ['imageminify']);

});


// default task
gulp.task('default', ['run', 'watch']);