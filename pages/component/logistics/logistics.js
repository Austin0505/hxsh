var request = require('../../../utils/request.js')
const url = {
  wlxxUrl: "wlxx.do",
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wlxx:[],
    xh:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //xh = options.xh;//获取前一个页面传来的物流序号
    let self=this;

    let data={
      orderid:'MX2017081658149250',
      openid:'A000004872BBBF'
    }

    //查询订单物流信息
    request.SEND(url.wlxxUrl, data, 'GET', res => {
      console.log(JSON.stringify(res.data.json));
      var str = res.data.json;
      var jsonStr = str.replace(" ", "");
      if (typeof jsonStr != 'object') {
        jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
        var jj = JSON.parse(jsonStr);
        res.data = jj;
        console.log(res.data);
      }    
      self.setData({
        wlxx: res.data

      })
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})