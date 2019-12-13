
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  //提交
  formSubmit: function (e) {
    var warn = "";
    var that = this;
    var flag = false;
    if (e.detail.value.name == "") {
      warn = "请填写您的发票抬头！";
    } else {
      flag = true;
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      // wx.redirectTo({
      //   url: '../chooseAddre/chooseAddre?tel=' + e.detail.value.tel + "&addre=" + that.data.addreRange[e.detail.value.addre] + "&door=" + e.detail.value.door + "&name=" + e.detail.value.name + "&area=" + that.data.areaRange[e.detail.value.area] + "&flag=" + flag + "&areavalue=" + e.detail.value.area + "&addrevalue=" + e.detail.value.addre + "&door=" + e.detail.value.door
      //   //？后面跟的是需要传递到下一个页面的参数

      // });
    }
    if (flag == false) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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