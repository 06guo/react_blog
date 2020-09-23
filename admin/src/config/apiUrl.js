let ipUrl = 'http://120.27.234.127:7300/mock/5f67ec53689607059d2fde30/blogAdmin/'

let servicePath = {
    getLogin: ipUrl + 'login', // 登录接口
    getTypeInfo: ipUrl + 'getTypeInfo', // 获取typeinfo信息
    saveInfo:ipUrl + 'saveInfo', // 添加文章
    updateInfo: ipUrl + 'modifyArticle', // 更新文章
    getArticleList: ipUrl + 'getArticleList', // 获取文章列表
    deleteArticle: ipUrl + 'deleteArticle', // 删除文章
    getArticleDetail: ipUrl + 'getArticleById' // 获取文章详情
}
export default servicePath