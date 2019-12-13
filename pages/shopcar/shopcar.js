// pages/shopcar/shopcar.js
var request = require('../../utils/request.js')
const url = {
  newGoodsUrl: "newCategory.do",
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNum: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let data={dm:5};
    let data1={};
    let data2={};
    let data3={};
    let data4={};
    let list50=[];
    let list51=[];
    let list52=[];
    let list56=[];
    let list57=[];
    //数组获取dm和index,查询省
    request.SEND(url.newGoodsUrl, data, 'GET', res => {
      console.log(JSON.stringify(res.data.json));//56,57,51,52,50
      var str = res.data.json;
      var jsonStr = str.replace(" ", "");
      if (typeof jsonStr != 'object') {
        jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
        var jj = JSON.parse(jsonStr);
        res.data = jj;
      }
      for(var i=0;i<res.data.length;i++){
        console.log(res.data[i].ddm);
        data1={dm:res.data[i].ddm,mc:res.data[i].dmc};
        if (res.data[i].ddm==50){//日常生活
          list50.push("dm0:"+ res.data[i].ddm);
          request.SEND(url.newGoodsUrl, data1, 'GET', res => {
            console.log(JSON.stringify(res.data.json));
            var str = res.data.json;
            var jsonStr = str.replace(" ", "");
            if (typeof jsonStr != 'object') {
              jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
              var jj = JSON.parse(jsonStr);
              res.data = jj;
            }
            
            for(var j=0;j<res.data.length;j++){
              console.log(res.data[j].ddm);
              if (res.data[j].ddm == 5001) {
                list50.push(res.data[j].ddm + ":" + res.data[j].dmc);
                data2 = { dm: res.data[j].ddm, mc: res.data[j].dmc }
                request.SEND(url.newGoodsUrl, data2, 'GET', res => {
                  console.log(JSON.stringify(res.data.json));
                  var str = res.data.json;
                  var jsonStr = str.replace(" ", "");
                  if (typeof jsonStr != 'object') {
                    jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
                    var jj = JSON.parse(jsonStr);
                    res.data = jj;
                  }

                  for (var k = 0; k < res.data.length; k++) {
                    console.log(res.data[k].ddm);
                    if (5001002 == res.data[k].ddm) {
                      list50.push(res.data[k].ddm + ":" + res.data[k].dmc);
                      data3 = { dm: res.data[k].ddm, mc: res.data[k].dmc }
                      request.SEND(url.newGoodsUrl, data3, 'GET', res => {
                        console.log(JSON.stringify(res.data.json));
                        var str = res.data.json;
                        var jsonStr = str.replace(" ", "");
                        if (typeof jsonStr != 'object') {
                          jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
                          var jj = JSON.parse(jsonStr);
                          res.data = jj;
                        }
                        list50.push("{");
                        for (var l = 0; l < res.data.length; l++) {
                          list50.push(res.data[l].ddm + ":" + res.data[l].dmc);
                          console.log(list50)
                        }

                        console.log(list50);
                      })
                    }


                  }

                  console.log(list50)

                })
              }

            }

          })
        }
        
      }
      // for (var i = 0; i < res.data.json.length; i++) {
      //   let list = res.data.json[i].mc;
      //   addreChoose.push(list);
      //   console.log(addreChoose);
      // }
      // self.setData({
      //   addreRange: res.data.json,
      //   addreChoose: addreChoose

      // })
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