const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dev = process.env.NODE_ENV === 'development';

module.exports = {
    mode: dev ? 'development' : 'production',
    target: 'web',
    devtool: 'inline-source-map',

    entry: './react/index.tsx',
    output: {
        path: path.resolve('public'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    // define loaders
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './react/index.html',
            filename: 'index.html',
        }),
    ],
    devServer: {
        port: 2210,
        historyApiFallback: true,
    },
};
