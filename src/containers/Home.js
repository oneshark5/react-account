import React, { useEffect, useState } from 'react'
// import logo from '../logo.svg'
// import { TYPE_INCOME, TYPE_INCOME, LIST_VIEW, CHART_VIEW, padLeft, range, equal } from '../utility'
import { TYPE_INCOME, TYPE_OUTCOME, LIST_VIEW, CHART_VIEW, parseToYearAndMonth } from '../utility'

import PriceList from '../components/PriceList'
import 'bootstrap/dist/css/bootstrap.min.css'
import ViewTab from '../components/ViewTab'
import MonthPicker from '../components/MonthPicker'
import TotalPrice from '../components/TotalPrice'
import CreateBtn from '../components/CreateBtn'

// 定义的数据可以放在外面，因为数据本就是函数对象
// ===========================🦈数据处理===================//
  // 数据结构 
  const categories = {
    "1":{
      'id': '1',
      'name': '旅游',
      'type': 'outcome',
      'iconName': "cable-car"
    },
    "2":{
      'id': '2',
      'name': '理财',
      'type': 'income',
      'iconName': "cable-car"
    }
  }

  const items = [
    {
      'id': '1',
      'title': '北京旅游',
      'price': 2000,
      'date': '2020-05-24',
      'cid':1
    },
    {
      'id': '2',
      'title': '理财收入',
      'price': 1000,
      'date': '2020-05-25',
      'cid':2
    },
  ]

  // 新建记录数据
  const newItem = {
    'id':4,
    'title':'新添加的项目',
    'price':300,
    'date':'2022-06-01',
    'cid':1
  }
  
  

export default function Home() {
  // 定义状态
  const [itemdb, setitemdb] = useState(items)
  const [currentDate, setcurrentDate] = useState(parseToYearAndMonth)
  const [tabView, settabView] = useState(LIST_VIEW)

  // ===========================🦈数据处理===================//
  // 处理数据结构，将items和category链接
  const itemsWithCategory = itemdb.map(item => {
    item.category = categories[item.cid]
    return item
  })
  
  // 计算收入和之处总和
  let totalIncome = 0, totalOutcome = 0;
  itemsWithCategory.forEach(item => {
    if(item.category.type === TYPE_INCOME) totalIncome += item.price
    else if(item.category.type === TYPE_OUTCOME) totalOutcome += item.price
  })

  // ===========================🦈数据交互===================//
  // ？？？？？事件处理函数
  // 实现列表模式
  const changeView = (view) => {
    settabView(view)
  }
  const changeDate = () => {
    
  }

  const modifyItem = () => {
    
  }

  // 添加数据
  const createItem = () => {
    setitemdb([newItem, ...itemdb])
  }
  const deleteItem = () => {
    
  }


  return (
    <>
      <header className='App-header' style={{backgroundColor:'#bfa'}}>
        <div className="row mb-5">
          {/* <img src={logo} alt="logo" /> */}
        </div>
        <div className="row">
          <div className="col">
            <MonthPicker
              year={currentDate.year}
              month={currentDate.month}
              onChange={changeDate}
            />
          </div>
          <div className="col">
            <TotalPrice 
              income={totalIncome}
              outcome={totalOutcome}
            />
          </div>
        </div>
      </header>

      <div className="content-area py-3 px-3">
        {/* 模式 */}
        <ViewTab
          activeTab={tabView} onTabChange={changeView}
        />
        {/* 创建按钮 */}
        <CreateBtn
          onClick={createItem}
        />
        {/* 数据列表：根据模式变化 */}
        {
          tabView === LIST_VIEW && 
          <PriceList
            items={itemsWithCategory}
            onModifyItem={modifyItem}
            onDeleteItem={deleteItem}
          />
        }
        {
          tabView === CHART_VIEW && 
          <h1>图标区域</h1>
        }
      </div> 
    </>
    // <div>
    //   <PriceList
    //     items={items}
    //     onModifyItem={(item) => { alert(item.id) }}
    //     onDeleteItem={(item) => { alert(item.id) }}
    //   />
    //   <ViewTab
    //     activeTab="chart"
    //     onTabChange={(view) => { console.log(view) }}
    //   />
    //   <TotalPrice />
    //   <MonthPicker
    //     year={2022}
    //     month={5}
    //     onChange={(year, month) => console.log(year, month)}
    //   />
    // </div>
  )
}
