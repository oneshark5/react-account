import React from 'react'
import PropTypes from 'prop-types'
import 'boxicons'

const CreateBtn = ({ onClick }) => (
  <button
    className="btn btn-primary btn-block d-flex justify-content-center align-items-center" 
    onClick={(e) => {onClick()}}
  >
    <box-icon name='book-add'
      
    />
    创建一条新的记账记录
  </button>
)

CreateBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
}
export default CreateBtn


// WEBPACK FOOTER //
// ./src/components/CreateBtn.js