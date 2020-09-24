import React, { useEffect, useState } from 'react';
// import AdminIndex from './AdminIndex';
import marked from 'marked'
import '../static/css/addArticle.css'
import {Row, Col, Input, Select, Button, DatePicker, message} from 'antd';
import axios from 'axios'
import servicePath from '../config/apiUrl'
const { Option } = Select
const {TextArea} = Input
function AddArcicle (props) {
   const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
   const [articleTitle,setArticleTitle] = useState('')   //文章标题
   const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
   const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
   const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
   const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
   const [showDate,setShowDate] = useState()   //发布日期
//    const [updateDate,setUpdateDate] = useState() //修改日志的日期
   const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
   const [selectedType,setSelectType] = useState('请选择') //选择的文章类别
   marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true, // 启动github渲染样式
    pedantic: false, // 容错
    sanitize: false, // 忽略html标签
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: true
  })
  const changeContent = (e) => {
      setArticleContent(e.target.value)
      let html = marked(e.target.value)
      setMarkdownContent(html)
  }
  const changeIntroduce = (e) => {
      setIntroducemd(e.target.value)
      let html = marked(e.target.value)
      setIntroducehtml(html)
  }
  const getTypeInfo = () => {
      axios.get(servicePath.getTypeInfo).then(res => {
          console.log(res.data.data)
          if(res.data.data === '没有登录') {
              localStorage.removeItem('username')
              props.history.push('/')
          } else{
            setTypeInfo(res.data.data)
          }
      })
  }
  const selectTypeHandler = (value) => {
    console.log(value)
    setSelectType(value)
  }
  const saveArticle = ()=>{
    if(!selectedType){
        message.error('必须选择文章类别')
        return false
    }else if(!articleTitle){
        message.error('文章名称不能为空')
        return false
    }else if(!articleContent){
        message.error('文章内容不能为空')
        return false
    }else if(!introducemd){
        message.error('简介不能为空')
        return false
    }else if(!showDate){
        message.error('发布日期不能为空')
        return false
    }
    let params ={
        typeId: selectedType,
        title: articleTitle,
        articleContent: articleContent,
        introduce: introducemd,
        addTime: (new Date(showDate.replace('-','/')).getTime())/1000 // 字符串转换成时间戳
    }   //传递到接口的参数
    if(articleId === 0) {
        // 增加
        params.viewCount = 0
        axios.post(servicePath.saveInfo, params).then(res => {
            if(res.data.data.success) {
                message.success('保存成功')
                setArticleId(res.data.data.articleId)
            }
        })
    } else {
        //修改
        params.id = articleId
        axios.post(servicePath.updateInfo, params).then(res => {
            if(res.data.data.success) {
                message.success('文章更新成功')
            }
        })
    }
}
const getArticleDetail = (id) => {
    axios.get(servicePath.getArticleDetail).then(res => {
        console.log(res.data.data, 'res')
        let data = res.data.data
        setArticleTitle(data.title)
        setArticleContent(data.articleContent)
        let html=marked(data.articleContent)
        setMarkdownContent(html)
        setIntroducemd(data.introduce)
        let tmpInt = marked(data.introduce)
        setIntroducehtml(tmpInt)
        setShowDate(data.addTime)
        setSelectType(data.typeId)
    })
}
  useEffect(() => {
    getTypeInfo()
    // 获得文章id
    let tmpId = props.match.params.id
    if (tmpId) {
        setArticleId(tmpId)
        getArticleDetail(tmpId)
    }
  }, [])
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input placeholder="博客标题"
                                   value={articleTitle}
                                   size="large" 
                                   onChange={e=>{
                                    setArticleTitle(e.target.value)
                                    }} />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.id}>{item.typeName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br></br>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea value={articleContent} className="markdown-content" rows={35} placeholder="文章内容" onChange={changeContent} />
                        </Col>
                        <Col span={12}>
                            <div className="show-html" dangerouslySetInnerHTML={{__html: markdownContent}}></div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>保存文章</Button>
                            <br></br>
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea value={introducemd} rows={4} placeholder="文章简介" onChange={changeIntroduce} />
                            <br></br>
                            <div className="introduce-html" dangerouslySetInnerHTML={{__html: introducehtml}}></div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker placeholder="发布日期" 
                                            size="large" 
                                            onChange={(date,dateString)=>setShowDate(dateString)}  />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )

}
export default AddArcicle