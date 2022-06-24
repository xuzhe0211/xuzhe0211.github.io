---
autoGroup-1: react-tips
title: React项目国际化(antd)多语言开发
---
gitHbub上标成熟的库如下
- React-i18next
- React-intl
- react-intl-universa

## React-i18next
```js
// 安装
npm install i18next react-i18next --save

// 引入
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';

// 初始化
const lng = 'en';
i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translations: {
                    Welcome: 'Welcome to React'
                }
            },
            zh: {
                translations: {
                    Welcome: '欢迎进入react'
                }
            }
        },
        lng: lng,
        fallbackLng: lng,
        interpolation: {
            escapeValue: false,
        }
    })
```
实际使用结果
```js
function App() {
    const { t } = useTranslation();
    return (
        <div className="App">
            <p>{t('Welcome')}</p>
        </div>
    )
}
export default App;
```
封装后的成果
```js
// ...
import i18n from '@src/i18n';
// xxx component
console.log('i18n来一发:', i18n.t('INVALID_ORDER'));
render() { 
  // ...
  <button> {i18n.t('INVALID_ORDER')} </button>
}
```
## react-intl
用于国际化React组件，提供React组件和API来格式化日期,数字,字符串(包括单复数和翻译)

react-intl库是业界很受欢迎的库之一。react-intl用包裹组件的形式装饰你的React.Component,动态注入国际化消息，以便能够动态加载语言环境数据，并且无需重新加载页面
```js
// 安装
npm install react-intl --save
```
载入语言环境数据

React Intl依赖这些数据来支持单复数和相对时间格式化的功能
```js
// Main.js
import { addLocaleData } from 'react-intl'; /* react-intl imports */
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
addLocaleData([...en, ...zh]);  // 引入多语言环境的数据  
```
...

## react-intl-universal
由阿里巴巴推出的react国际化库

这个库最好地方在于使用简单方便，侵入性低

```js
// 安装
npm install react-intl-universal --save
```
初始化--在初始页面，进行该库的初始化，配置语言包，JSON文件根据需要支持几种语言来决定

项目入口中配置国际化
```js
import intl from 'react-intl-universal';

// locale data
const locales = {
    'en-US': require('./locales/en-US.json'),
    'zh-CN': require('./locales/zh-CN.json'),
}

class App extends Component {
    state = {initDone: false}

    componentDidMount() {
        this.loadLocales();
    }
    loadLocales() {
        // react-intl-universal 是单例模式，应该只实例化一次
        intl.init({
            currentLocale: 'en-US',
            locales,
        }).then(() => {
            this.setState({initDone: true});
        })
    }
    render() {
        return (
            this.state.initDone && 
            <div>
                {intl.get('SIMPLE')}
            </div>
        )
    }
}
```
语言配置文件可以是json或者js,json格式如下
```js
// 英语配置文件 ./locales/en-US.json
{
    "SIMPLE": "Simple Sentence",
    "LANG_TYPE": "paas-us",
    "INPUT_MOBILE": "Mobile Number",
    "HELLO": "Hello, {name}. Welcome to {where}!"
}
// 中文配置文件 ./locales/zh-CN.json
{
    "SIMPLE": "简单的句子",
    "LANG_TYPE": "paas-cn",
    "INPUT_MOBILE": "手机号",
    "HELLO": "你好, {name}。欢迎来到{where}!"
}
```
### 调用

