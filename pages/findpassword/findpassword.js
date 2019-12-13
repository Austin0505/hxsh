var util = require("../../utils/util.js");
var request = require("../../utils/request.js");
var md5 = require('../../utils/md5')
var url = 'http://192.168.76.32:8088/app/wx_forgetpd.do'
var app = getApp();
Page({
  data: {
    registBtnTxt: "提交",
    registBtnBgBgColor: "#5C8DDA",
    getSmsCodeBtnTxt: "获取验证码",
    getSmsCodeBtnColor: "#5C8DDA",
    // getSmsCodeBtnTime:60,
    btnLoading: false,
    registDisabled: false,
    smsCodeDisabled: false,
    phoneNum: '',
    yzm: '',
    openid: '',

  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    let that = this

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
  //获取手机号
  getPhoneNum: function(e) {
    var value = e.detail.value;
    this.setData({
      phoneNum: value
    });
  },
  formSubmit: function(e) {
    var param = e.detail.value;
    this.mysubmit(param);
  },
  mysubmit: function(param) {
    var num = param.username.trim();
    var flag = this.checkUserName(num) && this.checkPhoneIsRegist(param.username) && this.checkPassword(param) && this.checkSmsCode(param)
    var that = this;
    if (flag) {
      this.setregistData1();
      that.submitForgetpd(param)
      setTimeout(function() {
        that.setregistData2();
        // that.redirectTo(param);
      }, 2000);
    }
  },
  setregistData1: function() {
    this.setData({
      registBtnTxt: "提交中",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  setregistData2: function() {
    this.setData({
      registBtnTxt: "提交",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#ff9900",
      btnLoading: !this.data.btnLoading
    });
  },

  // 提交ajax
  submitForgetpd: function(param) {
    app.login().then(res => {
      let that = this
      let password = md5.md5(param.password) //新密码加密
      let openid = res.openid
      let token = {
        openid: openid,
        phone: param.username
      }
      wx.request({
        url: url,
        data: {
          "new_md5_password": password,
          "phone": param.username
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success(res) {
          console.log('success', res)
          if (res.data.code == 0) {
            //将注册用户的信息存入缓存
            wx.setStorageSync('token', token)
            let msg=res.data.msg
              wx.showToast({
                title: msg,
                icon: 'success',
                duration: 1500
              })
            setTimeout(function() {
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }, 2000);
          } else {
            // wx.showToast({
            //   title: '修改失败',
            //   icon: 'faill',
            //   duration: 20000
            // })
          }
        },
        fail: function(res) {
          console.log('fail', res);
        },
        //   // complete: function(res) {},
      })
      //
    })
  },
  checkUserName: function(num) {
    var phone = util.regexConfig().phone;
    // var inputUserName = param.username.trim();
    if (phone.test(num)) {
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
  checkPhoneIsRegist: function(phoneNum) {
    var tempPhoneNum = "13211112222"; //测试未注册手机号码
    if (phoneNum == tempPhoneNum) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '该手机尚未注册！'
      });
      return false;
    } else {
      return true;
    }
  },
  checkPassword: function(param) {
    var userName = param.username.trim(); //账号
    var checkepassword = param.checkepassword.trim(); //确认密码
    // var oldpassword = param.oldpassword.trim(); //旧密码
    var password = param.password.trim(); //新密码
    if (password.length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请设置新密码'
      });
      return false;
    } else if (password.length < 6 || password.length > 20) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '密码长度为6-20位字符'
      });
      return false;
    } else if (password != checkepassword) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '新密码两次输入不一致  '
      });
      return false;
    }  else {
      return true;
    }
  },
  getSmsCode: function() {
    var phoneNum = this.data.phoneNum;
    var that = this;
    var count = 60;
    // if (this.checkUserName(phoneNum) && this.checkPhoneIsRegist(phoneNum)) {
    if (this.checkUserName(phoneNum)) {
      let data = {
        "phone": phoneNum,
        "ip": "0.0.0.0",
      }
      // wx.request({
      //   url: 'http://192.168.76.32:8081/app/getcode.do',
      //   data: data,
      //   header: {
      //     'content-type': 'application/json'
      //   },
      //   method: 'GET',
      //   success(res) {
      //     console.log(res);
      //     that.setData({
      //       yzm: res.data.yzm
      //     })
      //   },
      //   fail: function(res) {
      //     console.log(res);
      //   },
      //   // complete: function(res) {},
      // })
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
  checkSmsCode: function(param) {
    var that = this
    var smsCode = param.smsCode.trim();
    var yzm = that.data.yzm
    var tempSmsCode = '000000'; //演示效果临时变量，正式开发需要通过wx.request获取
    // var tempSmsCode = yzm;
    if (smsCode != tempSmsCode) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的短信验证码'
      });
      return false;
    } else {
      return true;
    }
  },
  redirectTo: function(param) {
    //需要将param转换为字符串
    param = JSON.stringify(param);
    wx.redirectTo({
      url: '../main/index?param=' + param //参数只能是字符串形式，不能为json对象
    })
  }

})