import React from 'react';
import { withRouter } from 'next/router'

class Index extends React.Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <React.Fragment>
        {/* <Header title="列表页"/> */}
        {JSON.stringify(this.props.router)}
      </React.Fragment>
    );
  }
}

export default withRouter(Index);
