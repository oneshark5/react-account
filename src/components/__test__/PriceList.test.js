/**
 * 所测试的三个内容
- 传入特定数组，是否渲染对应长度的条目
- 每个条目是否渲染特定组件和内容
- 点击按钮是否触发特定回调
 */
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PriceList from '../PriceList'
import { items, categories } from '../../containers/Home'

const { shallow } = Enzyme
Enzyme.configure({ adapter: new Adapter() })

const itemsWithCategory = itemdb.map(item => {
  item.category = categories[item.cid]
  return item
}).filter(item => {
  return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
})

const props = {
  items:itemsWithCategory,
  onModifyItem: () => {},
  onDeleteItem: () => {}
}

let wrapper
describe('测试PriceList组件', () => {
  beforeEach(() => {
    wrapper = shallow(<PriceList {...props} />)
  })
  it('组件快照测试', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('列表长度测试', () => {
    expect(wrapper.find('.list-grop-flush').length).toEqual(itemsWithCategory.length)
  })
})