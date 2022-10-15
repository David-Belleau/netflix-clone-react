import React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import './Netflix.css'

const LoadingFullScreen = () => {
  return (
    <div>
      <div role="alert" className="circularProgress">
        <Backdrop open={true}>
          <CircularProgress color="secondary" />
        </Backdrop>
      </div>
    </div>
  )
}

export default LoadingFullScreen
