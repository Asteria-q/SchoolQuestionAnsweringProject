const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        TAGS: App.globalData.TAGS,
        info: getApp().globalData.userInfo,
        head: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
        nikeName: '蓝天的梦',
        introduction: '',
        major: '',
        grade: '',
        tags: [],
        gender: 1,
        grade_list: ['本科生', '硕士生', '博士生'],
        show: false,
        cur_word_num: 0,
    },
    change_intro(e) {
        // console.log(e)
        var len = e.detail.value.length
        this.setData({
            cur_word_num: len > 40 ? 40 : len
        })
        if (len == 40) {
            wx.showToast({
                title: '字数已达到上限',
                icon: "error"
            })
        }
    },
    Change_major(event) {
        this.setData({
            major: event.detail
        })
    },
    Change_gender(e) {
        this.setData({
            gender: e.detail
        })
    },
    change_name(e) {
        this.setData({
            nickName: e.detail
        })
    },
    headimage(e) {
        wx.chooseMedia({
            count: 1,
            success: res => {
                // console.log(res),
                this.setData({
                    head: res.tempFiles[0].tempFilePath
                })
                // const tempFilePaths = res.tempFilePaths
                // wx.uploadFile({
                //     url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
                //     filePath: tempFilePaths[0],
                //     name: 'file',
                //     formData: {
                //         'user': 'test'
                //     },
                //     success(res) {
                //         const data = res.data
                //         //do something
                //     }
                // })
            }
        })
        // console.log(this.data.head)
    },

    Change_Tag(e) {
        this.setData({
            tags: e.detail
        })
    },

    //pop
    showPopup() {
        this.setData({
            show: true
        });
    },

    onClose() {
        this.setData({
            show: false
        });
    },

    //picker
    onConfirm(event) {
        const {
            picker,
            value,
            index
        } = event.detail;
        this.setData({
            grade: value
        })
        this.onClose()
    },
    onCancel() {
        this.setData({
            show: false
        })
    },

    //修改完成
    finish(e) {
        console.log(this.data.tags)
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
                        url: App.globalData.server + "/user/changeInfo/",
                        method: "GET",
                        // header: {
                        //     'content-type':  'application/json',
                        // },
                        data: {
                            "uid": this.data.info.UID,
                            "image": this.data.head,
                            "username": this.data.nikeName,
                            "sex": this.data.gender,
                            "tag": this.data.tags,
                            "selfintro": this.data.introduction,
                            "grade": this.data.grade,
                            "profession": this.data.major,
                            "displayinfo": this.data.info.DisplayInfo,
                        },

                        success: res => {
                            var info = this.data.info
                            info.Image = this.data.head
                            info.UserName = this.data.nikeName
                            info.Sex = this.data.gender
                            info.Tags = this.data.tags
                            info.SelfIntro = this.data.introduction
                            info.grade = this.data.grade
                            info.Profession = this.data.major
                            App.globalData.userInfo = info
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
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        App.watch("userInfo", (newValue) => {
            // console.log('Global variable "userInfo" changed\n');
            this.setData({
                info: newValue,
                head: newValue.Image,
                nikeName: newValue.UserName,
                introduction: newValue.SelfIntro,
                grade: newValue.Grade,
                major: newValue.Profession,
                tags: newValue.Tags,
                gender: newValue.Sex,
                cur_word_num: newValue.SelfIntro.length > 40 ? 40 : newValue.SelfIntro.length,
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