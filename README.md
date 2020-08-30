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
1,metagenome,选择tag为‘Control’时，无sample显示
2，metagenome，logo去掉（已解决）
3，mettagenome,企业名称放左边，和右边菜单分开。（已解决）
4，metagenmome,EBML链接是啥，需要确认
5，metagenome,http://hethelp.com:8001/rest/v1/project/samples/{pid}修改数据结构，增加tags字段
6，metagenmoe，购物车数字没有实时变化（已解决）
7，metagenome,购物车ie和firefox下显示不完整，或者没有滚动条
8，metagenome,project详情显示各个模块，在不同分辨率下，显示不一致，如不出现下拉框，描述信息会固定显示等
9，Project，下载meta需要拼接完整url路径
10，project，列表头改成灰色（已解决）
11，project，缺project metadata summary的接口
12，project，搜索BGI_T2D时，接口只返回一条数据
13，meatadata，‘下载全部’按钮放到页面右边 [已解决]
14，metadata，search功能和mmetadata列表显示功能分开，和下载全部单独占一行，列表和详情放到下面一点。 [已解决]
15，metadata，详情显示界面需要继续调整，略丑