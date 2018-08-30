// pages/search/search.js
const common = require('../../comment/common.js')
const util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        windowHeight: 0,
        keyword: '',
        status: '',
        statusStr: '单据状态',
        currentPage: 1,
        hasMore: true,
        repairList: []
    },

    /**
     * 输入关键字
     */
    bindInputKeyword: function(e) {
        let keyword = e.detail.value.trim()
        this.setData({ keyword: keyword })
    },

    /**
     * 选择状态
     */
    bindChangeStatus: function() {
        let statusList = ['提交', '受理', '完成', '已评价', '强制结束']
        wx.showActionSheet({
            itemList: statusList,
            success: res => {
                let status = res.tapIndex + 1
                this.setData({
                    status: status,
                    statusStr: statusList[res.tapIndex]
                })
            }
        })
        
    },

    /**
     * 查询提交
     */
    bindSubmit: function() {
        this.setData({
            currentPage: 1,
            repairList: [],
            showFootLine: false,
            hasMore: true
        })
        this.queryRepair(1)
    },

    /**
     * 查询报修单
     */
    queryRepair: function(page) {
        let that = this
        let keyword = this.data.keyword
        let status = this.data.status
        let url = '/cms/repair/app_quaryall_repair?pageSize=10&field=createtime&queryAll=N&order=desc&page=' + page + '&keyword' + keyword + '&tatus=' + status
        this.setData({ showLoading: true })
        common.queryRepair(url).then(res => {
            console.log(res)
            if (res.ok) {
                if (res.rows) {
                    let repairList = util.formatRepairList(res.rows)
                    console.log(repairList)
                    setTimeout(function() {
                        that.setData({
                            repairList: that.data.repairList.concat(repairList),
                            currentPage: page,
                            showLoading: false
                        })
                    }, 400)
                } else {
                    this.setData({
                        hasMore: false,
                        showFootLine: true,
                        showLoading: false
                    })
                }
                
            } else if(res.code == 1023) {
                wx.reLaunch({
                    url: '/pages/login/login',
                })
            } else {
                util.showToast('服务器错误，请稍后重试')
            }
        })
    },

    /**
     * 报修详情
     */
    toRepairDetail: function(e) {
        let repairId = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/repair-detail/repair-detail?repairId=' + repairId,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.queryRepair(1)
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
        if(this.data.hasMore) {
            let page = this.data.currentPage + 1
            this.queryRepair(page)
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})