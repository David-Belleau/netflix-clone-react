import React from 'react'
import {NavBar} from './NavBar'
import {Header} from './Header'
import {Footer} from './Footer'
import {RowCard} from './RowView'
import {useFiction, useBookmark} from '../utils/hooksFiction'
import {TYPE_MOVIE, TYPE_TV} from '../config'
import {Profiler} from './Profiler'

const Bookmark = ({logout}) => {
  const data = useBookmark()
  const id = data?.bookmark?.movies?.[0] ?? 616037
  const headerMovie = useFiction(TYPE_MOVIE, id)

  return (
    <>
      <Profiler id="Bookmark" appData={{bookmark: data?.bookmark}}>
        <NavBar logout={logout} />
        <Header fiction={headerMovie} type={TYPE_MOVIE} />
        <div className="row">
          <h2>Films favoris</h2>
          {data?.bookmark?.movies.length === 0 ? (
            <p className="row__p">Vous n'avez pas encore ajouté de films.</p>
          ) : (
            <div className="row__cards" role="listitem" aria-label={TYPE_MOVIE}>
              {data?.bookmark?.movies.map(id => {
                return (
                  <CardBookmark
                    key={id}
                    id={id}
                    type={TYPE_MOVIE}
                    wideImage={true}
                  />
                )
              })}
            </div>
          )}
        </div>

        <div className="row">
          <h2>Séries favorites</h2>
          {data?.bookmark?.series.length === 0 ? (
            <p className="row__p">Vous n'avez pas encore ajouté de séries.</p>
          ) : (
            <div className="row__cards" role="listitem" aria-label={TYPE_TV}>
              {data?.bookmark?.series.map(id => {
                return <CardBookmark key={id} id={id} type={TYPE_TV} />
              })}
            </div>
          )}
        </div>
        <Footer color="secondary" si />
      </Profiler>
    </>
  )
}

const CardBookmark = ({id, type, wideImage}) => {
  const data = useFiction(type, id)

  return <RowCard fiction={data} type={type} wideImage={wideImage} />
}

export {Bookmark}
