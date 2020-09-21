import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Row, Col, Breadcrumb, Affix} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import "../styles/pages/detailed.css"
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import servicePath from '../config/apiUrl'

import axios from 'axios'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx';

import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from '@ant-design/icons';
const  Detailed = (props) => {
  console.log(props, 'props')
  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class=""anchor-fix><h${level}>${text}</h${level}></a>`
  }
  marked.setOptions({
    renderer: renderer,
    gfm: true, // 启动github渲染样式
    pedantic: false, // 容错
    sanitize: false, // 忽略html标签
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    }
  })
  let html = marked(props.articleContent)
  let markdown='# P01:课程介绍和环境搭建\n' +
  '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
   '**这是加粗的文字**\n\n' +
  '*这是倾斜的文字*`\n\n' +
  '***这是斜体加粗的文字***\n\n' +
  '~~这是加删除线的文字~~ \n\n'+
  '\`console.log(111)\` \n\n'+
  '# p02:来个Hello World 初始Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n'+
  '***\n\n\n' +
  '# p03:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p04:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '#5 p05:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p06:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p07:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '``` var a=11; ```'
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header></Header>
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="/">视频列表</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="/">xxx</a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                视频开发-魔王大人
              </div>
              <div className="list-icon center">
                <span><CalendarOutlined/> 2020-10-10</span>
                <span><FolderOutlined/> 视频教程</span>
                <span><FireOutlined/> 1024</span>
              </div>
              <div className="detailed-content" dangerouslySetInnerHTML={{__html:html}}></div>
            </div>
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
            <Advert/>
            <Affix offsetTop={5}>
              <div className="detailed-nav comm-box">
                <div className="nav-title">文章目录</div>
                {tocify && tocify.render()}
                {/* <MarkNav 
                className="article-menu"
                source={html}
                ordered={true}
                /> */}
              </div>
            </Affix>
          </Col>
        </Row>
        <Footer></Footer>
      </main>
    </div>
  )
}
// 传递上下文，用来接收id参数
Detailed.getInitialProps = async (context) => {
  console.log(context.query.id)
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios.post(servicePath.getArticleDetail).then(res => {
      console.log(res, 'res')
      resolve(res.data.data)
    })
  })
  return await promise
}

export default Detailed