在刚才的初始化代码中，render函数里面已经进行了调用了。在整个项目的其他地方，由于已经进行了初始化，所以可以直接调用了。调用例子如下
```js
import intl from 'react-intl-universal';

class Test extends Component {
    render() {
        return (
            <div>
                {intl.get('INPUT_MOBILE')}
            </div>
        )
    }
}
```
### 切换
在来看下初始化函数
```js
intl.init({
    currentLocale: 'en-US',
    locales,
})
```
初始化的时候，除了直接指定语言外，还可以由函数determinesLocale根据以下配置进行指定:
- Url中的query参数
- cookie中的参数
浏览器的当前语言(当没有配置query参数和cookie参数时)，这些配置的生效如下面代码所示
```js
let currentLocale = intl.determinesLocale({
    urlLocaleKey: 'lang',
    cookieLocaleKey: 'lang'
})
intl.init({
    currentLocale, // determine locale here
    locales,
})
```
那么,我们可以利用如下方式进行切换:当选择相应语言时，触发回调函数，在函数内，修改url或者cookie，然后进行页面刷新，重新初始化，即可切换语言了
```js
handleClick = lang => {
    Cookies.set('lang', lang, { expires: '1Y' });
    window.location.reload(true);
}
```
### 进阶
react-intl.universal库在语言处理上，还有很多其他功能，如
- 带HTML标签的HTML文本
- 变量
- 单复数形式
- 货币
- 日期

#### html中引用资源包里的文字
1. 纯文字，使用intl.get()

    ```js
    <div>{intl.get('SIMPLE')}</div>
    ```
2. 带html模版的文字，使用intl.getHTML()方法
    
    ```js
    // 例如资源包里是这样定义的
    {
        'SIMPLE': 'This is <span style="color: red">HTML</span>'
    }
    ```
    引用时需使用getHTML()方法获取文字
    ```js
    <div>{intl.getHTML('SIMPLE')}</div>
    ```
#### 数字形式和千位分隔符
下例中的变量为num，给它标记为plural后，它的值只能为数字。当num值为0时，显示'no photos';当值为1时，显示'one photo'；当值为其他数字比如25000时，显示'25000 photos',这里的'#'表示给num的值添加千位分隔符后显示
```js
{
    'PHOTO': 'You have {num, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}'
}
```
引用结果如下
```js
intl.get('PHOTO', {num:0}); // "You have no photos."
intl.get('PHOTO', {num:1}); // "You have one photo."
intl.get('PHOTO', {num:1000000}); // "You have 1,000,000 photos."
```
#### 显示货币格式
具体语法为{变量名,类型，格式化},下例中变量名'price'，它的类型是number,'USD'表示在值前面加上美元符号($)
```js
{
    'SALE_PRICE': 'The price is {price, number, USD}'
}
```
引用及显示结果如下
```js
intl.get('SALE_PRICE', {price: 123456.78}); // The price is $123,456.78
```
#### 显示日期
语法同上:{变量名，类型，格式化}，当类型为'date'时，格式化有以下选项：short,medium, long, full 也可不格式化
```js
{
  "SALE_START": "Sale begins {start, date}",
  "SALE_END": "Sale ends {end, date, long}"
}
// 引用及显示
intl.get('SALE_START', {start:new Date()}); // Sale begins 4/19/2017
intl.get('SALE_END', {end:new Date()}); // Sale ends April 19, 2017
```
#### 配置默认message
当遇到比如因拼写错误导致无法匹配到资源包里的文字时，可以事先配置默认的message，这时当无法匹配的资源包时会显示默认message
```js
//"defaultMessage()"可简写为"d()"
intl.get('not-exist-key').defaultMessage('没有找到这句话');
```
同理亦可配置带html模版的默认message
```JS
intl.getHTML('not-exist-key').d(<h2>没有找到这句话</h2>)
```
1. 带变量的message

    ```js
    // 资源包里的配置如下
    {
        'HELLO': 'Hello, {name}. Welcome to {where}!'
    }
    // 在html中引用时
    <div> intl.get('HELLO', {name: 'banana', where: 'China'})</div>
    
    // 显示的结果为：Hello, banana. Welcome to China!
    ```

到此react-intl-universal基本的使用方法介绍完毕了，如果以上达不到你的需求请前往git翻看更多readme文档和api文档。

[git地址](https://github.com/alibaba/react-intl-universal)






## 资料
[React项目国际化](https://segmentfault.com/a/1190000019576048)

[i18next](https://www.i18next.com/overview/getting-started)

[前端国际化解决方案-crowdin](https://juejin.cn/post/7040643521509851166)