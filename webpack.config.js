const path = require('path');

module.exports = {
    entry: './src/index',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/js'
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
    },

    devtool: 'cheap-eval-source-map' // remove for build
};