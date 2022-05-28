import React, { useContext, useEffect, useState } from 'react'

import { TYPE_INCOME, TYPE_OUTCOME, LIST_VIEW, CHART_VIEW, parseToYearAndMonth, padLeft } from '../utility'

import PriceList from '../components/PriceList'
import 'bootstrap/dist/css/bootstrap.min.css'
import ViewTab from '../components/ViewTab'
import MonthPicker from '../components/MonthPicker'
import TotalPrice from '../components/TotalPrice'
import CreateBtn from '../components/CreateBtn'
import Loader from '../components/Loader'
import { AppContext } from '../App'
import { useNavigate } from 'react-router-dom'
import Tab from '../components/Tab'
import Tabs from '../components/Tabs'


const Home = (props) => {
  const tabsText = [LIST_VIEW, CHART_VIEW]
  // 使用Context---useContext方法
  const { states, actions } = useContext(AppContext)
  const { items, categories } = states
  // const { deleteItem } = actions
  const { isLoading } = useContext(AppContext)

  // 定义状态
  const [currentDate, setcurrentDate] = useState(parseToYearAndMonth('2022/05/27'))//注意：在测试时，把这个初始时间写死，以防测试时每次都不同
  const [tabView, settabView] = useState(tabsText[0])

  const navigate = useNavigate()

  useEffect(() => {
    actions.getInitalData().then(items => {
      console.log('hah',items);
    })
  }, [])

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

  const modifyItem = (item) => {
    navigate(`/edit/${item.id}`)
  }

  const createItem = () => {
    navigate('/create')
  }

  const deleteItem = (item) => {
    actions.deleteItem(item)
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
  // const deleteItem = (item) => {
  //   // // 将不删除的元素筛选出来
  //   // const filteredItems = itemdb.filter(item => item.id !== deletedItem.id)
  //   // setitemdb(filteredItems)
  //   console.log(item);
  //   actions.deleteItem(item)
  // }

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

        {
          isLoading && <Loader />
        }
        {
          !isLoading &&
          <React.Fragment>
            {/* Tabs示范 */}
            <Tabs acctiveIndex={0} onTabChange={changeView}>
              <Tab>
                <box-icon name='list-ul'
                  className="rounded-circle mr-2"
                  type='solid' color='#28a745'
                  size='22px' pull="left"
                ></box-icon>
                列表模式
              </Tab>
              <Tab>
                <box-icon name='pie-chart'
                  className="rounded-circle mr-4"
                  type='solid' color='#28a745'
                  size='22px' pull="left"
                ></box-icon>
                图表模式
              </Tab>
            </Tabs>

            {/* 创建按钮 */}
            <CreateBtn
              onClick={createItem}
            />
            {/* 数据列表：根据模式变化 */}
            {
              tabView === LIST_VIEW && itemsWithCategory.length > 0 &&
              <PriceList
                items={itemsWithCategory}
                onModifyItem={modifyItem}
                onDeleteItem={deleteItem}
              />
            }
            {
              tabView === LIST_VIEW && itemsWithCategory.length === 0 &&
              <div className='alert alert-light text-center'>
                您还没有任何记账记录
              </div>
            }
            {
              tabView === CHART_VIEW &&
              <h1 className='chart-title'>图表区域</h1>
            }
          </React.Fragment>
        }
      </div>
    </React.Fragment>
  )
}

export default Home