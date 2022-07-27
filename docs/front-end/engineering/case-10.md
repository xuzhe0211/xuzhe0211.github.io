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

// langmap
const jet = require('fs-jetpack');
const path = require('path');
const os = require('os');
const dirVars = {
    lang: path.resolve(__dirname, 'lang'),
    langVar: path.resolve(__dirname, 'lang/variable.json'),
};
const allJSON = jet.find(dirVars.lang, { matching: ['*.json', '!variable.json'] });
const langListObj = jet.read(dirVars.langVar, 'json');
const maps = langListObj;
const langdoc = {};
allJSON.forEach(filePath => {
    const json = jet.read(filePath, 'json');
    const [_, name] = os.platform() === 'win32' ? filePath.split('\\') : filePath.split('/');
    const lang = name.substr(0, 5);
    if (path.basename(filePath).split('-').pop() === 'Tdoc.json') {
        langdoc[lang] = json[lang];
    }
    if (maps[lang]) { // 翻译存在再进行合并
        maps[lang] = Object.assign(maps[lang], json[lang]);
    }
});
Reflect.ownKeys(maps).forEach(lang => {
    Object.assign(maps[lang] || {}, langdoc[lang] || {});
});
module.exports = {
    langs: Object.keys(langListObj),
    maps,
};
```


## 资料
[react多语言](/source-react/react-tips-i18n.html)