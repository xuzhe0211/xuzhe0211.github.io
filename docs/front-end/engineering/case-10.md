---
autoGroup-12: 工程化知识卡片
title: 多语言
---
## nuxt项目
```js
// 执行 BUILD_ENV=global-base yarn dev
// nuxt.config.js
hooks: {
    "render:route" (_, res) {
        console.log(res.html)
        res.html = res.html.replace(/{#(.*?)#}/g, replaceFn);
        console.log(res.html)
    }
}
// replace.js
const { maps } = require('../langmap');
const customLang = (process.env.LANG || '').match(/^\w{2}-\w{2}$/) ? process.env.LANG : 'zh-cn';

module.exports = (_, $1) => {
    let _str;
    switch ($1) {
        case 'ENV':
            _str = 'dev';
            break;
        case 'LANG':
            _str = customLang;
            break;
        default:
            _str = maps[customLang][$1] || $1;
    }
    return _str;
};
```


## 资料
[react多语言](/source-react/react-tips-i18n.html)