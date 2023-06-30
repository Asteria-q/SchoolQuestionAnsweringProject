// pages/question/release/release.js
const App = getApp();
const util = require("../../../utils/util");
Page({
  data: {
    imageList: [],
    TAGS: App.globalData.TAGS,
    userinfo: App.globalData.userInfo,
    tags: [],
    title: "",
    content: "",
  },

  clear() {
    this.setData({
      imageList: [],
      tags: [],
      title: "",
      content: ""
    })
  },

  onLoad() {
    App.watch("userInfo", (newValue) => {
      // console.log('Global variable "userInfo" changed\n');
      this.setData({
        userInfo: newValue
      })
    })
  },

  //选择图片
  chooseImage(e) {
    let index = e.currentTarget.dataset.index
    // console.log(index)
    let self = this
    wx.chooseMedia({
      count: 9,
      sizeType: ['original', 'compressed'], //原图 ，压缩图
      sourceType: ['album', 'camera'], //从相处选择 ，使用相机
      success(res) {
        // console.log("res___________", res)
        res.tempFiles.forEach((file) => {
          if (index === undefined) { //添加图片
            self.setData({
              imageList: [...self.data.imageList, {
                url: file.tempFilePath
              }]
            })
          } else { //替换当前索引下的图片
            self.data.imageList[index].url = file.tempFilePath
            self.setData({
              imageList: self.data.imageList
            })
          }
        })
      }
    })
  },

  //删除图片
  delImage(e) {
    let {
      imageList
    } = this.data
    let index = e.currentTarget.dataset.index
    imageList.splice(index, 1)
    this.setData({
      imageList
    })
  },

  ChangeTag(e) {
    this.setData({
      tags: e.detail
    })
  },

  inputTitle(e) {
    // console.log(e)
    this.setData({
      title: e.detail.value
    })
  },

  inputContent(e) {
    this.setData({
      content: e.detail.value
    })
  },

  finish() {
    console.log(this.data.imageList)
    wx.showModal({
      title: '提示',
      content: '确定发布问题吗？',
      complete: (res) => {
        if (res.cancel) {
          return
        }

        if (res.confirm) {
          if (this.data.title.length == 0) {
            wx.showToast({
              title: '标题不能为空！',
              icon: 'error',
              duration: 1000
            })
            return
          }
            if (this.data.content.length == 0) {
              wx.showToast({
                title: '内容不能为空！',
                icon: 'error',
                duration: 1000
              })
              return
            }
          if (this.data.tags.length == 0) {
            wx.showToast({
              title: '标签不能为空！',
              icon: 'error',
              duration: 1000
            })
            return
          }
          if (this.data.imageList.length > 1) {
            wx.showToast({
              title: '最多有一张图片',
              icon: 'error',
              duration: 1000
            })
            return
          }
          // 提交
          wx.request({
            url: App.globalData.server + "/question/release/",
            method: "GET",
            data: {
              uid: App.globalData.userInfo.UID,
              quetime: util.formatTime(new Date()),
              title: this.data.title,
              quecontent: this.data.content,
              tag: this.data.tags,
              picture: this.data.imageList.length == 0 ? "" : this.data.imageList[0]
            },

            success: res => {
              wx.showToast({
                title: '发布成功',
                icon: "success"
              })
              this.clear()
              wx.switchTab({
                url: '/pages/SearchAndBrowse/home/home',
              })
            },

            fail(res) {
              console.log(res.errMsg)
              wx.showToast({
                title: '发布失败',
                icon: "error"
              })
            }
          })
        }
      }
    })
  }
});