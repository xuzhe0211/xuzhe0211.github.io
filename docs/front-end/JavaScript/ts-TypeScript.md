---
autoGroup-13: TypeScript
title: vue中使用TS
---

>  (2020.01.07)其中有一些最佳时间可能会随着项目逐渐迭代进行调整，请自行辨别可行性

## Vue-CLI支持

Vue-CLI内建了TypeScript工具支持，在新建项目时可以选择使用TypeScript扩展，包括针对Vue Core得官方类型声明，还包括了Vue Router和Vuex提供了相应得声明文件。

使用Vue-CLI会自动创建tsconfig.json文件，基本上使用默认得配置文件就可以满足要求。

## 改造组件

使用TypeScript编写Vue文件组件有两种方式，一种是通过Vue.extend()方法，另一种是基于Vue组件(在使用Vue-CLI创建项目得时候可以选择)，我选择了后者，可以提供更优雅、更类似JSX得书写体验。

需要安装vue-class-component用来将Vue组件改写成基于Class的形式，也可以选择使用vue-property-decorator，后者依赖于前者，而且提供了额外的装饰符，让编写更简单。

使用得时候，将原来导出得类型由对象改为class，并且使用@Component装饰符，如果有要引入得其他子组件，也放到@Component中。
```js
@Component({
	components: {
    	Child
    }
})
export default class HelloVue extends Vue{
	//组件内容
}
```
要注意，虽然使用了export default, 但是Class的名字还是要最好准确定义，这样便于IDE和Lint工具进行追踪、提示。

### 2.1 组件属性顺序

没有发现Lint和Prettier规则来强制规定组件内的属性顺序，所以约定好一个书写顺序，最为最佳实践

要注意，组件引用、Mixin和Filters都放到了组件外部。总体顺序分为了三个部门：

1. <span style="color: blue">数据(Inject->Prop->Data->Computed->Model->Vuex-State->Vuex-Getter->Proivde)</span>
2. <span style="color: blue">方法(VueX-Mutation->Vuex-Action->methods->Watch)</span>
3. <span style="color: blue">钩子函数(生命周期钩子->路由钩子)</span>

完整的组件如下，具体写法后面单独列出来(不包含Mixin)
```js
@Component({ comonents: { Child }})
export default class App extends Vue{
	// 数据(Inject -> prop -> Computed -> Model -> vuex-state -> vuex-getter -> Proivide);
    // 使用祖先组件注入的数据
    @Inject() readonly value1!: string;
    
    //组件的Data
    value = 'hello';
    
    //父组件传入Prop
    @Prop(Number) readonly value2!: number;
    
    //计算属性
    get value3(): string{
    	return this.value1;
    }
    
    // 定义组件的Model属性
    @Model('change', { type: Boolean, default: false }) checked!: boolean;
    
    // Vuex Store中定义的state, 作为计算属性定义在组件内
    @State value4!: string;
    
    //Vuex Store 中定义的getter,作为计算属性定义在组件内
    @Getter value5!: string
    
    //为子孙组件提供数据
    @Provide() root = 'Root';
    
    /*--------------------------------*/
    // 方法（Vuex-Mutation -> Vuex-Action->Methods->Watch）
    // Vuex Store中定义的Mutation，作为方法定义在组件内
    @Mutation(UPDATE_TITLE_MUTATION) updateTitle!: (payload: {title: string}) => void;
    
    // Vuex Store 中定义的 Action，作为方法定义在组件内
  @Action(UPDATE_TITLE_ACTION) updateTitleSync!: () => void;
  
  // 组件内的 Method
  get foo(): string {
    return this.isCollapse ? 'collapsed-menu' : 'expanded-menu';
  }
  
  // 组件内的 Watch
  @Watch('value1', { immediate: true, deep: true })
  onDataChanged(newVal: string, oldVal: string): void {
    this.foo();
  }
  
  /*-------------------------------------------*/
  //钩子函数
  beforeCreated(){};
  
  created(){};
  
  beforeMount(){};
  
  mounted(){};
  
  beforeUpdate(){}
  
  updated(){};
  
  activated(){};
  
  deactivated(){};
  
  beforeDetory(){};
  
  destoryed(){}
}
```

### 2.2 相关API

