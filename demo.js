/**
 * Created by suncg on 2017/4/1.
 */
// import {Answer} from './index'
let API = require('./index')
// async function test () {
//   // let a = await 'aa'
//   return 'aa'
// }
// console.log(test())

// test().then(text => {
//   console.log(text)
// })
let answerId = '35369006'
API.Answer.voters(answerId).then(function (data) {
  console.log(data)
})
