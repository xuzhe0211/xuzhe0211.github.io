import { viteBundler } from '@vuepress/bundler-vite';

export default viteBundler({
	viteOptions: {
		css: {
			preprocessorOptions: {
				scss: {
					// @vuepress/plugin-sass-palette 仍使用已废弃的 if() 函数（helper.scss:69），
					// dart-sass 1.104+ 会输出 DEPRECATION WARNING [if-function]。
					// 该文件在 node_modules 内无法改源码，此处静默该废弃提示。
					// quietDeps: 一并兜底，静默来自依赖的其它警告。
					quietDeps: true,
					silenceDeprecations: ['if-function']
				}
			}
		}
	}
});
