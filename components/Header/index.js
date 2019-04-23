import React from 'react';
import Router from 'next/router';
import './index.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '未登录'
    }; 
  }
  static async getInitialProps() {
    console.log('组件');
  }
  componentDidMount() {
    if (document.cookie) {
      setTimeout(() => {
        this.setState({
          username: document.cookie,
        });
      }, 1000);
    }
  }
  render() {
    const { username } = this.state;
    return (
      <header className="page-header">
        {username}
      </header>
    );
  }
}
export default Index;
