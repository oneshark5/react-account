import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { equal, padLeft } from '../utility'
import { range } from '../utility'

function MonthPicker(props) {
  // 解构
  const { year, month, onChange } = props

  const monthRange = range(12, 1)
  const yearRange = range(9, -4).map(number => number + year)


  // 添加状态 下拉菜单、年份高亮、月份
  const [isOpen, setisOpen] = useState(false)
  const [selectedYear, setselectedYear] = useState(year)
  const [selectedMon, setselectedMon] = useState(month)

  // 事件处理函数
  const selectYear = (yearNumber) => {
    setselectedYear(yearNumber)
  }
  const selectMonth = (event, monthNumber) => {
    // 添加event，清除响应事件默认行为
    event.preventDefault()
    // 一、关闭下拉菜单
    setisOpen(false)
    // 二、根据改变，MonthPicker做出响应改变---🦈子传父---由调用父组件的回调函数实现
    onChange(selectedYear, monthNumber)
  }

  return (
    <div className='dropdown month-picker-component'>
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