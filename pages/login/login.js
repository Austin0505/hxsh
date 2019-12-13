//登录的访问地址：https://wechat.scjinsui.com/weixin/app/yhdl.do
var util = require("../../utils/util.js");
var request = require('../../utils/request.js')
// var request = require('../../utils/request.js');
var md5 = require('../../utils/md5')
var app = getApp();
var url = {
  getCode_url: 'getccode.do'
}
Page({
  data: {
    getuserphone: 0, //获取手机号
    yzmBtnText: '获取验证码',
    yzmCode: '',
    loginBtnTxt: "登录",
    loginBtnBgBgColor: "#5C8DDA",
    btnLoading: false,
    disabled: false,
    inputUserName: '',
    inputPassword: '',
    openid: '',
    carts:[],
    // openid: '',//A000004872BBBF
    // phone: username,
    // md5_passwd: password,
    ip: '', //手机登陆的ip
    deviceModel: '', //手机型号
    // diviceId: '865923029591796',
    deviceName: '', //手机品牌
    // status: '0',
    // yzm: '5719',
    // para: ''
  },
  onLoad: function(options) {
    let that = this
    // 页面初始化 options为页面跳转所带来的参数
    // app.login().then(res=>{
 
    // })
  },
  onReady: function() {
    // 页面渲染完成

  },
  onShow: function() {
    // 页面显示
    var carts = wx.getStorageSync('carts')
    this.setData({
      carts: carts
    });

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
    var flag = this.checkUserName(param) && this.checkPassword(param)
    if (flag) {
      this.checkUserInfo(param);
    }
  },
  // 按钮样式改变1
  setLoginData1: function() {
    this.setData({
      loginBtnTxt: "登录中",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#5C8DDA",
      btnLoading: !this.data.btnLoading
    });
  },
  // 样式改变2
  setLoginData2: function() {
    this.setData({
      loginBtnTxt: "登录",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#5C8DDA",
      btnLoading: !this.data.btnLoading
    });
  },

  getuserphone(e) {
    this.setData({
      getuserphone: e.detail.value
    })
  },
  //点击获取验证码
  getyzmCode() {
    console.log(this.data.getuserphone)
    let data = {
      type: 0,
      ip: this.data.ip,
      phone: this.data.getuserphone
    }
    request.SEND(url.getCode_url, data, 'GET', res => {
      console.log(res)
    })
  },
// 验证手机号
  checkUserName: function(param) {
    var phone = util.regexConfig().phone;
    var inputUserName = param.username.trim();
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
  checkPassword: function(param) {
    var userName = param.username.trim();
    var password = param.password.trim();
    if (password.length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入密码'
      });
      return false;
    } else {
      return true;
    }
  },
  checkUserInfo: function(param) {
    console.log('测试登陆按钮',1111)
    app.login(param).then(res => {
      console.log(res)
      let that = this
      var openid = res.openid
      var username = param.username.trim();
      var password = param.password.trim();
      password = md5.md5(password); //md5加密
      let salt = 'abc123'
      password = password + salt
      password = md5.md5(password)
      let data = {
        'phone': username,
        'md5_password': password,
        'openid': openid
      }
      //调用后台
      wx.request({
        url: 'http://192.168.76.32:8088/app/wx_login.do',
        data: {
          'phone': username,
          'md5_password': password,
          'openid': openid
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success(res) {
          console.log(res)
          if (res.data.code == 0) {
            console.log('登陆成功后,需要保存在storge的数据',data)
            that.setLoginData1(); //改变登陆按钮的css状态
            //登陆成功后,将用户的手机号和openid存入缓存
            let token={
              phone: data.phone,
              openid:data.openid
            }
            wx.setStorageSync('token', token)
            console.log('登陆的购物车',that.data.carts)
            if (that.data.carts.length > 0) {
              wx.redirectTo({
                url: '/pages/component/cart/cart',
              })
            }
            else {
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }
          } else if (res.data.code == 1) {
            console.log('success', 1111)
            let msg = res.data.msg
            wx.showToast({
              title: msg,
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: function(res) {
          // console.log(res);
          //     wx.showToast({
          //   title: '核对用户名和密码',
          //   icon: 'none',
          //   duration: 20000
          // })
        },
        // complete: function(res) {},
      })
    })
  },
  // redirectTo: function(param) {
  //   //需要将param转换为字符串
  //   param = JSON.stringify(param);
  //   wx.redirectTo({
  //     url: '/pages/main/index?param=' + param //参数只能是字符串形式，不能为json对象
  //   })
  // },

})