'use strict';

var gulp = require('gulp');
var chalk = require('chalk');
var plug = require('gulp-load-plugins')({ lazy: true });
var config = require('./gulp.config')();
var args = require('yargs').argv;

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
        browsers : ['last 2 versions']
    }
    return gulp
            .src(config.less)
            .pipe(plug.if(args.verbose, plug.print()))
            .pipe(plug.less())
            .pipe(plug.plumber())
            .pipe(plug.concat('all.css'))
            .pipe(plug.autoprefixer(autoprefixerOptions))
            .pipe(gulp.dest(config.css));
});

gulp.task('less-watch',function(){
    log('Watching less file changes');
    var less = [].concat(config.less);
    gulp.watch(less,['styles']);    
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