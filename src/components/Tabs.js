import React, { useState } from 'react'

// =================⭐⭐⭐有错误，后面改⭐⭐⭐======
// 采用插槽重构Tab组件
export default function Tabs({ children, activeIndexs, onTabChange }) {

  // 状态
  const [activeIndex, setactiveIndex] = useState(activeIndexs)

  // 回调函数
  const tabChange = (event, index) => {
    event.preventDefault()
    setactiveIndex(index)
    onTabChange(index)
  }

  return (
    <ul className="nav nav-tabs nav-fill my-4">
      {
        React.Children.map(children, (child, index) => {
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

// export const Tab = ({ children }) => 
// <React.Fragment>{children}</React.Fragment>