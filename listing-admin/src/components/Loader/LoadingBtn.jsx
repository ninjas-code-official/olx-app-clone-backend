import React from 'react'
import {ThreeDots} from 'react-loader-spinner'

const LoadingBtn = (props) => (
  <div>
    <ThreeDots color="#FFF" height={props.height} width={props.width} />
  </div>
)

export default LoadingBtn
