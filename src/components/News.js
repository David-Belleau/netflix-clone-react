import {React, useState} from 'react'
import {getRandomType, getRandomId} from '../utils/helper'
import {useFiction} from '../utils/hooksFiction'
import {TYPE_MOVIE, TYPE_TV} from '../config'
import {NavBar} from './NavBar'
import {Row} from './Row'
import {Footer} from './Footer'
import {Header} from './Header'
import './Netflix.css'

const News = ({logout}) => {
  const [type] = useState(getRandomType())
  const [defaultFictionId] = useState(getRandomId(type))
  const headerFiction = useFiction(type, defaultFictionId)

  return (
    <div>
      <NavBar logout={logout} />
      <Header fiction={headerFiction} type={type} />
      <Row wideImage={true} type={TYPE_MOVIE} filter="latest" title="A venir" />
      <Row
        wideImage={false}
        type={TYPE_MOVIE}
        filter="latest"
        title="Nouveautés"
      />

      <Row
        type={TYPE_MOVIE}
        filter="latest"
        title="Les mieux notés"
        wideImage={true}
      />

      <Row
        type={TYPE_TV}
        filter="genre"
        param="16"
        title="Animation"
        wideImage={true}
      />

      <Row
        type={TYPE_MOVIE}
        filter="genre"
        param="10749"
        title="Films romantiques"
        wideImage={false}
      />
      <Footer color="secondary" si />
    </div>
  )
}

export {News}
