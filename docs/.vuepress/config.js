const pluginConf = require('./config/pluginConf.js');
const navConf = require('./config/navConf.js');
const headConf = require('./config/headConf.js');

module.exports = {
    host: 'localhost', // ip
    port: '8099', // 端口号
    title: '随风',
    description: '随风随雨又随流',
    base: '/documents/',
    head: headConf,
    plugins: pluginConf,
    themeConfig: {
        // lastUpdated: '上次更新',
        // repo: 'shanyuhai123/documents',
        // editLinks: true,
        // editLinkText: '编辑文档！',
        docsDir: 'docs',
        nav: navConf,
        // algolia: {
        //     appId: 'M698VCXCJN',
        //     apiKey: '8b552055fb68ffc808bfbd3f98a1dbe2',
        //     indexName: 'shanyuhai_documents',
        //     algoliaOptions: {
        //         hitsPerPage: 10,
        //         facetFilters: ""
        //     }
        // }
    },
}