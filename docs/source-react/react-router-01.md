---
title: react-router4.2使用js控制路由跳转的3种方式
---
## 背景
很多情况下，我们需要利用js来控制页面的路由切换，而不是通过Link标签这种方式，比如有这样一个场景，用户要登录一个网站才能看到网站里面的内容,登录接口是一个独立的子页面，登录成功后，才能进入网站浏览相关内容，使用react做SPA时就需要做路由的切换

## React-router 4.2
在网上随处可见react-router入门使用方式，通过链接绑定组件实现跳转，或者绑定hashHistory后，妄想在子组件中使用this.props.history.push('/某路径')实现路由跳转，诚然，在以前的版本是可行的，据说，反正我没有用过。而奇葩的4.2版本并不支持这种方式。我在网上看了许久，试了诸多办法，任然无法通过上述方式实现js控制路由切换，emmm...

## 问题解决办法
> 使用4.2里面的Redirect标签？组件？不知道怎么称呼，具体使用方式如下
```js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

<Router>
    <div style={{height: 100%}}>
    <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/chat" component={Chat} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
    </Switch>
    </div>
</Router>
```
- 方法一，在子组件里使用

    先引入Redirect
    ```js
    import { Redirect } from 'react-router';

    class Login extends React.Component {
        render() {
            const { isRegisterNewUser, loginSuccess } = this.props;
            const { getFieldDecorator } = this.props.form;
            if(loginSuccess) {
                return (<Redirect to="/chat" />)
            } else {
                return (
                    这里放没登陆之前的各种form表单
                )
            }
        }
    }
    ```
- 方法二、使用Context

    react-router v4在Router组件中通过Context暴露了一个router对象
    ```js
    import PropTypes from 'prop-types';

    static contextTypes = {
        router: PropTypes.object.isRequired,
    } 
    console.log(this.context.router);

    // 例如
    import React from 'react';
    import PropTypes from 'prop-types';
    class Login extends React.Component {
        static contextTypes = {
            router: PropTypes.object.isRequired
        }
        constructor(props, context) {
            super(props, context)
        }
        render() {
            const { isRegisterNewUser, loginSuccess } = this.props;
            const { getFieldDecorator } = this.props.form;
            if(loginSuccess) {
                this.context.router.history.push('/chat');
            } else {
                return (
                    这里放没登陆之前的各种form表单
                )
            }
        }
    }
    ```
- 方式三：使用withRouter

    ```js
    import { widthRouter } from 'react-router';
    class Login extends React.Component {
        static contextTypes = {
            router: PropTypes.object.isRequired
        }
        render() {
            const { isRegisterNewUser, loginSuccess, history } = this.props;
            const { getFieldDecorator } = this.props.form;
            if(loginSuccess) {
                this.props.history.push('/chat')
            } else {
                return (
                    这里放没登录之前的各种form表单
                )
            }
        }
    }
    // ...
    const Login=withRouter(connect(mapStateToProps,mapDispatchToProps)(TLogin))
    export default Login;
    ```
    如果你没有使用redux，那么你使用withRouter的正确姿势应该是
    ```js
    const Login=withRouter(TLogin)
    export default Login;
    ```
- 方式四、hack



## 资料
[react-router4.2使用js控制路由跳转的3种方式](https://segmentfault.com/a/1190000013912862)

[参考](https://wenku.baidu.com/view/07795f09ac45b307e87101f69e3143323968f568.html)