// pages/Person/profile/profile.js
const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uid: 0,
        info: {
            UID: 121,
            OpenID: "",
            UserName: "ChatGPT",
            Image: "https://picsum.photos/200",
            SelfIntro: "Hi, I'm a language model trained by OpenAI. \
                    Hi, I'm a language model trained by OpenAI. \
                    Hi, I'm a language model trained by OpenAI. \
                    Hi, I'm a language model trained by OpenAI. \
                    Hi, I'm a language model trained by OpenAI.",
            Sex: 1,
            // Grade: "大三",
            Profession: "人工智能",
            Tags: ["人工智能", "计算机"],
        },
        display: []
    },

    req() {
        wx.request({
            url: App.globalData.server + "/user/display/",
            method: "GET",
            data: {
                uid: this.data.uid
            },

            success: res => {
                console.log(res)
                this.setData({
                    info: res.data.data[0],
                    display: Object.keys(res)
                })
            },

            fail: res => {
                this.setData({
                    display: Object.keys(this.data.data)
                })
                console.log(res.errMsg)
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log(options)
        this.setData({
            uid: options.uid
        })
        this.req()
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
        this.req()
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