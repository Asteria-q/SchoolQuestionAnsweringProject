// pages/Person/privacy/privacy.js
const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: App.globalData.userInfo,
        sex: false,
        profession: false,
        grade: false,
        Tags: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log(this.data.info)
        App.watch("userInfo", (newValue) => {
            // console.log('Global variable "userInfo" changed\n');
            this.setData({
                info: newValue
            })
        })
        for (var i = 0; i < this.data.info.DisplayInfo.length; i++) {
            if (this.data.info.DisplayInfo[i] == "Sex") {
                this.setData({
                    sex: true,
                })
            } else if (this.data.info.DisplayInfo[i] == "Profession") {
                this.setData({
                    profession: true,
                })
            } else if (this.data.info.DisplayInfo[i] == "Grade") {
                this.setData({
                    grade: true,
                })
            } else if (this.data.info.DisplayInfo[i] == "Tags") {
                this.setData({
                    Tags: true,
                })
            }
        }
    },

    ChangeSex(e) {
        this.setData({
            sex: !this.data.sex,
        })
    },

    ChangeProfession(e) {
        this.setData({
            profession: !this.data.profession,
        })
    },

    ChangeGrade(e) {
        this.setData({
            grade: !this.data.grade,
        })
    },

    ChangeTags(e) {
        this.setData({
            Tags: !this.data.Tags,
        })
    },

    finish(e) {
        var DisplayInfo = []
        if (this.data.sex) {
            DisplayInfo.push("Sex")
        }
        if (this.data.profession) {
            DisplayInfo.push("Profession")
        }
        if (this.data.grade) {
            DisplayInfo.push("Grade")
        }
        if (this.data.Tags) {
            DisplayInfo.push("Tags")
        }
        wx.showModal({
            title: '提示',
            content: '确定保存修改吗？',
            complete: (res) => {
                if (res.cancel) {
                    return
                }

                if (res.confirm) {
                    // 提交
                    wx.request({
                        url: App.globalData.server + "/user/privacy/",
                        method: "GET",
                        data: {
                            uid: this.data.info.UID,
                            displayinfo: DisplayInfo
                        },

                        success: res => {
                            var userInfo = App.globalData.userInfo
                            userInfo.DisplayInfo = DisplayInfo
                            App.globalData.userInfo = userInfo
                            // console.log(getApp().globalData.userInfo.DisplayInfo)
                        },

                        fail(res) {
                            console.log(res.errMsg)
                        }
                    })
                    // 
                    wx.navigateBack({
                        delta: 1
                    })
                }
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