import React from 'react'
import SystemError from './../components/SystemError/';
import NotFound from './../components/NotFound/';
export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    const { statusCode } = this.props;
    return (
      <React.Fragment>
        {
          statusCode === 404 ? <NotFound /> : <SystemError />
        }
      </React.Fragment>
    )
  }
}