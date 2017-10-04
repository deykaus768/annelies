module.exports = function () {
    var client = './src/client/';
    var server = './src/server/';
    var serverPort = '8999';
    var clientAssets = client + 'assets/';
    var clientApp = client + 'app/';
    var config = {
        js: [
            './src/**/*.js',
            './*.js'
        ],
        less: [
            clientAssets + 'less/*.less'
        ],
        appJs: [
            clientApp + '*.module.js',
            clientApp + '**/*.js'
        ],
        css: clientAssets + '/css',
        cssFiles: [
            clientAssets + '/css/*.css'
        ],
        client: client,
        server: server,
        index: client + 'index.html',
        serverPort: serverPort,
        bower: {
            directory: './bower_components',
            json: require('./bower.json'),
            ignorePath: '../..'
        },
        nodeServer: server + 'app.js'
    };

    config.getWiredepConfigOptins = function () {
        var wiredepOptions = {
            directory: config.bower.directory,
            bowerJson: config.bower.json,
            ignorePath: config.bower.ignorePath
        };
        return wiredepOptions;
    };
    return config;
};