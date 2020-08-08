import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';

// import ajaxFun from './service/requestFun'
import LinkageBase from './components/linkageBase';
import PickerS from './components/PickerS/index'
import ShowScan from './components/ShowScan/index'
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
  Input,
  TableColumn,
  Footer } from 'element-ui';
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
Vue.use(Tabs);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(TabPane);
Vue.use(Footer);
Vue.use(PickerS);
Vue.use(ShowScan);
Vue.use(LinkageBase);

Object.assign(Vue.prototype, {
  // $toast: Toast,
  $eventQueue: new EventQueue()
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
