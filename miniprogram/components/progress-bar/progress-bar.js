// components/progress-bar/progress-bar.js
let movableAreaWidth = 0
let movableViewWidth = 0
const backgroundAudioManager = wx.getBackgroundAudioManager()
Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {
    showTime: {
      currentTime: '00:00',
      totalTime: '00:00'
    },
    movableDis: 0,
  },
  lifetimes: {
    ready() {
      if (this.properties.isSame && this.data.showTime.totalTime == '00:00') {
        this._setTime()
      }
      this._getMovableDis()
      this._bindBGMEvent()
    },
  },
  /**
   * Component methods
   */
  methods: {
    _getMovableDis() {
      const query = this.createSelectorQuery()
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec((rect) => {
        // console.log(rect)
        movableAreaWidth = rect[0].width
        movableViewWidth = rect[1].width
        // console.log(movableAreaWidth, movableViewWidth)
      })

    },
    _bindBGMEvent() {
      // 当播放时
      backgroundAudioManager.onPlay(() => {
        console.log('onPlay')
      })
      // 当停止时
      backgroundAudioManager.onStop(() => {
        console.log('onStop')
      })
      // 当暂停时
      backgroundAudioManager.onPause(() => {
        console.log('onPause')
      })
      // 当加载时
      backgroundAudioManager.onWaiting(() => {
        console.log('onWaiting')
      })
      // 当可以播放
      backgroundAudioManager.onCanplay(() => {
        console.log('onCanplay')
      })
      // 当可以播放
      backgroundAudioManager.onCanplay(() => {
        console.log('onCanplay')
      })
      // 当后台时
      backgroundAudioManager.onTimeUpdate(() => {
        console.log('onTimeUpdate')
      })
      // 当结束时
      backgroundAudioManager.onEnded(() => {
        console.log('onCanplay')
      })
      // 当错误
      backgroundAudioManager.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
        wx.showToast({
          title: '错误' + res.errCode,
        })
      })
    }
  }
})