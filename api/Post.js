/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description
 *
 */
'use strict'

const {Promise, request, url, _, QUERY} = require('../config/commonModules')

const API = require('../config/api')
const User = require('./User')

function getRealUrl (apiUrl, postUrl) {
  let pathname = url.parse(postUrl).pathname
  let paths = pathname.split('/')
  if (paths.length < 0) {
    throw new Error('Url error!')
  }

  let data = {
    name: paths[1],
    postID: paths[2]
  }
  return _.template(apiUrl)(data)
}

let getLikers = async (postUrl, config) => {
  let url = getRealUrl(API.post.likers, postUrl)
  let query = config || QUERY.zhuanlan.likers
  let data = {
    url,
    qs: {
      limit: query.limit,
      offset: query.offset
    }
  }
  let content = await request(data)

  let users = content.body
  return JSON.parse(users)
}
/**
 * get full userinfo who stared post
 * @param postUrl post's url
 * @param config
 * @returns {*}  User Object  contain detail userinfo , number of question, number of answer etc
 */
let likersDetail = async (postUrl, config) => {
  let users = await getLikers(postUrl, config)
  if (users.length > 0) {
    // 并发
    return Promise.map(users, function (user) {
      // User.getUserByName参数是用户的slug值，不是直接的用户名
      return User.getUserByName(user.slug).then(function (result) {
        return result
      })
    }, {
      concurrency: 30
    }).then(function (data) {
      // 按follower数目逆序排列
      let pureUser = _.sortBy(data, 'follower').reverse()
      return pureUser
    })
  }
}

let articleInfo = async (postUrl) => {
  let url = getRealUrl(API.post.info, postUrl)
  let options = {
    url,
    gzip: true
  }
  let content = await request(options)
  return JSON.parse(content.body)
}

let articleList = async (name, config) => {
  let query = config || QUERY.zhuanlan.articleList
  let data = {
    url: _.template(API.post.page)({name}),
    qs: {
      limit: query.limit,
      offset: query.offset
    }
  }
  let content = await request(data)
  return JSON.parse(content.body)
}

let zhuanlanInfo = async (zhuanlanName) => {
  let url = API.post.zhuanlan + zhuanlanName
  let options = {
    url,
    gzip: true
  }
  let content = await request(options)
  return JSON.parse(content.body)
}

let comments = async (postUrl, config) => {
  let url = getRealUrl(API.post.comments, postUrl)
  let query = config || QUERY.zhuanlan.comments

  let options = {
    url,
    qs: {
      limit: query.limit,
      offset: query.offset
    }
  }
  let content = await request(options)

  return JSON.parse(content.body)
}

module.exports = {
  likersDetail,
  comments,
  info: articleInfo,
  page: articleList,
  zhuanlanInfo
}
