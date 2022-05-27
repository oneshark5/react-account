import React from 'react'
import { AppContext } from './App'

// 高阶组件：接收一个组件并返回以一个新的组件
export default function WithContext(Component) {
  return (props) => (
    <AppContext.Consumer>
      {
        ({state}) => {
          return <Component {...props} data={state} />
        }
      }
    </AppContext.Consumer>
  )
}
