// pages/repair/repair.js
const common = require('../../comment/common.js')
const util = require('../../utils/util.js')
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
        repairTheme: '',
        repairType: '',
        repairTypeIndex: 0,
        repairContent: '',
        imgs: ''
    },

    /**
     * 选择报修类型
     */
    bindChooseRepairType: function() {
        var that = this
        var repairTypeList = ['水电设施', '环境设施', '生活设施']
        wx.showActionSheet({
            itemList: repairTypeList,
            success: res => {
                that.setData({
                    repairType: repairTypeList[res.tapIndex],
                    repairTypeIndex: res.tapIndex + 1
                })
            }
        })
    },

    /**
     * 选择上传图片
     */
    bindChooseImg: function(e) {
        var that = this
        wx.chooseImage({
            count: 4,
            success: function(res) {
                var showChooseBtn = res.tempFilePaths.length < 4 ? true : false
                that.setData({
                    tempFilePaths: res.tempFilePaths
                })
                wx.showLoading({
                    title: '正在上传...',
                })
                var i = 0
                for (let index in res.tempFilePaths) {
                    var imgs = that.data.imgs
                    let path = res.tempFilePaths[index]
                    common.uploadRepairImgs(path).then(res => {
                        res = JSON.parse(res)[0]
                        if (res.state == 'SUCCESS') {
                            if (that.data.tempFilePaths.length == (index + 1)) {
                                imgs += res.url
                            } else {
                                imgs += res.url + ';'
                            }
                            i++
                            if (i == that.data.tempFilePaths.length) {
                                wx.hideLoading()
                                that.setData({
                                    showChooseBtn: showChooseBtn,
                                    imgs: imgs
                                })
                            }
                        } else {
                            util.showToast('上传图片失败')
                        }
                    })
                }
                
            }
        })
    },

    /**
     * 提交
     */

    bindSubmit: function(e) {
        let pairtheme = e.detail.value.pairtheme.trim()
        let repairType = this.data.repairTypeIndex
        let paorcontent = e.detail.value.paorcontent.trim()
        if (pairtheme == "") {
            wx.showToast({
                title: '报修主题不能为空',
                icon: 'none',
                duration: 2000
            })
            return
        }

        if (repairType == 0) {
            wx.showToast({
                title: '报修类型不能为空',
                icon: 'none',
                duration: 2000
            })
            return
        }

        if (paorcontent == "") {
            wx.showToast({
                title: '报修内容不能为空',
                icon: 'none',
                duration: 2000
            })
            return
        }

        let repairData = {
            pairtheme: pairtheme,
            repairType: repairType,
            paorcontent: paorcontent,
            imgs: this.data.imgs
        }
        console.log(repairData)
        common.createRepair(repairData).then(res => {
            console.log(res)
            if(res.ok) {
                util.showToast('报修成功')
            } else {
                util.showToast('报修失败')
            }
        })

    },

    /**
     * 显示删除按钮
     */
    showDeleteBtn: function(e) {
        var left = e.currentTarget.offsetLeft
        var top = e.currentTarget.offsetTop
        var index = e.currentTarget.dataset.index
        this.setData({
            left: left,
            top: top,
            showDeleteBtn: true,
            index: index
        })
    },

    /**
     * 隐藏删除按钮
     */
    hideDeleteBtn: function() {
        this.setData({
            showDeleteBtn: false
        })
    },

    /**
     * 删除临时图片
     */
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