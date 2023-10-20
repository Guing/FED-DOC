import ThemeContext from "./ThemeContext";

export default function withTheme(Cpn) {
  return (props) => <div>
    <ThemeContext.Consumer>
      {value => {
        return <Cpn {...value}  {...props}></Cpn>
      }}
    </ThemeContext.Consumer>
  </div>
}