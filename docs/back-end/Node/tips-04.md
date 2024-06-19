---
autoGroup-6: node问题记录
title: Node 批量写入文件
---
如果你需要批量写入文件，可以使用Node.js的fs模块来实现。你可以通过循环或迭代的方式，针对每一个需要写入的文件执行写入操作

下面是一个示例代码，演示了如何批量写入文件
```js
const fs = require('fs');

function writeToFile(filePath, data) {
    fs.writeFile(filePath, data, 'utf8', error => {
        if(error) {
            console.error(`Error writing to file ${filePath}:`, error);
        } else {
            console.log(`Data written to file ${filePaht} successfully.`)
        }
    })
}

// 示例:批量写入文件
const filesToWrite = [
    { path: 'file1.txt', data: 'Hello, file 1!' },
    { path: 'file2.txt', data: 'Hello, file 2!' },
    { path: 'file3.txt', data: 'Hello, file 3!' }
]

filesToWrite.forEach(file => {
    const filePath = file.path;
    const data = file.data;
    writeToFile(filePaht, data);
})
```
在上述代码中，我们定义了一个writeToFile函数,它接受文件路径(filePath)和要写入的数据(data)作为参数。在函数内部，我们使用 fs.writeFile方法将数据写入文件

然后