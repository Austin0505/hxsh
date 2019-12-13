// page/component/details/details.js
var request = require('../../../utils/request.js')
const url = {
  goodsRequest_url: "oneTest.do",
  goodsDetailsRequest_url: 'detail.do'

}
Page({
  data: {
    shopGoods: [],
    shopGoodsNum: 1,
    shopGoodsdm: '', //传到详情页面的产品id
    shopGoodsImg: '',
    curIndex: 0,
    show: false,
    scaleCart: false,
    decript: [],
  },
  onLoad: function(option) {
    var that = this
    that.getRequest(option.shopid)
    that.data.shopGoodsdm = option.shopid
    console.log('页面跳转传参的商品id', that.data.shopGoodsdm)
  },
  // 初始化页面
  getRequest: function(shopid) {
    var that = this
    request.SEND(url.goodsDetailsRequest_url, {
      spdm: shopid
    }, "get", res => {
      //请求成功的操作
      var str = res.data.json;
      var jsonStr = str.replace(" ", "");
      if (typeof jsonStr != 'object') {
        jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
        var jj = JSON.parse(jsonStr);
        res.data = jj.reverse();
      }
      // console.log(res.data[0].spms.replace("\"", "").replace("\n", ""));
      // 商品描述做样式改变
      var decript = res.data[0].spms.replace("\"", "").split('&#x000A;');

      // console.log(decript);
      //decript=decript.replace("&#x000A","");


      // 因为后台传过来的商品数据没有物品的数量,所以我们需要在前端加入,方便购物车计算与传入后台
      var shopGoods = that.data.shopGoods
      res.data.forEach(item => {
        let message = {
          num: 1,
          totalNum: 0,
          hasCarts: false,
          ...item
        }
        shopGoods.push(message)
      })

      that.setData({
        shopGoods: shopGoods,
        decript: decript,
      })

    }, err => {
      console.log(err)
      //请求失败操作

    })
  },
  // 点击增加按钮
  addCount() {
    let that = this
    let shopGoods = that.data.shopGoods
    console.log('shopGoods', shopGoods)
    // 拿到后台数据后,我们增加了他的数量属性,所以现在他是一个数组包对象的形式,点击增加或者减少需要循环取值
    shopGoods.forEach(item => {
      item.num++
    })
    that.setData({
      shopGoods: shopGoods
    })
  },
  //点击减少按钮
  subCount() {
    let that = this
    let shopGoods = that.data.shopGoods
    // let num = shopGoods.num
    shopGoods.forEach(item => {
      item.num--;
      if (item.num - 1 < 0) {
        item.num = 0
      }
    })
    that.setData({
      shopGoods: shopGoods
    })
  },

  //点击加入购物车
  addToCart() {
    let that = this
    let shopGoodsdm = that.data.shopGoodsdm
    console.log('点击购物车获取的商品id', shopGoodsdm)
    let shopGoods = that.data.shopGoods
    let num = that.data.shopGoods.num
    // 获取购物车的缓存数组（没有数据，则赋予一个空数组） 
    let storageArr = wx.getStorageSync('carts') || []
    console.log("storageArr", storageArr);
    let bc = 0 //shopGoods为[{}]格式,我们需要拿到里面存的num 需foreach
    shopGoods.forEach(item => {
      bc = {
        ...item
      }
    })
    //判断购物车缓存中是否已存在该货品
    let exist = storageArr.find(item => item.dm == shopGoodsdm);
    //如果存在，则增加该货品的购买数量
    if (exist) {
      exist.num += bc.num
    } else {
      //如果不存在，传入该货品信息
      storageArr.push(bc)
    }
    //加入购物车数据，存入缓存
    try {
      wx.setStorageSync('carts', storageArr)
      wx.showToast({
        title: '加入购物车成功！',
        icon: 'success',
        duration: 2000
      });
    } catch (e) {
      console.log(e)
    }
  },

  bindTap(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },
  // 展示购物车
  showcart() {
    wx.navigateTo({
      url: '/pages/component/cart/cart',
    })
  }
})