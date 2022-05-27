import React from 'react'
import { useParams } from 'react-router-dom'
import CategorySelect from '../components/CategorySelect'
// import PriceForm from '../components/PriceForm'
import Tabs from '../components/Tabs'

export default function Create() {
  const params = useParams()
  return (
    <div className='create-page py-3 px-3 rounded mt-3' style={{ background: '#fff' }}>
      {/* 采用了插槽 */}
      {/* <Tabs activeIndex={tabIndex} onTabChange={this.tabChange}>
        <Tab>支出</Tab>
        <Tab>收入</Tab>
      </Tabs> */}
      <Tabs activeIndex={0} onTabChange={() => {}}>
        <Tab>支出</Tab>
        <Tab>收入</Tab>
      </Tabs>

      {/* <CategorySelect
        
      /> */}

      {/* <PriceForm 
          onFormSubmit={submitForm}
          onCancelSubmit={cancelSubmit}
          item={editItem}
        /> */}
    </div>
  )
}




