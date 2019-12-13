// page/component/new-pages/cart/cart.js
var app = getApp();
Page({
  data: {
    carts: [], // 购物车列表
    hasList: false, // 列表是否有数据
    hasCarts: false, //点击结算是否选中商品
    totalPrice: 0, // 总价，初始为0
    selectAllStatus: true, // 全选状态，默认全选
    obj: {
      name: "hello"
    },
    phone: ''
  },
  onLoad() {
    var arr = JSON.stringify(wx.getStorageSync('carts') || []);
    var str = arr;
    var jj = ""
    var jsonStr = str.replace(" ", "");
    if (typeof jsonStr != 'object') {
      jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
      jj = JSON.parse(jsonStr);
    }
    this.setData({
      carts: jj,
    });
    if (this.data.carts.length > 0) {
      this.setData({
        hasList: true
      })
    }
  },
  onShow() {
    var token = wx.getStorageSync('token')
    this.setData({
      token: token
    });
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    carts[index].hasCarts = !carts[index].hasCarts

    this.setData({
      carts: carts
    });
    this.getTotalPrice();
    // wx.setStorageSync('carts', this.data.carts)
  },
  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);
    this.setData({
      carts: carts
    });
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
    wx.setStorageSync('carts', carts)
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
      carts[i].hasCarts = selectAllStatus
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts; // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
      if (carts[i].selected) { // 判断选中才会计算价格
        total += carts[i].num * carts[i].price; // 所有价格加起来
      }
    }
    this.setData({ // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  gotoComfirmOrder() {
    let that = this
    let carts = that.data.carts
    let token = that.data.token
    console.log(carts)
    //在onshow获取缓存用户token,如果有说明登陆了可获取数据,直接跳转订单详情并支付
    if (token) {
      let cartsExsit = carts.find(item => {
        return item.hasCarts == true
      })
      console.log(cartsExsit)
      if (cartsExsit) {
        wx.navigateTo({
          url: '/pages/confirmorder/confirmorder?carts=' + encodeURIComponent(JSON.stringify(carts)) + '&totalPrice=' + that.data.totalPrice
        })
      } else {
        wx.showToast({
          title: '请选择商品',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      //没有token,用户没有登陆,跳转登陆页面
      // wx.navigateTo({
      //   url: '/pages/login/login',
      // })
    }
  }

})