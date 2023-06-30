import {
    storeBindingsBehavior
} from 'mobx-miniprogram-bindings';
import {
    store
} from '../store/store';

Component({
    options: {
        styleIsolation: "shared"
    },
    behaviors: [storeBindingsBehavior],
    storeBindings: {
        store,
        fields: {
            active: "activeTabBarIndex"
        },
        actions: {
            updateActive: 'updateActiveTabBarIndex'
        },
    },
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        active: 0,
        someData: "...",
        list: [{
                icon: "home-o",
                url: "/pages/SearchAndBrowse/home/home",
                text: "首页",
            },
            {
                icon: "add-o",
                url: "/pages/question/release/release",
                text: "发布"
            },
            {
                icon: "user-circle-o",
                url: "/pages/Person/home/home",
                text: "我的"
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onChange(event) {
            this.updateActive(event.detail)
            wx.switchTab({
                url: this.data.list[event.detail].url,
                success: function (e) {
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.onLoad();
                }
            })
        },
    }
})