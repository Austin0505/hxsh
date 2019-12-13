// pages/confirmorder/confirmorder.js
var app = getApp();
Page({
  data: {
    checked: 'false',
    username: '', //用户名
    billInputValue: {},
    carts: [],
    totalPrice: 0,
    arr: [],
    isshowbilltype: 'false',
    isbill: 'false', //是否需要发票
    isbillType: 'false', //false个人 true公司
    bill: [{
      hasbill: '是',
      checked: false
    }, {
      hasbill: '否',
      checked: 'true'
    }],
    billType: [{ //发票类型
      type: '个人',
      // checked: 'true'
    }, {
      type: '公司'
    }],

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let carts = JSON.parse(decodeURIComponent(options.carts))
    let cartArr = carts.filter(item => {
      return item.hasCarts == true
    })
    that.setData({
      carts: cartArr,
      totalPrice: options.totalPrice
    })
  },

  onShow: function() {

  },

  goToAddAdress(){
    console.log(1)
    wx.navigateTo({
      url: '/pages/component/address/address',
    })
  },
  // 是否开启选择框
  // selectList(e) {
  //   let that = this
  //   let index = e.currentTarget.dataset.index
  //   let bill = that.data.bill;
  //   const selected = bill[index].selected;
  //   for(let i in bill){ 
  //     if (bill[i].selected){
  //       bill[i].selected=!selected
  //     }else{
  //       bill[i].selected = selected
  //     }
  //   }
  //   // bill[index].selected = !selected;
  //   that.setData({
  //     bill
  //   })
  // }
  // 是否开具发票
  chooseisbill(e) {
    let that = this
    let isbill = that.data.isbill
    let isshowbilltype = that.data.isshowbilltype
    let isbillType = that.data.isbillType
    let checked = that.data.checked
    isshowbilltype = 'false'
    if (e.detail.value == '是') {
      isbill = 'true'
    } else {
      isbill = 'false'
    }
    that.setData({
      isbill,
      checked: !checked,
      isshowbilltype,
    })
  },
  // 发票类型选择
  choosebillType(e) {
    let that = this
    let isbillType = that.data.isbillType
    let isshowbilltype = that.data.isshowbilltype
    if (e.detail.value == '个人') {
      isbillType = 'false'
      isshowbilltype = 'true'
    } else {
      isbillType = 'true'
      isshowbilltype = 'true'
    }
    that.setData({
      isbillType,
      isshowbilltype
    })
  },

  // 获取input的值
  getInputValue(e) {
    let that = this
    let billInputValue = that.data.billInputValue
    let item = e.currentTarget.dataset.model;
    billInputValue[item] = e.detail.value
    that.setData({
      billInputValue
    })
  },

  //点击前往发票地址
  goToInvoice() {
    wx.navigateTo({
      url: '/pages/component/bill/bill',
    })
  },

  goToPayOrder() {
    let that =this;
    let carts=that.data.carts
    console.log(carts)
    let productList=[]
    for (let i = 0; i < carts.length;i++){
      let data={
        "dm": carts[i].dm,
        "spmc": carts[i].mc,
        "sl": carts[i].num,
        "price": carts[i].price,
        
      }
    }
  }

})