import React from 'react'
import Loader from 'react-loader-spinner'

const CustomLoader = () => (
  <div style={{ padding: '50px' }}>
    <Loader type="TailSpin" color="#002f34" height={120} width={120} />
  </div>
)

export default CustomLoader
