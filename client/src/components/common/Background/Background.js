import { Component } from 'react';

class Background extends Component {
  componentWillMount() {
    const { color } = this.props;
    document.body.style.backgroundColor = color;
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  render() {
    return null;
  }
}

export default Background;