#### (1)Data
直接在Class定义即可(实际上就是Class的新语法，与在Class的constructor中定义相同)
```
import {Vue, Component, Prop} from 'vue-property-decorator';
@Component
export default class YourComponent extends Vue {
	msg: number = 123;
}
```
#### (2)计算属性
计算属性采取使用getter的形式定义，在Class内部可以使用get和set关键字,设置某个属性的存指函数和取值函数。
```
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class YourComponent extends Vue {
	num: number = 1;
    get: value: string() {
    	return this.num + 1;
    }
}
```
同时定义set实现了对计算属性的赋值

#### (3)Prop
@Prop接受的参数就是原来在Vue中props中传入的参数
```
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class YourComponent extends Vue {
	@Prop(Number) readonly propA: number | undefined
    @Prop({ default: 'default value'}) readonly propB!: string
    @Prop([String, Boolean]) readonly propC: string | boolean | undefined
}
```

#### (4)PropSync
@PropSync与Prop类似，不同之后在于@PropSync会自动生成一个计算属性，计算属性的getter返回传入的Prop，计算属性的setter中会执行Vue中提倡的更新Prop的emit:updatePropName
```
import { Vue, Component, PropSync } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @PropSync('name', { type: String }) syncedName!: string
}
//相当于
export default {
  props: {
    name: {
      type: String
    }
  },
  computed: {
    syncedName: {
      get() {
        return this.name
      },
      set(value) {
        this.$emit('update:name', value)
      }
    }
  }
```
使用时需要配合.sync修饰符使用(即在组件上定义对应的更新方法)
```
<hello-sync :my-prop.sync = "syncValue"/>
<!--- 相当于 ---> 
<hello-sync :my-prop="syncValue" @update:name="(name) => syncValue = name"/>
```
#### （5）定义方法

定义方法与Data类型，直接在Class中定义方法即可
```
@Component
export default class HelloChild extends Vue{
	sayHi(): string{
    	return 'hello'
    }
}
```
#### (6)@Watch

使用@Watch定义侦听器，被装饰的函数就是侦听器执行方法
```
@Component
export default class HelloChild extends Vue {
	@Watch('msg', {immediate: true, deep: true })
    onMsgChanged(newVal: string, oldVal: string): void{
    	this.oldMsg = oldVal;
    }
}
```
#### (7)@Emit

想要触发父组件中定义在组件实例上的方法，需要使用@Emit装饰符。@Emit接受一个参数，是要触发的事件名，如果要触发的事件名和被装饰的方法同名，那么这个参数可以省略。@Emit返回值就是传递给事件的参数。

```
@Component
export default class HelloChild extends Vue{
	@Emit()
    sayHi(): strign{
    	return 'hello'
    }
    
    @Emit('go')
    goHere(): string{
    	return 'gogogo'
    }
}
//相当于
export default{
	sayHi() {
    	this.$emit('sayHi', 'hello');
    },
    goHere() {
    	this.$emit('go', 'gogogo');
    }
}
```
#### (8)Model
一般用来在自定义的组件上使用v-model，自定义组件中包含可交互元素(例如input或者checkbox),当组可交互元素绑定的值发生变化(oninput、onchange)时，会传递到父组件绑定的v-model属性上。

关于自定义组件v-model的介绍可以参考[官方文档](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)
```
<template>
	<el-checkbox :checked="checked" @change="changeHandler"
</template>

<script lang="ts">
import { Component, Vue, Model, Emit } from 'vue-property-decorator';

@Component
export default class HelloVModel extends Vue {
	@Model('change', { type: Boolean, default: false } checked!: boolean )
    
    @Emit('change')
    changeHandler(checked: boolean) {
    	return checked;
    }
}
</script>
```
使用的时候
```
<hello-v-model v-model="componentVModel"/>
```
自定义组件利用了@Model，定义了checked属性，并且利用了@change事件，当checkbox发生了change事件后，父组件中的componentVModel就会随之发生变化。

实际上Model和.sync修饰符都是Vue为了方便同步数据到父组件实现的语法糖

#### (9)Ref

