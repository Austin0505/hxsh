//index.js
//获取应用实例
var request = require('../../utils/request.js')
const url = {
  newGoodsUrl: "newCategory.do",
  goodsDetailUrl: "detail.do",
}

const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    activeNum: 1,
    navlist: [],
    newsList: [],
    list: [],
    hotlist:[],
    usermsg:'',
  },
  sort(e) {
    // 获取用户点击的哪一个
    var ddm = e.currentTarget.dataset.ddm
    wx.navigateTo({
      url: '/pages/shopList/shopList?ddm=' + ddm　　 // 页面 A
    })
  },
  //首页页面初始化
  init: function () {
    let that = this;
    // 发送ajax请求
    wx.request({
      url: 'http://wechat.scjinsui.com:8080/weixin/zcsh/newCategory.do',
      data: {
        dm: 5
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        //后台返回的为json字符串,需要转化成json对象,
        var str = res.data.json;
        var jsonStr = str.replace(" ", "");
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
          var jj = JSON.parse(jsonStr);
          res.data = jj.reverse();
        }
        console.log(res.data)
        that.setData({
          navlist: res.data
        })
      }
    })
  },
  // 热销商品
  goToHotGoodsDetails() {
    wx.navigateTo({
      url: '/pages/component/details/details'
    })
  },
  //热销商品点击事件
  hotListButtom(e){
    let hotgoodsid = e.currentTarget.dataset.hotgoodsid;
    wx.navigateTo({
      url: '/pages/component/details/details?shopid=' + hotgoodsid,
    })
  },
  //新品推荐点击事件
  newGoodsbuttom(e){
    let newgoodsid=e.currentTarget.dataset.newgoodsid;
    console.log(newgoodsid);
    wx.navigateTo({
      url: '/pages/component/details/details?shopid=' + newgoodsid,
    })
  },
  //热销商品加载
  hotGoods:function(){
    let that=this;
    let hotList0 = [{ spdm: "2701T999901475"}, {spdm: "2701T999901307"}, {spdm:"2701T999901095"}];
    let hotListArr=[];
    for(var i=0;i<hotList0.length;i++){
      request.SEND(url.goodsDetailUrl, hotList0[i], 'GET', res => {
        // console.log(res.data.json);
        var str = res.data.json;
        var jsonStr = str.replace(" ", "");
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
          var jj = JSON.parse(jsonStr);
          res.data = jj;
        }
        res.data.forEach(item => {
          let message = {
            ...item
          }
          hotListArr.push(message)
        })
        that.setData({
          hotList: hotListArr
        })
      })
    }

  },
  //新品推荐加载
  newGoods: function () {
    let that = this;
    // let list=[];
    let data = {
      dm: '5'
    }
    //数组获取dm和index,查询省
    request.SEND(url.newGoodsUrl, data, 'GET', res => {
      //console.log(JSON.stringify(res.data.json));
      var str = res.data.json;
      var jsonStr = str.replace(" ", "");
      if (typeof jsonStr != 'object') {
        jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
        var jj = JSON.parse(jsonStr);
        res.data = jj;
      }
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].isnew == 1) {
          //console.log(res.data[i].ddm);
          if (res.data[i].isnew == 1) {
            data = { dm: res.data[i].ddm };
            //第二次循环
            request.SEND(url.newGoodsUrl, data, 'GET', res => {
              //console.log(JSON.stringify(res.data.json));
              var str = res.data.json;
              var jsonStr = str.replace(" ", "");
              if (typeof jsonStr != 'object') {
                jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
                var jj = JSON.parse(jsonStr);
                res.data = jj;
              }
              for (var j = 0; j < res.data.length; j++) {
                if (res.data[j].isnew == 1) {
                  //console.log(res.data[j].ddm);//获取上级代码
                  data = {
                    dm: res.data[j].ddm
                  }
                  request.SEND(url.newGoodsUrl, data, 'GET', res => {
                    //console.log(JSON.stringify(res.data.json));//获取上级代码
                    var str = res.data.json;
                    var jsonStr = str.replace(" ", "");
                    if (typeof jsonStr != 'object') {
                      jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
                      var jj = JSON.parse(jsonStr);
                      res.data = jj;
                    }
                    for (var k = 0; k < res.data.length; k++) {
                      if (res.data[k].isnew == 1) {
                        //console.log(res.data[k].ddm);
                        data = { dm: res.data[k].ddm }
                        request.SEND(url.newGoodsUrl, data, 'GET', res => {
                          // console.log(JSON.stringify(res.data.json));//获取最低一级的上级代码
                          var str = res.data.json;
                          var jsonStr = str.replace(" ", "");
                          if (typeof jsonStr != 'object') {
                            jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
                            var jj = JSON.parse(jsonStr);
                            res.data = jj;
                          }
                          let list = that.data.list;
                          for (var l = 0; l < res.data.length-1; l++) {
                            //console.log(res.data[l].ddm);
                            data = { spdm: res.data[l].ddm }
                            request.SEND(url.goodsDetailUrl, data, 'GET', res => {
                              //console.log(JSON.stringify(res.data.json));
                              var str = res.data.json;
                              var jsonStr = str.replace(" ", "");
                              if (typeof jsonStr != 'object') {
                                jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
                                var jj = JSON.parse(jsonStr);
                                res.data = jj;
                              }
                              // console.log(jj);
                              // list.push(jj);
                              res.data.forEach(item => {
                                let message = {
                                  ...item
                                }
                                list.push(message)
                              })
                              that.setData({
                                list: that.data.list,
                              })
                            })
                          }
                        })
                      }
                    }

                  })
                }
              }
              // that.setData{

              // }
            }, err => {
              console.log(err)
              //请求失败操作
              wx.showToast({
                title: '请求失败',
                icon: 'none'
              })
            })
          }
        }
      }

      // self.setData({
      //   addreRange: res.data.json,
      //   addreChoose: addreChoose

      // })
      //请求成功的操作
    }, err => {
      console.log(err)
      //请求失败操作
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      })
    })
  },

  onLoad: function () {
    let that=this
    app.login().then(res=>{
      // console.log(res)
      // that.setData({
      //   openid: app.globalData.openid
      // })
    })

    that.init();
    that.newGoods();
    that.hotGoods();

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },



})