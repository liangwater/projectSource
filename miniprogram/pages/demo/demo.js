import regeneratorRuntime from '../../utils/runtimes.js'
// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    arr: ['wxml', 'js', 'wxss', 'json'],
    arrObj: [{
      id: 1,
      name: 'wxml'
    }, {
      id: 2,
      name: 'js'
    }, {
      id: 3,
      name: 'wxss'
    }, {
      id: 4,
      name: 'json'
    }, ],
  },
  sort() {
    const length = this.data.arr.length
    for (let i = 0; i < length; i++) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const tem = this.data.arr[x]
      this.data.arr[x] = this.data.arr[y]
      this.data.arr[y] = tem
    }
    this.setData({
      arr: this.data.arr
    })
  },
  sortObj() {
    const length = this.data.arrObj.length
    for (let i = 0; i < length; i++) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const tem = this.data.arrObj[x]
      this.data.arrObj[x] = this.data.arrObj[y]
      this.data.arrObj[y] = tem
    }
    this.setData({
      arrObj: this.data.arrObj
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getMusicInfo() {
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data: {
        $url: 'music'
      }
    }).then((res) => {
      console.log(res)
    })
  },
  getMovieInfo() {
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data: {
        $url: 'movie'
      },
    }).then((res) => {
      console.log(res)
    })
  },
  onLoad: function (options) {
    let p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('p1')
        resolve()
      }, 3000)
    })
    let p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('p2')
        resolve()
      }, 2000)
    })
    let p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('p3')
        reject()
      }, 1000)
    })
    Promise.race([p1, p2, p3]).then((res) => {
      console.log('谁先完成就完成')
      console.log(res)
    }).catch((err) => {
      console.log('失败')
      console.log(err)
    })
    this.foo()
  },
  async foo() {
    console.log('foo')
    let a = await this.timeout()
    console.log(a)
  },
  timeout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('1')
        resolve()
      })
    })
  },
  /** 
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