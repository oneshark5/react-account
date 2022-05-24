import React, { useEffect } from 'react'
import 'boxicons'
// 添加PropTypes属性进行类型检查
import PropTypes from 'prop-types'

function PriceList({ items, onModifyItem, onDeleteItem }) {
  return (

    <ul className='list-group list-grop-flush'>
      {
        items.map((item) => (
          <li key={item.id}
            className="list-group-item d-flex 
            justify-content-between align-items-center
          ">
            {/* 分类 */}
            <span className="col-1 badge-primary">
            <box-icon 
            type='solid' name={item.category.iconName}
            size='25px' color='blue'
            />
              
            </span>
            {/* title */}
            <span className="col-5">{item.title}</span>
            {/* 价格：粗体 */}
            <span className="col-2 font-weight-bold">
              {/* 加上三元表达式，判断是支出还是收入 */}
              {(item.category.type === 'income' ? '+' : '-')}
              {item.price}元
            </span>
            {/* 日期 */}
            <span className="col-2">{item.date}</span>

            {/* 编辑 */}
            <a className="col-1 btn"
              onClick={() => { onModifyItem(item) }}
            >
            <box-icon name='edit-alt'
              className="rounded-circle"
              type='solid' size='25px' color='#28a745'
            ></box-icon>
            {/* 删除 */}
            </a>
            <a className="col-1 btn"
              onClick={() => { onDeleteItem(item) }}
            >
            <box-icon name='hide'
              type='solid' size='25px' color='#dc3545'
            ></box-icon>
            </a>
          </li>
        ))
      }
    </ul>
  )
}

// 添加属性检查
PriceList.propTypes = {
  item:PropTypes.array.isRequired,
  onModifyItem:PropTypes.func.isRequired,
  onDeleteItem:PropTypes.func.isRequired,
}
// 添加默认属性
PriceList.propTypes = {
  onModifyItem: () => {}
}

export default PriceList