import React from 'react';
import './index.less';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-500">
        <img src="/static/images/500.jpg" />
        <p>页面出错了...</p>
      </div>
    );
  }
}