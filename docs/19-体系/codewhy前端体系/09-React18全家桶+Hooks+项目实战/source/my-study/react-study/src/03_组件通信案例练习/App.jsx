import React, { Component } from 'react';
import Tabs from './Tabs';

class App extends Component {
  state = { 
    tabs:['流行','新款','精选'],
    active:0,
    content:'流行'
   } 
  render() { 
    return (<div>
      <Tabs tabs={this.state.tabs} active={this.state.active} changeTab={(index) => this.setState({active:index,})} ></Tabs>
      <div>{this.state.tabs[this.state.active]}</div>
    </div>);
  } 
}
 
export default App;