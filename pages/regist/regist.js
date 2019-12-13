var util = require("../../utils/util.js");
var md5 = require('../../utils/md5')
var app = getApp();
Page({
  data: {
    registBtnTxt: "注册",
    registBtnBgBgColor: "#5C8DDA",
    getSmsCodeBtnTxt: "获取验证码",
    getSmsCodeBtnColor: "#5C8DDA",
    // getSmsCodeBtnTime:60,
    btnLoading: false,
    registDisabled: false,
    smsCodeDisabled: false,
    inputUserName: '',
    inputPassword: '',
    phoneNum: '',
    yzm: '',
    openid: '',
    carts: []
  },
  onLoad: function(options) {
    let that = this
    let carts = wx.getStorageSync('carts')
    app.login().then(res => {
      // that.setData({
      //   openid: app.globalData.openid
      // })
    })
    that.setData({
      carts
    })
  },
  onReady: function() {
    // 页面渲染完成

  },
  onShow: function() {
    // 页面显示

  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭

  },
  formSubmit: function(e) {
    var param = e.detail.value;
    this.mysubmit(param);
  },
  mysubmit: function(param) {
    var flag = this.checkUserName(param.username) && this.checkPassword(param) && this.checkSmsCode(param)
    var that = this;
    if (flag) {
      // this.setregistData1();
      that.submitRegist(param)
      setTimeout(function() {
        // that.setregistData2();
      }, 2000);
    }
  },
  getPhoneNum: function(e) {
    var value = e.detail.value;
    this.setData({
      phoneNum: value
    });
  },
  // 提交ajax
  submitRegist: function(param) {
    let that = this
    let phoneNum = that.data.phoneNum
    let openid = app.globalData.openid
    let password = md5.md5(param.password)
    let token = {
      openid: openid,
      phone: param.username
    }
    wx.request({
      url: 'http://192.168.76.32:8088/app/zc.do',
      data: {
        "phone": param.username,
        "openid": param.username,
        "md5_passwd": password,
        "sm": "暂无",
        "type": 1,
        "deviceName": "微信小程序",
        "yzm": that.data.yzm
      },
      header: {
        // 'content-type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded' //因为是post与云平台后台关系,请求头做此修改
      },
      method: 'POST',
      success(res) {
        console.log('success', res)
        if (res.data.code == "y") {
          that.setregistData2();
          //将注册用户的信息存入缓存
          wx.setStorageSync('token', token)
          if (that.data.carts.length > 0) {
            wx.redirectTo({
              url: '/pages/component/cart/cart',
            })
          } else {
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
        } else if (res.data.code == "N") {
          wx.showToast({
            title: '失败',
            icon: 'faill',
            duration: 2000
          })
        }
      },
      fail: function(res) {
        console.log('fail', res);
      },
    })
    
  },

  // 按钮样式改变
  setregistData1: function() {
    this.setData({
      registBtnTxt: "注册中",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  setregistData2: function() {
    this.setData({
      registBtnTxt: "注册",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#ff9900",
      btnLoading: !this.data.btnLoading
    });
  },
  // 用户名正则
  checkUserName: function(param) {
    var phone = util.regexConfig().phone;
    var inputUserName = param.trim();
    if (phone.test(inputUserName)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的手机号码'
      });
      return false;
    }
  },
  // 密码正则
  checkPassword: function(param) {
    var checkpassword = param.checkpassword.trim();
    var userName = param.username.trim();
    var password = param.password.trim();
    if (password.length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请设置密码'
      });
      return false;
    } else if (password.length < 6 || password.length > 20) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '密码长度为6-20位字符'
      });
      return false;
    } else if (checkpassword != password) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '两次输入的密码不一致'
      });
      return false;
    } else {
      return true;
    }
  },
  // 获取验证码与验证码计时器
  getSmsCode: function() {
    var phoneNum = this.data.phoneNum;
    var that = this;
    var count = 60;
    if (this.checkUserName(phoneNum)) {
      let data = {
        "phone": phoneNum,
        "ip": "0.0.0.0",
      }
      wx.request({
        url: 'http://192.168.76.32:8088/app/getcode.do',
        data: data,
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success(res) {
          console.log(res);
          that.setData({
            yzm: res.data.yzm
          })
        },
        fail: function(res) {
          console.log(res);
        },
        // complete: function(res) {},
      })
      var si = setInterval(function() {
        if (count > 0) {
          count--;
          that.setData({
            getSmsCodeBtnTxt: count + ' s',
            getSmsCodeBtnColor: "#999",
            smsCodeDisabled: true
          });
        } else {
          that.setData({
            getSmsCodeBtnTxt: "获取验证码",
            getSmsCodeBtnColor: "#ff9900",
            smsCodeDisabled: false
          });
          count = 60;
          clearInterval(si);
        }
      }, 1000);
    }
  },
  // 检测验证码是否正确
  checkSmsCode: function(param) {
    //后台验证验证码,前台暂定不管验证
    return true
    // var smsCode = param.smsCode.trim(); //用户输入的验证码
    // // var tempSmsCode = this.data.yzm; //正式开发需要通过wx.request获取的验证码
    // var tempSmsCode = '000000'
    // if (smsCode != tempSmsCode) {
    //   wx.showModal({
    //     title: '提示',
    //     showCancel: false,
    //     content: '请输入正确的短信验证码'
    //   });
    //   return false;
    // } else {
    //   return true;
    // }
  },
  redirectTo: function(param) {
    //需要将param转换为字符串
    param = JSON.stringify(param);
    // wx.redirectTo({
    //   url: '../main/index?param='+ param//参数只能是字符串形式，不能为json对象
    // })
  }

})