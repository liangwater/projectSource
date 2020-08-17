// components/musiclist/musiclist.js
Component({
  /**
   * Component properties
   */
  properties: {
    musiclist: Array
  },

  /**
   * Component initial data
   */
  data: {
    playingId: -1
  },

  /**
   * Component methods
   */
  methods: {
    onSelect(event) {
      const ds = event.currentTarget.dataset
      const musicid = ds.musicid
      const index = ds.index
      this.setData({
        playingId: musicid
      })
      wx.navigateTo({
        url: `../../pages/player/player?musicid=${musicid}&index=${index}`,
      })
    }
  }
})