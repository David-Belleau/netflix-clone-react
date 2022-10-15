import {React, useState} from 'react'
import {NavBar} from './NavBar'
import {Row} from './Row'
import {Footer} from './Footer'
import {Header} from './Header'
import {getRandomId} from '../utils/helper'
import {useFiction} from '../utils/hooksFiction'
import {TYPE_TV} from '../config'
import './Netflix.css'

const Series = ({logout}) => {
  const type = TYPE_TV
  const [defaultFictionId] = useState(getRandomId(type))
  const headerFiction = useFiction(type, defaultFictionId)

  return (
    <div>
      <NavBar logout={logout} />
      <Header fiction={headerFiction} type={type} />
      <Row
        wideImage={true}
        type={TYPE_TV}
        filter="trending"
        title="Séries Netflix"
      />
      <Row
        wideImage={false}
        type={TYPE_TV}
        filter="toprated"
        title="Les mieux notées"
      />

      <Row
        type={TYPE_TV}
        filter="popular"
        title="Séries populaires"
        wideImage={true}
      />

      <Row
        type={TYPE_TV}
        filter="genre"
        param="99"
        title="Documentaires"
        wideImage={true}
      />

      <Row
        type={TYPE_TV}
        filter="genre"
        param="80"
        title="Séries criminelles"
        wideImage={false}
      />
      <Footer color="secondary" si />
    </div>
  )
}

export {Series}
