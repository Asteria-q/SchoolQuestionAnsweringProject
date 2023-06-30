const App = getApp();
const Template = {
    AID: 0,
    AnsTime: '2023/04/25 17:55:17',
    AnsContent: '回答',
    LikeNum: 10,
    UID: 0,
    QID: 1,
    Title: '你如何评价这个问题,啊啊啊啊啊',
    QueContent: "每周都要写周报",
};
Page({
    /**
     * 页面的初始数据
     */
    data: {
        active: 1,
        keyWord: "",
        answers: Array(10).fill(Template),
        userInfo: App.globalData.userInfo,
    },

    getQues() {

    },

    onLoad(options) {
        // console.log(App.globalData.userInfo)
        App.watch("userInfo", (newValue) => {
            // console.log('Global variable "userInfo" changed\n');
            this.setData({
                userInfo: newValue
            })
        })
        var uid = this.data.userInfo.UID
        // console.log(uid)
        wx.request({
            url: App.globalData.server + "/user/answers/",
            method: "GET",
            data: {
                uid: uid
            },
            success: res => {
                // console.log(res)
                this.setData({
                    answers: res.data.data
                })
            },
            fail: res => {
                console.log(res.errMsg);
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})