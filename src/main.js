import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';

// import ajaxFun from './service/requestFun'
import EventQueue from './common/js/eventQueue'
import { Button,
  Row,
  Col,
  Container,
  Header,
  Aside,
  Main,
  Tree,
  Tabs,
  TabPane,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Table,
  Icon,
  Link,
  Card,
  Input,
  TableColumn,
  Message,
  Footer } from 'element-ui';
Vue.use(Card);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Row);
Vue.use(Col);
Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Tree);
Vue.use(Main);
Vue.use(Link);
Vue.use(Tabs);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(TabPane);
Vue.use(Footer);
Object.assign(Vue.prototype, {
  // $toast: Toast,
  $message: Message,
  $eventQueue: new EventQueue()
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
