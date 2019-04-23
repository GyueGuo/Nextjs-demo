import React from 'react';
import Head from 'next/head';
import Router from 'next/router'
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Layout, Button, Form, Input, Row, message } from 'antd';
import axios from 'axios';
import './index.less';

const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 20,
    offset: 1,
  },
};

const DynamicComponent = dynamic(import('../components/Editor/index'), {
  ssr: false,
  loading: () => (<p>正在加载组件...</p>)
});
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.validateEditorFrom = this.validateEditorFrom.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }
  static async getInitialProps({ query, req, res }) {
    const initialProps = {};
    if (req) {
      const cookie = req.cookie;
      if (!cookie) {
        res.writeHead(302, {'Location': '/login'});
        res.end();
      }
    } else {
      const cookie = document.cookie;
      if (!cookie) {
        Router.push('/login');
        return initialProps;
      }
    }
    const data = await axios.post('http://localhost:9090/next.json', {
      id: query.id
    });
    if (data.data.flag) {
      initialProps.article = data.data.data;
    } else {
      initialProps.article = null;
    }
    return initialProps;
  }
  handleSubmit(e) {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        axios({
          url: 'http://localhost:9090/next.json',
          method: 'put',
          data: values,
        })
        .then(({ data }) => {
          if (data.flag === 1) {
            message.success('保存成功');
          } else {
            message.error(data.msg);
          }
        })
        .catch(() => {
          message.error('系统错误，请稍后再试');
        });
      }
    });
  }
  // 提交时内容校验
  validateEditorFrom(rule, value, callback) {
    let txt;
    if (!value) {
      txt = '内容不能为空';
    }
    callback(txt);
  }
  handleEditorChange(txt) {
    const { form } = this.props;
    form.setFieldsValue({
      content: txt.trim(),
    });
  }
  handleBack() {
    this.props.router.back();
  }
  componentDidMount() {
    
  }
  render() {
    const { article, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <React.Fragment>
        <Head>
          <title>首页</title>
        </Head>
        <Layout className="index-wrap">
          {
            article ? (
              <Form onSubmit={this.handleSubmit}>
                {
                  getFieldDecorator('id', {
                    rules: [],
                    initialValue: article.id,
                  })(
                    <Input hidden/>
                  )
                }
                <Form.Item {...formItemLayout} label="文章标题">
                  {
                    getFieldDecorator('title', {
                      rules: [{
                        required: true,
                        message: '文章标题不能为空',
                      }, {
                        maxLength: 20,
                        message: '文章标题最多20个字'
                      }],
                      initialValue: article.title,
                    })(
                      <Input />
                    )
                  }
                </Form.Item>
                <Form.Item {...formItemLayout} label="内容">
                  {
                    getFieldDecorator('content', {
                      rules: [{
                        validator: this.validateEditorFrom, // 使用自定义的校验规则
                      }],
                      initialValue: article.content,
                    })(<div />)
                  }
                  <DynamicComponent
                    content={article.content}
                    onChange={this.handleEditorChange}
                  />
                </Form.Item>
                <Row type="flex" justify="space-around">
                <Button
                  htmlType="submit"
                  type="primary"
                >
                  提交
                </Button>
                <Button
                  type="danger"
                  onClick={this.handleBack}
                >
                  返回
                </Button>
              </Row>
              </Form>
            ) : null
          }
        </Layout>
      </React.Fragment>
    );
  }
}

export default withRouter(Form.create()(Index));
