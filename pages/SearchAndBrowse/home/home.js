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
        active: 1,
        keyWord: "",
        show: false,
        search_: false,
        showTabs: ['热榜', '推荐', ...App.globalData.TAGS],
        // showTabs: ['热点', ...App.globalData.TAGS],
        questionList: Array(10).fill(QueTemplate),
        userInfo: App.globalData.userInfo,
        liked: []
        // questionList: []
    },

    // for search
    /*
     * 更新关键词
     */
    onChange(event) {
        // console.log(event)
        this.setData({
            keyWord: event.detail
        })
    },

    // 隐藏遮罩层
    onClickHide() {
        this.setData({
            show: false,
        });
    },

    // 显示遮罩层
    onClickShow() {
        this.setData({
            show: true
        });
    },

    // 输入完成，进行搜索
    onClickSearch() {
        if (this.data.keyWord == "") return
        // console.log(event);
        wx.navigateTo({
            url: '/pages/SearchAndBrowse/search/search?keyWord=' + this.data.keyWord,
            success: function () {
                // console.log("成功")
            }
        })
    },

    // 点赞
    clickLike(e) {
        // console.log(e)
        var index = e.target.dataset.index;
        var questionList = this.data.questionList;
        if (questionList[index].like) {
            questionList[index].LikeNum--;
        } else {
            questionList[index].LikeNum++;
        }
        questionList[index].like = !questionList[index].like;
        this.setData({
            questionList: questionList
        });
    },


    // 标签栏和筛选
    onChangeTab(event) {
        // 根据active值，更新问题数据表
        // console.log(event)
        this.setData({
            active: event.detail.index
        })
        this.getQues()
    },

    // 初次加载界面初始化问题列表
    getQues() {
        var active = this.data.active
        var getUrl = App.globalData.server + (
            (active == 0) ? "/question/hot/" :
            (active == 1) ? "/question/recommend/" :
            "/question/sort/")
        var data = (active == 0) ? {} :
            (active == 1) ? {
                uid:getApp().globalData.userInfo.UID
            } : {
                tag: this.data.showTabs[active],
                sortBy: "ClikeNum"
            }
        console.log(getApp().globalData.userInfo)
        console.log(data)
        // get 10 questions
        wx.request({
            url: getUrl,
            method: "GET",
            data: data,
            success: res => {
                console.log(res)
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

    //点击问题，切换到问题展示界面
    clickQue(event) {
        // console.log(event)
        var index = event.target.dataset.index
        var json = this.data.questionList[index]
        wx.navigateTo({
            url: '/pages/question/show/show?question=' + encodeURIComponent(JSON.stringify(json))
        })
        // console.log(event)
    },

    clickAvatar(event) {
        // console.log(event)
        var uid = event.target.dataset.uid
        wx.navigateTo({
            url: '/pages/Person/profile/profile?uid=' + uid,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log(App.globalData.userInfo)
        var ques = this.data.questionList
        App.watch("userInfo", (newValue) => {
            // console.log('Global variable "userInfo" changed\n');
            this.setData({
                userInfo: newValue
            })
        })
        this.setData({
            questionList: ques
        })
    },

    judgeLike() {
        var likedQuestion = App.globalData.userInfo.likedQuestion
        var liked = []
        var questionList = []
        questionList = this.data.questionList
        for (var i = 0; i < questionList.length; i++) {
            liked[i] = likedQuestion.indexOf(questionList[i].QID) !== -1
        }
        this.setData({
            liked: liked
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.setData({
            show: false,
        })
        this.getQues()
    },

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
    onReachBottom() {
        this.getQues()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})