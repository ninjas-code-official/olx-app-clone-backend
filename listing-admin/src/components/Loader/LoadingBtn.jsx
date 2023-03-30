import React from 'react'
import Loader from 'react-loader-spinner'

const LoadingBtn = (props) => (
  <div>
    <Loader type="ThreeDots" color="#FFF" height={props.height} width={props.width} />
  </div>
)

export default LoadingBtn
