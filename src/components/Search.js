import React from 'react'
import {useParams} from 'react-router-dom'
import {useSearchFiction, useFiction} from '../utils/hooksFiction'
import {NavBar} from './NavBar'
import {Footer} from './Footer'
import {Header} from './Header'
import {RowView} from './RowView'
import {TYPE_MOVIE, TYPE_TV} from '../config'
import './Netflix.css'

const Search = ({logout}) => {
  let {query} = useParams()
  const data = useSearchFiction(query)
  const defaultMovie = useFiction(TYPE_MOVIE, 718930)
  const headerMovie = data?.[0] ?? defaultMovie
  const type = headerMovie?.media_type

  const movies = data.filter(result => result.media_type === TYPE_MOVIE)
  const series = data.filter(result => result.media_type === TYPE_TV)
  return (
    <div>
      <NavBar logout={logout} />
      <Header fiction={headerMovie} type={type} />
      {data?.length === 0 ? (
        <div className="row">
          <h2>Pas de résultat</h2>
        </div>
      ) : (
        <>
          <RowView
            data={movies}
            wideImage={true}
            type={TYPE_MOVIE}
            filter="trending"
            title="Films correspondants"
          />
          <RowView
            data={series}
            wideImage={false}
            type={TYPE_TV}
            filter="trending"
            title="Séries correspondantes"
          />
        </>
      )}

      <Footer color="secondary" si />
    </div>
  )
}

export {Search}
