import React from 'react'


export default function PriceList({ items, onModifyItem, onDeleteItem }) {
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
              {/* <Ionicon
                className='rounded-circle'
                fontSize='30px'
                style={{backgroundColor:'#007bff', padding:'5px'}}
                color={'#fff'}
                icon={item.category.iconName}
              /> */}
              {/* <LogoNodejs
                color={'#00000'}
                rotate
                height="250px"
                width="250px"
                onClick={() => alert('Hi!')}
              /> */}
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

            <button className="col-1 btn btn-primary"
              onClick={() => {onModifyItem(item)}}
            >
              编辑
            </button>
            <button className="col-1 btn btn-danger"
              onClick={() => {onDeleteItem(item)}}
            >
              删除
            </button>
          </li>
        ))
      }
    </ul>
  )
}
