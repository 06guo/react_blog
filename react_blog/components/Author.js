import {Avatar, Divider} from 'antd'
import "../styles/components/author.css"
import {
    GithubOutlined,
    QqOutlined,
    WechatOutlined,
  } from '@ant-design/icons';
const Author = () => {
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size="100" src="" />
                <div className="author-introduction">
                    简介：魔王大人，哈哈哈
                    <Divider>社交账号</Divider>
                    <Avatar size={28} icon={<GithubOutlined />} className="account"/>
                    <Avatar size={28} icon={<QqOutlined />} className="account"/>
                    <Avatar size={28} icon={<WechatOutlined />} className="account"/>
                </div>
            </div>
        </div>
    )
}
export default Author