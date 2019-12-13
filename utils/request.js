//后台地址路径
const host = 'http://wechat.scjinsui.com:8080/weixin/zcsh/';
// const host1 ='http://192.168.76.32:8081/weixin/zcsh/';//郑淦的后台
// const hostrxsp ='http://192.168.76.32:8080/zcsh/oneTest/'
const hostwe ='http://192.168.76.32:8081/app/'
function SEND(url, data, method, success, fail) {
  // return new Promise(function (resolve, reject) {
  wx.request({
    url: host + url,
    header: {
      'content-type': 'application/json',
    },
    method: method ? method:'get',
    data: data,
    success(res) {
      // let result = res.data.json;
      // resolve(result);
      success(res)
    },
    fail(res) {
      fail(res);
    }
  });
// })
}

module.exports = {
  SEND: SEND,
}

//wang