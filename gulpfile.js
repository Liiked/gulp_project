var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var useref = require('gulp-useref');
var fileinclude = require('gulp-file-include');
// var runSequence = require('run-sequence');

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app',
            // index: "html/index.html"
        }
    }, {
        proxy: 'liik.yidao.info'
    })
})

gulp.task('useref', function() {

    return gulp.src('app/*.html')
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', minifyCSS()))
        // Uglifies only if it's a Javascript file
        .pipe(uglify())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});

// html模块转html
gulp.task('fileinclude', function() {
    gulp.src('app/tpl/**.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('app/html'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// 开发模式
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass'])
    gulp.watch('app/tpl/*.html', ['fileinclude']);
    gulp.watch('app/js/**/*.js', browserSync.reload);
})


gulp.task('clean', function() {
    gulp.src(['dist/css/*', 'dist/js/*'], { read: false })
        .pipe(clean());
});

//压缩css文件
gulp.task('cssmin', function() {
    gulp.src('app/css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'));
});

//压缩js文件
gulp.task('jsmin', function() {
    gulp.src('app/js/*.js')
        .pipe(uglify())
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/jsmin'));
});

// 部署
gulp.task('deployment', ['css-min', 'js-min']);