import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { equal, padLeft } from '../utility'
import { range } from '../utility'

function MonthPicker(props) {
  // 解构
  const { year, month, onChange } = props

  // 添加状态 下拉菜单、年份高亮、月份
  const [isOpen, setisOpen] = useState(false)
  const [selectedYear, setselectedYear] = useState(year)
  const [selectedMon, setselectedMon] = useState(month)
  const nodeRef = useRef()

  const monthRange = range(12, 1)
  const yearRange = range(9, -4).map(number => number + year)

  // // 副作用函数---处理点击空白区域关闭组件
  // useEffect(() => {
  //   // 给click添加点击监听事件
  //   document.addEventListener('click', handleClick, false)
  // })
  // const handleClick = (event) => {
  //   console.log(nodeRef.current);
  //   console.log(event.target);
  //   // 逻辑：点击就触发，当
  //   if(nodeRef.contains(event.target)){
  //     return
  //   }
  //   setisOpen(false)
  // }

  // 事件处理函数
  const selectYear = (yearNumber) => {
    setselectedYear(yearNumber)
  }

  const selectMonth = (event, monthNumber) => {
    // 添加event，清除响应事件默认行为
    event.preventDefault()
    setselectedMon(monthNumber)//
    // 一、关闭下拉菜单
    setisOpen(false)
    // 二、根据改变，MonthPicker做出响应改变---🦈子传父---由调用父组件的回调函数实现
    onChange(selectedYear, monthNumber)
  }

  return (
    <div className='dropdown month-picker-component' ref={nodeRef} >
      <h4>选择月份</h4>
      {/* btn-lg大小 btn-secondary灰色 dropdown-toggle */}
      <button className='btn btn-lg btn-secondary dropdown-toggle'
        onClick={() => setisOpen(!isOpen)}
      >
        {selectedYear}年{padLeft(selectedMon)}月
      </button>

      {/* 下拉菜单 */}
      {/* bootstrap默认添加display:none */}
      {
        isOpen &&
        <div className='dropdown-menu' style={{ display: 'block' }}>
          <div className="row">
            <div className="col border-right">
              {
                yearRange.map((yearNumber, index) =>
                  <a href="#" key={index}
                    className={equal(yearNumber, selectedYear)} 
                    onClick = {() => 
                      selectYear(yearNumber)
                    }
                  >
                    {yearNumber}年
                  </a>
                )
              }
            </div>
            {/* ==============月========== */}
            <div className="col">
              {
                monthRange.map((monthNumber, index) =>
                  <a href="#" key={index}
                    className={equal(monthNumber, selectedMon)} 
                    onClick = {
                      (event) => {
                        selectMonth(event, monthNumber)
                      }
                    }  
                  >
                    {padLeft(monthNumber)}月
                  </a>
                )
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}

// 属性检查每次都在最后才写，有屁用啊
MonthPicker.propTypes = {
  year:PropTypes.number.isRequired,
  month:PropTypes.number.isRequired,
  onChange:PropTypes.func.isRequired
}
export default MonthPicker