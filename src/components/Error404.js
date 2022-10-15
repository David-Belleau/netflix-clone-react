import React from 'react'
import {imageError} from '../utils/helper'
import {NavBar} from './NavBar'
import {Link} from 'react-router-dom'
import {Footer} from './Footer'
import './Netflix.css'

const Error404 = () => {
  return (
    <>
      <div style={imageError}>
        <NavBar />
        <div role="alert" className="error__content">
          <h1>Vous cherchez votre chemin ?</h1>
          <p>Erreur 404</p>
          <div className="banner__buttons">
            <Link to="/">
              <button className="banner__button banner__button--white">
                Accueil
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="error__footer">
        <Footer />
      </div>
    </>
  )
}

export default Error404
