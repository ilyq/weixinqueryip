// pages/index/index.js
Page({
  data:{
    ip: '',
    ipValue: '',
    location: '',
    height: '100%'
  },
  ipValue: function (res) {
    this.setData({
      ip: res.detail.value
    })
  },
  queryIp: function (res) {
    let that = this;
    // url要设置成你的api地址
    let url = 'https://127.0.0.1:5000/v1/ip/' + that.data.ip;
    if (that.data.ip.length >= 1) {
      wx.request({
        url: url,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          console.log(res)
          // success
          if (res.data.ip) {
            that.setData({
              ipValue: res.data.ip,
              location: res.data.location
            })
          } else {
            wx.showModal({
            title: "提示",
            content: "获取出错",
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
              } else if (res.cancel) {
              }
            }
          })
          }
        },
        fail: function(res) {
          // fail
          wx.showModal({
            title: "提示",
            content: "获取出错",
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
              } else if (res.cancel) {
              }
            }
          })
        },
        complete: function(res) {
          // complete
        }
      })
    } else {
      wx.showModal({
        title: "提示",
        content: "输入出错",
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
          } else if (res.cancel) {
          }
        }
      })
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.screenHeight
        })
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})