import { App } from 'vue';
import 'ant-design-vue/dist/antd.less';

import {
  Layout,
  Row,
  Col,
  Card,
  Button,
  Avatar,
  Dropdown,
  Menu,
  Input,
  InputNumber,
  Slider
} from 'ant-design-vue';

export default {
  install(app: App) {
    app
      .use(Layout)
      .use(Row)
      .use(Col)
      .use(Card)
      .use(Button)
      .use(Avatar)
      .use(Dropdown)
      .use(Menu)
      .use(Input)
      .use(InputNumber)
      .use(Slider);
  }
};
