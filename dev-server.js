const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');

const portNumber = 3333;
const targetEntry = `http://localhost:${portNumber}/`;

new WebpackDevServer(webpack(config), {
    stats: { colors: true },
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    contentBase: 'dist'
}).listen(portNumber, 'localhost', (err, result) => {
    if (err) {
        return console.log(err);
    }

    console.log(`Running at ${targetEntry}...`);
    open(targetEntry);
});
