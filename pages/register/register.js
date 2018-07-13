// pages/register/register.js
const common = require('../../comment/common.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userTypes: ['教师', '学生', '职工'],
        userType: '--- 请选择 ---',
        pickerChange: false,
        pickerValue: 0
    },

    bindPickerChange: function(e) {
        var index = parseInt(e.detail.value)
        this.setData({
            userType: this.data.userTypes[index],
            pickerChange: true,
            pickerValue: index + 1 + ''
        })
    },

    bindSubmit: function(e) {
        var userInfo = e.detail.value
        console.log(userInfo)
        if (!userInfo.loginName || userInfo.loginName.trim() == "") {
            wx.showToast({
                title: '登录名不能为空',
                icon: 'none',
                duration: 2000
            })
            return
        }
        if (!userInfo.realName || userInfo.realName.trim() == "") {
            wx.showToast({
                title: '真实姓名不能为空',
                icon: 'none',
                duration: 2000
            })
            return
        }
        if (!userInfo.password || userInfo.password.trim() == "") {
            wx.showToast({
                title: '密码不能为空',
                icon: 'none',
                duration: 2000
            })
            return
        }
        if (!userInfo.mobile || userInfo.mobile.trim() == "") {
            wx.showToast({
                title: '密码不能为空',
                icon: 'none',
                duration: 2000
            })
            return
        } else {
            var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
            if (!phoneReg.test(userInfo.mobile.trim())) {
                wx.showToast({
                    title: '请输入有效的手机号',
                    icon: 'none',
                    duration: 2000
                })
                return
            }
        }
        if (!userInfo.usertype || userInfo.usertype.trim() == "") {
            wx.showToast({
                title: '用户类型不能为空',
                icon: 'none',
                duration: 2000
            })
            return
        }
        var url = '/appuser/register?loginName=' + userInfo.loginName + '&realName=' + userInfo.realName 
            + '&password=' + userInfo.password + '&mobile=' + userInfo.mobile + '&usertype=' + userInfo.usertype
        console.log(url)
        wx.showLoading({
            title: '正在提交...',
        })
        common.register(url).then(res => {
            console.log(res)
            if(res.code == 0) {
                wx.hideLoading()
                wx.showToast({
                    title: '注册成功',
                    icon: 'none',
                    duration: 1500,
                    success: () => {
                        wx.redirectTo({
                            url: '/pages/login/login?loginName=' + userInfo.loginName + 'password=' + userInfo.password,
                        })
                    }
                })
            } else if(res.code == 500) {
                wx.showToast({
                    title: '服务器错误',
                    icon: 'none',
                    duration: 2000
                })
            } else {
                wx.showToast({
                    title: '注册失败',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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