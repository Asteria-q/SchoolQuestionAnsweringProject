const util = require("../../utils/util");
const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: 0,
        id: 0,
        userInfo: App.globalData.userInfo,
        reportTime: "",
        reason: ""
    },

    input(e) {
        this.setData({
            reason: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options)
        App.watch("userInfo", (newValue) => {
            // console.log('Global variable "userInfo" changed\n');
            this.setData({
                userInfo: newValue
            })
        })
        this.setData({
            id: options.id,
            type: options.type,
            reportTime: util.formatTime(new Date())
        })
    },

    submitReport: function () {
        // 提交举报信息的代码
        // ...
        wx.showModal({
            title: "提示",
            content: "确认举报该" + (this.data.type == 0 ? "问题" : "回答") + "吗？",
            complete: (res) => {
                if (res.cancel) {
                    return
                }

                if (res.confirm) {
                    var server = App.globalData.server
                    wx.request({
                        url: server + "/user/report/",
                        data: {
                            type: this.data.type,
                            id: this.data.id,
                            reason: this.data.reason,
                            uid: this.data.userInfo.UID,
                            reptime: this.data.reportTime
                        },
                        method: "GET",
                        success: res => {
                            wx.showToast({
                                title: "举报成功",
                                icon: "success",
                                duration: 2000
                            })
                            wx.navigateBack({
                                delta: 1
                            })
                        },
                        fail: res => {
                            console.log(res.errMsg)
                        }
                    })
                }
            }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})