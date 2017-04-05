'use strict'
import test from 'ava'
let Topic = require('../').Topic

test('should return topic info object', async t => {
  const topicID = '19550461'
  const data = await Topic.getTopicTopAnswersByID(topicID)
  t.true(Object.keys(data).length > 0)
})
