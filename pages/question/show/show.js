// pages/question/show/show.js
const App = getApp();
const AnsTemplate = {
    AID: 1321,
    AnsContent: "其实还好吧，真正的男人无所畏惧",
    AnsTime: "2023/04/26 17:55:17",
    LikeNum: 0,
    OpenID: "",
    Image: "http://tmp/fVtepW7OAlKtca2bee893ee81481a4d0fb72b99d99b2.jpg",
    UserName: "打工人",
    UID: 12131
};
Page({
    /**
     * 页面的初始数据
     */
    data: {
        question: {
            QID: 1551,
            QueTime: "2023/04/25 17:55:17",
            Title: "你如何评价这个问题",
            QueContent: "某航软件工程课每周都要写周报，巨烦，\
                        某航软件工程课每周都要写周报，巨烦，\
                        某航软件工程课每周都要写周报，巨烦，\
                        某航软件工程课每周都要写周报，巨烦，\
                        某航软件工程课每周都要写周报，巨烦，\
                        某航软件工程课每周都要写周报，巨烦",
            AnswersNum: 19,
            ClickNum: 2312,
            LikeNum: 2313,
            Picture: "",
            Tags: ["计算机", "情感", "摄影"],
            UID: 152,
            UserName: "匿名用户",
            Image: "http://tmp/fVtepW7OAlKtca2bee893ee81481a4d0fb72b99d99b2.jpg",
        },
        answers: Array(10).fill(AnsTemplate),
        qlike: false,
        likedAns: [],
        showScrollTop: false,
        scrollTop: 0,
        userInfo: App.userInfo
    },

    clickAvatar(event) {
        var uid = event.target.dataset.uid
        wx.navigateTo({
            url: '/pages/Person/profile/profile?uid=' + uid,
        })
    },

    onPageScroll: function (e) {
        // 滚动超过1000px时显示回到顶部按钮
        if (e.scrollTop > 100) {
            this.setData({
                showScrollTop: true
            })
        } else {
            this.setData({
                showScrollTop: false
            })
        }
    },

    up(e) {
        this.setData({
            scrollTop: 0,
            duration: 300
        })
    },

    like(e) {
        // console.log(e)
        var type = e.target.dataset.type
        var action = e.target.dataset.action
        var id = e.target.dataset.id
        var uid = App.globalData.userInfo.UID
        wx.request({
            url: App.globalData.server + "/answer/like/",
            method: "GET",
            data: {
                type: type,
                action: action,
                id: id,
                uid: uid
            },
            success: res => {
                App.globalData.userInfo = res.data.data[0]
                // console.log(res)
                if (type == 0) {
                    var question = this.data.question
                    question.LikeNum += action == 0 ? -1 : 1
                    this.setData({
                        question: question
                    })
                    this.judgeLike()
                } else {
                    this.req()
                }

            },
            fail: res => {
                console.log(res)
            }
        })
    },

    report(e) {
        var dataset = e.currentTarget.dataset
        wx.navigateTo({
            url: '/pages/report/report?id=' + dataset.id + "&type=" + dataset.type,
        })
    },

    add(e) {
        wx.navigateTo({
            url: '/pages/answer/release/release?question=' +
                encodeURIComponent(JSON.stringify(this.data.question)),
        })
    },

    up(e) {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        })
        this.setData({
            showUp: false
        })
    },

    req() {
        wx.request({
            url: App.globalData.server + "/question/show/",
            method: "GET",
            data: {
                qid: this.data.question.QID
            },
            success: res => {
                // console.log(res)
                if (res.data.status == "success") {
                    this.setData({
                        answers: res.data.answers
                    })
                    this.judgeLike()
                }
            },
            fail: res => {
                console.log(res.errMsg)
            }
        })
    },

    judgeLike() {
        var qlike = App.globalData.userInfo.likedQuestion.indexOf(this.data.question.QID) != -1;
        var likedAnswers = App.globalData.userInfo.likedAnswer
        var liked = []
        var answers = this.data.answers
        for (var i = 0; i < answers.length; i++) {
            liked[i] = likedAnswers.indexOf(answers[i].AID) !== -1
        }
        this.setData({
            likedAns: liked,
            qlike: qlike
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        App.watch("userInfo", (newValue) => {
            // console.log('Global variable "userInfo" changed\n');
            this.setData({
                userInfo: newValue
            })
        })
        // console.log(options)
        var json = JSON.parse(decodeURIComponent(options.question))
        // console.log(json)
        this.setData({
            question: json
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