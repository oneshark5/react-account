import React, { useContext, useState } from 'react'
// import { useParams } from 'react-router-dom'
import CategorySelect from '../components/CategorySelect'
// import { Tabs, Tab } from '../components/Tabs'
import Tabs from '../components/Tabs'
import Tab from '../components/Tab'
import { AppContext } from '../App'
import { testCategories, testItems } from '../testDate'
import { TYPE_OUTCOME } from '../utility'
import PriceForm from '../components/PriceForm'
import { useNavigate } from 'react-router-dom'


function Create(props) {

  // 定义状态
  const [selectedTab, setselectedTab] = useState(TYPE_OUTCOME)
  const [selectedCategory, setselectedCategory] = useState(null)

  // 重定向
  const navigate = useNavigate()

  // 使用Context---useContext方法
  const { states, actions } = useContext(AppContext)
  // 对取出的数据进行解构
  const { items, categories } = states
  // 获取id
  const params = useParams()
  // const filterCategories = testCategories.filter(category => category.type === TYPE_OUTCOME)
  const filterCategories = Object.keys(categories)
    .filter(id => categories[id].type === selectedTab)
    .map(id => categories[id])

  // 事件处理函数
  // const tabChange = (index) => {
  //   setselectedTab(tabsText[index])
  // }
  const selectCategory = (category) => {
    setselectedCategory(category)
  }
  const cancelSubmit = () => {
    navigate('/')
  }

  const submitForm = (data, isEditMode) => {
    // if (!selectedCategory) {
    //   this.setState({
    //     validationPassed: false
    //   })
    //   return
    // }
    if (!isEditMode) {
      // 检查是否选择分类
      if (!selectedCategory) {
        setvalidationPassed(false)
        return
      }
      // create
      actions.createItem(data, selectedCategory.id).then(navigateToHome)
    } else {
      // update 
      actions.updateItem(data, selectedCategory.id).then(navigateToHome)
    }
  }
  const navigateToHome = () => {
    navigate('/')
  }


  return (
    <AppContext.Consumer>
      {
        (state) => {
          console.log(state)
          return (
            <div className='create-page py-3 px-3 rounded mt-3' style={{ background: '#fff' }}>
              {/* 采用了插槽 */}
              <Tabs activeIndex={0} onTabChange={() => { }}>
                <Tab>支出</Tab>
                <Tab>收入</Tab>
              </Tabs>

              <CategorySelect
                categories={filterCategories}
                onSelectCategory={selectCategory}
              />

              <PriceForm
                onFormSubmit={submitForm}
                onCancelSubmit={cancelSubmit}
                item={testItems}
              />
            </div>
          )
        }
      }
    </AppContext.Consumer>
  )
}

export default Create


