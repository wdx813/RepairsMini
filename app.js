//app.js
App({
    onLaunch: function() {
        var token = wx.getStorageSync('token')
        // if (!token || token == "") {
        //     wx.redirectTo({
        //         url: '/pages/login/login',
        //     })
        // }
    },
    globalData: {
        userInfo: null
    }
})