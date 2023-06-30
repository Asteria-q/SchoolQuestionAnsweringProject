// pages/PersonalInfo/home/home.js
const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Colors: App.globalData.COLORS,
    userInfo: App.globalData.userInfo,
  },

  onClose(e) {

  },

  //修改个人信息
  changeInfo(e) {
    wx.navigateTo({
      url: '/pages/Person/Info/info',
    })
  },

  // 我的提问
  myProblems(e) {
    wx.navigateTo({
      url: '/pages/Person/Problems/problems?uid=' + this.data.userInfo.UID,
    })
  },

  // 我的回答
  myAnswers(e) {
    wx.navigateTo({
      url: '/pages/Person/Answers/answers?uid=' + this.data.userInfo.UID,
    })
  },

  //隐私设置
  myPrivacy(e) {
    wx.navigateTo({
      url: '/pages/Person/privacy/privacy'
    })
  },

  //反馈
  feedback(e) {
    wx.navigateTo({
      url: '/pages/Person/contact/contact',
    })
  },

  //关于我们
  aboutUs(e) {
    wx.navigateTo({
      url: '/pages/Person/About/about',
    })
  },

  //注销账号
  logOff(e) {
    wx.showModal({
      title: '注销',
      content: '确认注销账号吗？',
      complete: (res) => {
        if (res.cancel) {
          return
        }

        if (res.confirm) {
          // 注销账号
          wx.request({
            url: App.globalData.server + "/user/logoff/",
            data: {
              uid: App.globalData.userInfo.UID
            },
            method: "GET",
            success: res => {
              console.log("退出小程序")
              wx.exitMiniProgram({
                success: (res) => {}
              })
            },
            fail: res => {

            }
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(this.data.Colors)
    App.watch("userInfo", (newValue) => {
      // console.log('Global variable "userInfo" changed\n');
      this.setData({
        userInfo: newValue
      })
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