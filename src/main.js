import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';

// import ajaxFun from './service/requestFun'
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
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Message,
  MessageBox,
  Drawer,
  Badge,
  Select,
  Option,
  Footer,
  Divider
} from 'element-ui';
Vue.use(Divider);
Vue.use(Select);
Vue.use(Option);
Vue.use(Drawer);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
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
Vue.use(Badge);
Vue.use(Footer);
Object.assign(Vue.prototype, {
  // $toast: Toast,
  $confirm: MessageBox.confirm,
  $message: Message,
  $bus: new Vue()
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
