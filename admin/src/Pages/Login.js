import React, {useState}  from 'react';
import 'antd/dist/antd.css'
import {Card, Input, Button, Spin, message} from 'antd'
import '../static/css/login.css'
import servicePath from '../config/apiUrl'
import axios from 'axios'
import {
    UserOutlined,
    KeyOutlined
  } from '@ant-design/icons';
function Login (props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState(false)
    const checkLogin = () => {
        setLoading(true)
        if (!userName) {
            message.error('用户名不能为空')
            setLoading(false)
            return false
            
        } else if(!password) {
            message.error('密码不能为空')
            setLoading(false)
            return false
        }
        let dataProps = {
            'username': userName,
            'password': password
        }
        axios.post(servicePath.getLogin, dataProps).then(res => {
            setLoading(false)
            if(res.data.data.status) {
                localStorage.setItem('username', userName)
                props.history.push('/index')
            } else {
                message.error('用户名密码错误')
            }
        })
    }
    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="魔王大人 blod" bordered={true} style={{width: 400}}>
                    <Input id="userName" 
                           size="large" 
                           placeholder="请输入用户名" 
                           prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} />} 
                           onChange={(e)=> {setUserName(e.target.value)}} />
                           <br></br>
                    <Input.Password
                           id="password" 
                           size="large" 
                           style={{marginTop: 20}}
                           placeholder="请输入密码" 
                           prefix={<KeyOutlined style={{color: 'rgba(0,0,0,.25)'}} />} 
                           onChange={(e)=> {setPassword(e.target.value)}} />

                           <br></br>
                    <Button style={{marginTop: 20}} type="primary" size="large" block onClick={checkLogin}>登录</Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login