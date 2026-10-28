import { hopeTheme } from 'vuepress-theme-hope';

import navbar from './navbar.js';
import sidebar from './sidebar.js';

export default hopeTheme(
	{
		hostname: 'https://xuzhe0211.github.io',

		author: {
			name: 'xz',
			url: 'https://xuzhe0211.github.io'
		},

		favicon: '/app.jpeg',

		repo: 'xuzhe0211/xuzhe0211.github.io',

		// docsDir: 'src',

		// 导航栏
		navbar,

		// 侧边栏
		sidebar,

		sidebarSorter: ['readme', 'order', 'date', 'filename'],

		// 页脚
		footer: 'xz',
		displayFooter: true,

		// 博客相关
		blog: {
			name: 'xz',
			description: '前端 · 源码 · 生活笔记',
			intro: '/intro.html',
			medias: {
				github: 'https://github.com/xuzhe0211/xuzhe0211.github.io',
				email: 'mailto:xuzhe-0211@163.com'
			}
		},

		pageInfo: ['Author', 'Date', 'Word', 'ReadingTime', 'Tag'],

		contributors: false,

		// toc: false,

		darkmode: 'toggle',
		// fullscreen: true,
		// focus: true,

		// 多语言配置
		metaLocales: {
			editLink: 'Pull Requset 大欢迎(?) ♡'
		},

		// 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
		// hotReload: true,

		// 此处开启了很多功能用于演示，你应仅保留用到的功能。
		// ===== Markdown 配置 =====
		markdown: {
			// 自动为含 {{ }} 插值的行/块添加 v-pre，避免被 Vue 模板编译（VP1→VP2 迁移关键）
			vPre: true,
			// 代码块行高亮等用默认
			alert: true,
			hint: true
		},

		// 在这里配置主题提供的插件
		plugins: {
			blog: true,

			components: {
				components: ['Badge', 'VPCard', 'Share']
			},

			icon: {
				prefix: 'fa6-solid:'
			},

			slimsearch: {
				indexContent: true,
				// @ts-ignore
				isSearchable: (page) => page.path !== '/'
			},
			// 图片预览
			photoSwipe: true,
			// 代码块复制
			copyCode: {},

			// 版权信息
			copyright: {
				author: 'xz',
				license: 'MIT'
			}
		}
	},
	{
		custom: true
	}
);
