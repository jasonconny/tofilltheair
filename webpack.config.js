const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => {
	return {
		devServer: {
			compress: true,
			contentBase: path.join(__dirname, '/public'),
			historyApiFallback: {
				disableDotRule: true
			},
			hot: true,
			port: 3000,
			publicPath: '/',
			watchContentBase: true
		},
		devtool: 'inline-source-map',
		entry: {
			toFillTheAir: path.join(__dirname, 'src/ToFillTheAir.tsx')
		},
		module: {
			strictExportPresence: true,
			rules: [
				{
					oneOf: [
						// bundle image assets
						{
							test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
							loader: require.resolve('url-loader'),
							options: {
								limit: 10000,
								name: 'static/media[name].[hash:8].[ext]'
							}
						},
						// bundle TypeScript
						{
							test: /\.(ts|tsx)$/,
							include: path.join(__dirname, 'src'),
							loader: require.resolve('ts-loader')
						},
						// default file loader
						{
							exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
							loader: require.resolve('file-loader'),
							options: {
								name: 'static/media/[name].[hash:8].[ext]'
							}
						}
					],
				}
			]
		},
		output: {
			filename: '[name].js',
			path: path.join(__dirname, '/build'),
			pathinfo: true,
			publicPath: '/'
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				chunks: ['toFillTheAir'],
				inject: true,
				template: path.join(__dirname, 'public/index.html')
			})
		],
		resolve: {
			extensions: [
				'.mjs',
				'.web.ts',
				'.ts',
				'.web.tsx',
				'.tsx',
				'.web.js',
				'.js',
				'.json',
				'.web.jsx',
				'.jsx',
			]
		},
		watch: env.watch,
		watchOptions: {
			aggregateTimeout: 500,
			ignored: [
				'build',
				'node_modules'
			],
			poll: 1000
		}
	}
};
