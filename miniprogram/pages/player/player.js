// pages/player/player.js
let musiclist = []
let nowplayingIndex
//获取全局唯一的背景音频管理器
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({
  /**
   * Page initial data
   */
  data: {
    picUrl: '',
    isPlaying: false, // false表示不播放，true表示正在播放
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    nowplayingIndex = options.index
    musiclist = wx.getStorageSync('musiclist')
    this._loadMusicDetail(options.musicid)
  },

  _loadMusicDetail(musicId) {
    backgroundAudioManager.stop()
    let music = musiclist[nowplayingIndex]
    wx.setNavigationBarTitle({
      title: music.name,
    })

    this.setData({
      picUrl: music.al.picUrl,
      isPlaying: false, //false表示不播放,true表示播放状态
    })
    wx.showLoading({
      title: '歌曲加载中...',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        musicId,
        $url: 'musicUrl',
        isLyricShow: false, //表示当前歌词是否显示
        lyric: '',
        isSame: false, // 表示是否为同一首歌
      }
    }).then((res) => {
      let result = res.result
      if (result.data[0].url == null) {
        wx.showToast({
          title: '无权限播放',
        })
        return
      }
      backgroundAudioManager.src = result.data[0].url
      backgroundAudioManager.title = music.name
      backgroundAudioManager.coverImgUrl = music.al.picUrl
      backgroundAudioManager.singer = music.ar[0].name
      backgroundAudioManager.epname = music.al.name
      this.setData({
        isPlaying: true
      })
      wx.hideLoading()
    })
  },

  togglePlaying() {
    // 正在播放
    if (this.data.isPlaying) {
      backgroundAudioManager.pause()
    } else {
      backgroundAudioManager.play()
    }
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },
  OnPrev() {
    nowplayingIndex--
    if (nowplayingIndex < 0) {
      nowplayingIndex = musiclist.length - 1
    }
    this._loadMusicDetail(musiclist[nowplayingIndex].id)
  },
  onNext() {
    nowplayingIndex++
    if (nowplayingIndex == musiclist.length) {
      nowplayingIndex = 0
    }
    this._loadMusicDetail(musiclist[nowplayingIndex].id)
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})