import React, { useState } from 'react'
import Home from './containers/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { flatternArr, ID, parseToYearAndMonth, padLeft } from './utility'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './containers/Create'

// import './App.css'

// 创建Contex对象
export const AppContext = React.createContext('')

export default function App() {
  // 添加状态---定义数据
  const [states, setstates] = useState({
    items:{},
    categories:{},
    currentDate:parseToYearAndMonth()
  })
  
  const [isLoading, setisLoading] = useState(false)

  const withLoading = (cb) => {
    return (...args) => {
      setisLoading(true)
      return cb(...args)
    }
  }

  // 删除变量
  const actions = {
    // 获取初始数据
    getInitalData: withLoading(async () => {
      // 只取当前月份的数据
      const {currentDate} = states
      console.log();
      const getURLWithData = `/items?monthCategory=${currentDate.year}-${padLeft(currentDate.month)}&_sort=timestamp&_order=desc`
      const results = await Promise.all([axios.get('/categories'), axios.get(getURLWithData)])

      const [categories, items] = results
      setstates({
        items:flatternArr(items.data),
        categories:flatternArr(categories.data)
      })
      return items
    }),

    getEditData:withLoading(async (id) => {
      let promiseArr = [axios.get('/categories')]
      if(id){
        const getURLWithID = `/items/${id}`
        promiseArr.push(axios.get(getURLWithID))
      }
      const [categories, editItem] = await Promise.all(promiseArr)
      if(id) {
        setstates({
          categories:flatternArr(categories.data),
          items:{...states.items, [id]:editItem.data}
        })
        setisLoading(false)
      }else{
        setstates({
          categories:flatternArr(categories.data)
        })
        setisLoading(false)
      }
      return {
        categories:flatternArr(categories.data),
        editItem: editItem ? editItem.data : null
      }
    }),

    // const filteredItems = itemdb.filter(item => item.id !== deletedItem.id)
    // setitemdb(filteredItems)
    deleteItem:async (item) => {
      const deleteItem = await axios.delete(`/states.items/${item.id}`)
      // 该方法好像不能删除元素
      // console.log(item);
      // console.log(states.items);
      // console.log(item.id)
      // console.log(states.items.length);
      return deleteItem
    },
    // 创建新数据
    createItem:(data, categoryId) => {
      console.log(data);
      console.log(categoryId);
      // 生成新的id
      const newId = ID()
      const parsedDate = parseToYearAndMonth(data.date)
      data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
      data.timestamp = new Date(data.date).getTime()
      const newItem = {...data, id:newId, cid:categoryId}
      setstates({
        items:{...states.items, [newId]:newItem}
      })
    },
    // 更新
    updateItem: (item, updatedCategoryID) =>{
      const modifedItem = {
        ...item,
        cid:updatedCategoryID,
        timestamp:new Date(item.date).getTime()
      }
      setstates({
        items:{...states.items, [modifedItem.id] : modifedItem}
      })
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
