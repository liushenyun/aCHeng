# cheng-home

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 缺切图
1. 公益项目向右箭头
2. 我的公益 =》我的证书右箭头
2. 我的公益 =》 证书关闭按钮


import { beforeRouteLeave } from '@/common/js/mixin.js'
// @ is an alias to /src
export default {
  name: 'BindPhone',
  mixins: [beforeRouteLeave],


### 问题点
1、project页面 获取单个project接口修改。http://hethelp.com:8001/rest/v1/project/_search
2、project 页面url，返回值为‘’
3、metagenome页面， EMBL数据库连接无数据
4、MetaData mate详情第二个参数确认
5、metagenome  列表有加入购物车操作列
6、project 侧滑显示详情，页面和接口都缺