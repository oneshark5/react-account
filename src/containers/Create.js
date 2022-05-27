import React from 'react'
// import { useParams } from 'react-router-dom'
import CategorySelect from '../components/CategorySelect'
// import { Tabs, Tab } from '../components/Tabs'
import Tabs from '../components/Tabs'
import Tab from '../components/Tab'
import  {AppContext}  from '../App'
import { testCategories, testItems } from '../testDate'
import { TYPE_OUTCOME } from '../utility'
import PriceForm from '../components/PriceForm'


export default function Create() {
  // const params = useParams()
  const filterCategories = testCategories.filter(category => category.type === TYPE_OUTCOME)
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
                onSelectCategory={() => { }}
              />

              <PriceForm
                onFormSubmit={() => { }}
                onCancelSubmit={() => { }}
                item={testItems}
              />
            </div>
          )
        }
      }
    </AppContext.Consumer>

  )
}




