import { mapValues, without } from "lodash-es";
interface DefaultPropsType {
  [key: string]: {
    props: object;
    extraProps?: { [key: string]: any };
  };
}
export interface CommonComponentProps {
  // actions
  actionType: string;
  url: string;
  // size
  height: string;
  width: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  // border type
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  // shadow and opacity
  boxShadow: string;
  opacity: string;
  // position and x,y
  position: string;
  left: string;
  top: string;
  right: string;
}
// the common default props, all the components should have these props
export const commonDefaultProps: CommonComponentProps = {
  // actions
  actionType: "",
  url: "",
  // size
  height: "",
  width: "",
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingTop: "0px",
  paddingBottom: "0px",
  // border type
  borderStyle: "none",
  borderColor: "#000",
  borderWidth: "0",
  borderRadius: "0",
  // shadow and opacity
  boxShadow: "0 0 0 #000000",
  opacity: "1",
  // position and x,y
  position: "absolute",
  left: "0",
  top: "0",
  right: "0",
};
export interface TextComponentProps extends CommonComponentProps {
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  lineHeight: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
}

export const textDefaultProps: TextComponentProps = {
  // basic props - font styles
  text: "正文内容",
  fontSize: "14px",
  fontFamily: "",
  fontWeight: "normal",
  fontStyle: "normal",
  textDecoration: "none",
  lineHeight: "1",
  textAlign: "center",
  color: "#000000",
  backgroundColor: "",
  ...commonDefaultProps,
  width: "318px",
};
export const imageDefaultProps = {
  imageSrc: '',
  ...commonDefaultProps
}
/**
 * 将业务组件属性格式，调整为 props 属性的格式
 * @param props 业务组件属性
 * @returns props 属性的格式的属性
 */
export const transferToComponentProps = <T extends { [key: string]: any }>(
  props: T
) => {
  return mapValues(props, (item) => {
    return {
      type: item.construct as StringConstructor,
      default: item,
    };
  });
};

/**
 * 去掉非样式属性
 */
export const textStylePropNames = without(
  Object.keys(textDefaultProps),
  "actionType",
  "url",
  "text"
);
/**
 * 去掉非样式属性
 */
 export const imageStylePropNames = without(
  Object.keys(imageDefaultProps),
  "actionType",
  "url",
  "imageSrc"
);
const componentsDefaultProps: DefaultPropsType = {
  'l-text': {
    props: {
      ...textDefaultProps,
      fontSize: '14px',
      width: '125px',
      height: '36px',
      left: (320 / 2) - (125 / 2) + 'px',
      top: (500 / 2) - (36 / 2) + 'px'
    }
  },
  'l-image': {
    props: {
      ...imageDefaultProps
    }
  },
  'l-shape': {
    props: {
      backgroundColor: '',
      ...commonDefaultProps
    }
  }
}
export default componentsDefaultProps