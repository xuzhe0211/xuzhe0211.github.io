<template>
<div>
    <div class="cpt-hello">{{msg}}</div>
    <button @click="change">测试按钮</button>
</div>
</template>
<script>
export default {
    data() {
        return {
            msg: 'Hello VuePress Demo'
        }
    },
    methods: {
        change() {
            console.log('hello');
        }
    }
}
</script>