// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })

  app.use(async (ctx, next) => {
    console.log('进入全局中间件')
    ctx.data = {}
    ctx.data.openId = event.userInfo.openId
    await next()
    console.log('退出全局中间件')
  })
  //音乐的一个路由
  app.router('music', async (ctx, next) => {
    console.log('进入音乐名称中间件')
    ctx.data.musicName = '齐天大圣'
    await next()
    console.log('退出音乐名称中间件')
  }, async (ctx, next) => {
    console.log('进入音乐类型中间件')
    ctx.data.musicType = '神话'
    ctx.body = {
      data: ctx.data
    }
    console.log('退出音乐类型中间件')
  })
  //电影的一个路由
  app.router('movie', async (ctx, next) => {
    console.log('进入电影名称中间件')
    ctx.data.movieName = '哈儿的移动城堡'
    await next()
    console.log('退出电影名称中间件')
  }, async (ctx, next) => {
    console.log('进入电影类型中间件')
    ctx.data.movieType = '宫崎骏'
    ctx.body = {
      data: ctx.data
    }
    console.log('退出电影类型中间件')
  })
  return app.serve()
}