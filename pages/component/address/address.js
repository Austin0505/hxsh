// pages/component/address/address.js
var index = 0;
Page({
  data:{
    address:{
      name:'',
      phone:'',
      detail:'',
    },
    addresslist:[]
  },
  addAddre: function (e) {
    wx.navigateTo({
      url: '../newAddre/newAddre'
    })
  },
  toModifyAddre: function (e) {
    let self = this;
    var idx = e.currentTarget.dataset.index;
    console.log(idx);
    // console.log("选中的电话" + e.currentTarget.dataset.addrevalue);
    // console.log("选中的index" + e.currentTarget.dataset.index);
    //console.log("选中的index" + e.currentTarget.dataset.index);
    console.log("选中的名称" + JSON.stringify(self.data.addresslist[idx].mc));
    console.log("选中的地址" + JSON.stringify(self.data.addresslist[idx].dz));
    console.log("选中的电话" + JSON.stringify(self.data.addresslist[idx].dh));
    console.log("选中的index" + idx);
    let mc = JSON.stringify(self.data.addresslist[idx].mc);
    let dz = JSON.stringify(self.data.addresslist[idx].dz);
    let dh = JSON.stringify(self.data.addresslist[idx].dh);
    var str = dz.split(",");
    console.log(str[0]);
    var strBig = str[0].split("省");
    var sheng = strBig[0]+"省";//获取省
    sheng = sheng.replace("\"","");
    var shi = strBig[1];//获取市
    var xian=str[1];
    var door=str[2];
    door = door.replace("\"", "");
    console.log(sheng);
    console.log(shi);
    console.log(xian);
    console.log(door);

    wx.navigateTo({
      url: '../modifyAddre/modifyAddre?name=' + mc + "&tel=" + dh + "&sheng=" + sheng + "&shi=" + shi + "&xian="+xian+"&door=" + door + "&index=" + e.currentTarget.dataset.index
    })
  },
  // toCleanOrder: function (e) {
  //   for (var i = 0; i < this.data.list.length; i++) {
  //     if (i == e.currentTarget.dataset.index) {
  //       li[e.currentTarget.dataset.index].image = "../../images/check.jpg"
  //     }
  //     else {
  //       li[i].image = "../../images/uncheck.png"
  //     }
  //   }
  //   wx.navigateTo({
  //     url: '../cleanOrder/cleanOrder?name=' + e.currentTarget.dataset.name + "&tel=" + e.currentTarget.dataset.tel + "&area=" + e.currentTarget.dataset.area + "&addre=" + e.currentTarget.dataset.addre + "&areavalue=" + e.currentTarget.dataset.areavalue + "&flag=" + true
  //   });
  //   console.log("姓名为：" + e.currentTarget.dataset.name + "，手机是：" + e.currentTarget.dataset.tel + "，地址是：" + e.currentTarget.dataset.addre + "，是否选择是：" + e.currentTarget.dataset.index);
  // },
  onLoad(options){
    // let allValue = JSON.parse(decodeURIComponent(options.allValue))

    var self = this;
    //获取地址
    wx.request({
      url: 'http://wechat.scjinsui.com:8080/weixin/zcsh/addr.do',
      // url: 'http://www.phonegap100.com/appapi.php?a=getPortalCate',
      data: {
        openid: 'A000004872BBBF',
        orderid: "DD2016070422545048"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(JSON.stringify(res.data.addrs));
        if (res.data.addrs == null) {
          var toastText = '数据获取失败';
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          self.setData({
            addresslist: res.data.addrs
          })
        }
      }
    })
    
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          address : res.data
        })
      }
    })
  },
  formSubmit(e){
    const value = e.detail.value;
    if (value.name && value.phone && value.detail){
      wx.setStorage({
        key: 'address',
        data: value,
        success(){
          wx.navigateBack();
        }
      })
    }else{
      wx.showModal({
        title:'提示',
        content:'请填写完整资料',
        showCancel:false
      })
    }
  }
})