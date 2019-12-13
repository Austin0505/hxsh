var flag=false;
var request = require('../../../utils/request.js')
const url = {
  addrUrl: "dqdm.do",
}

Page({
  data: {
    name: "请填写您的姓名",
    tel: "请填写您的联系方式",
    addreValue: 22,
    addreValueShi: 0,
    addreValueXian: 0,
    addreRange: [],   //省
    addreRangeShi: [], //市
    addreRangeXian: [],//县或区
    door: "街道门牌信息"
  },
  //点击省的事件
  addrePickerBindchange: function (e) {
    let self = this;
    self.findSheng(100000);
    self.setData({
      addreValue: e.detail.value
    })
    console.log(self.data.addreValue);
    console.log(self.data.addreRange[self.data.addreValue].dm);
    self.findShi(self.data.addreRange[self.data.addreValue].dm);
  },
  //点击市
  addreShiPickerBindchange: function (e) {
    let self = this
    self.setData({
      addreValueShi: e.detail.value
    })
    console.log(self.data.addreRangeShi[self.data.addreValueShi].dm);
    self.findXian(self.data.addreRangeShi[self.data.addreValueShi].dm);
  },
  //点击县
  addreXianPickerBindchange: function (e) {
    let self = this
    self.setData({
      addreValueXian: e.detail.value
    })
  },

  //查询省
  findSheng: function (dqdm) {
    console.log(dqdm);
    let self = this;
    let data = {
      openid: 'A000004872BBBF',
      dqdm: dqdm,//初次进入后必传此参数
      wlfs: 1
    }
    //数组获取dm和index,查询省
    request.SEND(url.addrUrl, data, 'GET', res => {
      console.log(JSON.stringify(res.data.json));
      let addreChoose = [];
      for (var i = 0; i < res.data.json.length; i++) {
        let list = res.data.json[i].mc;
        addreChoose.push(list);
        console.log(addreChoose);
      }
      self.setData({
        addreRange: res.data.json,
        addreChoose: addreChoose

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
  findShi: function (dqdm) {
    console.log(dqdm);
    let self = this;
    //获取选中省的dm
    let dataShi = {
      openid: 'A000004872BBBF',
      dqdm: dqdm,
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
        addreChooseShi: addreChoose

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
  findXian: function (dqdm) {
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
      self.setData({
        addreRangeXian: res.data.json,
        addreChooseXian: addreChoose

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
     let self=this;
     var name=options.name;
     name = name.replace(/"[^"]+"/g, function (matchStr) {   //将字符串中的双引号替换为空
       return matchStr.replace(/[\s"]+/gm, '');
     });
     var tel = options.tel;
     tel=tel.replace(/"[^"]+"/g, function (matchStr) {
       return matchStr.replace(/[\s"]+/gm, '');
     });
     var door=options.door;
     door = door.replace(/"[^"]+"/g, function (matchStr) {
       return matchStr.replace(/[\s"]+/gm, '');
     });
     var sheng=options.sheng;
     sheng = sheng.replace(/"[^"]+"/g, function (matchStr) {
       return matchStr.replace(/[\s"]+/gm, '');
     });
     var shi=options.shi;
     shi = shi.replace(/"[^"]+"/g, function (matchStr) {
       return matchStr.replace(/[\s"]+/gm, '');
     });
     var xian=options.xian;
     xian = xian.replace(/"[^"]+"/g, function (matchStr) {
       return matchStr.replace(/[\s"]+/gm, '');
     });
     console.log('[{"mc":"'+sheng+'"}]');

//新增
     let data = {
       openid: 'A000004872BBBF',
       dqdm: '100000',//初次进入后必传此参数
       wlfs: 1
     }
     //数组获取dm和index,查询省
     request.SEND(url.addrUrl, data, 'GET', res => {
       console.log(JSON.stringify(res.data.json));
       console.log(name);
       let addreChoose = [];
       for (var i = 0; i < res.data.json.length; i++) {
         let list = res.data.json[i].mc;
           addreChoose.push(list);
           console.log(addreChoose);
       }
       self.setData({
         addreRange: res.data.json,
         addreChoose: addreChoose

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
//新增
    this.setData({
      name:name,
      tel: tel,
      door:door,
      index:options.index
    })
    console.log("传过来的index"+options.index);
    console.log("接收到的index"+this.data.index);
    console.log("接受的名称" + options.name);
   },
 

    areaPickerBindchange:function(e){
    this.setData({
      areaValue:e.detail.value
    })
  },
    addrePickerBindchange:function(e){
    this.setData({
      addreValue:e.detail.value
    })
  },
  //点击删除
    delete:function(){
      var that = this;
      wx.showModal({
       title: '提示',
       content: '确认删除该地址信息吗？',
       success: function(res) {
         if (res.confirm) {
           console.log('用户点击确定')
            wx.redirectTo({
             url: '../chooseAddre/chooseAddre?index='+that.data.index+"&sign="+'2'
             }); 
         } else if (res.cancel) {
           console.log('用户点击取消')
      }
    }
})

    },
//点击取消，返回上个页面
    cancel:function(){
      wx.navigateBack({
         delta: 1
      })
    },
    //点击保存
  formSubmit: function(e) {
    var warn ="";
    var that = this;
    if(e.detail.value.name==""){
      warn = "请填写您的姓名！";
    }else if(e.detail.value.tel==""){
      warn = "请填写您的手机号！";
    }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.tel))){
      warn = "手机号格式不正确";
    }else if(e.detail.value.addre=='0'){
      warn = "请选择您的所在区域";
    }else if(e.detail.value.door==""){
      warn = "请输入您的具体地址";
    }else if(e.detail.value.area=='0'){
      warn = "请输入您的房屋面积";
    }else{
      flag=true;
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
        wx.redirectTo({
        url: '../chooseAddre/chooseAddre?tel='+e.detail.value.tel+"&addre="+that.data.addreRange[e.detail.value.addre]+"&door="+e.detail.value.door+"&name="+e.detail.value.name+"&area="+that.data.areaRange[e.detail.value.area]+"&sign="+'1'+"&areavalue="+e.detail.value.area+"&addrevalue="+e.detail.value.addre+"&index="+that.data.index
        //？后面跟的是需要传递到下一个页面的参数
      }); 
    }
    if(flag==false){
      wx.showModal({
      title: '提示',
      content:warn
    })
    }
    
  },
  
  })