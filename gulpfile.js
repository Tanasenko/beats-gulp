const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

sass.compiler = require('node-sass');

task('clean', () =>{
  return src( 'dist/**/*', { read: false })
    .pipe( rm() );
});

task('copy:html', () => {
    return src('*.html')
    .pipe(dest('dist'))
    .pipe(reload({stream: true}));
});

task('copy:jpg', () => {
    return src('img/**/*.jpg')
    .pipe(dest('dist'))
    .pipe(reload({stream: true}));
});

task('copy:png', () => {
    return src('img/**/*.png')
    .pipe(dest('dist'))
    .pipe(reload({stream: true}));
});

task('copy:svg', () => {
    return src('img/**/*.svg')
    .pipe(dest('dist'))
    .pipe(reload({stream: true}));
});

const styles = [
    'node_modules/normalize.css/normalize.css',
    'css/main.scss'
]

task('styles', () => {
    return src(styles)
    .pipe(gulpif(env == 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(px2rem())
    /**.pipe(autoprefixer({
            browsers: ['last 2 versions'],
			cascade: false
		}))**/
    .pipe(gulpif(env == 'prod', gcmq()))
    .pipe(gulpif(env == 'prod', (cleanCSS())))
    .pipe(gulpif(env == 'dev', (sourcemaps.write())))
    .pipe(dest('dist'))
    .pipe(reload({stream: true}));
});

const libs = [
    'node_modules/jquery/dist/jquery.js',
    'js/*.js'
]

task('scripts', () => {
    return src(libs)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(babel({
            presets: ['@babel/env']
        }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(reload({stream: true}));
});

task('icons', () =>{
    return src()
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

task('watch', () => {
    watch('./css/**/*.scss', series('styles'));
    watch('*.html', series('copy:html'));
    watch('./js/*.js', series('scripts'));
});



task(
    'default', 
    series(
        'clean', 
        parallel('copy:html', 'copy:jpg', 'copy:png', 'copy:svg', 'styles', 'scripts'),
        parallel('watch','server')
    )
);

task(
    'build', 
    series(
        'clean', 
        parallel('copy:html', 'copy:jpg', 'copy:png', 'copy:svg', 'styles', 'scripts'),
    )
);