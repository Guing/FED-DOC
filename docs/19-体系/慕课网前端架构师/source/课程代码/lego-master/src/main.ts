import { createApp } from 'vue';
import router from '@/router/index';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
// import Antd from './plugins/antd';
import App from './App.vue';
import store from './store/index';

const app = createApp(App);
app.use(router).use(Antd).use(store);
app.mount('#app');
