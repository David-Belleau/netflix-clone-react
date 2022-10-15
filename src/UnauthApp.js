import React from 'react'
import {LoginRegister} from './components/LoginRegister'

const UnauthApp = () => {
  const imageUrl = '/images/netflix_bg.jpg'

  return (
    <div
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <img
        src="/images/netflix_logo.png"
        alt="Logo de Netflix"
        className="body__bgc"
      />

      <div>
        <LoginRegister open={true} />
      </div>
    </div>
  )
}

export default UnauthApp
// React.lazy requires a default export
