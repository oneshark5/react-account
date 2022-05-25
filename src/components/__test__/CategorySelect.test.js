import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CategorySelect from '../CategorySelect'

const { shallow } = Enzyme
Enzyme.configure({ adapter: new Adapter() })

// 数据结构 
const categories = {
  "1":{
    'id': '1',
    'name': '旅游',
    'type': 'outcome',
    'iconName': "cable-car"
  },
  "2":{
    'id': '2',
    'name': '理财',
    'type': 'income',
    'iconName': "cable-car"
  }
}

let props = {
  categories,
  onSelectCategory:jest.fn()
}


describe('测试CategorySelect组件', () => {
  it('组件items测试', () => {
    const wrapper = mount(<CategorySelect {...props}/>)
    expect(wrapper.find('.category-item').length).toEqual(categories.length)
  })
})