/**
 * @author  Ivan Jiang (iplus26)
 * @date  23 May 2016
 * @description
 *
 */
'use strict'
const {cheerio, request, _} = require('../config/commonModules')
const config = require('../config/api')
const StrUtil = require('../util/strUtil')

let _renderUrl = (answerId) => {
  let url = _.template(config.answer.voters)({answerId})
  return url
}

/*
 * @param answerId  Different from the string after "answer" in url,
 *                  the real answerId is not that obvious. For example,
 *                  "/question/28207685/answer/39974928",
 *                  the answerId of this post is "11382008" instead.
 */

let voters = async (answerId) => {
  try {
    let options, url, res
    url = _renderUrl(answerId)
    options = {
      url
    }
    // res是promise返回后的值
    res = await request(options)

    let payloads = JSON.parse(res.body).payload
    let voters = []
    if (Array.isArray(payloads)) {
      voters = payloads.map(function (payload) {
        let $, user, status, anchor

        $ = cheerio.load(payload)
        user = {}
        anchor = $('a[title]')
        status = $('ul.status > li').children('a, span')

        user.name = anchor.attr('title')
        user.anonymous = !user.name

        if (!user.anonymous) {
          user.profileUrl = anchor.attr('href')
          user.sex = StrUtil.getGender($('.zg-btn-follow').text().slice(2))
        } else {
          user.name = '匿名用户'
        }

        user.avatar = $('.zm-item-img-avatar').attr('src')
        user.like = parseInt(status.eq(0).text())
        user.thank = parseInt(status.eq(1).text())
        user.question = parseInt(status.eq(2).text())
        user.questionUrl = status.eq(2).attr('href')
        user.answer = parseInt(status.eq(3).text())
        user.answerUrl = status.eq(3).attr('href')

        return user
      })

      return voters
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  voters
}
