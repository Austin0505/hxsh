var request = require('../../../utils/request.js')
const url = {
  addrUrl: "dqdm.do",
}


Page({
  data: {
    name: "请填写您的姓名",
    tel: "请填写您的联系方式",
    addreValue: 22,  //省的下标
    addreValueShi: 0, //市的下标
    addreValueXian: 0, //区的下标
    addreRange: [], //省
    addreRangeShi: [], //市
    addreRangeXian: [], //县或区
    door: "街道门牌信息",
    // province:'',
    // city:'',
    // area:''
    // addreChooseXian:[],
    // addreChoose:[],
    // addreChooseShi:[],
  },
  // areaPickerBindchange:function(e){
  //   this.setData({
  //     areaValue:e.detail.value
  //   })
  //     console.log(111+e.detail.value)
  // },
  //点击省的事件
  addrePickerBindchange: function(e) {
    let self = this
    self.setData({
      addreValue: e.detail.value
    })
    self.findShi(self.data.addreRange[self.data.addreValue].dm);
  },
  //点击市
  addreShiPickerBindchange: function(e) {
    let self = this
    self.setData({
      addreValueShi: e.detail.value
    })
    self.findXian(self.data.addreRangeShi[self.data.addreValueShi].dm);
  },
  //点击县
  addreXianPickerBindchange: function(e) {
    let self = this
    self.setData({
      addreValueXian: e.detail.value
    })
  },


  formSubmit: function(e) {
    var warn = "";
    var that = this;
    var flag = false;
    if (e.detail.value.mc == "") {
      warn = "请填写您的姓名！";
    } else if (e.detail.value.dh == "") {
      warn = "请填写您的手机号！";
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.dh))) {
      warn = "手机号格式不正确";
    } else if (e.detail.value.addreRangeShi == "" || e.detail.value.addreRangeXian == "") {
      warn = "请选择您的所在区域";
    } else if (e.detail.value.door == "") {
      warn = "请输入您的具体地址";
    } else {
      flag = true;
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      let allValue = {
        mc: e.detail.value.mc,
        dh: e.detail.value.dh,
        dz: that.data.addreRange[that.data.addreValue].mc + that.data.addreRangeShi[that.data.addreValueShi].mc +','+ that.data.addreRangeXian[that.data.addreValueXian].mc +','+e.detail.value.door
      }
      console.log(allValue)
      //   wx.redirectTo({
      //   url: '/chooseAddre/chooseAddre?tel='+e.detail.value.tel+"&addre="+that.data.addreRange[e.detail.value.addre]+"&door="+e.detail.value.door+"&name="+e.detail.value.name+"&area="+that.data.areaRange[e.detail.value.area]+"&flag="+flag+"&areavalue="+e.detail.value.area+"&addrevalue="+e.detail.value.addre+"&door="+e.detail.value.door
      //   //？后面跟的是需要传递到下一个页面的参数
      // }); 
      // pages / component / modifyAddre / modifyAddre
      wx.redirectTo({
        url: '/pages/component/address/address?allValue=' + JSON.stringify(e.detail.value)
      })
      console.log("传过去的地址下标是多少？" + e.detail.value.addre)
    }
    if (flag == false) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
  },
  //查询省
  findSheng: function(dqdm) {
    console.log(dqdm);
    let self = this;
    let data = {
      openid: 'A000004872BBBF',
      dqdm: dqdm, //初次进入后必传此参数
      wlfs: 1
    }
    //数组获取dm和index,查询省
    request.SEND(url.addrUrl, data, 'GET', res => {
      console.log(JSON.stringify(res.data.json));
      let addreChoose = [];
      for (var i = 0; i < res.data.json.length; i++) {
        let list = res.data.json[i].mc;
        addreChoose.push(list);
      }
      self.setData({
        addreRange: res.data.json,
        addreChoose: addreChoose,
        // province: self.data.addreRange[self.data.addreValue]
      })

      console.log(self.data.addreRange[self.data.addreValue].dm);
      self.findShi(self.data.addreRange[self.data.addreValue].dm);
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

  //查询市
  findShi: function(dqdm) {
    console.log(dqdm);
    let self = this;
    //获取选中省的dm
    let dataShi = {
      openid: 'A000004872BBBF',
      dqdm: dqdm, //
      wlfs: 1
    }
    request.SEND(url.addrUrl, dataShi, 'GET', res => {
      //console.log("444444444:" + JSON.stringify(res.data.json));
      let addreChoose = [];
      for (var i = 0; i < res.data.json.length; i++) {
        let list = res.data.json[i].mc;
        addreChoose.push(list);
      }
      self.setData({
        addreRangeShi: res.data.json,
        addreChooseShi: addreChoose,
        // city: self.data.addreRangeShi[self.data.addreValueShi]
      })
      console.log(self.data.addreRangeShi[self.data.addreValueShi].dm);
      self.findXian(self.data.addreRangeShi[self.data.addreValueShi].dm);
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
  //查询区县
  findXian: function(dqdm) {
    console.log(dqdm);
    let self = this;
    //获取选中市的dm
    let dataXian = {
      openid: 'A000004872BBBF',
      dqdm: dqdm,
      wlfs: 1
    }
    request.SEND(url.addrUrl, dataXian, 'GET', res => {
      console.log("444444444:" + JSON.stringify(res.data.json));
      let addreChoose = [];
      for (var i = 0; i < res.data.json.length; i++) {
        let list = res.data.json[i].mc;
        addreChoose.push(list);
      }
      // console.log(self.data.addreRangeShi[self.data.addreValueShi].dm);
      self.setData({
        addreRangeXian: res.data.json,
        addreChooseXian: addreChoose,
        // area: self.data.addreRangeXian[self.data.addreValueXian]
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

  onLoad: function(options) {
    let self = this;
    self.findSheng(100000);

  },

})