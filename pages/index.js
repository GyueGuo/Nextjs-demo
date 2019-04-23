import React from 'react';
import Head from 'next/head';
import Link from 'next/Link';
import { withRouter } from 'next/router';
import { Layout, Row, Col } from 'antd';
import axios from 'axios';
import './index.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.router);
  }
  static async getInitialProps({ req }) {
    const data = await axios.get('http://localhost:9090/next.json');
    const initialProps = {};
    if (data.data.flag) {
      initialProps.list = data.data.data;
    } else {
      initialProps.list = [];
    }
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    return initialProps;
  }
  render() {
    const { list } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>首页</title>
        </Head>
        <Layout className="index-wrap">
          {
            list.map((item) => {
              return (
                <Link href={`/article?id=${item.id}`} key={item.id}>
                  <Row className="list-item">
                    <Col
                      className="list-item-title"
                      span={14}
                    >
                      {item.title}
                    </Col>
                    <Col
                      span={2}
                    >
                      {`${item.view_count}  回复`}
                    </Col>
                    <Col
                      span={2}
                    >
                      {`${item.reply_count}  浏览`}
                    </Col>
                    <Col
                      span={6}
                      className="list-item-author"
                    >
                      {`${item.author} 发表于 ${item.created}`}
                    </Col>
                  </Row>
                </Link>
              )
            })
          }
        </Layout>
      </React.Fragment>
    );
  }
}

export default withRouter(Index);
