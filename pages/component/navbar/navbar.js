Component({
  properties: {
    num: { // 属性名
      type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 1, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) {
        // console.log(newVal, oldVal)
       } // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
    }
  },
  data: {
  },
  methods: {
    // 这里是一个自定义方法
    goToIndex() {
      this.setData({
        num: 1
      })
      if (this.data.num == 1) {
        wx.reLaunch({
          url: '../../pages/index/index',
        })
      }
    },
    goToMine() {
     this.setData({
       num:4
     })
      if (this.data.num == 4) {
        wx.reLaunch({
          url: '../../pages/mine/mine'
        })
        // wx.navigateTo({
        //   url: '../../pages/mine/mine'
        // })
      }
    },
    goShopCar() {
      console.log(this.data.num)
      this.setData({
        num: 2
      })
      if (this.data.num == 2) {
        // wx.reLaunch({
        //   url: '/pages/component/cart/cart'
        // })
        wx.navigateTo({
          url: '/pages/component/cart/cart'
        })
     
      }
    }
  }
})