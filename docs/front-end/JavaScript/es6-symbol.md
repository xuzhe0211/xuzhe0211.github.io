---
autoGroup-13: ES6
title: symbol & bigint
---
## Symbol的作用
1. 防止变量名起冲突
2. 可以使用symbol 避免魔术字符串

    > 魔术字符串:在代码中多次出现、与代码形式强耦合的某一具体的字符串或数值
    ```js
    function getdata(val) {
        case 'magicString': 
            return ['this', 'is', 'magicString'];
        default: 
            return []
    }
    let data = getData('magicString');
    // 'magicString' 就是魔术字符串
    ```
    > 风格良好的代码，应该尽量消除魔术字符串，改成含义清晰的变量代替
    [Symbol实例消除魔术字符串](https://blog.csdn.net/GXing007/article/details/79567285)
3. 定义不重复的变量
4. <span style="color: red">symbol作为键名，不被常规方法遍历出来，因此可以给对象定义非私有，但只用于内部内部的方法和属性</span>

### Symbol相等问题？
```js
// 从全局注册表中读取
let id = Symbol.for('id'); // 如果该symbol不存在，则创建它

// 再次读取(可能在代码中的另一个位置)
let idAgain = Symbol.for('id'); 

// 相同的Symbol
alert(id === idAgain)
```
[symbol 类型](https://zh.javascript.info/symbol)

## BigInt：ES6 基本数据类型的背景、使用场景、副作用
> 在javascript中浮点数运算时经常出现0.1 + 0.2 = 0.3000000004这样的问题，除此之外还有一个不容忽视的大数危机(大数处理精度丢失)问题

### Javascript最大安全整数
IEEE 754双精确度浮点数(Double 64 Bits)中尾数部分是用来存储整数的有效位数，为52位，加上省略的一位1可以保存的实际数值为
```js
Math.pow(2, 53); // 9007199254740992 

Number.MAX_SAFE_INTEGER // 最大安全整数 9007199254740991  
Number.MIN_SAFE_INTEGER // 最小安全整数 -9007199254740991  
```
<span style="color: red">只要不超过Javascript中最大安全整数和最小安全整数范围都是安全的</span>

### 大数处理精度丢失的问题复现
- 例一

    在你在Chrome的控制台或者Node.js运行环境里执行一下代码会出现以下结果，What？为什么我定义的200000436035958034 却被转义为了 200000436035958050，在了解了 JavaScript 浮点数存储原理之后，应该明白此时已经触发了 JavaScript 的最大安全整数范围。

    ```js
    const num = 200000436035958034; 
    console.log(num); // 200000436035958050
    ```
- 例二

    以下示例通过流读取传递的数据，保存在一个字符串 data 中，因为传递的是一个 application/json 协议的数据，我们需要对 data 反序列化为一个 obj 做业务处理。
    ```js
    const http = require('http');

    http.createServer((req, res) => {
        if(req.method === 'POST') {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            })

            res.on('end', () => {
                console.log('未JSON反序列化的情况', data);
                try {
                    // 反序列化为obj对象，用来处理业务
                    const obj = JSON.parse(data);
                    console.log('经过JSON反序列化之后': obj)；
                    res.setHeader('Content-Type', 'application/json');
                    res.end(data)
                } catch(e) {
                    console.log(e);
                    res.statusCode = 400;
                    res.end('Invalid JSON');
                }
            })
        } else {
            res.end('OK')
        }
    }).listen(3000)
    ```
    运行上述程序之后在POSTMAN调用，200000436035958034 这个是一个大数值。

    以下为输出结果，发现没有经过 JSON 序列化的一切正常，**当程序执行 JSON.parse() 之后，又发生了精度问题，这又是为什么呢?JSON 转换和大数值精度之间又有什么猫腻呢?**
    ```js
    未 JSON 反序列化情况： { 
        "id": 200000436035958034 
    } 
    经过 JSON 反序列化之后： { id: 200000436035958050 } 
    ```
    经过 JSON 反序列化之后： { id: 200000436035958050 }

    这个问题也实际遇到过，发生的方式是调用第三方接口拿到的是一个大数值的参数，结果 JSON 之后就出现了类似问题，下面做下分析。
### JSON序列化对大数值解析有什么猫腻？
先了解下JSON的数据格式标准，Internet Engineering Task Force 7159(简称IEFE 7159)，是一种轻量级、基于文本与语言无关的数据交互格式，，源自 ECMAScript 编程语言标准.

https://www.rfc-editor.org/rfc/rfc7159.txt 访问这个地址查看协议的相关内容。

我们本节需要关注的是 “一个 JSON 的 Value 是什么呢?” 上述协议中有规定必须为 object, array, number, or string 四个数据类型，也可以是 false, null, true 这三个值。

到此，也就揭开了这个谜底，<span style="color: red">JSON在解析时对于其他类型的编码都会默认转换掉。对应我们这个例子中的大数值会默认编码为number类型，这样是造成精度丢失的真正原因</span>

### 大数运算的解决方案
1. 常用方法转字符串

    在前后端交互中这是通常的一种方案，例如，对订单号的存储采用数值类型 Java 中的 long 类型表示的最大值为 2 的 64 次方，而 JS 中为 Number.MAX_SAFE_INTEGER (Math.pow(2, 53) - 1)，显然超过 JS 中能表示的最大安全值之外就要丢失精度了，最好的解法就是将订单号由数值型转为字符串返回给前端处理，这是在工作对接过程中实实在在遇到的一个坑。

2. 新的希望BigInt

    BigInt是Javascript中一个新的数据类型，可以用来操作超出Number最大安全范围的整数

    - 创建BigInt方法一

        一种方法是在数字后面加上数字n
        ```js
        200000436035958034n; // 200000436035958034n 
        ```
    - 创建BigInt方法二

        另一种方法是使用构造函数BigInt(),还需要注意的是使用BigInt时最好还是使用字符串，否则还是会出现精度问题。看官方文档也提到了这块 github.com/tc39/proposal-bigint#gotchas--exceptions 称为疑难杂症
        ```js
        BigInt('200000436035958034') // 200000436035958034n 

        // 注意要使用字符串否则还是会被转义 
        BigInt(200000436035958034) // 200000436035958048n 这不是一个正确的结果 
        ```
    - 检测类型

        BigInt是一种新的数据类型，因为它与Number并不是完全相等的，例如1n并不会全等于1
        ```js
        typeof 200000436035958034n // bigint 
 
        1n === 1 // false 
        ```
    - 运算

        BigInt支持常见的运算符，但是永远不要与Number混合使用，请始终保持一致
        ```js
        // 正确 
        200000436035958034n + 1n // 200000436035958035n 
        
        // 错误 
        200000436035958034n + 1 
        // TypeError: Cannot mix BigInt and other types, use explicit conversions 
        ```
    - BigInt转字符串

        ```js
        String(200000436035958034n)// 200000436035958034 

        // 或者以下方式 
        (200000436035958034n).toString() // 200000436035958034  
        ```
    - 与JSON的冲突

        使用JSON.parse('{"id": 200000436035958034}')来解析会造成精度丢失问题，既然现在有了一个BigInt出现，是否可以使用以下方式正常解析呢？
        ```js
        JSON.parse('{"id": 200000436035958034n}')
        ```
        运行以上程序之后，会得到一个 SyntaxError: Unexpected token n in JSON at position 25 错误，最麻烦的就在这里，因为 JSON 是一个更为广泛的数据协议类型，影响面非常广泛，不是轻易能够变动的。

        在 TC39 proposal-bigint 仓库中也有人提过这个问题 github.comtc39/proposal-bigint/issues/24 截至目前，该提案并未被添加到 JSON 中，因为这将破坏 JSON 的格式，很可能导致无法解析。
    - BigInt支持

        BigInt 提案目前已进入 Stage 4，已经在 Chrome，Node，Firefox，Babel 中发布，在 Node.js 中支持的版本为 12+。
    - 总结

        我们使用BigInt做一些运算是没有问题的，但是和第三方接口交互，如果对JSON字符串做序列化遇到一些大数问题还是会出现精度丢失，显然这所有与与JSON的冲突导致的，下面给出第三种方案

### 3. 第三方库
知道了 JSON 规范与 JavaScript 之间的冲突问题之后，就不要直接使用 JSON.parse() 了，在接收数据流之后，先通过字符串方式进行解析，利用 json-bigint 这个库，会自动的将超过 2 的 53 次方类型的数值转为一个 BigInt 类型，再设置一个参数 storeAsString: true 会将 BigInt 自动转为字符串。
```js
const http = require('http');
const JSONbig = require('json-bigint')({'storeAsString': true});

http.createServer((req, res) => {
    if(req.method === 'POST') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            try {
                // 使用第三方库进行JSON序列化
                const obj = JSONbig.parse(data);
                console.log('经过 JSON 反序列化之后：', obj); 
 
                res.setHeader("Content-Type", "application/json"); 
                res.end(data); 
            } catch(e) { 
                console.error(e); 
                res.statusCode = 400; 
                res.end("Invalid JSON"); 
            } 
        })
    } else { 
        res.end('OK'); 
    } 
}).listen(3000)
```
再次验证会看到以下结果，这是是正确的了，问题也已经完美解决
```js
JSON 反序列化之后 id 值： { id: '200000436035958034' } 
```
#### json-bigint 结合 Request client
介绍下 axios、node-fetch、undici、undici-fetch 这些请求客户端如何结合 json-bigint 处理大数。

- 模拟服务端

    使用 BigInt 创建一个大数模拟服务端返回数据，此时，若请求的客户端不处理是会造成精度丢失的。
    ```js
    const http = require('http'); 
    const JSONbig = require('json-bigint')({ 'storeAsString': true}); 
    
    http.createServer((req, res) => { 
    res.end(JSONbig.stringify({ 
        num: BigInt('200000436035958034') 
    })) 
    }).listen(3000) 
    ```
- axios

    创建一个axios请求实例，其中的transfromResponse属性我们对原始的响应数据做一些自定义处理
    ```js
    const axios = require('axios').default;
    const JSONbig = require('json-bigint')({'storeAsString': true})

    const request = axios.create({
        baseUrl: 'http://localhost:3000',
        transfromResponse: [function(data) {
            return JSONbig.parse(data)
        }]
    })

    request({ 
        url: '/api/test' 
    }).then(response => { 
        // 200000436035958034 
        console.log(response.data.num); 
    }); 
    ```
- node-fetch

    node-fetch 在 Node.js 里用的也不少，一种方法是对返回的 text 数据做处理，其它更便捷的方法没有深入研究。
    ```js
    const fetch = require('node-fetch'); 
    const JSONbig = require('json-bigint')({ 'storeAsString': true}); 
    fetch('http://localhost:3000/api/data') 
    .then(async res => JSONbig.parse(await res.text())) 
    .then(data => console.log(data.num)); 
    ```



[Node.js 中遇到大数处理精度丢失如何解决？前端也适用！](https://www.51cto.com/article/674769.html)

[JS最新基本数据类型:BigInt](https://segmentfault.com/a/1190000019912017)

[利用json-bigint处理大数字[溢出]问题](https://juejin.cn/post/7002489417088630821)