//app.js
// url: 'http://192.168.76.32:8081/app/wx_login.do',
App({
  onLaunch: function() {

  },
  //因为wx.login是一个异步请求,封装promis,在需要使用的页面的onload引入,app.login().then(res=>{res代表resolve、reject回调})
  login: function() {
    var that = this;
    return new Promise(function(resolve, reject) {
      if (wx.getStorageSync('token')) {
        //如果有缓存,说明用户登陆过,直接拿取缓存的用户数据
        resolve(wx.getStorageSync('token'))
      } else {
        //没有缓存,说明用户注销或者第一次登陆,获取用户的openid,通过openid判断用户是否有注册信息,后台返回有用户信息直接登陆
        wx.login({
          success: function(res) {
            // console.log(res)
            if (res.code) {
              wx.request({
                url: 'http://192.168.76.32:8088/app/wx_related.do',
                data: {
                  'code': res.code
                },
                header: {
                  'content-type': 'application/json',
                },
                method: 'GET',
                success: function(e) {
                  console.log(e)
                  that.globalData.openid = e.data.openid
                  if (e.data.msg != null) {
                    let token = {
                      openid: e.data.openid,
                      phone: e.data.msg.PHONE
                    }
                    wx.setStorageSync('token', token); //存储openid
                  }
                  resolve(e.data)
                },
                fail: () => {}
              })
            } else {
              console.log('登录失败！' + res.errMsg)
              reject('error');
            }
          }
        });
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: null,
    usermsg: null,
    token: '',
    userId: '', //用户编号
    session_key: ''
  }
})