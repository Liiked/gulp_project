var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var spritesmith = require('gulp.spritesmith');
// var useref = require('gulp-useref');
var fileinclude = require('gulp-file-include');
var sequence = require('gulp-sequence')
var prefixer = require('gulp-autoprefixer')
var htmlmin = require('gulp-htmlmin')
var clean = require('gulp-clean')
var sourcemap = require('gulp-sourcemaps')

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

// gulp.task('useref', function() {

//     return gulp.src('app/*.html')
//         // Minifies only if it's a CSS file
//         .pipe(gulpIf('*.css', minifyCSS()))
//         // Uglifies only if it's a Javascript file
//         .pipe(uglify())
//         .pipe(useref())
//         .pipe(gulp.dest('dist'))
// });

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


// 雪碧图生成
gulp.task('sprite', function() {
    var spriteData = gulp.src('app/images/*.jpg')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }));
    return spriteData.pipe(gulp.dest('app/sprite'));
});


// 开发模式
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass'])
    gulp.watch('app/tpl/*.html', ['fileinclude']);
    gulp.watch('app/js/**/*.js', browserSync.reload);
})

// 清理文件
gulp.task('clean', function() {
    gulp.src(['dist/css/**/*.css', 'dist/js/**/*.js'], { read: false })
        .pipe(clean());
});

//压缩css文件和prefixer
gulp.task('cssmin', function() {
    gulp.src('app/css/*.css')
        .pipe(prefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'));
});

//js检测
// gulp.task('jslint', function() {
//     gulp.src('app/js/*.js')
//         .pipe(jslint())
//         .pipe(jslint.reporter('default'));
// });

// 移动vendor
gulp.task('movejs', function() {
    return gulp.src('app/js/vendor/*.js')
        .pipe(gulp.dest('dist/js/vendor'))
});

// 移动image
gulp.task('movejs', function() {
    return gulp.src('app/js/vendor/*.js')
        .pipe(gulp.dest('dist/js/vendor'))
});

//压缩js文件
gulp.task('jsmin', function() {
    gulp.src(['app/js/**/*.js', '!app/js/vendor/*.js'])
        // .pipe(sourcemap.init())
        .pipe(uglify())
        // .pipe(rename({ suffix: '.min' }))
        // .pipe(sourcemap.write('/maps'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('htmlmin', function() {
    gulp.src('app/html/*.html')
        .pipe(htmlmin({
            removeComments: true,
            // collapseWhitespace: true, //压缩HTML
            removeEmptyAttributes: true,
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('dist/html'));
});


// 部署
gulp.task('deployment', sequence(['clean', 'movejs', 'cssmin', 'jsmin'], 'htmlmin'));