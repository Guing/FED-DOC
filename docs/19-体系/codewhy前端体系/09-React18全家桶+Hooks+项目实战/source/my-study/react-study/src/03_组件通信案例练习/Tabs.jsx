import React, { Component } from 'react';
import PropTypes from "prop-types"
class Tabs extends Component {
  state = {  } 
  render() { 
    return (<div className='flex'>
      {this.props.tabs.map((tab,index) => <div onClick={() => this.props.changeTab(index)} className={`tab ${this.props.active === index?'active':''}`} key={tab}>{tab}</div>)}
    </div>);
  }
}
Tabs.propTypes = {
  tabs:PropTypes.array,
  active:PropTypes.number
}
Tabs.defaultProps = {
  tabs:[],
  active:0
}
 
export default Tabs;