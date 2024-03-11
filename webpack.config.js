const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

const title = 'webpack-template'

module.exports = env => {
    const isProd = env['production']
    return {
        mode: isProd ? 'production' : 'development',
        devtool: isProd ? 'source-map' : 'cheap-module-source-map',
        entry: {
            app: './src/index.js'
        },
        output: {
            filename: `static/js/[name].[contenthash].js`,
            clean: true
        },
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            test: /\.hbs$/,
                            loader: "handlebars-loader"
                        },
                        {
                            test: /\.css$/,
                            use: [ MiniCssExtractPlugin.loader, 'css-loader'],
                            exclude: path.resolve(__dirname, 'src/components')
                        },
                        {
                            test: /\.(png|svg|jpe?g|gif|webp)$/i,
                            type: 'asset',
                            generator: {
                                filename: 'static/[hash][ext][query]'
                            },
                        },
                        {
                            test: /\.(woff|woff2|eot|ttf|otf)$/i,
                            type: 'asset/resource',
                            generator: {
                                filename: 'static/[hash][ext][query]'
                            }
                        },
                        {
                            test: /\.js$/,
                            include: path.resolve(__dirname, 'src'),
                            use: ['babel-loader', {
                                loader: './loader/utils2md-loader',
                                options: {
                                    outputPath: 'utils', // 可选参数，指定输出路径
                                }
                            }],
                        },
                        // 自定义一个 babel-loader
                        // {
                        //     test: /\.js$/,
                        //     include: path.resolve(__dirname, 'src'),
                        //     loader: './loader/babel-loader',
                        //     options: {
                        //         presets: ['@babel/preset-env']
                        //     }
                        // },
                    ]
                }
            ]
        },
        optimization: {
            minimizer: [
                new CssMinimizerPlugin(),
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title,
                template: path.resolve(__dirname, 'index.html')
            }),
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash].css'
            }),
            new ESLintPlugin({
                context: path.resolve(__dirname, 'src')
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src/'),
                '@components': path.resolve(__dirname, 'src/components/')
            }
        },
        devServer: {
            port: 88,
            open: true
        }
    };
};
