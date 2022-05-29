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
      // console.log(currentDate);
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
      alert("确定要删除该条数据？？？"+item.title)
      // const deleteItem = await axios.delete(`/states.items/${item.id}`)
      // let strid = item.id
      // console.log(typeof(strid));//这俩可以
      // console.log(item);
      // console.log(states.items);
      // console.log(states.items.strid);
      // console.log(item.id)
      // console.log(Object.keys(states.items));//这俩可以
      // // return deleteItem

      // for(let itemsid in states.items){
      //   console.log(itemsid);
      //   console.log(states.items);
      //   const filteredItems = states.items.filter(item => item.id !== deletedItem.id)
      //   // const filteredItems = states.items.filter(item => item.id !== deletedItem.id)
      //   setstates({
      //     items:filteredItems
      //   })
      // }
    },
    // 创建新数据
    createItem: withLoading(async (data, categoryId) => {
      console.log(data);
      console.log(categoryId);
      // 生成新的id
      const newId = ID()
      const parsedDate = parseToYearAndMonth(data.date)
      data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
      data.timestamp = new Date(data.date).getTime()
      // const newItem = {...data, id:newId, cid:categoryId}
      const newItem = await  axios.post('/items', { ...data, id: newId, cid: categoryId })
      setstates({
        items:{...states.items, [newId]:newItem.data}
      })
      setisLoading(false)
      return newItem.data
    }),
    // 更新
    updateItem:withLoading( async (item, updatedCategoryID) =>{
      const modifiedItem = {
        ...item,
        cid:updatedCategoryID,
        timestamp:new Date(item.date).getTime()
      }
      const updatedItem = await axios.put(`/items/${modifiedItem.id}`, modifiedItem)
      setstates({
        items:{...states.items, [modifiedItem.id] : modifiedItem}
      })
      setisLoading(false)
      return updatedItem.data
    })

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
