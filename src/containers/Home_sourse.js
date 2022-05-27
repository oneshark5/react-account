import React, { useContext, useState } from 'react'
// import logo from '../logo.svg'
// import { TYPE_INCOME, TYPE_INCOME, LIST_VIEW, CHART_VIEW, padLeft, range, equal } from '../utility'
import { TYPE_INCOME, TYPE_OUTCOME, LIST_VIEW, CHART_VIEW, parseToYearAndMonth, padLeft } from '../utility'

import PriceList from '../components/PriceList'
import 'bootstrap/dist/css/bootstrap.min.css'
import ViewTab from '../components/ViewTab'
import MonthPicker from '../components/MonthPicker'
import TotalPrice from '../components/TotalPrice'
import CreateBtn from '../components/CreateBtn'

// import { Tabs, Tab } from './components/Tabs'

import { AppContext } from '../App'
import { useNavigate } from 'react-router-dom'

const tabsText = [LIST_VIEW, CHART_VIEW]

const Home = (props) => {
  // 定义状态
  const [currentDate, setcurrentDate] = useState(parseToYearAndMonth('2022/05/27'))//注意：在测试时，把这个初始时间写死，以防测试时每次都不同
  const [tabView, settabView] = useState(tabsText[0])

  // 重定向
  const navigate = useNavigate()

  // 使用Context---useContext方法
  const { states, actions } = useContext(AppContext)
  const [items, categories] = states
  // 数据处理
  const itemsWithCategory = Object.keys(items).map(id => {
    items[id].category = categories[items[id].cid]
    return items[id]
  }).filter(item => {
    return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
  })
  // 计算收入和支出总和
  let totalIncome = 0, totalOutcome = 0
  itemsWithCategory.forEach(item => {
    if (item.category.type === TYPE_OUTCOME) {
      totalOutcome += item.price
    } else {
      totalIncome += item.price
    }
  })
  // ===========================🦈数据交互===================//
  // ？？？？？事件处理函数
  // 实现列表模式
  const changeView = (index) => {
    settabView(tabsText[index])
  }
  const changeDate = (year, month) => {
    setcurrentDate({ year, month })
  }

  // 编辑---价格列表:跳转到create界面
  const modifyItem = (item) => {
    // // 遍历整个数据，找到对应的要更改的数据，然后修改title
    // const modifiedItems = itemdb.map((item) => {
    //   if (item.id === modifiedItem.id) {
    //     return { ...item, title: '该标题被更新' }
    //   } else {
    //     return item
    //   }
    // })
    // // 更新后，重新设置状态
    // setitemdb(modifiedItems)

    // 跳转编辑页面
    navigate(`/edit/${item.id}`)
  }

  // 添加数据:跳转到create界面
  const createItem = () => {
    // setitemdb([newItem, ...itemdb])
    // 采用navigate实现跳转
    navigate('/create')//实现跳转
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
  const deleteItem = (item) => {
    // // 将不删除的元素筛选出来
    // const filteredItems = itemdb.filter(item => item.id !== deletedItem.id)
    // setitemdb(filteredItems)
    console.log(item);
    actions.deleteItem(item)
  }

  return (
    <React.Fragment>
      <header className='App-header' style={{ backgroundColor: '#bfa' }}>
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

        {/* 采用Tabs */}
        {/* <Tabs activeIndex={0} onTabChange={()=>{}}>
                  <Tab>1st item</Tab>
                  <Tab>2st item</Tab>
                </Tabs> */}

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
    </React.Fragment>
  )
}

export default Home