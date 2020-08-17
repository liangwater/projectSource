// components/playlist/playlist.js
Component({
  /**
   * Component properties
   * observers
   * 数据监听器监听[]里  如果[]变化就触发
   */
  //界面上的组件属性
  properties: {
    playlist: {
      type: Object
    }
  },
  observers: {
    ['playlist.playCount'](count) {
      this.setData({
        _count: this._tranNumber(count, 2)
      })
    }
  },
  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    goToMusiclist() {
      wx.navigateTo({
        url: `../../pages/musiclist/musiclist?playlistId=${this.properties.playlist.id}`,
      })
    },
    _tranNumber(num, point) {
      let numStr = num.toString().split('.')[0]
      if (numStr.length < 6) {
        return numStr
      } else if (numStr.length >= 6 && numStr.length <= 8) {
        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        return parseFloat(parseInt(numStr / 10000)) + '.' + decimal + '万'
      } else if (numStr.length > 8 && numStr.length <= 10) {
        let decimal = numStr.substring(numStr.length - 9, numStr.length - 9 + point)
        return parseFloat(parseInt(numStr / 100000000) + '.') + decimal + '亿'
      }

    }
  }
})