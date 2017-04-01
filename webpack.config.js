module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: 'css-loader'
			}
		]
	}
};