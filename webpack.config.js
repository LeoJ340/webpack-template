const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const LifePlugin = require('./plugins/life-plugin')
const AnalyzePlugin = require('./plugins/analyze-plugin')
const InlineChunkPlugin = require('./plugins/inline-chunk-plugin')

const title = 'webpack-template'

module.exports = env => {
  const isProd = env.production
  return {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'static/js/[name].[contenthash].js',
      clean: true
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.css$/,
              use: [MiniCssExtractPlugin.loader, 'css-loader'],
              exclude: path.resolve(__dirname, 'src/components') // 排除组件内的样式
            },
            {
              test: /\.(png|svg|jpe?g|gif|webp)$/i,
              type: 'asset',
              generator: {
                filename: 'static/[hash][ext][query]'
              }
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
                  outputPath: 'utils' // 可选参数，指定输出路径
                }
              }]
            }
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
        new CssMinimizerPlugin()
      ],
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: {
        name: 'runtime'
      }
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
      // 生命周期插件
      // new LifePlugin(),
      // 输出文件分析插件
      new AnalyzePlugin({
        outputFile: 'analyze.md',
        title: '分析打包资源大小'
      })
      // new InlineChunkPlugin({
      //     size: 14 // 限制小于此大小（kb）的js文件内联到html里
      // })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '@components': path.resolve(__dirname, 'src/components/')
      }
    },
    devServer: {
      port: 88
    }
  }
}
