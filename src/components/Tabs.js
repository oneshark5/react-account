import React, { useState } from 'react'


// =================⭐⭐⭐有错误，后面改⭐⭐⭐======
// 采用插槽重构Tab组件
export default function Tabs({ tabs }) {

  // 状态
  const [activeIndex, setactiveIndex] = useState(tabs.activeIndex)

  // 回调函数
  const tabChange = (event, index) => {
    event.preventDefault()
    setactiveIndex(index)
    tabs.onTabChange(index)
  }

  return (
    <ul className="nav nav-tabs nav-fill my-4">
      {
        tabs.Children.map(children, (child, index) => {
          const activeClassName = (activeIndex === index) ? 'nav-link active' : 'nav-link'
          return (
            <li className="nav-item">
              <a
                onClick={(event) => tabChange(event, index)}
                className={activeClassName}
                role="button"
              >
                {child}
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}
