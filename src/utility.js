// 公用文件
export const LIST_VIEW ='list'
export const CHART_VIEW ='chart'

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