当使用ref属性标记一个子组件或者HTML元素的时候，需要使用@Ref修饰符来找到标记的组件或者元素。例如：
```
<div ref="someRef"></div>
<hello-ref ref="hello"/>
```
如果我们需要获取ref引用时
```
import { Component, Vue, Watch, Ref } from 'vue-property-decorator';

@Component({
	components: {
    	HelloChild,
        HelloSync,
        HelloVModel,
        HelloRef
    }
})
export default class HelloVue extends Vue {
	@Ref() readonly hello!: HelloRef;
    @Ref() readonly someRef!: HTMLDivElement;
}
```
@Ref后面跟的参数就是对应的ref的值，需要为其指定类型，如果是原生的元素，可以使用对应的与内置原生元素类型，如果是自定义的组件，那么可以将引入的组件作为类型。

如果在HelloRef中定义了一个notify方法，我们就可以按照如下调用

```
this.hello.notify();
```
但是现在应该是Vue-Cli内置的Vue类型系统优一个Bug,始终会报如下的错误：
```
Error:(141, 16) TS2551: Property 'notify' does not exist on type 'Vue'. Did you mean '$notify'?
```
我的处理办法是，在为hello定义类型时，手写类型，传入我们需要的方法类型就ok了
```
@Ref() readonly hello!: { notify: (from?: string) => {}};
```
#### (10)Mixins

vue-property-decorator的Mixins方法完全来源于vue-class-component,使用方法如下。首先创建一个Mixin：
```
//visible-control-mixins
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class MyMixin extends Vue {
	visible = false;
    get buttonText(): string{
    	return this.visible ? 'Close' : 'Open';
    }
    toggleVisible() {
    	this.visible = !this.visible;
    }
}
```
然后在组件中引入，这时候我们就不再需要组件继承自Vue了，而是继承子Mixin后的组件，MiXins方法可以接受个参数，作为混入的Mixin；
```
import { Component, Mixins } from 'vue-property-decorator';
import VisibleControlMixin from '@/mixins/visible-control-mixin';

@Component
export default class MixinExample extends Mixins(VisibleControlMixin) {}
```
#### (11)Inject/@Provide

provide和inject主要的目的就是透传属性，从一个根节点provide一个属性，无论多远的一个子节点都可以通过inject获得这个属性，与React的Context特性类似。

虽然可以通过使用这两个属性，实现全局的数据共享，但是Vue的文档提示，这两个属性主要为高阶插件和组件库提供用例，并不直接推荐用于应用程序代码中；

在根组件中使用@Provide提供数据

```
import { Component, Vue, Provide } from 'vue-property-decorarot';

import Child from '@/views/baseKnowLedge/inject-provide/@components/Child.vue';

@Component();
export default class InjectProvide extends Vue {
	@Provide() root = 'Root';
    @Provide('parent') readonly parentValue = 'Grandpa';
    
    //相当于
    provide() {
    	return {
        	root: 'Root Initial Value',
            parent: this.parentValue
        }	 
    }
}
```
在子组件中使用@Inject获取数据
```
import { Component, Vue, Inject } from 'vue-property-decorator';

@Component
export default class InjectProvideChild extends Vue {
	@Inject() readonly root!: string;
    @Inject() readonly parent!: string;
}
```
要注意，provide和inject绑定并不是可响应的，这是可以为之。然而，如果传入一个可监听的对象，那么其对象的属性还是可响应的。

**vue-property-decorator也提供了响应式插入数据的装饰器@ProvideReactive和@InjectReactive，但是有两个问题：**

1. 无法与@Inject/@Provide在同一个组件中同时工作
2. 当从一个其他组件跳转到使用了@ProvideReactive和@InjectReactive后，会大概率报错Error in nextTick:"TypeError: Cannot redefine property: parent"导致渲染出错

## 改造Vue Router

使用Vue CLI创建的TypeScript项目，Vue Router与TypeScript配合基本不再需要进行额外的处理，除了对组件内的路由钩子方法需要提前进行注册。

使用vue-class-component提供的Component.registerHooks方法来提前注册，要注意，注册需要在引入理由之前完成。

```
// ./src/components/class-component-hooks.ts

// 在此注册其他插件提供的钩子函数，用来在Vue Class组件中使用
// 例如Vue Router提供的钩子函数
// 必须在router之前引入
import Component from 'Vue-class-component'；

// Register the router hooks with their names

Compoent.registerHooks(['beforeRouteEnter', 'beforeRouteLeave'， 'beforeRouteUpdate']);
```
在main.js中引入
```
import '@/component/class-component-hooks';
import router form './router';
```
## 改造Vuex

