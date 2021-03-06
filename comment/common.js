const baseUrl = 'https://www.wgxy.org'
/**
 * 用户登录
 */
function login(url) {
    return sendRequest(url, 'GET').then(res => res.data).catch(res => false)
}

/**
 * 用户注册
 */
function register(url) {
    return sendRequest(url, 'GET').then(res => res.data)
}

/**
 * 上传报修图片
 */
function uploadRepairImgs(filePath) {
    return uploadFile('/core/res/upload/repairimgs', filePath).then(res => res.data)
}

/**
 * 上传报修单
 */
function createRepair(url) {
    return sendRequest(url, 'GET').then(res => res.data)
}

/**
 * 查询报修单
 */
function queryRepair(url) {
    return sendRequest(url, 'GET').then(res => res.data)
}

/**
 * 获取报修详情
 */
function getRepairDetail(url) {
    return sendRequest(url, 'GET').then(res => res.data)
}

/**
 * 获取用户详情
 */
function getUserInfo(url) {
    return sendRequest(url, 'GET').then(res => res.data)
}

/**
 * 获取用户的申报统计
 */
function getUserRepairCount(url) {
    return sendRequest(url, 'GET').then(res => res.data)
}

/**
 * 用户评价
 */
function commentRepair(url) {
    return sendRequest(url, 'GET').then(res => res.data)
}

/**
 * 重置密码 原密码验证
 */
function resetPwdByOldPwd(url) {
    return sendRequest(url, 'GET').then(res => res.data)
}

/**
 * 重置密码 身份验证
 */
function resetPwdByIdentity(url) {
    return sendRequest(url, 'GET').then(res => res.data)
}

/**
 * 封装请求函数
 */
function sendRequest(url, method, data) {
    var token = wx.getStorageSync('token')
    return new Promise((resole, reject) => {
        wx.request({
            url: baseUrl + url,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json',
                'Authorization': token
            },
            success: resole,
            fail: reject
        })
    })
}

/**
 * 上传文件
 */
function uploadFile(url, filePath, data) {
    var token = wx.getStorageSync('token')
    return new Promise((resole, reject) => {
        wx.uploadFile({
            url: baseUrl + url,
            filePath: filePath,
            name: 'img',
            formData: data,
            header: {
                'Authorization': token
            },
            success: resole,
            fail: reject
        })
    })
}

module.exports = {
    baseUrl,
    login,
    register,
    uploadFile,
    uploadRepairImgs,
    createRepair,
    queryRepair,
    getRepairDetail,
    getUserInfo,
    getUserRepairCount,
    commentRepair,
    resetPwdByOldPwd,
    resetPwdByIdentity
}