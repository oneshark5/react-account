import React from 'react'
import PriceList from './components/PriceList'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function App() {
  // 数据结构 
  const items = [
    {
      'id':'1',
      'title':'北京旅游',
      'price':2000,
      'date':'2020-02-02',
      'category':{
        'id':'1',
        'name':'旅游',
        'type':'outcome',
        'iconName':"ios-plane"
      }
    },
    {
      'id':'2',
      'title':'上海旅游',
      'price':3000,
      'date':'2020-02-03',
      'category':{
        'id':'1',
        'name':'旅游',
        'type':'outcome',
        'iconName':"ios-plane"
      }
    },

  ]
  return (
    <div>
      <PriceList
        items={items}
         onModifyItem={(item) => {alert(item.id)}}
         onDeleteItem={(item) => {alert(item.id)}}
      />
    </div>
  )
}
