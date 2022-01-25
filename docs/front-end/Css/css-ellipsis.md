---
autoGroup-1: Css Tips
title: 多行文本内容超出隐藏
---

## css 超出隐藏
1. 如果单行文本的溢出显示省略号都知道用text-overflow:ellipsis属性来，
    ```
    .hide {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    ```
2. 多行文本溢出

    ```
    display:-webkit-box;/**对象作为伸缩盒子模型展示**/
    -webkit-box-orient:vertical;/**设置或检索伸缩盒子对象的子元素的排列方式**/
    -webkit-line-clamp:3;/**显示的行数**/
    overflow:hidden;/**隐藏超出的内容**/
    ```

## js超出隐藏
通过css可以事先，但受限于浏览器兼容问题，有时候还需要依赖JS来实现。通过JS实现，就需要考虑到文字大小，中英文、数字、标点符号所对应的字节长度不一致，如果考虑的不全面，对于不同的问题内容，总会有点差距

- 首先，我们需要了解，中文汉字，英文字母，数字以及特殊符号所占的字节长度是不一样的，如果需要计算准确，就不能按照字符串的元素个数去截取，把他们换成字节数来截取，准确度更高。所以我们需要个获取字符串字节长度的方法

    ```
    function bitCompute(Content) {
        var total = 0,
            len = arguments[0].length || 0;
        for (var i = 0; i < len; i++) {
            if (content[i].charCodeAt() > 255) {
                total += 2;
            } else {
                total += 1;
            }
        }
        return total;
    }
    ```
- 对于要截取多少内容的字节数，我们需要知悉能放入容器内的字节数和总子节数的比例，展示字节数/总字节数 = offsetWidth / scrollWidth

    ```
    fucntion complate() {
        var offsetWidth = el.offsetWidth;
        var scrollWidth = el.scrollWidth;
        var gap = scrollWidth = offsetWidth;
        var percent = Math.floor(offsetWidth / scrollWidth * 1e3) / 1e3;
        return {
            gap: gap,
            percent: percent
        }
    }
    ```
- 根据计算出的数据，可以操作字符串了

    ```
    function cut(content) {
        el.innerHTML = content;
        var info = complate(),
            percent = info.percent;
        var total = bitCompute(content).total;
        var showLen = +(total * percent).toFixed(0) = cfg.placeholer;
        content = bitCompute(content, showLen).content;
        return content + cfg.padding;
    }
    function bitCompute(content, maxLen) {
         var total = 0,
                len = arguments[0].length || 0,
            outContent = '';
        for (var i = 0; i < len; i++) {
            if (content[i].charCodeAt() > 255) {
                total += 2;
            } else {
                total += 1;
            }
            if (maxLen && total > maxLen) {
                break;
            }
            outContent += content[i];
        }
        return {
            total: total,
            content: outContent
        }
    }
    ```

- 当然文字展示的多少，也和字体大小相关的，所以我们也需要把自己大小的因素考虑到，而且作为一个工作方法，本身就不应该页面中的元素有关系，所以我们应该在方法中自己创建元素，放入内容，计算offsetWidth和scrollWidth

    ```
    function cutFactory(opt) {
        var cfs = {
            padding: opt.padding || '...',
            classList: opt.classList || [],
            style: opt.style || {},
            debug: opt.debug
        }
        cfg.placeholder = bitCompute(cfg.padding).total;
        var el = doc.createElement("span");
        el.className = cfg.classList.join(" ");
        var customStyles = [];
        for (var styleKey in cfg.style) {
            if (cfg.style.hasOwnProperty(styleKey)) {
                customStyles.push(styleKey + ":" + cfg.style[styleKey]);
            }
        }
        el.style.cssText = "position:absolute;left:0;top:0;background:transparent;color:transparent;height:100%;white-space:nowrap;overflow:visible;border:0;" + (cfg.debug ? "background:white;color:red;" : "") + customStyles.join(";");
        var div = doc.createElement("div");
        div.appendChild(el);
        div.style.cssText = "width:99%;min-height:50px;line-height:50px;position:absolute;left:3px;top:3px;overflow:hidden;outline:0;background:transparent;" + (cfg.debug ? "outline:1px solid red;background:black;" : "");
        doc.body.appendChild(div);
        var css = win.getComputedStyle(el);
        cfg.fontSize = parseFloat(css.fontSize) || 16;
        
         return function (content) {
            el.innerHTML = content;
            var out = {
                flag: false,
                cut: '',
                all: content,
                last: content
            }
            if (complate().gap > 0) {
                out.flag = true,
                out.last = out.cut = cut(content)
            }
            return out
        }
    }
    ```
- 最后，在暴露一个方法，方便使用者调用。为了性能考虑，不能创建过多dom元素，我们可以缓存一下字体大小和容器高度相同的截取方法

    ```
    function subStringEl(name, fontSize, width) {
        this.subStringElFns || (this.subStringElFns = {});
        var key = 'key_' + fontSize + '_' + width;
        var fn = this.subStringElFns[key];
        if (!fn) {
            fn = this.subStringElFns[key] = cutFactory({
                style: {
                    'font-size': fontSize，
                    'width': width
                }
            })
        }
        return fn(name)
    }
    ```

这样就完美的解决了多行超出...显示的问题了，兼容性很好，而且也能准确截取，灵活方便。希望能帮助到受该问题困扰的同仁，内容中如有不正确之处，烦请指正,不胜感激! 另外附注源码地址：

github地址：https://github.com/18822600748/MyJSFactory/blob/main/src/subStrByWidth.js

## 资料
[原文](https://mp.weixin.qq.com/s/q5huSF35kPURslee58I8XA)