# mpvue-base

> 微信小程序

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 支持mock数据接入
# mock-server https://www.npmjs.com/package/@shymean/mock-server
# 使用
``` bash
# 全局安装
npm i @shymean/mock-server -g
# 快速启动mock服务器
mock -p 9999 -f ./_mock.js
```
# 参数说明
``` bash
# port，服务器端口号，默认7654，简写 -p
# file，mock模板文件路径，默认./_mock.js，简写 -f
启动方法： https://blog.csdn.net/kabuda0311/article/details/81671073
```