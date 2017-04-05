/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description
 *
 */
'use strict'
import test from 'ava'
let User = require('../').User

test('should return user info object (fenng)', async t => {
  const data = await User.info('fenng')
  t.true(Object.keys(data).length > 0)
})
test('should recongize users followed by thousands (magie)', async t => {
  const data = await User.info('magie')
  t.true(data.follower > 1000)
})
