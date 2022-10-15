import {React, useState} from 'react'
import {TYPE_MOVIE} from '../config'
import {getRandomId} from '../utils/helper'
import {useFiction} from '../utils/hooksFiction'
import {NavBar} from './NavBar'
import {Row} from './Row'
import {Footer} from './Footer'
import {Header} from './Header'
import './Netflix.css'

const Movies = ({logout}) => {
  const type = TYPE_MOVIE
  const [defaultMovieId] = useState(getRandomId(type))
  const headerMovie = useFiction(type, defaultMovieId)

  return (
    <div>
      <NavBar logout={logout} />
      <Header fiction={headerMovie} type={type} />
      <Row
        wideImage={true}
        type={TYPE_MOVIE}
        filter="trending"
        title="Films Netflix"
      />
      <Row
        wideImage={false}
        type={TYPE_MOVIE}
        filter="toprated"
        title="Les mieux notés"
      />

      <Row
        type={TYPE_MOVIE}
        filter="popular"
        title="Films populaires"
        wideImage={true}
      />

      <Row
        type={TYPE_MOVIE}
        filter="genre"
        param="14"
        title="Films fantastiques"
        wideImage={true}
      />

      <Row
        type={TYPE_MOVIE}
        filter="genre"
        param="878"
        title="Films de science-fiction"
        wideImage={false}
      />
      <Footer color="secondary" si />
    </div>
  )
}

export {Movies}
