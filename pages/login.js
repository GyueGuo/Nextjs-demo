import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { Layout, Form, Row, Col, Input, Button } from 'antd';
const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 20,
    offset: 1,
  },
};
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static async getInitialProps() {
    return {};
  }
  handleSubmit(err) {
    return true;
  }
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <React.Fragment>
        <Head>
          <title>登录</title>
        </Head>
        <Layout>
          <Form action="/login" method="POST" onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="用户名：">
              {
                getFieldDecorator('username', {
                  rules: [{
                    required: true,
                    message: '用户名不能为空'
                  }],
                  initialValue: '',
                })(
                  <Input placeholder="请输入用户名" autoComplete="off"/>
                )
              }
            </Form.Item>
            <Form.Item {...formItemLayout} label="密码：">
              {
                getFieldDecorator('pwd', {
                  rules: [{
                    required: true,
                    message: '密码不能为空'
                  }],
                  initialValue: '',
                })(
                  <Input placeholder="请输入用户名" type="password" autoComplete="off"/>
                )
              }
            </Form.Item>
            <Row>
              <Col style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">登录</Button>
              </Col>
            </Row>
          </Form>
        </Layout>
      </React.Fragment>
    );
  }
}

export default withRouter(Form.create()(Index));
