const utils = require('../utils/util.js')
const baseUrl = 'https://www.wgxy.org/core'
/**
 * 用户登录
 */
function login(url) {
    return sendRequest(url, 'GET').then(res => res.data)
}

/**
 * 用户注册
 */
function register(url) {
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
function uploadFile(url, data, filePath) {
    return new Promise((resole, reject) => {
        wx.uploadFile({
            url: baseUrl + url,
            filePath: filePath,
            name: 'file',
            formData: data,
            success: resole,
            fail: reject
        })
    })
}


module.exports = {
    login,
    register
}