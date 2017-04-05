/*
 * @author	Ivan Jiang
 * @date	23 May 2016
 */
import test from 'ava'
let Answer = require('../index').Answer

test('Answer Voters should return voters of the answe', async t => {
  const answerId = '35369006'
  const data = await Answer.voters(answerId)
  t.true(data.length > 0)
})
