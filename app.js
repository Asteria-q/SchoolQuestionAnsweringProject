// app.js
const defaultAvatarUrl = 'https://picsum.photos/200';
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res)
        if (res.code) {
          wx.request({
            url: this.globalData.server + "/user/profile/",
            data: {
              code: res.code
            },
            method: "GET",
            success: res => {
                console.log(res)
              this.globalData.userInfo = res.data.data[0]
            },
            fail(res) {

            }
          })
        }
      }
    })

  },
  globalData: {
    userInfo: {
      "UID": 0,
      "openID": "",
      "Image": defaultAvatarUrl,
      "UserName": "匿名用户",
      "Sex": "1",
      "Tags": [],
      "SelfIntro": "我是来自北京航空航天大学的一名学生,我是来自北京航空航天大学的一名学生,我是来自北京航空航天大学的一名学生",
      "Grade": "大一",
      "Profession": "计算机科学与技术",
      "DisplayInfo": ["Tags", "Sex", "Grade", "Profession"],
      "likedQuestion": [1551],
      "likedAnswer": []
    },
    COLORS: ["blue", "#16a085", "#FF8C00", "#8B008B", "#DC143C"],
    TAGS: ["求职", "考研", "保研", "指南", "活动", "失招", "二手", "情感", "TD", "航学", "好物"],
    server: "https://bjxy.buaase.cn/myApp",
    // server: "http://114.116.219.157:8000/myApp",
  },

  watch: function (key, method) {
    var obj = this.globalData;
    //加个前缀生成隐藏变量，防止死循环发生
    let ori = obj[key]; //obj[key]这个不能放在Object.defineProperty里
    if (ori) { //处理已经声明的变量，绑定处理
      method(ori);
    }
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this['_' + key] = value;
        console.log('是否会被执行2')
        method(value);
      },
      get: function () {
        // 在其他界面调用key值的时候，这里就会执行。
        if (typeof this['_' + key] == 'undefined') {
          if (ori) {
            //这里读取数据的时候隐藏变量和 globalData设置不一样，所以要做同步处理
            this['_' + key] = ori;
            return ori;
          } else {
            return undefined;
          }
        } else {
          return this['_' + key];
        }
      }
    })
  },
})