import React from 'react'
import { Colors } from '../utility'
import 'boxicons'
const Loader = () => (
  <div className="loading-component text-center">
    <box-icon 
      name='refresh'
      fontSize="25px"
      color={Colors.blue}
      animation='spin'
    />
    
    <h5>加载中</h5>
  </div>
)

export default Loader


// WEBPACK FOOTER //
// ./src/components/Loader.js