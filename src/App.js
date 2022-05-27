import React, { useState } from 'react'
import Home from './containers/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { testItems, testCategories } from './testDate'
import { flatternArr } from './utility'

import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './containers/Create'

// import './App.css'

// 创建Contex对象
export const AppContext = React.createContext('')

export default function App() {
  // 添加状态
  const [states, setstates] = useState({
    items:flatternArr(testItems),
    categories:flatternArr(testCategories)
  })

  // 删除变量
  const actions = {
    deleteItem:(item) => {
      delete states.items[item.id]
      setstates(states.items)
    }
  }

  // const [categories, setcategories] = useState(flatternArr(testCategories))

  return (
    <AppContext.Provider value={{states, actions }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit/:id' element={<Create />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}
