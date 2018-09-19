// pages/mine/mine.js
const common = require('../../comment/common.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {},
      repairCount: {}
  },

  toUpdatePwd: function() {
      wx.navigateTo({
          url: '/pages/update-pwd/update-pwd',
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      common.getUserInfo('/core/appuser/find_one_appuser').then(res => {
          if(res) {
            if(res.code == 0) {
                this.setData({userInfo: res.data})
            }
          } else {
              util.showToast('服务器错误，请稍后重试')
          }
      })
      common.getUserRepairCount('/cms/repair/app_count_repair').then(res => {
          console.log(res)
          if (res) {
              if (res.code == 0) {
                  this.setData({ repairCount: res.data })
              }
          } else {
              util.showToast('服务器错误，请稍后重试')
          }
      })
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
      return {
          title: '报修，我们是认真的！',
          path: '/pages/login/login',
          imageUrl: '../../images/background.png'
      }
  }
})