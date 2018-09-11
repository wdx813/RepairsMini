// pages/update-pwd/update-pwd.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 1,
        // 输入框参数设置
        inputData: {
            input_value: "",//输入框的初始内容
            value_length: 0,//输入框密码位数
            isNext: true,//是否有下一步的按钮
            get_focus: true,//输入框的聚焦状态
            focus_class: true,//输入框聚焦样式
            value_num: [1, 2, 3, 4],//输入框格子数
            height: "50rpx",//输入框高度
            width: "250rpx",//输入框宽度
            see: true,//是否明文展示
            interval: false,//是否显示间隔格子
        },
        focus: false,
        phoneInput: '',
        realNameInput: '',
        newPwd: '',
        confirmNewPwd: ''
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
        this.setData({ realNameInput: e.detail.value })
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