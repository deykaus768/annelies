module.exports = function () {
    var client = './src/client/';
    var clientAssets = client + 'assets/'
    var gulpConfig = {
        js: [
            './src/**/*.js',
            './*.js'
        ],
        less : [
            clientAssets + 'less/*.less'
        ],
        css : clientAssets +'/css',
        client : client
    };
    return gulpConfig;
};