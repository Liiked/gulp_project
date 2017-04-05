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
//将bower的库文件对应到指定位置
gulp.task('bowerCopy', function() {
    //fonts
    gulp.src('bower_components/bootstrap/fonts/**')
        .pipe(gulp.dest('vender/fonts'));
    //js
    gulp.src('bower_components/jquery/dist/jquery.mim.js')
        .pipe(gulp.dest('vender/js'));
    gulp.src('bower_components/jquery/dist/jquery.mim.map')
        .pipe(gulp.dest('vender/js'));

    gulp.src('bower_components/angular/angular.min.js')
        .pipe(gulp.dest('vender/js'));
    gulp.src('bower_components/angular/angular.min.js.map')
        .pipe(gulp.dest('vender/js'));
    gulp.src('bower_components/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest('vender/js'));

    //css
    gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('vender/css'));
    gulp.src('bower_components/bootstrap/dist/css/bootstrap-theme.min.css')
        .pipe(gulp.dest('vender/css'));
    gulp.src('bower_components/sui/dist/css/sui.min.css')
        .pipe(gulp.dest('vender/css'));
});


//转移js
gulp.task('src-move', function() {
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js'));
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('dist/css'));
});

//压缩css文件
gulp.task('css-min', function() {
    gulp.src('app/css/*.css')
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'));
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

//压缩js文件
gulp.task('jsmin', function() {
    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/jsmin'));
});

// 部署
gulp.task('deployment', ['css-min', 'js-min']);