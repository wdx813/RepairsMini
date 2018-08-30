// pages/repair-detail/repair-detail.js
const common = require('../../comment/common.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      repair: {},
  },

  /**
   * 预览图片
   */
  previewRepairImg: function(e) {
      let current = e.currentTarget.dataset.url
      console.log(current)
      wx.previewImage({
          urls: this.data.repair.imgArray,
          current: current
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if(options.repairId) {
          let repairId = options.repairId
          let url = '/cms/repair/app_quaryone_repair?id=' + repairId
          common.getRepairDetail(url).then(res => {
              console.log(res)
              if(res.ok) {
                  let repair = util.formatRepairDetail(res.data)
                  console.log(repair)
                  this.setData({repair: repair})
              }
          })
      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})