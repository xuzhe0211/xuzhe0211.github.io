import { defineUserConfig } from 'vuepress';
import bundler from './vitebundler';
import theme from './theme.js';

export default defineUserConfig({
	host: '0.0.0.0', // ip
	port: 8099, // 端口号
	base: '/',
	lang: 'zh-CN',
	title: '随风',
	description: 'xz · 个人博客',

	head: [
		['link', { rel: 'icon', href: '/app.jpeg' }],
		['meta', { name: 'theme-color', content: '#3eaf7c' }]
	],

	bundler,
	theme
});
