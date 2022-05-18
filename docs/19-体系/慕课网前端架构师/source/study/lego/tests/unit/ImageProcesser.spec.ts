import ImageProcesser from "@/components/ImageProcesser.vue";
import { mount, VueWrapper } from "@vue/test-utils";
import flushPromises from 'flush-promises'
import axios from "axios";
jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("IconSwitch组件测试", () => {
  let wrapper: VueWrapper<any>;
  beforeAll(() => {
    wrapper = mount(ImageProcesser, {
      props: {
        value: "/images/logo-simple.png",
      },
    });
  });
  it("组件是否渲染", () => {
    expect(wrapper.get(".show-img").attributes().src).toBe(
      "/images/logo-simple.png"
    );
  });
  it.only("测试更改图片", async () => {
    console.log(wrapper.html());
    mockedAxios.post.mockRejectedValueOnce({ data: { url: "a.png" } });
    const vm = wrapper.vm as any;
    vm.handleFileUploaded = jest.fn();
    const input = wrapper.get('.file-input').element as HTMLInputElement;
    const testFile = new File(['xyz'],'test.png',{type:'image/png'});
    const files = [testFile];
    Object.defineProperty(input,'files',{
        value:files,
        writable:false
    })
    await wrapper.get('input').trigger('change');
    expect(mockedAxios.post).toBeCalledTimes(1);
    await flushPromises();
    expect(vm.handleFileUploaded).toBeCalled();
    expect(vm.handleFileUploaded).toBeCalledWith({
        url:'a.png'
    },testFile)
    await wrapper.setProps({
        value: 'a.png'
      });
      expect(wrapper.get(".show-img").attributes().src).toBe(
        "a.png"
      );
  });
  afterEach(() => {
    mockedAxios.post.mockReset();
  });
});
