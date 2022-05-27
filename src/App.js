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
  // 添加状态---定义数据
  const [states, setstates] = useState({
    items:flatternArr(testItems),
    categories:flatternArr(testCategories)
  })
  console.log(states.items);

  // 删除变量
  const actions = {
    // const filteredItems = itemdb.filter(item => item.id !== deletedItem.id)
    // setitemdb(filteredItems)
    deleteItem:(item) => {

    },
    createItem:(data, categoryId) => {
      console.log(data);
      console.log(categoryId);
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
