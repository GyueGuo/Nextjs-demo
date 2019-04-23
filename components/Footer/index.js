import React from 'react';
import './index.less';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="page-footer">
        <p>京ICP备09083200号 合字B2-20160007 人才服务许可证:120116174002号   京公网安备 11010502035189号</p>
        <p>Copyright © 2006-2018 liepin.com All Rights Reserved</p>
      </footer>
    );
  }
}