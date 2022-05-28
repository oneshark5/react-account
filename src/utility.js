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

// 有效的日期格式
export const isValidDate = (dateString) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;//正则表达式
  if(!dateString.match(regEx)) return false;  // Invalid format
  const d = new Date(dateString);
  if(Number.isNaN(d.getTime())) return false; // Invalid date
  return d.toISOString().slice(0,10) === dateString;
}

// 将数组铺平flattern---reduce()方法；reduce(prvVal, curVal)
export const flatternArr = (arr) => {
  return arr.reduce((map, item) => {
    map[item.id] = item
    return map
  }, {})
}

// 生成id
export const ID = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
}

export const Colors = {
  blue: '#347eff',
  deepBlue: '#61dafb',
  green: '#28a745',
  red: '#dc3545',
  gray: '#555',
  lightGray: '#efefef',
  white: '#fff',
}
