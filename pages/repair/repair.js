// pages/repair/repair.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showChooseBtn: true,
        showDeleteBtn: false,
        left: 0,
        top: 0, 
        index: 0,
        tempFilePaths: [],
        tempFiles: []
    },

    bindChooseImg: function(e) {
        var that = this
        wx.chooseImage({
            count: 4,
            success: function(res) {
                var showChooseBtn = res.tempFilePaths.length < 4 ? true : false
                that.setData({
                    tempFilePaths: res.tempFilePaths,
                    tempFiles: res.tempFiles,
                    showChooseBtn: showChooseBtn
                })
            }
        })
    },

    showDeleteBtn: function(e) {
        var left = e.currentTarget.offsetLeft
        var top = e.currentTarget.offsetTop
        var index = e.currentTarget.dataset.index
        this.setData({left: left, top: top, showDeleteBtn: true, index: index})
    },

    hideDeleteBtn: function() {
        this.setData({showDeleteBtn: false})
    },

    deleteTempFile: function() {
        var index = this.data.index
        this.data.tempFilePaths.splice(index, 1)
        this.data.tempFiles.splice(index, 1)
        this.setData({
            tempFilePaths: this.data.tempFilePaths,
            tempFiles: this.data.tempFiles,
            showChooseBtn: true
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