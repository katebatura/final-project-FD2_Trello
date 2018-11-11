const path = require('path');

module.exports = {
    entry: './src/index',

    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'app.js',
        publicPath: '/js'
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist/js'),
    },

    devtool: 'cheap-eval-source-map' // remove for build
};