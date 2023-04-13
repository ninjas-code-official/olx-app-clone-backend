import React from 'react'
import {TailSpin} from 'react-loader-spinner'

const CustomLoader = () => (
  <div style={{ padding: '50px' }}>
    <TailSpin  color="#002f34" height={120} width={120} />
  </div>
)

export default CustomLoader
