---
title: Vite 环境变量
---
在Vite中使用环境变量定义的变量有两种典型方式，分别用户
- 在配置文件中(vite.config.ts/js)使用环境变量
- 在源码(如组件或业务文件)中使用环境变量

## 在vite.config.ts中使用环境变量
Vite会自动加载项目根目录下的.env文件(比如.env,.env.production, .env.development)等，你可以通过loadEnv来获取环境变量

示例
```js
// vite.config.ts
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
    // 加载环境变量，mode 是 'development', 'production'等
    const env = loadEnv(mode, process.cwd());

    return {
        base: env.VITE_PUBLIC_PATH, // 使用.env 文件中的 VITE_PUBLIC_PATH 变量
        define: {
            __APP_ENV__: JSON.stringify(env.VITE_APP_ENV) //  也可以手动注入全局变量
        }
    }
})
```
> 注意：**Vite只会自动暴漏以 Vite_开头的变量给客户端使用，其他变量只在 vite.config中手动处理**

## 在源码中使用环境变量
使用 import.meat.env
```js
console.log(import.meta.env.VITE_API_BASE_URL);
```
只要 .env 文件中定义了
```
VITE_API_BASE_URL=https://api.example.com
```
就可以在Vue/js/ts文件中这样使用

## 示例.ENV文件
创建.env 文件放在项目更目录下，例如
```shell
# .env.development
VITE_API_BASE_URL=https://dev-api.example.com
VITE_PUBLIC_PATH=/
VITE_APP_ENV=development

# .env.production
VITE_API_BASE_URL=https://api.example.com
VITE_PUBLIC_PATH=/prod/
VITE_APP_ENV=production
```
## 总结
场景|用法| 注意
---|---|---
vite.config.ts中| loadEnv(mode, process.cwd()) | 需手动加载，适用于构建配置
源码中使用变量| import.meta.env.VITE_XXX | 仅暴漏以Vite_开头的变量