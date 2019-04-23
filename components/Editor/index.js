import React from 'react';
import wangEditor from 'wangEditor';
const editorConfig = [
  'head', // 标题
  'bold', // 粗体
  'fontSize', // 字号
  'italic', // 斜体
  'underline', // 下划线
  'strikeThrough', // 删除线
  'foreColor', // 文字颜色
  'backColor', // 背景颜色
  'link', // 插入链接
  'list', // 列表
  'justify', // 对齐方式
  'quote', // 引用
  'table', // 表格
  'undo', // 撤销
  'redo', // 恢复
];
export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { onChange, content = '' } = this.props;
    this.editor = new wangEditor(this.editorNode);
    this.editor.customConfig.menus = editorConfig;
    this.editor.customConfig.zIndex = 100;
    this.editor.customConfig.onchange = onChange;
    this.editor.create();
    this.editor.txt.html(content);
  }
  render() {
    return <div ref={(node) => this.editorNode = node} />
  }
}