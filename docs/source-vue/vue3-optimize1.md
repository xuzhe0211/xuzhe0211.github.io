---
autoGroup-0: Vue3
title: 用了组合式 (Composition) API 后代码变得更乱了，怎么办？
---
## 有序的写组合式API
```html
<script setup>
    // import 语句
    // Props (defineProps);
    // Emits (defineEmits);
    // 响应式变量定义
    // computed 
    // Watchers
    // 函数
    // 生命周期
    // Expose (defineExpose);
</script>
```


## 最终解决方案
我们不如将前面的方案进行融合一下，抽取出多个 useCount 函数放在当前vue组件内，而不是抽成单个Hooks文件。并且在多个 useCount 函数中我们还是按照前面约定的规范，按照顺序去写ref变量、computed、函数的代码。

最终得出的最佳实践如下图
```html
<script setup lang="ts">
    import { ref, computed } from 'vue';

    const { count1, doubleCount1, increment1 } = useCount1();
    const { count2, doubleCount2, increment2 } = useCount1();
    const { count3, doubleCount3, increment3 } = useCount1();
    const { count4, doubleCount4, increment4 } = useCount1();
    const { count5, doubleCount5, increment5 } = useCount1();

    function useCount1() {
        const count1 = ref(0);
        const doubleCount1 = computed(() => count1.value * 2);

        function increment1() {
            count1.value++;
        }

        return { count1, doubleCount1, increment1 }
    }
    function useCount2() {
        // 省略
    }
    function useCount3() {
        // 省略
    }
    function useCount4() {
        // 省略
    }
    function useCount5() {
        // 省略
    }
</script>
```
上面这种写法有几个优势

- 我们将每个 count 的逻辑都抽取成单独的 useCount 函数，并且这些函数都在当前vue文件中，没有将其抽取成hooks文件。如果哪天 useCount1 中的逻辑需要给其他组件使用，我们只需要新建一个 useCount文件，然后直接将 useCount1 函数的代码移动到新建的文件中就可以了
- 如果我们想查看 doubleCount1 和 increment1 中的逻辑，只需要找到 useCount1 函数，关于count1 相关的逻辑都在这个函数里面，无需像之前那样翻山越岭几十行代码才能从 doubleCount1 的代码跳转到 increment1 的代码

## 总结
本文介绍了使用 Composition API 的最佳实践，规则如下
- 首先约定了一个代码规范，Composition API 按照约定的顺序进行书写(书写顺序可以按照公司代码规范适当调整)。并且同一种组合式API的代码写在同一个地方，比如所有的porps放在一块、所有的emits放在一块、所有的computed放在一块
- <span style="color: blue">如果逻辑能够多个组件复用就抽取成单独的hooks文件。</span>
- <span style="color: blue">如果逻辑不能给多个组件复用，就将逻辑抽取成useXXX函数，将useXXX函数的代码还是放到当前组件中</span>

第一个好处是如果某天useXXX函数中的逻辑需要给其他组件复用，我们只需要将useXXX函数的代码移到新建的hooks文件中即可。

第二个好处是我们想查看某个业务逻辑的代码，只需要在对应的useXXX函数中去找即可。无需在整个vue文件中翻山越岭从computed模块的代码跳转到function函数的代码。

