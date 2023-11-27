// pages/movies/movies.js
const app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:[],
    comingSoon:[],
    top250:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url:app.gBaseUrl + 'in_theaters',
      data:{
        start:0,
        count:3
      },
      success:(res)=>{
        console.log(res),
        this.setData({
          inTheaters:res.data.subjects
        })
      },
    })
   
    wx.request({
      url: app.gBaseUrl + 'coming_soon',
      data:{
        start:0,
        count:3
      },
      success:(res)=>{
        this.setData({
          comingSoon:res.data.subjects
        })
      }
    })
    wx.request({
      url: app.gBaseUrl + 'top250',
      data:{
        start:0,
        count:3
      },
      success:(res)=>{
        this.setData({
          top250:res.data.subjects
        })
      }
    })
  },
 onGotoMore(event){
  // console.log(event)
  const type=event.currentTarget.dataset.type
  wx.navigateTo({
    url:'/pages/more-movie/more-movie?type=' + type,
  })
 },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})