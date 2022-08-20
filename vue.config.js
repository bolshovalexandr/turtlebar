const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	css: {
		loaderOptions: {
			sass: {
				additionalData: `@import "@/assets/default.scss";@import "@/assets/normalize-classic.css"; @import "@/assets/normalize-modern.css";`
			}
		}
	},
	transpileDependencies: true,
	lintOnSave: 'warning'
});
