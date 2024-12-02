---
title: JSON.parse相关
---
在Javascript中，JSON.parse()是用来将JSON格式的字符串转换为Javascript对象的函数.它非常常用，特别是在处理从API返回的JSON数据时。以下是JSON.parse()的实现和一些注意事项
## 基本表用法
```js
const jsonString = '{"name": "John", "age": 30, "city": "New York"}';

// 将JSON字符串转换为对象
const jsonObject = JSON.parse(jsonString);

console.log(jsonObject);
// 输出: { name: 'John', age: 30, city: 'New York' }
```
## 带有 reviver 参数的用法
JSON.parse()的第二个参数是一个 reviver 函数，它允许你对每个键值对进行转换处理
```js
const jsonString = '{"name": "John", "age": 30, "city": "New York"}';

// 使用 reviver 参数，将age的值增加1
const jsonObject = JSON.parse(jsonString, (key, value) => {
    if(key === 'age') {
        return value + 1;
    }
    return value;
});
console.log(jsonObject);
// 输出: { name: 'John', age: 31, city: 'New York' }
```
## 处理无效JSON
JSON.parse()只能解析有效的JSON格式。如果字符串格式不正确，会抛出错误。因此，你可以使用try...catch进行错误处理
```js
const invalidJson = '{"name": "John", "age": 30,' // 不完整json字符串

try {
    const jsonObject = JSON.parse(invalidJson);
    console.log(jsonObject);
} catch(e) {
    console.log('解析 JSON 出错：', error.message);
}
```
## 简单版实现JSON.parse()
我们可以实现一个非常基础的 JSON.parse(),支持最基本的数据类型如数字、字符串、布尔值和简单的对象。这个实现不处理所有JSON规范中的边缘情况，如嵌套、转义字符等
```js
function basicJSONParse(jsonString) {
    // 去掉前后的空白字符
    jsonString = jsonString.trim();
    
    // 判断是否是对象
    if (jsonString.startsWith('{') && jsonString.endsWith('}')) {
        let obj = {};
        // 去掉花括号
        jsonString = jsonString.slice(1, -1);
        
        // 将对象内的键值对按逗号分割
        let pairs = jsonString.split(',');
        pairs.forEach(pair => {
            let [key, value] = pair.split(':');
            key = key.trim().replace(/['"]+/g, '');  // 去掉引号
            value = value.trim();
            
            // 处理数字、布尔值和字符串
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);  // 字符串
            } else if (value === 'true') {
                value = true;  // 布尔值 true
            } else if (value === 'false') {
                value = false;  // 布尔值 false
            } else if (!isNaN(value)) {
                value = Number(value);  // 数字
            }
            
            obj[key] = value;
        });
        return obj;
    }
    
    // 如果输入的不是对象，直接抛错
    throw new Error("Unsupported JSON format");
}

// 示例
const jsonString = '{"name": "John", "age": 30, "isStudent": false}';
const result = basicJSONParse(jsonString);
console.log(result); // { name: 'John', age: 30, isStudent: false }
```
