module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: 'css-loader'
			}
		]
	}
};