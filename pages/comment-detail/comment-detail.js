// pages/comment-detail/comment-detail.js
const common = require('../../comment/common.js')
const util = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stars: [0, 1, 2, 3, 4],
        normalSrc: '../../images/normal.png',
        selectedSrc: '../../images/selected.png',
        halfSrc: '../../images/half.png',
        key: 0, //评分
        comment: '',
        repairId: ''
    },

    //点击左边,半颗星
    selectLeft: function(e) {
        var key = e.currentTarget.dataset.key
        if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
            //只有一颗星的时候,再次点击,变为0颗
            key = 0;
        }
        this.setData({
            key: key
        })

    },
    //点击右边,整颗星
    selectRight: function(e) {
        var key = e.currentTarget.dataset.key
        this.setData({
            key: key
        })
    },

    /**
     * 获取评价的内容
     */
    bindCommentInput: function(e) {
        this.setData({ comment: e.detail.value})
    },

    /**
     * 提交评价
     */
    bindSubmitComment: function() {
        let url = '/cms/repair/app_evalute_repair?id=' + this.data.repairId + '&evaluate=' + this.data.comment + '&score=' + this.data.key
        console.log(url)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if(options.repairId) {
            this.setData({repairId: options.repairId})
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