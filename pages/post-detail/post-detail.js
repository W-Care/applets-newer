// pages/post-detail/post-detail.js
import {postList} from '../../data/data.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      postData:{},
      collected:false,
      isPlaying:false,
      _pid:null,
      _postsCollected:{},
      _mgr:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postData=postList[options.pid]
    console.log(options)
    this.data._pid=options.pid
    const postsCollected = wx.getStorageSync('posts_collected')
    if(postsCollected){
      this.data._postsCollected=postsCollected
    }
    let colleted = postsCollected[this.data._pid]
    if(colleted=== undefined){
      colleted = false
    }
    this.setData({
      postData,
      colleted,
      isPlaying:this.currentMusicIsPlaying()
    })
    const mgr=wx.getBackgroundAudioManager()
    this.data._mgr=mgr
    mgr.onPlay(this.onMusicStart)
    mgr.onPause(this.onMusicStop)
    console.log(this.data)
  },
  currentMusicIsPlaying(){
    if(app.gIsPlayingMusic &&app.gIsPlayingPostId ===this.data._pid){
      return true
    }
    return false
    
  },
  onMusicStart(event){
    const mgr =this.data._mgr
    const  music = postList[this.data._pid].music
    mgr.src=music.url
    mgr.title = music.title
    mgr.coverImgUrl =music.coverImg
    app.gIsPlayingMusic = true
    app.gIsPlayPostId=this.data._pid
    this.setData(
      {isPlaying:true}
    )
  },
  onMusicStop(event){
    const mgr =this.data._mgr
    mgr.pause()
    app.gIsPlayingMusic=false
    app.gIsPlayingPostId = -1
    this.setData({
      isPlaying:false
    })
  },
  onCollect(event){
    const postsCollected =this.data._postsCollected
    wx.getStorageSync('key')
    postsCollected[this.data._pid] = !this.data.collected
    this.setData({
      collected:!this.data.collected
    })
    wx.setStorageSync('posts_collected', postsCollected)
    wx.showToast({
      title: this.data.collected?'Succed':'Failed',
      duration:3000
    })
  },
  async onShare(event){
    const result = await wx.showActionSheet({
      itemList: ['分享到QQ','分享到微信','分享到朋友圈'],
    })
    console.log(result)
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