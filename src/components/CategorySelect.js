import React, { useState } from 'react'
import 'boxicons'
import PropTypes from 'prop-types'

export default function CategorySelect(props) {
  // 解构
  const { categories, selectedCategory } = props
  const selectedCategoryId = selectedCategory && selectedCategory.id

  // 添加事件处理函数
  const selectCategory = (event, category) => {
    props.onSelectCategory(category)
    event.preventDefault()
  }

  return (
    <div className='category-select-component'>
      <div className='row'>
        {
          categories.map((category, index) => {
            const iconColor = (category.id === selectedCategoryId) ? '#fff' : '#555'
            const backColor = (category.id === selectedCategoryId) ? '#347eff' : '#efefef'
            {/* 高亮显示 */}
            const activeClassName = selectedCategoryId === category.id
            ? 'category-item col-3 active' : 'category-item col-3'
            
            return (
              <div className={activeClassName} key={index} role='button' style={{textAlign:'center'}}
                onClick={(event) => {selectCategory(event, category)}}
              >
                <box-icon name={category.iconName}
                  style={{backgroundColor:backColor, padding:'5px'}}
                  className="rounded-circle"
                  type='solid' size='25px' color='iconColor'
                />
                <p>{category.name}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
