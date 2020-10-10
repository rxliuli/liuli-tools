import { CSVExportUtil } from './CSVExportUtil'
import { range } from '../array/range'

describe('测试 CSVExportUtil', () => {
  const numList = range(0, 10).map((i) => ({
    id: i,
    name: `第${i}个数`,
  }))
  it('测试 listToCSV', () => {
    const text = CSVExportUtil.listToCSV(numList, ['id', 'name'])
    expect(text).toBe(numList.map((num) => `${num.id},${num.name}\n`).join(''))
  })
  it.skip('基本示例', () => {
    const url = CSVExportUtil.exportByBlob(numList, [
      { field: 'id', label: 'ID' },
      { field: 'name', label: '名字' },
    ])
    console.log(url)
  })
})
