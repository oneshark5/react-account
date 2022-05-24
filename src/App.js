import React from 'react'
import PriceList from './components/PriceList'
import 'bootstrap/dist/css/bootstrap.min.css'
import ViewTab from './components/ViewTab'
import MonthPicker from './components/MonthPicker'


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
        'iconName':"cable-car"
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
        'iconName':"cable-car"
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
      <ViewTab 
        activeTab="chart"
        onTabChange={(view) => {console.log(view)}}
      />
      <MonthPicker
        year={2022}
        month={5}
        onChange={(year, month) => console.log(year, month)}
      />
    </div>
  )
}
 