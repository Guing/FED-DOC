## 全局组件替换

- 使用global传入components参数

```typescript

//模拟第三方组件库
const mockComponent = {
  template: "<div><slot></slot></div>",
};
const dropdownComponent = {
  //加上overlay的插槽
  template: "<div><slot></slot><slot name='overlay' ></slot></div>",
};
const globalComponents = {
  "a-button": mockComponent,
  "a-dropdown-button": dropdownComponent,
  "a-menu": mockComponent,
  "router-link": mockComponent,
  "a-menu-item": mockComponent,
};
 let wrapper = mount(UserProfile, {
      props: {
        user: { isLogin: false, userName: "xiaobai" },
      },
      global: {
        components: globalComponents, 
      },
    });

```

## 第三方库

- 第一种方式，提供模拟的函数

```typescript
jest.mock("ant-design-vue", () => ({
  message: {
    success: jest.fn(),
  },
}));
```

- 第二种方法，真实地使用第三方库，并使用注入

```typescript
import store from "@/store";   
 let wrapper = mount(UserProfile, {
      global: {
        //第二种方法，真实地使用第三方库，并使用注入
        provide: {
          store,
        },
      },
    });
```

- 第三种方式，半真半假，模拟其行为

```typescript
const mockedRoutes: string[] = [];
//第三种方式，半真半假，模拟其行为
jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: (path: string) => {
      mockedRoutes.push(path);
    },
  }),
}));

expect(mockedRoutes).toEqual(["/"]);
```

## 组件的测试用例

```typescript
import UserProfile from "@/components/UserProfile.vue";
import { mount, VueWrapper } from "@vue/test-utils";
import { message } from "ant-design-vue";
import store from "@/store";
//模拟第三方库
//第一种方式，提供模拟的函数
jest.mock("ant-design-vue", () => ({
  message: {
    success: jest.fn(),
  },
}));
const mockedRoutes: string[] = [];
//第三种方式，半真半假，模拟其行为
jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: (path: string) => {
      mockedRoutes.push(path);
    },
  }),
}));

//模拟第三方组件库
const mockComponent = {
  template: "<div><slot></slot></div>",
};
const dropdownComponent = {
  //加上overlay的插槽
  template: "<div><slot></slot><slot name='overlay' ></slot></div>",
};
const globalComponents = {
  "a-button": mockComponent,
  "a-dropdown-button": dropdownComponent,
  "a-menu": mockComponent,
  "router-link": mockComponent,
  "a-menu-item": mockComponent,
};

let wrapper: VueWrapper<any>;
describe("UserProfile component", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    wrapper = mount(UserProfile, {
      props: {
        user: { isLogin: false, userName: "xiaobai" },
      },
      global: {
        components: globalComponents,
        //第二种方法，真实地使用第三方库，并使用注入
        provide: {
          store,
        },
      },
    });
  });
  it("当login为false时，正确渲染login按钮", async () => {
    console.log(wrapper.html());
    expect(wrapper.get("div").text()).toBe("登录");
    await wrapper.get("div").trigger("click");
    expect(message.success).toHaveBeenCalled();
    expect(store.state.user.userName).toBe("xiaobai");
  });
  it("当login为true时，正确渲染用户名", async () => {
    //引入界面的变化，需要await
    await wrapper.setProps({ user: { isLogin: true, userName: "xiaohei" } });
    console.log(wrapper.html());
    expect(wrapper.get(".user-profile-component").html()).toContain("xiaohei");
    expect(wrapper.find(".user-profile-dropdown").exists()).toBeTruthy();
  });
  it("当退出登录时，展示信息，在两秒后调用router.push方法", async () => {
    await wrapper.get(".user-profile-dropdown div").trigger("click");
    expect(store.state.user.isLogin).toBeFalsy();
    expect(message.success).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(mockedRoutes).toEqual(["/"]);
  });

  afterEach(() => {
    //在多个模块使用message方法，避免测试之间相互影响，要重置一下。
    (message as jest.Mocked<typeof message>).success.mockReset();
  });
});
```

