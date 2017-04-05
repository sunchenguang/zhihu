import test from 'ava'
let Collection = require('../index').Collection

test('Collection get data by page', async t => {
  const url = 'https://www.zhihu.com/collection/25547043?page=1'
  const data = await Collection.getDataByPage(url)
  t.true(Object.keys(data).length > 0)
})
