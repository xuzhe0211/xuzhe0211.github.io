---
autoGroup-14: 设计模式
title: 访问者（Visitor）模式
---
<span style="color: blue">访问者模式是将对数据的操作和数据结构进行分离，将对数据中个元素的操作封装成独立的类，使其在不改变数据结构的前提下可以拓展对数据新的操作</span>

这个模式有点像看文章小说，不同的人收获到的心情是不一样的，就是在类的封装又添加了访问者的封装，对不同的访问者访问类结构的属性返回不一样的逻辑结果

例如做项目，需求文档，项目经理访问需求文档的是想了解项目边界，开发人员访问需求文档的是想知道有哪些功能开发、难点和重点，测试人员访问需求文档是想评估测试用例多少。不同的立场返回项目的信息会不同，但是需求文档结构还是那个需求文档

```js
class DocumentReader {
    constructor(name) {
        this.name = name;
    }
    access() {
        const documentVisitor = new DocumentVisitor();
        console.log(this.name, ' readComplate:', documentVisitor.readComplate(this))
    }
}
// 前端开发
class WebDevelopers extends DocumentReader {
    constructor(name) {
        super(name);
    }
}
// 项目经理
class Manager extends DocumentReader {
    constructor(name) {
        super(name)
    }
}
// 测试人员
class Tester extends DocumentReader {
    constructor(name) {
        super(name);
    }
}
class DocumentVisitor {
    readComplate(visitor) {
        if (visitor.constructor === Manager) {
            return {
                beginTime:'2021-01-01',
                endTime:'2022-01-01',
                functions:'用户登录，验证码',
                developmentTime:'2021-01-05~2020-06-30',
                testTime:'2020-07-01~2020-12-01'
            }
        }
        else if (visitor.constructor === WebDevelopers) {
            return {
                functions:'用户登录页面开发',
                difficulty:'html + js + css'
            }
        }
        else if (visitor.constructor === Tester) {
            return {
                functions: '100个测试用例'
        }
    }
}
const webDevelopers = new WebDevelopers('爱钱的大厦韩')；
webDevelopers.access()

const manager = new Manager('牛总');
manager.access();

const tester = new Tester('陈sir');
tester.access();
```

访问者模式就如上面，写完了，就是同一个数据结构，因不同的对象所得到的结构会不同。它保留了原数据结构的完整性，但是添加了访问者的封装逻辑，但是如果进行对象扩张，访问者的逻辑也需要进行扩展，当然访问者也可以使用其他设计模式来进行代码的封装，例如状态设计模式

## 资料
[访问者（Visitor）模式](https://zhuanlan.zhihu.com/p/351113306)