

//depend
let gulp = require('gulp');
let sass = require('gulp-sass');
let minifyCSS = require('gulp-clean-css');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let changed = require('gulp-changed');


//folders source/destination
let SCSS_SRC = './src/Assets/scss/**/*.scss';
let SCSS_DEST = './src/Assets/css';


//compile scss
gulp.task('compile_scss',function(done){
    
    gulp.src(SCSS_SRC)
    .pipe(sass().on('error',sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({suffix:'.min'}))
    .pipe(changed(SCSS_DEST))
    .pipe(gulp.dest(SCSS_DEST));
    done();

});



//watch for changes in scss
gulp.task('watch_scss',function(done){
    gulp.watch(SCSS_SRC,gulp.series(['compile_scss']));
    done();
});


//run task
gulp.task('default',gulp.series(['compile_scss'],['watch_scss']));





