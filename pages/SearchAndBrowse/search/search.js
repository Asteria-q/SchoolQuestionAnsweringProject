const App = getApp();
const QueTemplate = {
    QID: 1551,
    QueTime: "2023/04/25 17:55:17",
    Title: "你如何评价这个问题,啊啊啊啊啊",
    QueContent: "某航软件工程课每周都要写周报，巨烦，\
                某航软件工程课每周都要写周报，巨烦，\
                某航软件工程课每周都要写周报，巨烦，\
                某航软件工程课每周都要写周报，巨烦，\
                某航软件工程课每周都要写周报，巨烦，\
                某航软件工程课每周都要写周报，巨烦",
    // QueContent: "如题",
    AnswersNum: 19,
    ClickNum: 2312,
    LikeNum: 2313,
    Picture: "",
    Tags: ["计算机", "情感", "摄影"],
    UID: 152,
    UserName: "匿名用户匿名用户匿名",
    Image: "http://tmp/fVtepW7OAlKtca2bee893ee81481a4d0fb72b99d99b2.jpg",
};
Page({
    /**
     * 页面的初始数据
     */
    data: {
        keyWord: "",
        showTabs: [
            '默认排序',
            '点击量',
            '回答量'
        ],
        active: 0,
        tabsTime: Array(3).fill(0),
        // questionList: Array(10).fill(QueTemplate)
        questionList: [],
        liked: []
    },


    // for search
    /*
     * 更新关键词
     */
    onChange(event) {
        this.setData({
            keyWord: event.detail
        })
    },

    // 输入完成，进行搜索
    onClickSearch() {
        if (this.data.keyWord == "") return
        // console.log(event);
        this.getQues();

    },

    clickAvatar(event) {
        // console.log(event)
        var uid = event.target.dataset.uid
        wx.navigateTo({
            url: '/pages/Person/profile/profile?uid=' + uid,
        })
    },

    // 标签栏和筛选
    onChangeTab(event) {
        // 根据active，更新问题表
        // console.log(event)
        this.setData({
            active: event.index
        })
        this.getQues()
    },

    // 初次加载界面初始化问题列表
    getQues() {
        var active = this.data.active
        var tabsTime = this.data.tabsTime
        var getUrl = App.globalData.server + "/question/search/"

        var data = {
            searchword: this.data.keyWord,
            sortBy: (active == 0 ? 'LikeNum' :
                active == 1 ? 'ClickNum' : 'AnswersNum'),
            // i: tabsTime[active]
        }
        wx.request({
            url: getUrl,
            method: "GET",
            data: data,
            success: res => {
                var newData = res.data.data
                this.setData({
                    questionList: newData
                })
                this.judgeLike()
            },
            fail: res => {
                console.log(res.errMsg)
            }
        })
    },

    judgeLike() {
        var likedQuestion = App.globalData.userInfo.likedQuestion
        var liked = []
        var questionList = this.data.questionList
        for (var i = 0; i < questionList.length; i++) {
            liked[i] = likedQuestion.indexOf(questionList[i].QID) !== -1
        }
        this.setData({
            liked: liked
        })
    },

    //点击问题，切换到问题展示界面
    clickQue(event) {
        // console.log(event)
        var json = this.data.questionList[event.target.dataset.index]
        wx.navigateTo({
            url: '/pages/question/show/show?question=' + encodeURIComponent(JSON.stringify(json)),
        })
        // console.log(event)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log(options)
        this.setData({
            keyWord: options.keyWord
        })
        this.getQues();
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