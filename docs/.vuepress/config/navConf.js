module.exports = [
	{ text: '首页', link: '/' },
	{ text: '课程学习', link: '/source-study/' },
	{ text: 'Vue源码', link: '/source-vue/' },
	{ text: 'React', link: '/source-react/' },
	{
		text: 'Front End',
		ariaLabel: 'Front End Menu',
		items: [
			{ text: 'HTML-DOM', link: '/front-end/Html/' },
			{ text: 'Css', link: '/front-end/Css/' },
			{ text: 'JavaScript', link: '/front-end/JavaScript/' },
			{ text: 'Flutter', link: '/front-end/Flutter/' },
			{ text: 'Electron', link: '/front-end/Electron/' },
			{ text: '算法', link: '/front-end/Code/' },
			{ text: '工程化', link: '/front-end/Engineering/' },
			{ text: '前端面试题', link: '/front-end/Interview/' },
			{ text: '可视化', link: '/front-end/Visual/' },
			{ text: '前端安全', link: '/front-end/Security/' },
			{ text: '前端性能监控', link: '/front-end/Log/' }
		]
	},
	{
		text: '后端',
		ariaLabel: 'back End Menu',
		items: [
			{ text: 'Node', link: '/back-end/Node/' },
			{ text: 'Docker', link: '/back-end/Docker/' },
			{ text: 'Nginx', link: '/back-end/Nginx/' },
			{ text: 'Mysql', link: '/back-end/Mysql/' },
			{ text: 'shell', link: '/back-end/Shell/' }
		]
	},
	{
		text: '开发工具',
		ariaLabel: 'tools End Menu',
		items: [
			{ text: 'Ai', link: '/tools/Ai/' },
			{ text: 'Git', link: '/tools/Git/' },
			{ text: 'VScode', link: '/tools/VScode/' },
			{ text: 'Chrome', link: '/tools/Chrome/' },
			{ text: '工具', link: '/tools/Other/' }
		]
	},
	{
		text: '随记',
		ariaLabel: 'wander End Menu',
		items: [
			{ text: '工作', link: '/wander/Work/' },
			{ text: '生活', link: '/wander/Life/' }
		]
	}
];
