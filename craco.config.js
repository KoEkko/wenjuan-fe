// eslint-disable-next-line no-undef
module.exports = {
	webpack: {
		configure(webpackConfig) {
			if (webpackConfig.mode === "production") {
				// 抽离公共代码，只在生产环境
				if (webpackConfig.optimization === null) {
					webpackConfig.optimization = {};
				}
				webpackConfig.optimization.splitChunks = {
					chunks: "all",
					cacheGroups: {
						// 单独抽离 antd 和 react-dom
						antd: {
							name: "ant-chunk",
							test: /antd/,
							priority: 100,
						},
						reactDom: {
							name: "reactDom-chunk",
							test: /react-dom/,
							priority: 99,
						},
						// 其余的在 vendors
						vendors: {
							name: "vendors-chunk",
							test: /node_modules/,
							priority: 98,
						},
					},
				};
			}
			return webpackConfig;
		},
	},
	devServer: {
		port: 8000,
		proxy: {
			"/api": "http://localhost:3001",
		},
	},
};