Vuex与TypeScript配合会复杂一些，并且体验不算太好，需要安全额外的包实现与TypeScript的配合使用，有三种方案来帮助我们使用TypeScript版本的Vuex

### 1.使用vue-class-component

第一种方案是使用vue-class-component配合以前常常使用mapState等帮助方法。
```
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapMutations } from 'vuex';

@Component(
	{
    	// Vuex's component binding helper can use here
        computed: mapState(['count']);
        methods: mapMutations(['increment']);
    }
)
export default class App extends Vue {
	count!: number
    increment!: () => void
}
```
这种方式的好处是可以通过mapState等方法将Store中定义的数据、方法一次性引入组件，确定就是这种'一次性'其实也还需哟啊在组件内部再次定义，并且如果采用这种形式配合vue-property-decorator使用时，会将计算属性、方法等逻辑打乱。另外，通过这种方式调用Mutation和Action，也不是类型安全的

### 2.使用vuex-class

第二种方案是vuex-class, 它与上一种方案相同，并没有对Vuex的Store中的代码进行改造，而是在组件消费Store中的数据、方法时，提供了一些遍历的API，简化使用方法
```
import { Component, Vue } from 'vue-property-decorator';
import {
	State,
    Getter,
    Action,
    Mutation,
    namespace
} from 'vuex-class'

const someModule = namespace('path/to/module');

@Component
export class MyComp extends Vue {
	@State('foo') stateFoo
    @State(state => state.bar) stateBar
    @Getter('foo') getterFoo
    @Action('foo') actionFoo
    @Mutation('foo') mutationFoo
    @someModule.Getter('foo') moduleGetterFoo
    
  	// If the argument is omitted, use the property name
    // for each state/getter/action/mutation type
    @State foo
    @Getter bar
    @Action baz
    @Mutation qux
    
    created() {
    	this.stateFoo // -> store.state.foo
        this.stateBar // -> store.state.bar
        this.getterFoo // -> store.getters.foo
        this.actionFoo({ value: true }) // -> store.dispatch('foo', { value: true})
        this.mutationFoo({ value: true }) // ->store.commit('foo', { value: true})
        this.moduleGetterFoo // -> store.getters['path/to/module/foo']
    }
}
```

注意，给namespace传入的参数是Vuex中module的命名空间，并非模块的目录路径

这种方法虽然不能使用mapState等辅助函数，但是好在使用@State等装饰符集中导入，也还算清晰明了。但是缺点仍然是没有办法完全进行类型安全的Mutation和Action调用

### 3.使用vuex-module-decorators

如果想要实现获得完全类型安全的Vuex,那么就需要使用vuex-module-decorators,它对Vuex的store也进行了Class化的改造，引入了VuexModule和@Mutation等修饰符，让我们能够使用Class形式来编写Store

使用的时候，按照下面的形式来改写Store
```
import { Module, Mutation, Action, VuexModule } from 'vuex-module-decorators';

import store from '@/store';
import { setTimeoutThen } from '@/utils';

@Module({ dynamic: true, namespaced: true, store, name: 'testStore'})

export default class TestStore extends VuexModule {
	//state
    message: string = '';
    get UpperMessage() {
    	return this.message;
    }
    
    @Mutation
    UPDATE_MESSAGE_MUTATION(title: string):void {
    	this.message = title;
    }
    
    @Action
    async UPDATE_MESSAGE_ACTION():Promise<string> {
    	const result: string = await setTimeoutThen(1000, 'ok');
        this.context.commit('UPDATE_MESSAGE_MUTATION', result);
        return result;
    }
}

```
要注意，改写的Module在@Module中传入了几个属性，传入namesapced和name来使用Module成为命名空间下的模块，此外还需要传入dynamic，让这个模块成为动态注册的模块，同时还需要将完全空白的store传入给这个模块

完成改造之后，在使用的时候就可以使用他提供的getModule方法获得类型安全了，使用方法：
```
import { getModule } from 'vuex-module-decorators';
import TestStore from '@/store/modules/testStore';

const testStore = getModule(TestStore);
testStore.message;
testStore.UPDATE_MESSAGE_MUTATION('Hello');
testStore.UPDATE_MESSAGE_ACTION();
```
当我们调用Mutation的时候，它会自动校验我们传入的参数的类型，与我们定义在Store中的payload类型是否匹配，如果不匹配TS就会给出错误提示

