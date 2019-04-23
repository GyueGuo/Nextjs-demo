import React from 'react';
import Head from 'next/head';
import Link from 'next/Link';
import { withRouter } from 'next/router';
import { Layout, Button } from 'antd';
import axios from 'axios';
import './index.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  static async getInitialProps({ query }) {
    const data = await axios.post('http://localhost:9090/next.json', {
      id: query.id
    });
    const initialProps = {};
    if (data.data.flag) {
      initialProps.article = data.data.data;
    } else {
      initialProps.article = null;
    }
    return initialProps;
  }
  render() {
    const { article } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>首页</title>
        </Head>
        <Layout className="index-wrap">
          <h2>{article.title}</h2>
          <p>{article.author} 发表于：{article.created}</p>
          <p>{article.content}</p>
          <Link href={`/edit?id=${article.id}`}>
            <Button type="primary">编辑</Button>
          </Link>
        </Layout>
      </React.Fragment>
    );
  }
}

export default withRouter(Index);
