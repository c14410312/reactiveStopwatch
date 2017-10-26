//we are using nodejs native package 'path'
//https://nodejs.org/api/path.html
const path = require('path');

//html webpack plugin --> easier to bundle HTML files
const HtmlWebpackPlugin = require('html-webpack-plugin');

//COnstant with our paths
const paths = {
	DIST: path.resolve(__dirname, 'dist'),
	//source as a content base
	SRC:path.resolve(__dirname,"src"),
	JS: path.resolve(__dirname, "src/js"),
};

//webpack configuration
module.exports = {
	entry: path.join(paths.JS, 'app.js'),
	output:{
		path: paths.DIST,
		filename: 'app.bundle.js'
	},

	//this tells webpack to use html plugin
	//index.html is used as a template
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(paths.SRC, 'index.html'),
		}),
	],

	//we are telling babel to use "babel-loader" for.js and .jsx files
	module: {
		rules:[
			{
				test:/\.(js|jsx)$/,
				exclude: /node_modules/,
			       use: [
			       		'babel-loader',
			       ],
			},
		],
	},

	//enable importing JS files without specifying their extension
	//so we can write import MyCompnent from './my-component';
	resolve:{
		extensions: ['.js', '.jsx'],
	},	
};
