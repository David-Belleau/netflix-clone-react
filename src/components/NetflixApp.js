import {React, useState} from 'react'
import {NavBar} from './NavBar'
import {Row} from './Row'
import {Footer} from './Footer'
import {Header} from './Header'
import './Netflix.css'
import {getRandomType, getRandomId} from '../utils/helper'
import {useFiction} from '../utils/hooksFiction'
import {TYPE_MOVIE, TYPE_TV} from '../config'

const NetflixApp = ({logout}) => {
  const [type] = useState(getRandomType())
  const [defaultMovieId] = useState(getRandomId(type))

  const headerFiction = useFiction(type, defaultMovieId)

  return (
    <div>
      <NavBar logout={logout} />
      <Header fiction={headerFiction} type={type} />
      <Row
        wideImage={true}
        type={TYPE_MOVIE}
        filter="trending"
        title="Films Netflix"
      />
      <Row
        wideImage={false}
        type={TYPE_TV}
        filter="trending"
        title="Séries Netflix"
      />

      <Row
        type={TYPE_MOVIE}
        filter="toprated"
        title="Les mieux notés"
        wideImage={true}
      />

      <Row
        type={TYPE_TV}
        filter="genre"
        param="10759"
        title="Action & aventure"
        wideImage={true}
      />

      <Row
        type={TYPE_MOVIE}
        filter="genre"
        param="53"
        title="Les meilleurs Thriller"
        wideImage={false}
      />
      <Footer color="secondary" si />
    </div>
  )
}

export {NetflixApp}
