import { PureComponent } from "react";
import store from './store'
export function connect(mapStateToProps, mapDispatchToProps) {
  const state = mapStateToProps(store.getState())
  const dispatch = mapDispatchToProps(store.dispatch)
  return (Cpn) => {
    class newCpn extends PureComponent {
      render() {
        return <Cpn {...this.props} {...state} {...dispatch}></Cpn>
      }
    }
    newCpn.displayName = "NewCpn";
    return newCpn
  }

}