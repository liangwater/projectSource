// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: 'test-liang',
})
const db = cloud.database()
// const rp = require('request-promise');
const axios = require('axios');
const playlistCollection = db.collection('playlist');
// const URL = 'http://musicapi.xiecheng.live/personalized'
const URL = 'https://apis.imooc.com/personalized?icode=ABE313CC0016235D'
const MAX_LIMIT = 10
// 云函数入口函数
exports.main = async (event, context) => {
  const countResult = await playlistCollection.count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  let list = {
    data: []
  }
  if (tasks.length > 0) {
    list = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }
  console.log("list@@@@:" + JSON.parse(list))
  // const playlist = await rp(URL).then((res) => {
  //   //转化对应对象
  //   return JSON.parse(res).result
  // })
  const {
    data
  } = await axios.get(URL)
  if (data.code >= 1000) {
    console.log(data.msg)
    return 0
  }
  const playlist = data.result
  console.log(playlist)
  const newDate = []
  for (let i = 0; i < playlist.length; i++) {
    let flag = true
    for (let j = 0; j < list.data.length; j++) {
      if (playlist[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    if (flag) {
      newDate.push(playlist[i])
    }
  }
  console.log("newDate1)@@@@:" + JSON.parse(newDate))
  for (let i = 0; i < newDate.length; i++) {
    await playlistCollection.add({
      data: {
        ...newDate[i],
        createTime: db.serverDate(),
      }
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.log('插入失败')
    })
  }
  console.log("newDate@@@@:" + JSON.parse(newDate))
  return newDate.length
}