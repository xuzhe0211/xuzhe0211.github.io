---
# sidebarDepth: 0
title: property 和 attribute 区别
---
在大多数的文章中,<span style="color:blue">attribute一般被翻译为"特性", property被译为"属性"</span>
### 结论

HTML attribute | DOM property
--- | ---
值永远是字符串或`null` | 值可以是任意合法`js`类型
大小写不敏感 | 大小写敏感
不存在时返回`null` | 不存在时返回`undefined`
对于`href`，返回`html`设置的值 | 对于`href`返回解析后的完整`url`
更新`value`，属性也更新	| 更新`value`，特性不更新

## 概述
当我们书写HTML代码的时候，我们为HTML元素设置特性,例如
```html
<input id="name" value="justjavac"/>
```
我们写了一个input标签，并给他定义了2个特性(id 和 value)。当浏览器解析这段代码的时候，会把html源码解析为DOM对象，确切的说是解析为[HTMLInputElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement)对象。HTMLInputElement的继承关系是
```js
HTMLInputElement
  ↓
HTMLElement
  ↓
Element
  ↓
EventTarget
  ↓
Object
```
通过查看文档会发现，HTMLInputElement的原型上定义了很多属性和方法，例如：form,name, type, alt, checked,src, value等等，还有从HTMLElement继承来的id,title,clientTop等等。

如果仔细找找，就不难发现其中就有我们为input标签定义的特定：id和value。**<span style="color: blue">当浏览器解析网页时，将HTML特性映射为了DOM属性</span>**

而Element类还有一个[attribute](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attributes)属性，里面包含了所有的特性

但是，<span style="color: red">HTML attribute和DOM property并不总是一对一的关系</span>

## 1.DOM属性
<span style="color: blue">当浏览器解析完HTML后，生成的DOM是一个继承自Object的常规Javascript对象，因此我们可以像操作任何JS对象那样操作DOM对象</span>
```js
const el = document.getElementById('name');
el.foo = 'bar';
el.user = { name: 'jjc', age: '18'}
```
也可以为其添加方法。如果你想给每个html元素都添加属性或方法，甚至可以直接修改Element.prototype，不过我们不推荐怎么做。

## 2. HTML特性
和DOM属性类似，除了那些规范里定义的标准特性外，HTML也可以添加非标准的属性，例如：
```html
<input id="name" value="justjavac" foo="bar">
```
当HTML特性映射为DOM属性时，只映射标准属性，<span style="color: blue">**访问非标准属性将得到undefined**</span>
```js
const el = document.getElementById('name');
el.foo === undefined
```
好在DOM对象也提供了操作特性的API:
- <span style="color: blue">Element.hasAttribute(name)---判断某个特性是否存在</span>
- <span style="color: blue">elem.getAttribute(name)---获取指定特性的值</span>
- <span style="color: blue">elem.setAttribute(name)--- 设置指定特性的值</span>
- <span style="color: blue">elem.removeAttribute(name)--- 移除指定特性</span>

以上API定义在Element上

根据HTML规范，标签以及特性名是不区分大小写的，因此以下代码是一样的：
```js
el.getAttribute('id');
el.getAttribute('ID');
el.getAttribute('iD')
```
**<span style="color: blue">并且，特性永远都是字符串或null。</span>**如果我们为特性设置非字符串的值，则引擎会将此值转换为字符串。<span style="color: blue">属性是具有类型的</span>
```js
el.getAttribute('checked') === ''; // 特性是字符串
el.checked === false; // 属性是Boolean类型的值

el.getAttribute('style') === 'color: blue'; // 特性是字符串
typeof el.style === 'object'; // 属性是 CSSStyleDeclaration对象
```
即使都是字符串，属性和特性也可能不同，有一个例外就是hre:
```js
el.getAttribute('href') === '#tag'; // 特性原样返回html设置的值
el.href === 'http://jjc.fun#tag'; // 属性返回解析后的完整url
```

## 3. 特性和属性的同步
<span style="color: red">当标准的特性更新时，对应的属性也会更新；反之亦然</span>

<span style="color: red">但是 input.value的同步是单向的，只是 attribute --> property。当修改特性时，属性也会更新；但是修改属性后，特性却还是原值</span>

```js
el.setAttribute('value', 'jjc'); // 修改特性
el.value === 'jjc'; // 属性也更新了

el.value = 'newValue'; // 修改属性
el.getAttribute('value') === 'jjc'; // 特性没有更新
```

## 4. 非标准特性
<span style="color: red">非标准HTML特性并不会自动映射为DOM属性。当我们使用 data- 开头的特性时，会映射到DOM的dataset属性。中划线格式会变成驼峰格式 </span>

```js
el.setAttribute('data-my-name', 'jjc');
el.dataset.myName === 'jjc';

el.setAttribute('data-my-AGE', 18);
el.dataset.myAge === '18'
```

### 自定义特性 VS 非规范特性
HTML允许我们自定义标签，也可以扩展标签的特性，但是我们推荐使用已经进入HTML5规范的自定义特性 data-*.比如我们想为 div 标签增加一个age特性，我们可以有两种选择

```html
<div age="18">justjavas</div>
<div data-age="18">justjavac</div>
```
虽然第一种代码更短，但是却又一个潜在的风险。因为HTML规范是一直发展变化的，也许在未来的某个版本中，age呗添加进了标准特性里面，这会引起潜在的bug；



## 资料

详情请见: [HTML attribute 和 DOM property](https://github.com/justjavac/the-front-end-knowledge-you-may-not-know/blob/master/archives/015-dom-attributes-and-properties.md)
