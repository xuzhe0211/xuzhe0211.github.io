---
title: 算法
---

![算法](./images/code.png)


## 两数之和
```
var twoSum = function(nums, target) {
    let obj = {};
    for (let i = 0; i < nums.length; i++) {
        num = nums[i];
        if (num in obj) {
            return [obj[num], i];
        } else {
            obj[target - num] = i
        }
    }
}
twoSum([2,7,11,16], 9)
```
## 三数之和
```
var threeSum = function(nums) {
    let ans = [];
    const len = nums.length;
    if(nums == null || len < 3) return ans;
    nums.sort((a, b) => a - b); // 排序
    for (let i = 0; i < len ; i++) {
        if(nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
        if(i > 0 && nums[i] == nums[i-1]) continue; // 去重
        let L = i+1;
        let R = len-1;
        while(L < R){
            const sum = nums[i] + nums[L] + nums[R];
            if(sum == 0){
                ans.push([nums[i],nums[L],nums[R]]);
                while (L<R && nums[L] == nums[L+1]) L++; // 去重
                while (L<R && nums[R] == nums[R-1]) R--; // 去重
                L++;
                R--;
            }
            else if (sum < 0) L++;
            else if (sum > 0) R--;
        }
    }        
    return ans;
};
```
[力扣三数之和](https://leetcode-cn.com/problems/3sum/solution/hua-jie-suan-fa-15-san-shu-zhi-he-by-guanpengchn/)

## 最大序数和

```
var maxSubArray = function(nums) {
    var cur = 0; maxSub = nums[0];
    nums.forEach(x => {
        cur = Math.max(cur + x, x);
        maxSub = Math.max(maxSub, cur);
    })
    return maxSub;
};
var arr = [1,2,3, 1,3,4, -19, 34,-23];
console.log(masSubArray); // 34
```

## 快排

### 阮一峰老师的js快排实现
1. 选择数组中间数作为基数，并从数组中取出此基数
2. 准备两个数组容器，遍历数组，逐个与基数比对，较小的放左容器，较大的放右容器
3. 递归处理两个容器的元素，并将处理后的数据与基数按大小合并成一个数组返回

```
var quickSort = function(arr) {
    if (arr.length <= 1) return arr;
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}
```
**总结**

思路非常清晰，选择基数作为参照，划分数组,分而治之，对于新手来理解快排的核心思想"参照-划分-递归"，很容易理解

既实现了排序，又符合快速排序的思想，为什么还会有人诟病呢，是因为：

1. 取基数用的是splice()函数取，而不是算法中常用的取下标。基数只是一个参照对象，在比对的时候，只要能从数组中取到就好，所以只需要知道它的索引，调用函数删除基数只会更耗时。

2. 根据基数来划分时,专门生成两个数组来存储，从而占用更多的存储空间(增加了空间复杂度)

严格来讲，还有更多改进之处

### 文章中提出的快排js实现

思路：

1、通过下标取中间数为基数；

2、从起点往后寻找比基数大的，记录为下标 i；再从终点往前寻找比基数小的，记录为下标 j，当 i <= j时，原地交换数值；

3、重复步骤2，直到遍历所有元素，并记录遍历的最后一个下标 i，以此下标为分界线，分为左右两边，分别重复步骤1~3实现递归排序；

实现（为方便理解，在原文基础上有所合并）：

```
// 快排改进——黄佳新
var devide_Xin = function (array, start, end) {
    if(start >= end) return array;
    var baseIndex = Math.floor((start + end) / 2), // 基数索引
            i = start,
            j = end;

    while (i <= j) {
        while (array[i] < array[baseIndex]) {
            i++;
        }
        while (array[j] > array[baseIndex])  {
            j--;
        }

        if(i <= j) {
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            i++;
            j--;
        }
    }
    return i;
}

var quickSort_Xin = function (array, start, end) {
    if(array.length < 1) {
        return array;
    }
    var index = devide_Xin(array, start, end);
    if(start < index -1) {
        quickSort_Xin(array, start, index - 1);
    }
    if(end > index) {
        quickSort_Xin(array, index, end);
    }

    return array;
}
```
总结：

1、用下标取基数，只有一个赋值操作，跟快；

2、原地交换，不需要新建多余的数组容器存储被划分的数据，节省存储；

比较：

相较而言，理论分析，实现二确实是更快速更省空间，那么事实呢？
<img :src="$withBase('/images/1115094-20180614151451933-1234664957.png')" alt="耗时比较">

以上是实现一与实现二在chrome上测试耗时的统计结果，测试方案为：各自随机生成100万个数（乱序）,分别完成排序，统计耗时。

结论：

事实上，乱序排序，实现二更快。

### 三、网上其他的快排js实现

思路：

1、通过下表取排序区间的第0个数为基数

2、排序区间基数以后，从右往左，寻找比基数小的，从左往右，寻找比基数大的，原地交换；

3、重复步骤2直到 i >= j；

4、将基数与下标为 i 的元素原地交换，从而实现划分；

5、递归排序基数左边的数，递归排序基数右边的数，返回数组。

```
var quickSort_New = function(ary, left, right) {
    if(left >= right) {
        return ary;
    }

    var i = left,
            j = right;
            base = ary[left];

    while (i < j) {
        // 从右边起，寻找比基数小的数
        while (i<j && ary[j] >= base) {
            j--;
        }

        // 从左边起，寻找比基数大的数
        while (i<j && ary[i] <= base) {
            i++
        } 

        if (i<j) {
            var temp = ary[i];
            ary[i] = ary[j];
            ary[j] = temp;
        }
    }

    ary[left] = ary[i];
    ary[i] = base;

    quickSort_New(ary, left, i-1);
    quickSort_New(ary, i+1, right);

    return ary;
}
```

总结：

除选基数不同以外，其他与实现二类似。

另外：

比较一下实现二与实现三的速度，结果如下：
<!-- ![二三比较](/images/1115094-20180614154538001-997011957.png) -->
<img :src="$withBase('/images/1115094-20180614154538001-997011957.png')" alt="foo">
多次测试结果均为：实现二耗时略小于实现三，偶尔出现大于的情况，但相差不大。

## 二分查找

```
function binary_search(arr, low, high, key) {
    if (low > high) retrun -1;
    var mid = parseInt((low + high) / 2);
    if (arr[mid] === key) {
        return mid;
    } else if (arr[mid] > key) {
        high = mid - 1;
        return binary_search(arr, low, high, key);
    } else if (arr[mid] < key) {
        low = mid + 1;
        return binary_search(arr, low, high, key);
    }
}
```

第二种
```
var search = function(nums, target) {
    var n = 0;
    var h = nums.length - 1;
    while(n < h) {
        var mid = Math.floor((n + h) /2);
        if(target==nums[mid]){
            return mid
        }
        if(nums[mid]<target){
            n=mid+1
        }
        if(nums[mid]>target){
            h=mid-1
        }
    }
    return -1;
}
```

## 扑克牌问题

  有一堆扑克牌，将牌第一张放到桌子上，在将接下来牌的第一张放到牌底，如此往复；最后桌子上的牌顺序为:(牌底)1，2，3，4，5，6，6，7，8，9，10，11，12，13(牌顶)；<br/>
  问：原来牌的顺序，用函数实现
  ```
  let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13];
  let _arr = [];
  function sortPoke() {
      while(arr.length > 0) {
          //选择抽取哪张牌
          if(arr.length % 2 === 1) {
              _arr.push(arr.pop());
          } else {
              _arr.push(arr.shift());
          }
      }
      return _arr;
  }
  console.log(sortPoke())
  //[13, 1, 12, 2, 11, 3, 10, 4, 9, 5, 8, 6, 7]
  ```
### 有A、B两个数组
A: [1,2,3,4,5]

B: [5,1,4,2,3]
```
function formatArr(nums) {
    let arr = [];
    while(nums.length > 0) {
        if (arr.length % 2 === 1) {
            arr.push(nums.shift());
        } else {
            arr.push(nums.pop())
        }
    }
    return arr;
}
console.log(formatArr([1,2,3,4,5]))
```
## JavaScript 深拷贝
  ```
  //
  function copyObj(obj) {
      var newobj = {};
      for(const key in obj) {
          if(typeof obj[key] === 'object') {
              newobj[key] = copyObj(obj[key])
          } else {
              newobj[key] = obj[key]
          }
      }
      return newobj;
  }
  /** MessageChannel接口允许创建一个新的消息通道，并通过它的两个MessagePort属性发送数据。MessageChannel接口实例化以后，会有两个属性port1和port2.**/
  function copyObj(obj) {
      return new Promise(resolve => {
          const { port1, port2 } = new MessageChannel();
          port1.postMessage(obj);
          port2.onmessage = ev => resolve(ev.data);
      })
  }
  var obj1 = {a:1}
  var clone1 = await structuralClone(obj1)
  ```
## 盛水最多的容器---双指针法
  ```
  var maxArea = function(height) {
      var left = 0;
      var right = height - 1;
      var max = 0;
      while(left < right) {
          var now = (right - left) * Math.min(height[right], height[left]);
         max = now > max ? now : max;
         if (height[left] > height[right]) {
          right --;
          } else {
          left++;
         }
      }
      return max;
  }
  ```
## 大数相加

  思路遍历两个字符串从个位数算起开始相加，定义temp接受两个数之和，除以10取余拼接上结果，最后判断temp是否大于0，如果大于9则进位temp=1

```
var addstring = function(num1, num2) {
    var len1 = num1.length, len2 = num2.length; temp = 0; res = '';
    while(len1 || len2) {
        if(len1) {
            temp += +num1[--len1];
        }
        if(len2) {
            temp += +num2[--len2];
        }
        res  = temp % 10 +res;
        if(temp > 9) {
            temp =1;
        } else {
            temp = 0;
        }
        if (temp) {
            res = 1 +res; 
        }
    }
    return res;
}
```

## sqrt

  ```
  var mySqrt = function(x) {
       if (x < 2) return x
       let left = 1, mid, right = Math.floor(x / 2);
       while (left <= right) {
          mid = Math.floor(left + (right - left) / 2)
          if (mid * mid === x) return mid
          if (mid * mid < x) {
              left = mid + 1
          }else {
              right = mid - 1
          }
       }
       return right
  };
  ```

## 恢复空格

  哦，不！你不小心把一个长篇文章中的空格、标点都删掉了，并且大写也弄成了小写。像句子"I reset the computer.It still didn't boot!"已经变成'iresetthecomputeritstilldidntboot'。在处理标点符号和大小写之前，你得先把它断成词语。当然了，你有一本厚厚的词典dictionary,不过有些词没在词典里。假设文章用sentence表示，设计一个是算法，把文章断开，要求未识别的字符最少，返回未识别的字符数。

  注意：本题对原题稍作改动，只需返回未识别的字符数

  ```
  //示例
  输入：dictionary = ['looked', 'just', 'like', 'her', 'brother'];
  sentence = 'jesslookedjustliketimherbrother';
  输出 7
  解释：断句后'jess looked just like tim her brother',共7个未识别字符。

  var respace = function(dictionary, sentence) {
       if(sentence.length == 0) return 0;
      let dp = new Array(sentence.length).fill(0);
      for(let i = 1;i<=sentence.length;i++){
          dp[i] = dp[i-1]+1;
          // 上面表示，如果没有匹配那么dp[i]相比于dp[i-1]直接多1
          // 接着讨论如果新加一个字符，组成了一个词的情况
          for(let j=0;j<dictionary.length;j++){
              let word = dictionary[j].length;
              if(dictionary[j] == sentence.substring(i-word,i) && word<=i){
                  dp[i] = Math.min(dp[i],dp[i-word]);
              }
          }
      }
      return dp[sentence.length]
  };
  ```
## 两个数组的交集

  ```
  /**
  给定两个数组，编写一个函数来计算它们的交集。
  示例1：
  输入：nums1 = [1,2,2,1], num2 = [2,2];
  输出： [2,2]
  说明：
     输出结果中每个元素出现的次数，应与元素在两个数组中出现的次数一致
     我们可以不用考虑输出结果的顺序
  **/
  var intersect = function(nums1, nums2) {
      let tmp = [], arr = [];
      if(nums1.length > nums2.length) {
          tmp = nums1;
          nums1 = nums2;
          nums2 = tmp;
      }
      for (let key of nums1) {
          temp = nums2.indexOf(key);
          if(temp > -1) {
              arr.push(key);
              nums2.splice(temp, 1);
          }
      } 
      return arr;
  }


  // 交集并集差集
    var set1 = new Set([1,2,3]);
    var set2 = new Set([2,3,4]);

    并集
    let union = new Set([...set1, ...set2]);

    交集
    let intersect = new Set([...set1].filter( x => set2.has(x)));

    差集
    let difference = new Set([...set1].filter(x => !set2.has(x)));


  ```
  [参考](https://blog.csdn.net/u010003835/article/details/79042135)
## 数组中的第K个最大元素
输入: [3,2,1,5,6,4] 和 k = 2

输出: 5
```
// 第一种
var findKthLargest = function(nums, k) {
    nums = nums.sort((a, b) => a -b);
    return nums[k - 1]
}
// 
```
[力扣官方](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/solution/shu-zu-zhong-de-di-kge-zui-da-yuan-su-by-leetcode-/)

[数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/solution/xie-gei-qian-duan-tong-xue-de-ti-jie-yi-kt5p2/)

## 分割数组最大值

给定一个非负整数数组和一个整数m,你需要将这个数组分成m个非空的连续子数组。设计一个算法使得这个m个子数组各自和的最大值最小。
```
  //贪心算法
  var splitArray = function(nums, m) {
      let left = 0; right = 0;
      let len = nums.length;
      for(let i = 0; i < len; i++) {
          right += nums[i];
          if(left < nums[i]) {
              left = num[i];
          }
      }
      function check(mid, m) {
          let sum = 0;
          let cnt = 1;
          for (let i = 0; i < len; i++) {
              if (sum + nums[i] > mid) {
                  cnt++;
                  sum = nums[i];
              } else {
                  sum += nums[i];
              }
          }
          return cnt <= m;
      }
      while(left < right) {
          let mid = Math.floor((left + right) / 2);
          if (check(mid, m)) {
              right = mid;
          } else {
              left = mid + 1;
          }
      }
      return left;
  }
```

## 统计字符串出现最多的字符

```
function getMax(str) {
    var hash = {}, maxStr, max = 1;
    for (var i = 0; i < str.length; i++) {
        if (!hash[str[i]]){
            hash[str[i]] = 1;
        } else {
            hash[str[i]]++;
        }
        if (hash[str[i]] > max) {
            max = hash[str[i]];
            maxstr = str[i];
        }
    }
    return masStr;
}
```
## 无重复字符的最长子串--单指针

```
var getSubString = function(str) {
    if (!str.length) return 0;
    let tempStr = '';
    let maxStrlen = 0;
    let len = str.length;
    let left = 0;
    for (var i = 0; i < len; i++) {
        if (tempStr.indexOf(str[i]) !== -1) {
            left += (str.slice(left, i)).indexOf(str[i]) + 1;
            continue;
        }
        tempStr = str.slice(left, i + 1);
        maxStrlen = Math.max(maxStrlen, tempStr.length);
    }
    return maxStrlen
}
```
## 查找一个字符中指定的子串的所有位置

```
var str = 'fdhfgcsaedvcfhgfh';
var index = str.indexOf('f'); // 字符出现的位置
var num = 0; // 这个字符出现的次数

while（index !=== -1）{
    console.log(index);
    num++;
    index = str.indexOf('f', index + 1); // 从字符串出现的位置的下一个位置开始继续查找
}
console.log('f一共出现了'+num+'次')；
```
## 缺失的第一个正数
:::tip
给一个未排序的正数数组，找出没有出现的最小正正数

[1,2,0] => 3

[3, 4, -1, 1] => 2

[7, 8, 9,11, 12] => 1
:::

```
var firstMissingPositive = function(nums) {
    let result = 1;
    while(nums.includes(result)) {
        result++;
    }
    return result;
}
```
## 长度最小的子数组
:::tip
s = 7； nums = [2, 3,1, 2, 4, 3];

输出2， 子数组[4, 3] 最小的连续子数组

:::

```
var minSubArrayLen = function(s, nums) {
    let n = nums.length;
    let left = 0, res = Infinity, sum = 0;
    for (let right = 0; right < n; right++) {
        //记录和
        sum += nums[right];
        //满足条件,收缩左指针
        while(sum >= s) {
            //收缩之前，取最小值  
            res = Math.min(res, right - left + 1);
            sum -= nums[left++];
        }
    }
    //注意数组全部加起来或者数组为0的时候，res不变；
    return res == Infinity ? 0 : res;
}
```
## 数组组合
[力扣地址](https://leetcode-cn.com/problems/combinations/)
给定两个整数n和k,返回1...n中所有可能的k个数的组合。

示例：
```
输入: n = 4， k = 2;

输出：
[
    [2,4],
    [3,4],
    [2,3],
    [1,2],
    [1,3],
    [1,4]
]
```

**题解**
```
const combine = function(n, k) {
    const res = [];
    const could = [];
    if (k === 0) {
        return [[]];
    }
    function dfs(start, n, k, res, could) {
        if (could.length === k) {
            res.push(could.slice(0));
            return;
        }
        for (let i = start; i < n + 1; i++) {
            could.push(i);
            dfs(i+1, n, k, res, could);
            could.pop();
        }
        return res;
    }
    return dfs(1, n, k, res, could);
}
```

## 字符串有效性检查
```
// '{}[]()'

var isValid = function(s) {
    const stack = [];
    for (let val of s) {
        console.log(stack)
        if (val === '(') stack.push(')');
        else if (val === '[') stack.push(']');
        else if (val === '{') stack.push('}');
        else if (stack.length === 0 || val !== stack.pop()) return false;
    }
    return stack.length === 0;
};
```

## 会议室问题

给定一个会议时间安排的数组，每个会议时间都会包括开始和结束的时间 [[ s1 , e1 ] ，[ s2 , e2 ]，…] (si < ei) ，为避免会议冲突，同时要考虑充分利用会议室资源，请你计算至少需要多少间会议室，才能满足这些会议安排。
例如:

输入: [[0, 30],[5, 10],[15, 20]]

输出: 2

面试现场讨论了算法原理，未有时间编码调试：

```
function fn(arr) {
    const sortArr = arr.sort((a,b) => a[0] - b[0]);
    console.log(sortArr);
    let number = 1;
    let end = sortArr[0][1];
    for (let i = 1; i < sortArr.length; i++) {
        if (sortArr[i][0] < end) {
            end !== sortArr[i][0] ? number++ : '';
        }
        end = sortArr[i][1];
    }
    return number;
}
console.log(fn([[0, 30],[5, 10],[15, 20], [10,35], [20, 30]]));
```

## 加油站
[leetcode](https://leetcode-cn.com/problems/gas-station/solution/tan-xin-si-xiang-by-value-9-v9dd/)
```
输入: 
gas  = [1,2,3,4,5]
cost = [3,4,5,1,2]

输出: 3

解释:
从 3 号加油站(索引为 3 处)出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
因此，3 可为起始索引。
```

```
var canCompleteCircuit = function(gas, cost) {
    let curSum = 0, // 当前站点的剩余油料
        start = 0,
        totalSum = 0; // 总的剩余油料

    for(let i = 0; i < cost.length; i++) {
        curSum += gas[i] - cost[i];
        if(curSum < 0) {
            start = i+1;
            curSum = 0;
        }
        totalSum += gas[i] - cost[i];
    }

    return start >= gas.length || totalSum < 0  ? -1 : start;
};

```

## 山脉数组的峰顶索引
```
// 方法一:枚举
var peakIndexInMountainArray = function(arr) {
    const n = arr.length;
    let ans = -1;

    for (let i = 1; i < n - 1; ++i) {
        if (arr[i] > arr[i + 1]) {
            ans = i;
            break;
        }
    }
    return ans;
};

// 二分查找
var peakIndexInMountainArray = function(arr) {
    const n = arr.length;
    let left = 1, right = n - 2, ans = 0;
    while(left <= right) {
        consnt mid = Math.floor((left + right) / 2);
        if (arr[mid] > arr[mid + 1]) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}
```
## 山脉数组中查找目标值

输入：array = [1,2,3,4,5,3,1], target = 3

输出：2

解释：3 在数组中出现了两次，下标分别为 2 和 5，我们返回最小的下标 2。

```
var findInMountainArray = function(target, mountainArr) {
    let l = 0, r = mountainArr.length() - 1
    
    // 二分求 峰顶
    while (l < r) {
        let mid = Math.floor((l + r) / 2)
        
        if (mountainArr.get(mid) > mountainArr.get(mid + 1)) {
            r = mid
        } else {
            l = mid + 1
        }
    }
        
    let peak = r;

    // 搜索左边
    let index = binary_search(mountainArr, target, 0, peak, x => x)
    
    // 如果目标在左边, 返回
    if (index !== -1) return index
    
    // 如果目标不在左边, 搜索右边
    return binary_search(mountainArr, target, peak + 1, mountainArr.length() - 1, x => -x)
};

function binary_search(mountain, target, l, r, callback) { // callback 方法处理递增还是递减
    
    target = callback(target)

    while (l <= r) {
        let mid = Math.floor((l + r) / 2)
        let midValue = callback(mountain.get(mid))
        
        if (midValue === target) {
            return mid
        } else if (midValue < target) {
            l = mid + 1
        } else {
            r = mid - 1
        }  
    } 
    return -1
}
```
## 螺旋矩阵
给你一个m行n列的矩阵matrix，请按照顺时针螺旋顺序，返回矩阵中所有元素
![螺旋矩阵0](./images/spiral1.jpg)
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]

输出：[1,2,3,6,9,8,7,4,5]

![螺旋矩阵](./images/42ee2ec6854ee79ac2b7c91259d2ad5db70522668d11fc691e9e14426918a666-image.png)
- 如果一条边从头遍历到底，则下一条边遍历的起点随之变化
- 如果不遍历到底，可以减小横向、竖向遍历之间的影响
- 一轮迭代结束时，4条边的两端同事收窄1
- 一轮迭代所有的事情变得很清晰：**遍历一个圈，遍历的返回收缩为内圈**
- 不再形成环了，就会剩下下一行或一列，然后单独判断

```
var spiralOrder = function(matrix) {
    if(matrix.length === 0) return [];
    const res = [];
    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;
    while(top < bottom && left < right) {
        for (let i = left; i < right; i++) res.push(matrix[top][i]); // 上层
        for (let i = top; i < bottom; i++) res.push(matrix[i][right]); // 右层
        for (let i = right; i > left; i--) res.push(matrix[bottom][i]); // 下层
        for (let i = bottom; i > top; i--) res.push(matrix[i][left]); // 左层
        right--;
        top++;
        left++;
        bottom--; // 四个边界同事收缩，进入内层
    }
    if(top === bottom) { // 剩下一行，从左到右依次添加
        for (left i = left; i <= right; i++) res.push(matrix[top][i]);
    } else if(left === right) { // 剩下一列，从上到下依次添加
        for (let i = top; i <= bottom; i++) res.push(matrix[i][left]);
    }
    return res;
}

```
[螺旋数组](https://leetcode-cn.com/problems/spiral-matrix/solution/shou-hui-tu-jie-liang-chong-bian-li-de-ce-lue-kan-/)

## LRU 缓存机制
问题
```
输入
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出
[null, null, null, 1, null, -1, null, -1, 3, 4]
```

答题
```
var LRUCatch = function(capacity) {
    this.capacity = capacity;
    this.map = new Map();
}

LRUCatch.prototype.get = function(key) {
    if (this.map.has(key)) {
        var temp = this.map.get(key);
        this.map.delete(key);
        this.map.set(ke, temp);
        return temp
    } else {
        return -1
    }
}

LRUCatch.prototype.put = function(key, value) {
    if(this.map.has(key)) {
        this.map.delete(key);
    }
    this.map.set(key, value);
    if(this.map.size > this.capacity) {
        this.map.delete(this.map.keys().next().value);
    }
}

```
[力扣](https://leetcode-cn.com/problems/lru-cache/)

扩展
```
var arr = [1,2,3,4,5]
arr.keys().next(); // {value: 0, done: false}

arr.keys() // Array Iterator {}
```
## 超级洗衣机
假设有 n 台超级洗衣机放在同一排上。开始的时候，每台洗衣机内可能有一定量的衣服，也可能是空的。

在每一步操作中，你可以选择任意 m (1 <= m <= n) 台洗衣机，与此同时将每台洗衣机的一件衣服送到相邻的一台洗衣机。

给定一个整数数组 machines 代表从左至右每台洗衣机中的衣物数量，请给出能让所有洗衣机中剩下的衣物的数量相等的 最少的操作步数 。如果不能使每台洗衣机中衣物的数量相等，则返回 -1 。

示例 1：

输入：machines = [1,0,5]

输出：3

解释：

第一步:    1     0 <-- 5    =>    1     1     4

第二步:    1 <-- 1 <-- 4    =>    2     1     3    

第三步:    2     1 <-- 3    =>    2     2     2   

```
var findMinMoves = function(machines) {
    const tot = eval(machines.join('+'));
    const n = machines.length;
    if (tot % n !== 0) {
        return -1;
    }
    let avg = Math.floor(tot / n);
    let ans = 0, sum = 0;
    for (let num of machines) {
        num -= avg;
        sum += num;
        ans = Math.max(ans, Math.max(Math.abs(sum), num));
    }
    return ans;
}
```
[力扣地址](https://leetcode-cn.com/problems/super-washing-machines/)

## 编辑距离
给你两个单词word1和word2,请你计算出将word1转换成word2所使用的最少操作数

你可以对一个单词进行如下三种操作
- 插入一个字符
- 删除一个字符
- 替换一个字符

实例
```
示例 1：

输入：word1 = "horse", word2 = "ros"
输出：3
解释：
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')

示例 2：
输入：word1 = "intention", word2 = "execution"
输出：5
解释：
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')
```
编写
```
function minDistance(word1, word2) {
    const m = word1.length, n = word2.length;
    // 我们要多添加一行一列，用来base case
    const dp = Array.form(Array(word1.length + 1), () => Array(word1.length + 1).fill(0));
    // 添加一列base case
    for(let i = 1; i < m; i++) {
        dp[i][0] = i;
    }
    // 添加一行 base case
    for(let i = 1; i < n; i++) {
        dp[i][i] = i
    }
    // 因为我们补了一行/列base case 这里都从1开始
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) { // 相等什么都不做
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1, // s1删除操作
                    dp[i][j - 1] + 1, // s1插入操作
                    dp[i - 1][j - 1]+ 1 // 替换
                )
            }
        }
    }
    return dp[m][n]
}
```
[参考](https://leetcode-cn.com/problems/edit-distance/solution/bian-ji-ju-chi-qiong-ju-ji-yi-hua-sou-su-8bff/)

## 逻辑思维
+ 一个班级60%喜欢足球，70%喜欢篮球，80%喜欢排球，问即三种球都喜欢占比有多少？
  三个都喜欢的人数最多时，就尽量重复排列
  60 70(10人喜欢一个)
  70 80(现共有80人， 60人喜欢三个 ，10人喜欢两个， 10人喜欢一个)

  所以10%- 60%


## 赛马
25匹马求出前三名 最少赛马几次

## 9个球问题
9个一样的球 有一个和其他不同