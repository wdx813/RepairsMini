// pages/update-pwd/update-pwd.js
const common = require('../../comment/common.js')
const util = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 0,
        // 输入框参数设置
        inputData: {
            input_value: "",//输入框的初始内容
            value_length: 0,//输入框密码位数
            isNext: true,//是否有下一步的按钮
            get_focus: false,//输入框的聚焦状态
            focus_class: true,//输入框聚焦样式
            value_num: [1, 2, 3, 4],//输入框格子数
            height: "50rpx",//输入框高度
            width: "250rpx",//输入框宽度
            see: true,//是否明文展示
            interval: false,//是否显示间隔格子
        },
        focus: false,
        oldPwd: '',
        newPwd1: '',
        confirmPwd1: '',
        phone: '',
        realName: '',
        newPwd2: '',
        confirmPwd2: ''
    },

    /**
     * 获取输入的手机号
     */
    valueSix(e) {
        console.log(e.detail)
        this.setData({ phoneInput: e.detail })
    },

    /**
     * 滑块改变
     */
    handleSwiperChange: function(e) {
        let current = e.detail.current
        this.setData({ current: current })
    },

    /**
     * tab改变
     */
    handleTabChange: function(e) {
        let current = e.detail.key
        this.setData({ current: current })
    },

    /**
     * 真实姓名获取输入框焦点
     */
    bindEditBoxFocus: function() {
        this.setData({ focus: true})
    },

    /**
     * 真实姓名失去输入框的焦点
     */
    bindEditBoxBlur: function() {
        this.setData({ focus: false })
    },

    /**
     * 获取真实姓名的输入值
     */
    bindRealNameInput: function(e) {
        this.setData({
            realName: e.detail.detail.value.trim()
        })
    },

    /**
     * 输入手机号
     */
    bindInputPhone: function(e) {
        this.setData({
            phone: e.detail.detail.value.trim()
        })
    },

    /**
     * 身份验证输入新密码
     */
    bindInputNewPwd2: function(e) {
        this.setData({
            newPwd2: e.detail.detail.value.trim()
        })
    },

    /**
     * 身份验证再次输入新密码
     */
    bindInputConfirmPwd2: function (e) {
        this.setData({
            confirmPwd2: e.detail.detail.value.trim()
        })
    },

    /**
     * 身份验证 检查数据并提交
     */
    checkIdentitySubmit: function() {
        if(this.data.phone == "") {
            util.showToast('手机号不能为空')
            return
        }

        let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (!phoneReg.test(this.data.phone)) {
            util.showToast('请输入有效的手机号')
            return
        }

        if(this.data.realName == "") {
            util.showToast('真实姓名不能为空')
            return
        }

        if(this.data.newPwd2 == "") {
            util.showToast('新密码不能为空')
            return
        }

        if(this.data.confirmPwd2 == "") {
            util.showToast('请再次输入新密码')
            return
        }

        if(this.data.newPwd2 != this.data.confirmPwd2) {
            util.showToast('两次输入的密码不一致')
            return
        }
        //提交数据
        let url = '/core/appuser/resetPassword_ByPer?phone=' + this.data.phone + '&name=' + this.data.realName + '&npass=' + this.data.newPwd2
        wx.showLoading({
            title: '正在提交...',
        })
        common.resetPwdByIdentity(url).then(res => {
            wx.hideLoading()
            if(res && res.ok) {
                util.showToast('密码修改成功')
                setTimeout(function () {
                    wx.navigateBack()
                }, 1000)
            } else {
                util.showToast('服务器错误，请稍后重试')
            }
        })
    },

    /**
     * 输入原密码
     */
    bindInputOldPwd: function (e) {
        console.log(e)
        this.setData({
            oldPwd: e.detail.detail.value.trim()
        })
    },

    /**
    * 密码验证输入新密码
    */
    bindInputNewPwd1: function (e) {
        this.setData({
            newPwd1: e.detail.detail.value.trim()
        })
    },

    /**
     * 密码验证再次输入新密码
     */
    bindInputConfirmPwd1: function (e) {
        this.setData({
            confirmPwd1: e.detail.detail.value.trim()
        })
    },

    /**
     * 密码验证 检查数据并提交
     */
    checkPwdSubmit: function() {
        if(this.data.oldPwd == "") {
            util.showToast('原密码不能为空')
            return
        }

        if(this.data.newPwd1 == "") {
            util.showToast('新密码不能为空')
            return
        }

        if(this.data.confirmPwd1 == "") {
            util.showToast('请再次输入新密码')
            return
        }

        if(this.data.newPwd1 != this.data.confirmPwd1) {
            util.showToast('两次输入的密码不一致')
            return
        }

        //提交数据
        let url = '/core/appuser/resetPassword_ByPass?oldPass=' + this.data.oldPwd + '&newPass=' + this.data.newPwd1
        wx.showLoading({
            title: '正在提交...',
        })
        common.resetPwdByOldPwd(url).then(res => {
            wx.hideLoading()
            if (res && res.ok) {
                util.showToast('密码修改成功')
                setTimeout(function () {
                    wx.navigateBack()
                }, 1000)
            } else {
                util.showToast('服务器错误，请稍后重试')
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
        return {
            title: '报修，我们是认真的！',
            path: '/pages/login/login',
            imageUrl: '../../images/background.png'
        }
    }
})