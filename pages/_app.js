import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import '../common/common.less';
import 'antd/dist/antd.less';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class MyApp extends App {
  constructor(props) {
    super(props);
  }

  render () {
    const { Component, pageProps} = this.props
    return (
      <Container>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta name="renderer" content="webkit" />
          <link rel="shortcut icon" href="/static/images/favicon.ico" type="image/x-icon" />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Container>
    );
  }
}