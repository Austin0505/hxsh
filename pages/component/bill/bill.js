Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  //新增开票信息
  addBill: function (e) {
    wx.navigateTo({
      url: '../newBill/newBill'
    })
  },
  //修改开票信息
  toModifyBill: function (e) {
    let self = this;
    var idx = e.currentTarget.dataset.index;
    console.log(idx);
    // console.log("选中的电话" + e.currentTarget.dataset.addrevalue);
    // console.log("选中的index" + e.currentTarget.dataset.index);
    //console.log("选中的index" + e.currentTarget.dataset.index);
    // console.log("选中的发票抬头" + JSON.stringify(self.data.billlist[idx].mc));
    // console.log("选中的税号" + JSON.stringify(self.data.billlist[idx].dz));
    // console.log("选中的地址电话" + JSON.stringify(self.data.billlist[idx].dh));
    // console.log("选中的银行账号" + JSON.stringify(self.data.billlist[idx].dh));
    // let mc = JSON.stringify(self.data.billlist[idx].mc);
    // let tax = JSON.stringify(self.data.billlist[idx].tax);
    // let addr = JSON.stringify(self.data.billlist[idx].addr);
    // let bank = JSON.stringify(self.data.billlist[idx].bank);
    wx.navigateTo({
      url: '../modifyBill/modifyBill'
      // url: '../modifyBill/modifyBill?name=' + mc + "&taxcode=" + tax + "&addr=" + addr + "&bank=" + bank + "&index=" + e.currentTarget.dataset.index
    })
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