// pages/mine/mine.js
let xh = '';
Page({
  data: {
    orderlist: [],
    hasAddress: false,
    address: {},
  },
  onLoad() {
    var self = this;
    wx.request({
        url: 'http://wechat.scjinsui.com:8080/weixin/zcsh/history.do',
        // url: 'http://www.phonegap100.com/appapi.php?a=getPortalCate',
        data: {
          openid: 'A000004872BBBF'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log("订单信息：" + JSON.stringify(res.data.json))
          var str = res.data.json;
          var jsonStr = str.replace(" ", "");
          if (typeof jsonStr != 'object') {
            jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
            var jj = JSON.parse(jsonStr);
            res.data = jj;
          }
          //console.log(res.data)
          self.setData({
            orderlist: res.data,
          })
          console.log(self.data.orderlist);
          xh = self.data.orderlist;
        }
      }),
      //获取地址
      wx.request({
        url: 'http://wechat.scjinsui.com:8080/weixin/zcsh/addr.do',
        // url: 'http://www.phonegap100.com/appapi.php?a=getPortalCate',
        data: {
          openid: 'A000004872BBBF',
          orderid: "DD2016070422545048"
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(JSON.stringify(res.data.addrs));
          self.setData({
            addresslist: res.data.addrs
          })
        }
      })



  },

  onShow() {
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function(res) {
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
  },
  /**
   * 发起支付请求
   */
  payOrders() {
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        wx.showModal({
          title: '支付提示',
          content: '<text>',
          showCancel: false
        })
      }
    })
  },
  //查看物流
  wlxx() {
    wx.reLaunch({
      url: '/pages/component/logistics/logistics?xh=' + xh
    })
  }
})