---
title: 链表
---
## 单向链表

```
var arr = [1,2,3,4];
var jiao = arr[Symbol.iterator]();
console.log(jiao.next())
```
手写一个interator

```
Array.prototype.myInterator = function() {
    let i = 0;
    let items = this;
    return {
        next() {
            const done = i >= items.length;
            const value = done ? undefined : items[i++];
            return {
                value,
                done
            }
        }
    }
}
var jiao = arr.myIterator();
console.log(jiao.next());
```

## 判断单链表是否带环

```
//第一种方法
function judge(list) {
	var set = new Set();
    while(list) {
    	if (set.has(list)) {
        	console.log('存在环')；
            console.log(list);
            return true;
        }
        set.add(list);
        list = list.next();
    }
    return set;
}
//快慢指针，设定快指针fast,慢指针slow,每次循环快指针fast移动两个位置，慢指针移动一个位置
function judge(list) {
	//创建快慢指针
    var fast = list.next.next,
    	slow = list.next;
    while(list) {
    	if (fast === slow) {
        	console.log('存在环')；
            console.log('fast:', fast);
            console.log('slow:', slow);
            return true;
        }
        fast = fast.next.next;
        slow = slow.next;
    }
}
// 最靠谱吧？
var hasCycle = function(head) {
    let traversingNode = head;
    while(traversingNode){
        if(traversingNode.isVistitd) return true
        traversingNode.isVistitd = true
        traversingNode = traversingNode.next
    }
    return false;
};
```
## 删除链表中重复的元素

```
var deletelist = function(head) {
    var cur = head;
    while(cur && cur.next) {
        if (cur.val === cur.next.val) {
            cur.next = cur.next.next;
        } else {
            cur = cur.nnext;
        }
    }
    return head;
}
```

## 反转链表

给你单链表的头节点head，请你反正链表，并返回反转后的链表

![反转链表](./images/linkd01.jpeg)

输入：head = [1,2,3,4,5]; 输出： [5, 4,3,2,1]

### 迭代

假设链表为 1→2→3→∅，我们想要把它改成 ∅←1←2←3。

在遍历链表时,将当前节点的next指针改为指向前一个节点。由于节点没有引用其前一个节点，因此必须事先存储其前一个节点。在更改引用之前还需要存储后一个节点，最后返回新的头引用

```
var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while(curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
```
时间复杂度O(n) 空间复杂度O(1);

### 递归
递归版本稍微复杂一些，其关键在于反向工作

```
var reverseList = function(head) {
    if (head === null || head.next === null) {
        return head;
    }
    const newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
}
```
时间复杂度O(n)  空间复杂服O(n)；空间复杂度主要取决于递归调用的栈空间最多N层

## 合并两个有序链表

将两个升序链表合并为一个新的升序链表并返回。新链表是通过萍姐给定的两个链表所有节点组成的。

![合并链表](./images/linkd02.jpeg)

输入：l1 = [1,2,4], l2 = [1,3, 4]

输出 [1,1,2,3,4,5]

## 递归
```
function mergeTwoLists(l1, l2) {
    if (l1 === null) {
        return l2
    } else if (l2 === null) {
        return l1
    } else if (l1.val < l2.val) {
        l1.next = mergeTwolist(l1.next, l2);
        return l1
    } else if (l2.val > l2.val) {
        l2.next = mergeTwolist(l1, l2.next);
        return l2
    }
}
```

### 迭代

思路:我们可以用迭代的方法来实现上述算法。当l1和l2都不是空链表时，判断l1和l2哪个链表的投节点的值更小，将较小的节点直接添加到结果里，当一个节点被添加到结果里之后，将对应链表中的节点向后移一位。

```
var mergeTwoLists = function(l1, l2) {
    const prehead = new ListNode(-1);

    let prev = prehead;
    while(l1 != null && l2 != null) {
        if (l1.val <= l2.val) {
            prev.next = l1;
            l1 = l1.next
        } else {
            prev.next = l2;
            l2 = l2.next;
        }
        prev = prev.next;
    }
    // 合并后 l1 和 l2 最多只有一个还未被合并完，我们直接将链表末尾指向未合并完的链表即可
    prev.next = l1 === null ? l2 : l1;
    return prehead.next;
}
```

## 两数相加
给你两个非空链表来代表两个非负证书。数字最高位位于链表开始位置。他们的每个节点值存储一位数字，将这两数相加会返回一个新的链表

你可以假设除了数字0之外，这两个数字都不会以0开头

示例

![两数相加](./images/1626420025-fZfzMX-image.png)
```
输入： l1 = [7,2,4,3], l2 = [5,6,4]
输出: [7, 8, 0, 7]

输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[8,0,7]
```
解答：
```
var addTwoNumbers = function(l1, l2) {
    const stack1 = [];
    const stack2 = [];
    const stack = [];

    let cur1 = l1;
    let cur2 = l2;
    let curried = 0;

    while (cur1) {
        stack1.push(cur1.val);
        cur1 = cur1.next;
    }

    while (cur2) {
        stack2.push(cur2.val);
        cur2 = cur2.next;
    }

    let a = null;
    let b = null;

    while (stack1.length > 0 || stack2.length > 0) {
        a = Number(stack1.pop()) || 0;
        b = Number(stack2.pop()) || 0;

        stack.push((a + b + curried) % 10);

        if (a + b + curried >= 10) {
            curried = 1;
        } else {
            curried = 0;
        }
    }

    if (curried === 1) {
        stack.push(1);
    }

    const dummy = {};

    let current = dummy;

    while (stack.length > 0) {
        current.next = {
            val: stack.pop(),
            next: null
        };

        current = current.next;
    }

    return dummy.next;
};
```

[两数相加](https://leetcode-cn.com/problems/add-two-numbers-ii/solution/cjspython-mo-ni-jin-wei-445-liang-shu-xiang-jia-ii/)