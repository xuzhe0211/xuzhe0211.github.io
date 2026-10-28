import { sidebar } from 'vuepress-theme-hope';

export default sidebar({
	'/': [
		{
			text: '文章 articles',
			icon: 'book',
			prefix: 'articles/',
			children: [
				{
					text: '课程学习',
					icon: 'fa6-solid:graduation-cap',
					prefix: 'source-study/',
					collapsible: true,
					children: 'structure'
				},
				{
					text: 'Vue 源码',
					icon: 'star',
					prefix: 'source-vue/',
					collapsible: true,
					children: 'structure'
				},
				{
					text: 'React 源码',
					icon: 'fa6-brands:react',
					prefix: 'source-react/',
					collapsible: true,
					children: 'structure'
				},
				{
					text: '前端',
					icon: 'fa6-solid:code',
					prefix: 'front-end/',
					collapsible: true,
					children: 'structure'
				},
				{
					text: '后端',
					icon: 'fa6-solid:server',
					prefix: 'back-end/',
					collapsible: true,
					children: 'structure'
				},
				{
					text: '开发工具',
					icon: 'fa6-solid:screwdriver-wrench',
					prefix: 'tools/',
					collapsible: true,
					children: 'structure'
				},
				{
					text: '日常',
					icon: 'fa6-solid:feather',
					prefix: 'wander/',
					collapsible: true,
					children: 'structure'
				}
			]
		}
	]
});
