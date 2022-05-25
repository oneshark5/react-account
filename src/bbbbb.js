import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Example from '../src/enzyme'

const { shallow } = Enzyme
Enzyme.configure({ adapter: new Adapter() })

describe('Example 组件相关',  ()=> {
    it('测试组件传值 文本是否符合预期',  ()=> {
        const button = '按钮名';
        const title = '标题';

        let app = shallow(<Example text={button} title={title}  />);
        
        const appButton = app.find('button').text();
        const appTitle =  app.find('#title').text();

        // 判断名称是否跟标签文本名称一致
        expect(button).toBe(appButton);
        expect(title).toBe(appTitle);
    })
})