// pages/shopList/shopList.js
var request = require('../../utils/request.js')
const url = {
  tab_url: "newCategory.do",
  goodsDetailsRequest_url: 'detail.do'
}


Page({

  data: {
    activeNum: 0,
    tabIndex: 0,
    barNum: 0, //首页6个图标,点击的dm
    currentTab: 0, //对应样式变化
    scrollTop: 0, //用作跳转后右侧视图回到顶部
    screenArray: [], //左侧导航栏内容
    screenId: "", //后台查询需要的字段
    childrenArray: [], //右侧内容
    barlist: [],
    childrenArrayid: [],
    rightTile: [], //左侧tab下拉
    isShow: true, //控制显示与隐藏下拉
    flag:0
  },
  selectFl(e){
    let that=this
    let data = { dm: e.currentTarget.dataset.selectddm};
    request.SEND(url.tab_url, data, 'GET', res => {
      console.log(JSON.stringify(res.data.json));
      var str = res.data.json;
      var jsonStr = str.replace(" ", "");
      if (typeof jsonStr != 'object') {
        jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
        var jj = JSON.parse(jsonStr);
        res.data = jj;
      }
      let splist=[];
      for(var i=0;i<res.data.length;i++){
        request.SEND(url.goodsDetailsRequest_url, {spdm:res.data[i].ddm}, 'GET', res =>{
          console.log(JSON.stringify(res.data.json));
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
            splist.push(message)
          })
          that.setData({
            childrenArray: splist
            // tabIndex: e.currentTarget.dataset.selectindex
          })
          // console.log(splist);
        })

      }



    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 页面初始化
  onLoad: function(options) {
    var that = this
    // 发送ajax请求初始化左侧bar
    // 当首页点击,list里面分类只有一个时候,需要单独判断
    var initonetab = []
    var initonetabDetail = []
    var newArry = []
    wx.request({
      url: 'http://wechat.scjinsui.com:8080/weixin/zcsh/newCategory.do',
      data: {
        dm: options.ddm
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var str = res.data.json;
        var jsonStr = str.replace(" ", "");
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
          var jj = JSON.parse(jsonStr);
          res.data = jj;
        }
        console.log(res.data[0].ddm);
        request.SEND(url.tab_url, { dm: res.data[0].ddm}, 'GET', res => {
          console.log(JSON.stringify(res.data.json));
          var str = res.data.json;
          var jsonStr = str.replace(" ", "");
          if (typeof jsonStr != 'object') {
            jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
            var jj = JSON.parse(jsonStr);
            res.data = jj;
          }
          that.setData({
            rightTile:res.data
          })
          request.SEND(url.tab_url, { dm: res.data[0].ddm }, 'GET', res =>{
            console.log(JSON.stringify(res.data.json));
            var str = res.data.json;
            var jsonStr = str.replace(" ", "");
            if (typeof jsonStr != 'object') {
              jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
              var jj = JSON.parse(jsonStr);
              res.data = jj;
            }
            let splist = [];
            for (var i = 0; i < res.data.length; i++) {
              request.SEND(url.goodsDetailsRequest_url, { spdm: res.data[i].ddm }, 'GET', res => {
                // console.log(JSON.stringify(res.data.json));
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
                  splist.push(message)
                })
                that.setData({
                  childrenArray: splist
                })
                // console.log(splist);
              })

            }
          })
        })
        
        console.log("左侧tabbar/screenArray", res.data) //拿到左侧tabbar的内容
        // that.setData({
        //   screenArray:res.data
        // })
        var barlist = res.data
        that.data.screenArray = res.data

        that.setData({
          barlist: barlist,
          screenArray: res.data
        })
      }
    });

  },
  //  点击左侧tab右侧对应显示内容
  navbarTap(e) {
    var that = this;
    let index = 0;
    let currentTab = that.data.currentTab
    var index_ = e.currentTarget.dataset.index
    var tabscreenid_ = e.currentTarget.dataset.tabscreenid
    var screenArray = that.data.screenArray
    console.log("左侧当前点击的tabbar的ddm", tabscreenid_)
    that.setData({
      flag: e.currentTarget.dataset.index
    })
    var ddmlist = []
    var ddmlistDetail = []
    var new_arr = []
    that.setData({
      currentTab: index_, //按钮CSS变化
      screenId: tabscreenid_,
      scrollTop: 0, //切换导航后，控制右侧滚动视图回到顶部
    })


    // tab_url
    wx.request({
      url: 'http://wechat.scjinsui.com:8080/weixin/zcsh/newCategory.do',
      data: {
        dm: tabscreenid_
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        //后台返回的为json字符串,需要转化成json对象,
        var str = res.data.json;
        var jsonStr = str.replace(" ", "");
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
          var jj = JSON.parse(jsonStr);
          res.data = jj;
        }
        var hasStatus = []
        res.data.forEach(item => {
          let mess = {
            isShow: false,
            ...item
          }
          hasStatus.push(mess)
        })

        that.setData({
          rightTile: hasStatus
        })
        var rightTile = that.data.rightTile
        // for (let i = 0; i < screenArray.length; i++) {
        //   if (screenArray[i].ddm == tabscreenid_) {
        //     for (let k = 0; k < rightTile.length; k++) {
        //       if (rightTile[k].isShow === 'false') {
        //         rightTile[k].isShow = 'true'
        //       } else {
        //         rightTile[k].isShow = 'true'
        //       }
        //     }
        //   } else {
        //     for (let j = 0; j < rightTile.length;j++){
        //       rightTile[j].isShow='false'
        //     }
        //   }
        //   that.setData({
        //     rightTile: rightTile
        //   })
        //   console.log( '改变状态后的下拉',that.data.rightTile)
        // }

      },

    })
  },
  //点击商品跳转详情
  goGoodsDetail(e) {
    var shopid = e.currentTarget.dataset.shopid
    console.log(e.currentTarget.dataset.shopid);
    // 传递点击的商品的参数
    wx.navigateTo({
      url: '/pages/component/details/details?shopid=' + shopid,
    })
  },

})