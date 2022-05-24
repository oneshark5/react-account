import React from 'react'
import 'boxicons'
import PropTypes from 'prop-types'

import { LIST_VIEW, CHART_VIEW } from '../utility'

// 通过activeTab动态计算className以确定高亮的列表
function ViewTab({ activeTab, onTabChange }) {
  // 高亮切换函数
  const generatorLinkClass = (current, view) => {
    return (current === view ? 'nav-link active' : 'nav-link')
  }
  return (
    <ul className='nav nav-tabs nav-fill my-4'>
      <li className='nav-item'>
        <a className={generatorLinkClass(activeTab, LIST_VIEW)} href="#"
          onClick={
            (event) => {event.preventDefault();
            onTabChange(LIST_VIEW)
          }}
        >
          <box-icon name='list-ul'
            className="rounded-circle mr-2"
            type='solid' color='#28a745'
            size='22px' pull = "left"
          ></box-icon>
          列表模式
          {/* <box-icon name='list-ul'></box-icon> */}
        </a>
      </li>

      <li className='nav-item'>
        <a className={generatorLinkClass(activeTab, CHART_VIEW)} href="#"
          onClick={
            (event) => {event.preventDefault();
            onTabChange(CHART_VIEW)
          }}
        >
          <box-icon name='pie-chart'
            className="rounded-circle mr-4"
            type='solid' color='#28a745'
            size='22px' pull = "left"
          ></box-icon>
          图表模式
        </a>
      </li>
    </ul>
  )
}
// 属性检查
ViewTab.prototypes = {
  activeTab:PropTypes.func.isRequired,
  onTabChange:PropTypes.func.isRequired
}

export default ViewTab