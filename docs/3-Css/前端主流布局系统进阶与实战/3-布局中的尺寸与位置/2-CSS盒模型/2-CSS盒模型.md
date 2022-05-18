![](image/2-4 CSS盒模型/1646819426649.png)

![](image/2-4 CSS盒模型/1646819439240.png)

![](image/2-4 CSS盒模型/1646819467200.png)

- 给border设置颜色，只是会盖住背景色

![](image/2-4 CSS盒模型/1646819540066.png)

- 在子元素添加margin-top时，会直接传递到父元素上去。

  - ![](image/2-4 CSS盒模型/1646819673329.png)
  - ![](image/2-4 CSS盒模型/1646819701664.png)
- 解决方法

  - 使用padding-top，不使用margin-top
  - 给父元素添加border
  - 使用BFC
  - 使用弹性布局和网格布局

![](image/2-4 CSS盒模型/1646819797318.png)

- 上下元素使用margin-bottom和margin-top，会取一个比较大的值，而不是两者合并

  - ![](image/2-4 CSS盒模型/1646819906431.png)
  - ![](image/2-4 CSS盒模型/1646819982988.png)
- 解决方法

  - 使用margin-right和margin-left不会出现这个问题
  - 只给一元素加margin，不给第二个元素
  - 使用BFC
  - 使用弹性布局和网格布局
