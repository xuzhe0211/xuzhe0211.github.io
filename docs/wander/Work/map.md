---
autoGroup-3: 地图
title: 百度地图自定义覆盖物问题
---
:::danger
注意：不管label弹窗还是自定义覆盖物或者tgis pop弹窗  需要content的类型支持string | HTMLElement，如果不支持的话  vue或者react渲染方式是不生效的，只能渲染出[object HTMLDivElement]；
:::

```js
// vue
<template>
<div>
  <slot></slot>
</div>
</template>
<script>
export default {
    name: 'bm-overlay',
    props: {
        pane: {
            type: String
        },
        map: {
            type: Object
        }
    },
    // watch: {
    //     pane () {
    //         this.reload()
    //     }
    // },
    mounted() {
        this.load();
    },
    methods: {
        load () {
            const {map, $el, pane} = this
            const $emit = this.$emit.bind(this)
            class CustomOverlay extends BMapGL.Overlay {
                initialize () {
                    try {
                        map.getPanes()[pane].appendChild($el)
                    } catch (e) {}
                        return $el
                    }
                draw () {
                    $emit('draw', {
                        BMap: window.BMapGL,
                        map: map,
                        el: $el,
                        overlay: this
                    })
                }
            }
            const overlay = new CustomOverlay()
            this.map.addOverlay(overlay)
        }
    }
}
</script>
// react
 
 
import { render } from 'react-dom';
this.contentDom = document.createElement('div');
 
const child = this.props.children;
 
render(<div>{child}</div>, this.contentDom)
 
this.marker = new CustomOverlay(position, this.contentDom, {
 
  zIndex: this.props.zIndex,
 
  pane: this.props.pane,
 
  offset: this.props.offset
 
});
 
map.addOverlay(this.marker);
```
