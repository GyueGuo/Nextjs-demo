import React from 'react';
import './index.less';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-404">
        <img src="/static/images/404.png" />
        <p>页面暂时失联...</p>
      </div>
    );
  }
}