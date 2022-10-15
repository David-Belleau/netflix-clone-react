import {React, useState, useEffect} from 'react'
import {useParams, useLocation} from 'react-router-dom'
import {useAddToHistory} from '../context/HistoryFictionContext'
import {useFiction} from '../utils/hooksFiction'
import {NavBar} from './NavBar'
import {Row} from './Row'
import {Footer} from './Footer'
import {Header} from './Header'
import {TYPE_MOVIE, TYPE_TV} from '../config'
import {Profiler} from './Profiler'
import './Netflix.css'

const FictionById = ({logout}) => {
  let {tvId, movieId} = useParams()
  const location = useLocation()
  const [type, setType] = useState(
    location.pathname.includes(TYPE_TV) ? TYPE_TV : TYPE_MOVIE,
  )
  const [id, setId] = useState(type === TYPE_TV ? tvId : movieId)
  const headerFiction = useFiction(type, id)

  useAddToHistory(headerFiction, type)

  useEffect(() => {
    const type = location.pathname.includes(TYPE_TV) ? TYPE_TV : TYPE_MOVIE
    setType(type)
    setId(type === TYPE_TV ? tvId : movieId)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [location.pathname, movieId, tvId])

  return (
    <div>
      <Profiler id="Film by Id" appData={{type, id: headerFiction?.id}}>
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
      </Profiler>
    </div>
  )
}

export {FictionById}
