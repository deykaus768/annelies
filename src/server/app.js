'use strict';

var express = require('express');
var app = express();
var chalk = require('chalk');
var path = require('path');
var port = process.env.PORT || 8888;

var environment = process.env.NODE_ENV;

switch (environment) {
    case 'build':
        console.log(chalk.yellow('***** BUILD ********'));
        break;
    default:
        console.log(chalk.yellow('***** DEV ********'));
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use('/*', express.static('./src/client/index.html'));
        break;
}
app.listen(port, function () {
    console.log(chalk.green('Listening to port :' + port));
    console.log(chalk.green('env = ' + app.get('env')
        + '\n__dirname = ' + __dirname
        + '\nprocess.cwd = ' + process.cwd()));
});