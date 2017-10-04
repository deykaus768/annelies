'use strict';

var gulp = require('gulp');
var chalk = require('chalk');
var plug = require('gulp-load-plugins')({ lazy: true });
var config = require('./gulp.config')();
var args = require('yargs').argv;
var port = process.env.PORT || config.serverPort;

gulp.task('vet', function () {
    log('Vetting all js files using jshint,jscs');
    return gulp
        .src(config.js)
        .pipe(plug.if(args.verbose, plug.print()))
        .pipe(plug.jscs())
        .pipe(plug.jshint())
        .pipe(plug.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe(plug.jshint.reporter('fail'));
});

gulp.task('styles', function () {
    log('Compiling less to css');
    var autoprefixerOptions = {
        browsers: ['last 2 versions']
    };
    return gulp
        .src(config.less)
        .pipe(plug.if(args.verbose, plug.print()))
        .pipe(plug.less())
        .pipe(plug.plumber())
        .pipe(plug.concat('all.css'))
        .pipe(plug.autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(config.css));
});

gulp.task('less-watch', function () {
    log('Watching less file changes');
    var less = [].concat(config.less);
    gulp.watch(less, ['styles']);
});

gulp.task('wiredep', function () {
    log('Injecting bower css and all js dependencies ');
    var wiredep = require('wiredep').stream;
    var options = config.getWiredepConfigOptins();
    var appJs = gulp.src(config.appJs); // need to pass file stream into gulp-inject
    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(plug.inject(appJs))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles'], function () {
    log('Injecting our css dependencies ');
    var css = gulp.src(config.cssFiles);
    return gulp
        .src(config.index)
        .pipe(plug.inject(css))
        .pipe(gulp.dest(config.client));
});

gulp.task('serve-dev', ['inject'], function () {
    var isDev = true; //hardcoded as currently only dev-build
    var nodeOptions = {
        script: config.nodeServer, //path to app.js
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    }
    return plug.nodemon(nodeOptions);
});

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                console.log(chalk.blue(msg[item]));
            }
        }
    } else {
        console.log(chalk.blue(msg));
    }
}