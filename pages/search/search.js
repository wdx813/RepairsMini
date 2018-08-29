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
        isSelected1: false,
        isSelected2: false,
        isSelected3: false,
        isSelected4: false,
        isSelected5: false,
        currentPage: 1,
        hasMore: true,
        repairList: []
    },

    bindInputKeyword: function(e) {
        let keyword = e.detail.value.trim()
        this.setData({ keyword: keyword })
    },

    /**
     * 选择状态
     */
    bindChangeStatus: function(e) {
        let index = e.currentTarget.dataset.status
        switch(parseInt(index)) {
            case 1:
                this.setData({
                    isSelected1: true,
                    isSelected2: false,
                    isSelected3: false,
                    isSelected4: false,
                    isSelected5: false,
                    status: index
                })
                break
            case 2:
                this.setData({
                    isSelected1: false,
                    isSelected2: true,
                    isSelected3: false,
                    isSelected4: false,
                    isSelected5: false,
                    status: index
                })
                break
            case 3:
                this.setData({
                    isSelected1: false,
                    isSelected2: false,
                    isSelected3: true,
                    isSelected4: false,
                    isSelected5: false,
                    status: index
                })
                break
            case 4:
                this.setData({
                    isSelected1: false,
                    isSelected2: false,
                    isSelected3: false,
                    isSelected4: true,
                    isSelected5: false,
                    status: index
                })
                break
            case 5:
                this.setData({
                    isSelected1: false,
                    isSelected2: false,
                    isSelected3: false,
                    isSelected4: false,
                    isSelected5: true,
                    status: index
                })
                break
        }
    },

    /**
     * 重置查询条件
     */
    bindReset: function() {
        this.setData({
            isSelected1: false,
            isSelected2: false,
            isSelected3: false,
            isSelected4: false,
            isSelected5: false,
            status: '',
            keyword: '',
            showLoading: false,
            showFootLine: false
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

    queryRepair: function(page) {
        let that = this
        let keyword = this.data.keyword
        let status = this.data.status
        let url = '/cms/repair/app_quaryall_repair?pageSize=10&field=createtime&queryAll=N&order=desc&page=' + page + '&keyword' + keyword + '&tatus=' + status
        console.log(url)
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