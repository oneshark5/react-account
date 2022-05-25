// 展示型组件，浅渲染
/**
 * descirbe()描述测试用例的集合
 */
 import React from 'react'
 import Enzyme from 'enzyme'
 import Adapter from 'enzyme-adapter-react-16'
import TotalPrice from '../TotalPrice'

const { shallow } = Enzyme
Enzyme.configure({ adapter: new Adapter() })

// 待传入测试组件的参数
const props =  {
  income:1000,
  outcome:2000
}

describe('TotalPrice组件相关测试', () => {
  it('测试组件渲染income&outcome是否正确', () => {
    // 调用shallow进行浅渲染
    const wrapper = shallow(<TotalPrice {...props} />)
    // 确定要测试的内容为什么类型
    // const wrapperincome = wrapper.find('.income span').text() * 1
    // const wrapperoutcome = wrapper.find('.outcome span').text() * 1

    // 判断值是否和测试用例的值一致
    expect(wrapper.find('.income span').text() * 1).toEqual(1000)
    expect(wrapper.find('.outcome span').text() * 1).toEqual(2000)
  })
})

// const props = {
//   income:1000,
//   outcome:2000
// }

// describe('test TotalPrice component', () => {
//   it('component shounld render correct income&outcome number', () => {
//     const wrapper = shallow(<TotalPrice {...props} />)
//     expect(wrapper.find('.income span').text() * 1).toEqual(1000)
//     expect(wrapper.find('.outcome span').text() * 1).toEqual(2000)
//   })
// })