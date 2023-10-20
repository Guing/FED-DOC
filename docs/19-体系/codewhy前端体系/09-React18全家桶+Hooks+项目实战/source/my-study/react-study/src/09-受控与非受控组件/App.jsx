import React, { PureComponent } from "react";

export class App extends PureComponent {
  state = {
    username: "",
    password: "",
    sex: [
      { name: "男", value: 1, isChecked: false },
      { name: "女", value: 0, isChecked: false },
    ],
    isArgee: false,
    tag: [
      { name: "斜杆", value: 1, isChecked: false },
      { name: "跳唱", value: 2, isChecked: false },
    ],
    area: "",
    areaOption: [
      { name: "全部", value: "" },
      { name: "广州", value: 1 },
      { name: "深圳", value: 2 },
    ],
    hope: [],
    hopeOption: [
      { name: "年年18", value: 1 },
      { name: "得到100万", value: 2 },
    ],
  };
  changeInputHandle(event) {
    this.setState(
      {
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  }
  changeRadioHandle(e, value) {
    this.setState(
      {
        [e.target.name]: this.state[e.target.name].map((item) => {
          item.isChecked = item.value === value;
          return item;
        }),
      },
      () => {
        console.log(this.state);
      }
    );
  }
  changeCheckboxMultiHandle(e, name, index) {
    const arr = [...this.state[name]];
    arr[index].isChecked = e.target.checked;
    this.setState(
      {
        [name]: arr,
      },
      () => {
        console.log(this.state);
      }
    );
  }
  changeSelectMultiHandle(e, index) {
    const arr = Array.from(e.target.selectedOptions, (item) => item.value);

    this.setState(
      {
        [e.target.name]: arr,
      },
      () => {
        console.log(this.state);
      }
    );
  }
  render() {
    const {
      username,
      password,
      sex,
      isArgee,
      tag,
      area,
      areaOption,
      hope,
      hopeOption,
    } = this.state;
    return (
      <div>
        <form>
          {/* 单个Input */}
          <div>
            <label htmlFor="username">用户名：</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => this.changeInputHandle(e)}
            ></input>
          </div>
          <div>
            <label htmlFor="username">密码：</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => this.changeInputHandle(e)}
            ></input>
          </div>
          <div>
            {/* 单个radio */}
            <label htmlFor="username">性别：</label>
            {sex.map((item) => (
              <div key={item.value}>
                <input
                  type="radio"
                  name="sex"
                  checked={item.isChecked}
                  onChange={(e) => this.changeRadioHandle(e, item.value)}
                />
                {item.name}
              </div>
            ))}
          </div>
          <div>
            {/* 单个checkbox */}
            <div>
              <input
                type="checkbox"
                name="isArgee"
                checked={isArgee}
                onChange={(e) => this.changeInputHandle(e)}
              />
              <label htmlFor="isArgee">是否同意协议</label>
            </div>
          </div>
          <div>
            {/* 多个checkbox */}
            <label htmlFor="username">标签：</label>
            {tag.map((item, index) => (
              <div key={item.value}>
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={(e) =>
                    this.changeCheckboxMultiHandle(e, "tag", index)
                  }
                />
                {item.name}
              </div>
            ))}
          </div>

          <div>
            {/* 单个select */}
            <label htmlFor="username">地区：</label>
            <select
              name="area"
              value={area}
              onChange={(e) => this.changeInputHandle(e)}
            >
              {areaOption.map((item, index) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            {/* 多个select */}
            <label htmlFor="username">愿望：</label>
            <select
              name="hope"
              value={hope}
              multiple
              onChange={(e) => this.changeSelectMultiHandle(e)}
            >
              {hopeOption.map((item, index) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
