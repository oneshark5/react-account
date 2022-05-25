import React from 'react'
import { useParams } from 'react-router-dom'
import CategorySelect from '../components/CategorySelect'
import PriceForm from '../components/PriceForm'

export default function Create() {
  const params = useParams()
  return (
    <div className='create-page py-3 px-3 rounded mt-3' style={{background: '#fff'}}>
      {/* <CategorySelect
        
      /> */}
      
      <PriceForm 
          onFormSubmit={submitForm}
          onCancelSubmit={cancelSubmit}
          item={editItem}
        />
    </div>
  )
}
