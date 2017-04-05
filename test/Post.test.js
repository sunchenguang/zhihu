/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description
 *
 */
import test from 'ava'
let Post = require('../').Post

test('should return zhuanlan info object', async t => {
  const postUrl = 'https://zhuanlan.zhihu.com/p/19888522'
  const data = await Post.info(postUrl)
  t.true(Object.keys(data).length > 0)
})

test('should return post info object', async t => {
  const name = 'bigertech'
  const data = await Post.zhuanlanInfo(name)
  t.true(Object.keys(data).length > 0)
})

test('should return zhuanlan article comments array', async t => {
  const postUrl = 'https://zhuanlan.zhihu.com/p/19888522'
  const data = await Post.comments(postUrl)
  t.true(data.length > 0)
})
