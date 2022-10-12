---
autoGroup-0: 面试记录
title: 2022--9-10又一次
---
a. 写一个加密方法，将指定的字符用等长度的 * 代码
```js
var a = "helloworldfoobar123456foo"
var b = ["foo", "2345"]
fn(a, b) => helloworld***bar1****6***


const fn = (a, b) => {
    let res = a
    for(let item of b) {
        let reg = new RegExp(item, 'gi');
        while(res.indexOf(item) > -1) {
            res = res.replace(reg, res => {
                return res.split('').map(item => '*').join('')
            })

        }
    }
    return res;
}
console.log(fn('helloworldfoobar123456foo', ["foo", "2345"]))
```
b. 写一个方法将下面的平铺数组转成树形结构
```js
  	var a = [
	  {
	      "id": "1",
	      "zoneName": "A",
	      "parentId": "0",
	  },
	  {
	      "id": "2",
	      "zoneName": "A1",
	      "parentId": "1",
	  },
	  {
	      "id": "9",
	      "zoneName": "B",
	      "parentId": "0",
	  },
	  {
	      "id": "5",
	      "zoneName": "A2",
	      "parentId": "1",
	  },
	  {
	      "id": "10",
	      "zoneName": "A21",
	      "parentId": "5",
	  }
  	];
  	fn(a)  => [
	  {
	      "id": "1",
	      "zoneName": "A",
	      "parentId": "0",
	      "children": [
			  {
			      "id": "2",
			      "zoneName": "A1",
			      "parentId": "1",
			  },
			  {
			      "id": "5",
			      "zoneName": "A2",
			      "parentId": "1",
			      children: [
					  {
					      "id": "10",
					      "zoneName": "A21",
					      "parentId": "5",
					  }
			      ]
			  },
	      ]
	  },
	  {
	      "id": "9",
	      "zoneName": "B",
	      "parentId": "0",
	  }
  	];


const fn = a => {
    let arr = [];
    let map = {}
    for(let m of a) {
        let item = map[a.id] = {
            ...m,
            children: []
        }
        if(m.parentId === '0') {
            res.push(item)
        } else {
            map[a.parentId].children.push(item)
        }
    }
    return arr;
}
```
