import React, { useEffect, useState } from 'react'
// import logo from '../logo.svg'
// import { TYPE_INCOME, TYPE_INCOME, LIST_VIEW, CHART_VIEW, padLeft, range, equal } from '../utility'
import { TYPE_INCOME, TYPE_OUTCOME, LIST_VIEW, CHART_VIEW, parseToYearAndMonth, padLeft } from '../utility'

import PriceList from '../components/PriceList'
import 'bootstrap/dist/css/bootstrap.min.css'
import ViewTab from '../components/ViewTab'
import MonthPicker from '../components/MonthPicker'
import TotalPrice from '../components/TotalPrice'
import CreateBtn from '../components/CreateBtn'

// 定义的数据可以放在外面，因为数据本就是函数对象
// ===========================🦈原始数据===================//
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
      'date': '2022-05-24',
      'cid':1
    },
    {
      'id': '2',
      'title': '理财收入',
      'price': 1000,
      'date': '2022-05-25',
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
  const [currentDate, setcurrentDate] = useState(parseToYearAndMonth)//注意：在测试时，把这个初始时间写死，以防测试时每次都不同
  const [tabView, settabView] = useState(LIST_VIEW)

    // ===========================🦈数据处理===================//
    // 缺点---每次渲染都会处理一遍数据 
    // 处理数据结构，将items和category链接---⭐然后过滤出选择月份对应的记录
    const itemsWithCategory = itemdb.map(item => {
      item.category = categories[item.cid]
      return item
    }).filter(item => {
      return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
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
  const changeDate = (year, month) => {
    setcurrentDate({year,month})
  }

  // 编辑---只编辑title
  const modifyItem = (modifiedItem) => {
    // 遍历整个数据，找到对应的要更改的数据，然后修改title
    const modifiedItems = itemdb.map((item) => {
      if(item.id === modifiedItem.id){
        return {...item, title:'该标题被更新'}
      }else{
        return item
      }
    })
    // 更新后，重新设置状态
    setitemdb(modifiedItems)
  }

  // 添加数据
  const createItem = () => {
    setitemdb([newItem, ...itemdb])
  }

  // 删除数据：两种方法，一是采用splice，二是采用函数式的方法
  // 方法一:需要知道传过来的是第一个数据，但是这里仅传入了数据
  // const deleteItem = (deletedItem) => {
  //   // 取出要删除元素对应的下标（是第几个）
  //   let index = 0 
  //   for(let i=0; i<itemdb.length; i++){
  //     if(deletedItem.id === i){
  //       index = i
  //     }
  //   }
  //   let newlist = [...itemdb]
  //   newlist.splice(index, 1)
  //   setitemdb(newlist)
  // }
  
  // 方法二：采用filter
  const deleteItem = (deletedItem) => {
    // 将不删除的元素筛选出来
    const filteredItems = itemdb.filter(item => item.id !== deletedItem.id)
    setitemdb(filteredItems)
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
