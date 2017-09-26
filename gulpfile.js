'use strict';

var gulp = require('gulp');
var chalk = require('chalk');
var $ = require('gulp-load-plugins')({lazy:true});
var config = require('./gulp.config')();
var args = require('yargs').argv;

gulp.task('vet', function () {
    log('Vetting all js files using jshint,jscs');
    return gulp
        .src(config.js)
        .pipe($.if(args.verbose,$.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe($.jshint.reporter('fail'));
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