var gulp = require('gulp'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    sass = require('gulp-sass'),
    rename = require("gulp-rename"),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    concatCss = require('gulp-concat-css'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;


gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
});

// собираем html
// Jade
gulp.task('jade', function(){
    return gulp.src('app/**/*.jade')
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream:true}));
});

// перебрасываем папку sass в dist
gulp.task('sass-dist', function () {
    return gulp.src('app/sass/**/*.scss')
        .pipe(gulp.dest('dist/sass/'))
        .pipe(reload({stream:true}));
});

// компилируем sass html
gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css/'))
        .pipe(minifyCss())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest('dist/css/'))
        .pipe(reload({stream:true}));
});



// собираем иконки в шрифт
var fontName = 'Icons';
gulp.task('iconfont', function(){
    gulp.src(['app/icons/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'app/sass/templates/_icons.scss',
            targetPath: '../../sass/_icons.scss',
            fontPath: 'fonts/'
        }))
        .pipe(iconfont({
            fontName: fontName,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            normalize:true,
            fontHeight: 1001,
            centerHorizontally: true
        }))
        .pipe(gulp.dest('app/css/fonts/'))
        .pipe(reload({stream:true}));
});

// собираем шрифты
gulp.task('fonts', function() {
    return gulp.src('app/css/fonts/**/*')
        .pipe(gulp.dest('dist/css/fonts'))
        .pipe(reload({stream:true}));
});

// собираем библиотеки css(желательно min sass)
gulp.task('css', function () {
    return gulp.src(
        ['./node_modules/slick-carousel/slick/slick.css',
            './node_modules/slick-carousel/slick/slick-theme.css',
            './node_modules/Select2/select2.css',
            // './node_modules/jqueryui/jquery-ui.min.css',
            './node_modules/select2/dist/css/select2.min.css',
            './node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css'
        ]
    )
        .pipe(concatCss("lib.min.css"))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'));
});


// собираем картинки
gulp.task('images', function(){
    return gulp.src('app/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(reload({stream:true}));
});
gulp.task('images-content', function(){
    return gulp.src('app/assets/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images'))
        .pipe(reload({stream:true}));
});

// проверяем js на наличие ошибок
gulp.task('jshint', function(){
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
});

//  собираем библиотеки js(желательно min)
gulp.task('concat', function () {
    return gulp.src(
        [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/slick-carousel/slick/slick.min.js',
            './node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
            // './node_modules/jqueryui/jquery-ui.min.js',
            './node_modules/Select2/select2.min.js',
            './node_modules/select2/dist/js/select2.full.min.js',
            './node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js'
        ]
    )
        .pipe(concat("lib.min.js"))
        .pipe(gulp.dest('dist/js/'));
});

// собираем наш кастомный js
gulp.task('js',function(){
    gulp.src('app/js/main.js')
        .pipe(plumber())
        .pipe(gulp.dest('dist/js/'))
        .pipe(uglify())
        .pipe(rename("main.min.js"))
        .pipe(gulp.dest('dist/js/'))
        .pipe(reload({stream:true}));
});


// наблюдаем за изменениями
gulp.task('watch', function(){
    gulp.watch("app/*.html", ["html", "layout"]);
    gulp.watch('app/**/*.jade',['jade']);
    gulp.watch('app/icons/*.svg', ["iconfont",'fonts','sass']);
    gulp.watch('app/sass/**/*.scss', ['sass-dist','fonts','sass'] );
    gulp.watch('app/assets/images/**/*.*', ["images-content"]);
    gulp.watch('app/images/*.*', ["images"]);
    gulp.watch("app/css/**/*.css", ["css"]);
    gulp.watch('app/js/**/*.js',  ["jshint", "concat", "js"]);
});

// Default
gulp.task('default', ['jade',"iconfont","sass-dist","sass",'css','fonts',"jshint",'concat','js','images','images-content', 'browserSync', "watch"]);//'browserSync'
