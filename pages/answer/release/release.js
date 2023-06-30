// pages/answer/release/release.js
const App = getApp();
const util = require("../../../utils/util");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        question: [],
        content: "",
    },

    finish(e) {
        console.log(this.data.content)
        wx.showModal({
            title: '提示',
            content: '确定发布回答吗？',
            complete: (res) => {
                if (res.cancel) {
                    return
                }
                if (res.confirm) {
                    wx.request({
                        url: App.globalData.server + "/answer/release/",
                        data: {
                            uid: App.globalData.userInfo.UID,
                            qid: this.data.question.QID,
                            anscontent: this.data.content,
                            anstime: util.formatTime(new Date())
                        },
                        method: "GET",
                        success: res => {
                            wx.showToast({
                                title: "发布成功",
                                icon: "success"
                            })
                            wx.navigateBack({
                                delta: 1
                            })
                        },
                        fail: res => {
                            console.log(res.errMsg)
                            wx.showToast({
                                title: "发布失败",
                                icon: "error"
                            })
                        }
                    })
                }

            }
        })

    },

    onInput(e) {
        this.setData({
            content: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var json = JSON.parse(decodeURIComponent(options.question))
        this.setData({
            question: json
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