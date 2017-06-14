const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const bootstrapEntryPoint = require('./webpack.bootstrap.config.js');
const autoprefixer = require('autoprefixer');

const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap', {
	loader: 'postcss-loader',
	options: {
		plugins: function () {
			return [autoprefixer]
		}
	}
}];

const cssProd = ExtractTextPlugin.extract({
	fallback : 'style-loader',
    use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap', {
        loader: 'postcss-loader',
        options: {
            plugins: function () {
                return [autoprefixer]
            }
        }
    }]
	//publicPath: '/dist'
});
const cssConfig = isProd ? cssProd : cssDev;
const bootstrapConfig = isProd ? bootstrapEntryPoint.prod : bootstrapEntryPoint.dev;

module.exports = {
  entry: {
  	//bootstrap: bootstrapConfig,
  	app: './src/index.js'
  },
  output: {
  	path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  module: {
  	rules: [
		{
			test: /\.css|\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap', {
					loader: 'postcss-loader',
					options: {
						plugins: function () {
							return [autoprefixer]
						}
					}
				}]
			})
		},
        {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            // other babel options are specified in .babelrc
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        },
		{
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
                //'file-loader?name=[name].[ext]&outputPath=./&publicPath=./',
                'file-loader?name=images/[name].[ext]',
				'image-webpack-loader'
			]
		},
		{
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			use: [
				{
					loader: 'url-loader',
					options: {
					limit: 10000,
					mimetype: 'application/font-woff'
					}
				}
			]
		
        //{ test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports-loader?jQuery=jquery' },
		},
		{
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			use: [
				{ loader: 'file-loader' }
			]
		}
        //{ test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports-loader?jQuery=jquery' },
  	]
  },
  devServer: {
	  contentBase: path.join(__dirname, 'dist'),
	  compress: true,
	  stats: 'errors-only',
      hot: true,
	  open: true
  },
  plugins: [ 
  	new HtmlWebpackPlugin({
	    title: 'Webpack App',
	    // minify: {
	    // 	collapseWhitespace: true
	    // },
	    hash: true,
	    template: './src/index.html'
  	}),
  	//  new ExtractTextPlugin({
	// 	 filename:  './css/[name].css',
	// 	 disable: false,
    //      allChunks: false
	//  }),
	new ExtractTextPlugin("[name].css"),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NamedModulesPlugin()
  ]
};