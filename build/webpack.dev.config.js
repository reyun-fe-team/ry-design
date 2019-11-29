const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    entry: {
        main: './examples/main',
        vendors: ['vue', 'vue-router']
    },
    output: {
        path: path.join(__dirname, '../examples/dist'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [{
                // https://vue-loader.vuejs.org/en/configurations/extract-css.html
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                        ],
                        less: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                            {
                                loader: 'less-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                        ],
                    },
                    postLoaders: {
                        html: 'babel-loader?sourceMap'
                    },
                    sourceMap: true,
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    sourceMap: true,
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loaders: [{
                        loader: 'style-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: '\'autoprefixer-loader\'',
                    },
                ]
            },
            {
                test: /\.less$/,
                loaders: [{
                        loader: 'style-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ]
            },
            {
                test: /\.scss$/,
                loaders: [{
                        loader: 'style-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ]
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devtool: '#eval-source-map',
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendor.bundle.js'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, '../examples/dist/index.html'),
            template: path.join(__dirname, '../examples/index.html')
        }),
        new FriendlyErrorsPlugin()
    ]
};