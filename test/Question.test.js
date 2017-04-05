import test from 'ava'
let Question = require('../').Question

test('should return question object by settings', async t => {
  const data = await Question.answers({
    token: '19557271',
    offset: 0
  })
  t.true(Object.keys(data).length > 0)
})
test('should return question object, from 0 - 9 by default', async t => {
  const data = await Question.answers('19557271')
  t.true(Object.keys(data).length > 0)
})
