// pages/mine/mine.js
let xh = '';
var app = getApp();
Page({
  data: {
    orderlist: [],
    hasAddress: false,
    activeNum: 4,
    loginStatus: '登陆/注销',
    islogin: false,
    phone:'',

  },
  //前往地址管理
  goToAddress() {
    wx.navigateTo({
      url: "/pages/component/address/address"
    })
  },
  //前往订单管理
  goToOrderList() {
    wx.navigateTo({
      url: "/pages/orderlist/orderlist"
    })
  },
  //前往开票信息
  goToInvoice() {
    wx.navigateTo({
      url: "/pages/component/bill/bill"
    })
  },
  //注销或者登陆
  goToLoginStatus() {
    let that = this
    let token = that.data.token
    console.log(token)
    wx.showModal({
      title: '提示',
      content: '是否注销账号',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'http://192.168.76.32:8088/app/wx_loginout.do',
            data: {
              "phone": token.phone
            },
            header: {
              'content-type': 'application/json'
            },
            method: 'GET',
            success(res) {
              console.log('注销success', res)
              if (res.data.code == 0) {
                wx.setStorageSync('token', '')
                wx.showToast({
                  title: '已注销',
                  icon: 'faill',
                  duration: 2000
                })
                that.setData({
                  islogin: false
                })
              }
            },
            fail: function(res) {
              console.log('fail', res);
            },
            //   // complete: function(res) {},
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  onLoad() {
    var that = this;
    var token = wx.getStorageSync('token')
    if (token) {
      that.setData({
        islogin: true,
        token: token,
        phone:token.phone
      })
    }
  },

  onShow() {
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