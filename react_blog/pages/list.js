import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import {List, Row, Col, Breadcrumb} from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import '../styles/pages/index.css'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from '@ant-design/icons';
const MyList =(list) => {
  const [ myList, setMyList ] = useState(list.list)
  useEffect(() => {
    setMyList(list.list)
  })
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
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">视频</a>
              </Breadcrumb.Item>
            </Breadcrumb>
            </div>
            <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                 </div>
                <div className="list-icon">
                  <span><CalendarOutlined />  {item.addTime}</span>
                  <span><FolderOutlined />  {item.typeName}</span>
                  <span><FireOutlined /> {item.view_count}人</span>
                </div>
                <div className="list-context">{item.context}</div>
              </List.Item>
            )}
             />
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
            <Advert/>
          </Col>
        </Row>
        <Footer></Footer>
      </main>
    </div>
  )
}
MyList.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios.get(servicePath.getListById + id).then(
      (res) => {
        console.log(res.data)
        resolve(res.data.data)
      }
    )
  })
  return await promise
}

export default MyList