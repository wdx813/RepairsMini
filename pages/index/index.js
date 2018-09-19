// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],

        bulletins: [
            {
                'id': 1,
                'title': '学校报修，我们是认真的，那是必...',
                'time': '2018-07-13'
            },
            {
                'id': 2,
                'title': '学校报修，我们是认真的',
                'time': '2018-07-13'
            },
            {
                'id': 3,
                'title': '学校报修，我们是认真的',
                'time': '2018-07-13'
            },
        ]
    },

    toBulletinList: function() {
        wx.navigateTo({
            url: '/pages/bulletin-list/bulletin-list',
        })
    },

    toBulletinDetail: function(e) {
        var bulletinId = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/bulletin-detail/bulletin-detail?bulletinId=' + bulletinId,
        })
    },

    toRepair: function() {
        wx.navigateTo({
            url: '/pages/repair/repair',
        })
    },

    toSearch: function () {
        wx.navigateTo({
            url: '/pages/search/search',
        })
    },

    toComment: function() {
        wx.navigateTo({
            url: '/pages/comment/comment',
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