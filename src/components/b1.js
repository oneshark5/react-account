// import React, { useRef, useState } from 'react'
// import { isValidDate } from '../utility'

// export default function PriceForm(props) {
//   // 定义状态---用以动态改变状态给出提示信息
//   const [validatePass, setvalidatePass] = useState(true)//判断输入内容是否正确
//   const [errorMessage, seterrorMessage] = useState('')//给定错误提示信息

//   // 使用钩子函数useRef()
//   const titleInputRef = useRef('')
//   const priceInputRef = useRef(0)
//   const dateInputRef = useRef('')

//   // 定义事件处理函数
//   /**
//    * 当点击提交按钮时，执行事件处理函数，判断表单的情况，给出提示信息；
//    * 输入正确的话就调用回调函数，并传值给父组件
//    */
//   const sumbitForm = (event) => {
//     // 清除表单默认事件
//     event.preventDefault()

//     // 解构---父组件Create会传过来三个属性
//     const { item, onFormSubmit } = props
//     // 判断变量 item.id为非空，未定义或者非空串，则将值赋给editMode
//     const editMode = !!item.id
//     // 使用ref所获得的值---🦈
//     const price = titleInputRef.current.value
//     const date = dateInputRef.current.value
//     const title = titleInputRef.current.value

//     // 逻辑判断
//     if(price && date && title){
//       if(price < 0) {
//         setvalidatePass(false)
//         seterrorMessage('价格数字必须大于0')
//       }else if (!isValidDate(date)) {
//         setvalidatePass(false)
//         seterrorMessage('请填写正确的日期格式')
//       }else{
//         setvalidatePass(true)
//         seterrorMessage('')
//         // 调用回调函数---传入参数给父
//         // 存在就添加，不存在就创建
//         if(editMode){
//           onFormSubmit({...item, title, price, date}, editMode)
//         }else{
//           onFormSubmit({title, price, date}, editMode)
//         }
//       }
//     }else{
//       // 输入框未全部填入
//       setvalidatePass(false)
//       seterrorMessage('请输入所有必选项')
//     }
//   }


//   return (
//     <div>
//       {/* 提交，则调用回调函数，子传父 */}
//       <form onSubmit={(event) => sumbitForm(event)} noValidate >
//         <div className="form-group">
//           <label htmlFor="title">标题 *</label>
//           <input 
//             type="text" className="form-control" 
//             id="title" placeholder="请输入标题"
//             defaultValue={title}
//             ref={titleInputRef}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="price">价格 *</label>
//           <div className="input-group">
//             <div className="input-group-prepend">
//               <span className="input-group-text">¥</span>
//             </div>
//             <input 
//               type="number" 
//               className="form-control" 
//               defaultValue={price}
//               id="price" placeholder="请输入价格" 
//               ref={priceInputRef}  
//             />
//           </div>
//         </div>
//         <div className="form-group">
//           <label htmlFor="date">日期 *</label>
//           <input 
//             type="date" className="form-control" 
//             id="date" placeholder="请输入日期"
//             defaultValue={date}
//             ref={dateInputRef}  
//           />
//         </div>
//         <button type="submit" className="btn btn-primary mr-3">提交</button>
//         <button className="btn btn-secondary" > 取消 </button>
//         {/* { !this.state.validatePass &&
//           <div className="alert alert-danger mt-5" role="alert">
//             {this.state.errorMessage}
//           </div>
//         } */}
//       </form>
//     </div>
//   )
// }
