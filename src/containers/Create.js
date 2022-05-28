import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import CategorySelect from '../components/CategorySelect'
// import { Tabs, Tab } from '../components/Tabs'
import Tabs from '../components/Tabs'
import Tab from '../components/Tab'
import { AppContext } from '../App'
import { testCategories, testItems } from '../testDate'
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility'
import PriceForm from '../components/PriceForm'
import { useNavigate } from 'react-router-dom'

const tabsText = [TYPE_INCOME, TYPE_OUTCOME]

function Create(props) {
  // ===========================⭐编辑页面⭐============
  // 获取路径参数id值---获取id
  const params = useParams()
  console.log(params.id);//未定义，因为路径中没用获得
  const editItem = (params.id && items[params.id]) ? items[params.id] : {}
  // 分类信息和tab高亮

  // 重定向
  const navigate = useNavigate()

  // 使用Context---useContext方法:获取根元素属性
  const { states, actions } = useContext(AppContext)
  // 对取出的数据进行解构
  const { items, categories } = states

   // 定义状态
   const TYPE = (params.id && items[params.id]) ? categories[items[params.id].cid].type : TYPE_OUTCOME
   const CATE = (params.id && items[params.id]) ? categories[items[params.id].cid] : null
   const [selectedTab, setselectedTab] = useState(TYPE)
   const [selectedCategory, setselectedCategory] = useState(CATE)

   const tabIndex = tabsText.findIndex(text => text === selectedTab)


  // 按分类提取 
  // const filterCategories = testCategories.filter(category => category.type === TYPE_OUTCOME)
  const filterCategories = Object.keys(categories)
    .filter(id => categories[id].type === selectedTab)
    .map(id => categories[id])


  // 事件处理函数
  // 根据tab改变，类型切换
  const tabChange = (index) => {
    setselectedTab(tabsText[index])
  }
  const selectCategory = (category) => {
    setselectedCategory(category)
  }
  const cancelSubmit = () => {
    navigate('/')//代码对，但为什么不能跳转
  }

  const submitForm = (data, isEditMode) => {
    if (!selectedCategory) {
      this.setState({
        validationPassed: false
      })
      return
    }
    console.log(data);
    if (!isEditMode) {
      actions.createItem(data, setselectedCategory.id).then(navigateToHome)
    }else{
      actions.updateItem(data, selectedCategory.id).then(navigateToHome)
    }
    const navigateToHome = () => {
      navigate('/')
    }
  }

  // const submitForm = (data, isEditMode) => {
  //     // if (!selectedCategory) {
  //     //   this.setState({
  //     //     validationPassed: false
  //     //   })
  //     //   return
  //     // }
  //     if (!isEditMode) {
  //       // 检查是否选择分类
  //       if (!selectedCategory) {
  //         setvalidationPassed(false)
  //         return
  //       }
  //       // create
  //       actions.createItem(data, selectedCategory.id).then(navigateToHome)
  //     } else {
  //       // update 
  //       actions.updateItem(data, selectedCategory.id).then(navigateToHome)
  //     }
  //   }
  //   const navigateToHome = () => {
  //     navigate('/')
  // }


  return (
    <div className='create-page py-3 px-3 rounded mt-3' style={{ background: '#fff' }}>
      {/* 采用了插槽 */}
      <Tabs activeIndex={tabIndex} onTabChange={tabChange}>
        <Tab>支出</Tab>
        <Tab>收入</Tab>
      </Tabs>

      <CategorySelect
        categories={filterCategories}
        onSelectCategory={selectCategory}
        selectCategory={selectedCategory}
      />

      <PriceForm
        onFormSubmit={submitForm}
        onCancelSubmit={cancelSubmit}
        item={editItem}
      />
    </div>
  )
}

export default Create
