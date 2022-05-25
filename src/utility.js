// 公用文件
export const LIST_VIEW ='list'
export const CHART_VIEW ='chart'
export const TYPE_INCOME ='income'
export const TYPE_OUTCOME ='outcome'

// 补全月份的0
export const padLeft = (n) => {
  return n < 10 ? '0'+n : n
}

// 生成年份和月份数组
// 接收两个参数 size表示数组大小，startAt表示起始位置
export const range = (size, startAt) => {
  const arr = []
  for(let i=0; i<size; i++){
    arr[i] = startAt + i
  }
  return arr
}

// 生成高亮
// 接收两个参数num和curNum
export const equal = (num, curNum) => {
  return num === curNum ? 'dropdown-item active' : 'dropdown-item'
}

// 取得当前年和月----自动生成现在的时间
export const parseToYearAndMonth = (str) => {
  const date = str ? new Date(str) : new Date()
  return {
    year:date.getFullYear(),
    month:date.getMonth()+1
  }
}