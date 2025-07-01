---
autoGroup-0: Vue3
title: 开发vue项目，该用template写法还是jsx写法？
---
## 1, vue文件使用jsx
```html
<!-- test.vue -->
<script lang="tsx">
  import { defineComponent, ref, h, compile, computed } from 'vue';

  export default defineComponent({
    setup() {
      return () => h('div', { class: 'bar', innerHTML: 'hello11' });
    //   或者
    //   return () => <div>hello</div>;
    },
  });
</script>

<!-- 使用 -->
 <template>

     <Test />
 </template>
 <script>
     import Test from './test.vue';
 </script>
```
## 2. 使用jsx文件
```js
const titleprops = {
  title: {
    type: String as PropType<string>,
    default: 'nihao'
  }
}
type ButtonProps = ExtractPropTypes<typeof titleprops>
export default defineComponent({
  props: titleprops,
  setup(props: ButtonProps) {
    const { title } = toRefs(props)
    return () => <>{title.value}</>
  }
})
```
## jsx + vue 作为组件开发
index.vue
```html
<template>
    <div ref="refOp" class="operate" v-show="modelValue" :style="style">
        <div class="item" v-for="btn in btns" @click="operateHandle(btn)">
            <i :style="{ 'background-image': `url(${btn.icon})` }"></i>
            {{ btn.label }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, PropType, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { IBtn } from './index';

const props = defineProps({
    btns: {
        type: Array as PropType<IBtn[]>,
        default: () => {
            return [];
        }
    },
    modelValue: {
        type: Boolean,
        default: false
    },
    style: {
        type: Object
    },
    scrollEle: {
        type: Object as PropType<Element | Window>,
        default: Window
    }
});

const emits = defineEmits(['close', 'update:modelValue', 'action']);

const refOp = ref<HTMLDivElement>();

onMounted(() => {
    onClickOutside(refOp, evt => {
        emits('update:modelValue', false);
    });
    props.scrollEle.addEventListener('scroll', scrollFun);
});

onUnmounted(() => {
    props.scrollEle.removeEventListener('scroll', scrollFun);
});

const scrollFun = () => {
    emits('update:modelValue', false);
};

const operateHandle = (btn: IBtn) => {
    emits('action', btn);
};
</script>

<style lang="scss" scoped>
.operate {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 244px;
    border-radius: 16px;
    background: #3c3a4d;
    box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    .item {
        height: 84px;
        @include border-1px-before(rgba(255, 255, 255, 0.1));
        display: flex;
        align-items: center;
        padding-left: 48px;
        font-size: 14px;
        color: #ffffff;
        i {
            margin-right: 6px;
            width: 32px;
            height: 32px;
            background-size: 100%;
            background-repeat: no-repeat;
        }
        &:first-child {
            &::before {
                display: none;
            }
        }
    }
}
</style>
```
index.js导出使用
```js
import type { AppContext, ComponentPropsOptions } from 'vue';
import { createVNode, render, unref, MaybeRef } from 'vue';
import PopoverCom from './index.vue';

export const popoverBox = {
    _context: null as AppContext | null
};

export interface IBtn {
    value: string;
    label: string;
    icon?: string;
    [key: string]: string | undefined;
}

export const showPop = (
    target: MaybeRef<HTMLDivElement>,
    btns: IBtn[],
    scrollEle: HTMLElement | Window = window,
    appContext?: AppContext
) => {
    const container = document.createElement('div');
    const targetRect = unref(target).getBoundingClientRect();
    const propsStyle = {
        left: `${targetRect.left}px`,
        top: `${targetRect.top + targetRect.height}px`,
        transform: `translateX(calc(-100% + ${targetRect.width}px))`
    };

    return new Promise<IBtn>((resolve, reject) => {
        let vm = createVNode(PopoverCom, {
            btns: btns,
            modelValue: true,
            style: propsStyle,
            scrollEle: scrollEle,
            'onUpdate:modelValue': () => {
                setTimeout(() => {
                    render(null, container);
                }, 100);
                reject('cancel');
            },
            onAction: (btn: IBtn) => {
                setTimeout(() => {
                    render(null, container);
                }, 100);
                return resolve(btn);
            }
        });
        vm.appContext = appContext || popoverBox._context; // 通过getCurrentInstance().appContext.config.xxx获取的值
        render(vm, container);
        document.body.appendChild(container.firstChild as Node);
    });
};
```


## 资料
[开发vue项目，该用template写法还是jsx写法？](https://juejin.cn/post/7221376169370943549?)