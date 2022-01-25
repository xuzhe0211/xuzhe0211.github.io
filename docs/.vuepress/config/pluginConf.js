// const moment = require('moment');
const secretKeyConf = require('./secretKeyConf.js');

// moment.locale("zh-cn");

module.exports = {
    "vuepress-plugin-auto-sidebar": {
        titleMode: "titlecase",
        collapsable: true,
        titleMap: {
            Interview: "面试",
            Engineering: "工程化",
            Frame: "框架",
            Code: "算法",
            Work: "工作",
            Life: "生活"
        },
        collapseList: [
            "/frontend/js/"
        ]
    }
};