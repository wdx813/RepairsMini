// pages/login/login.js
const common = require('../../comment/common.js')
const util = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '欢迎登录报修平台',
        loginName: '',
        password: ''
    },

    onLogin: function(e) {
        var loginName = e.detail.value.loginName.trim()
        var password = e.detail.value.password.trim()
        if(!loginName || loginName == "") {
            util.showToast('登录名不能为空')
            return
        }
        if(!password || password == "") {
            util.showToast('密码不能为空')
            return
        }
        wx.showLoading({
            title: '正在登录...',
        })
        common.login('/core/appuser/appuserlogin?loginName=' + loginName + '&password=' + password).then(res => {
            console.log(res)
            wx.hideLoading()
            if(res && res.code == 0) {
                wx.setStorageSync('token', res.result)
                wx.switchTab({
                    url: '/pages/index/index',
                })
            } else if(res && res.code == 2) {
                util.showToast(res.msg)
            } else {
                util.showToast('服务器错误，请稍后重试')
            }
        })
    },

    toRegister: function() {
        wx.navigateTo({
            url: '/pages/register/register',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.loginName && options.password) {
            this.setData({
                loginName: options.loginName,
                password: options.password
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})