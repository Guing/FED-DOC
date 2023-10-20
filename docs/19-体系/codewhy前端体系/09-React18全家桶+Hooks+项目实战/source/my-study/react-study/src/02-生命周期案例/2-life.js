import React, { Component } from 'react'

export class life extends Component {
  constructor() {

    super();
    this.state = {
      message: 'hello '
    }
    console.log('constructor')
  }
  changeText() {
    this.setState({
      message: 'world'
    })
  }
  render() {
    console.log('render')
    return (
      <div>
        {this.state.message}
        <button onClick={() => this.changeText()}>改变</button>
      </div>
    )
  }
  componentDidMount() {
    console.log('mount')
  }
  componentDidUpdate() {
    console.log(
      'update'
    )
  }
  componentWillUnmount() {
    console.log('unmount')
  }
  shouldComponentUpdate() {
    return false;
  }
}

export default life