这种方案的好处就是能够获得类型安全，缺点就是对Store的也有比较大的改动，而且只能定义动态注册的命名空间下的模块，这也就意味着，如果想在根节点下注册全局状态时无法实现的（毕竟这个包的名字就是vuex-module-decorators）

### 最终选择vuex-class

最终选择使用第二种方案，相比于第一种方案能够将组件内的逻辑，并且通过相关修饰符能够显示的提醒代码的含义。相比于第三种方案编写复杂度也有一定降低。

对于类型安全做法是，当在组件内引入Mutation时再次编写对应的函数接口，在Vuex，在Vuex中编写的时候，通过引入Vuex提供的类型配合自定义类型，保证类型安全

## 相关实践

### TypeScript类型校验

Vue-CLI使用的TypeScript插件是@vue/cli-plugin-typeScript，它将ts-loader和fork-ts-checker-webpack-plugin配合使用，市县乡i安城外的快速类型检查。

在默认配置下，如果发现了TypeScript类型错误，仅仅会在终端进行提示，而不会中断编译过程。我认为TpyeScript发现的类型错误是比较严重的错误类型，应当中断编译过程，让开发者给予足够的重视，所以需要进行配置，让TypeScript发现的错误中断编译过程并且在浏览器界面上进行提示。

常规的TypeScript项目只需要在tsconfig.json中的compilerOptions选项中配置noEmitOnError即可，这就会阻止Typescript编译器在发现错误的时候将继续将.TS文件编译成.js文件。

但是由于Vue CLI使用了fork-ts-checker-webpack-plugin这个插件，需要进行额外的配置(在@vue/cli-plugin-typescript的文档中并没有明确的介绍，需要到fork-ts-checker-webpack-plugin的文档中自行查找)

在vue.config.js中，使用chainWebpack属性，对其进行配置，将saync设置为false

```
module.export = {
	chainWebpack: config => {
    	//配置TypeScript检查配置
        // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#options
        config.plugin('fork-ts-checker').tap(option => {
        	option[0].async = false;
            return option;
        })
    }
}
```
另外，在tsconfig.json中的compolerOptions选项中将noImplicitAny设定为true,这样如果编译器推导出的结果默认为any的话，编译器会报错。不推荐轻易使用any，除非有明确的理由。即使需要any也要现实的标注为any，这样才能享受到TypeScript的强类型提示的好处（更何况这不是一个就项目改造）

### Lint工具

配置比较高的lint级别，可能回导致开发时的效率稍微降低，但是有助于项目的长期发展，以及良好的代码习惯的养成，也避免了保存代码时不提示；

配置lint的工具

1. eslint

  使用了plugin:vue/recommended/@vue/prettier/@vue/typescript/plugin:prettier/recommended四个规则，使用@typescript-eslint/parse解析器对.vue文件和.ts文件都会进行校验

  同时在vue.config.js中配置了lintOnSave: process.env.NODE_ENV === 'development' ? 'error' : 'false', 让ESlint检测到错误时不仅在中断中提示，还会在浏览器界面上展示，同时中断编译过程。

2. Prettier

  配置了Prettier,根据它提供的不多的选项进行配置，有可能会与公司代码提交平台的规范有冲突，如果发现冲突后在进行调整。

  由于ESLint中配置了@vue/prettier和plugin:prettier/recommended，Prettier发现的错误也会中断编译过程。

  不过Prettier的问题相对比较好修复，IDE中配置好Prettier的插件后，可以一键进行修复。

3. StyleLint

  对于样式文件使用StyleLint进行了检查，在vue.config.js中通过configureWebpack方法引入了StyleLint插件，对所有样式文件以及.vue单文件组件、HTML组件中的样式代码进行校验。

  同样如果出错会中断编译过程（这个应该是Bug，即便想关闭配置了相关选项后也无法关闭）

  在.stylelintrc.js中定义了一些规则，也可能与公司的代码规范有冲突，后续进行调整。

### 目录组织





## 参考文档
[TS05 在Vue中使用TypeScript
](https://blog.csdn.net/duola8789/article/details/103979022)