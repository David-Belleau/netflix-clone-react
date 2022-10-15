import React from 'react'
import {useNavigate} from 'react-router-dom'
import {imageError} from '../utils/helper'
import {NavBar} from './NavBar'
import {Footer} from './Footer'

const ErrorFallback = ({error, resetErrorBoundary}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
    resetErrorBoundary()
  }

  return (
    <>
      <div style={imageError}>
        <NavBar />
        <div role="alert" className="fallback__content">
          <h1>Vous cherchez votre chemin ?</h1>
          <p>
            Erreur : <br />
            {error.message}
          </p>
          <div className="banner__buttons">
            <button
              className="banner__button banner__button--white"
              onClick={handleClick}
            >
              Accueil
            </button>
          </div>
        </div>
      </div>
      <div className="error__footer">
        <Footer />
      </div>
    </>
  )
}

export default ErrorFallback
