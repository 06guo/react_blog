let ipUrl = 'http://120.27.234.127:7300/mock/5f601998689607059d2fde2a/blog/'

let servicePath = {
    getArticleList: ipUrl + 'getArticalList',
    getArticleDetail: ipUrl + 'articalDetail',
    getTypeInfo: ipUrl + 'getTypeInfo', // 获得文章类别
    getListById: ipUrl + 'getListById/' // 根据类别获取文章列表
}

export default servicePath