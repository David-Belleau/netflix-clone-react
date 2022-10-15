import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {Routes, Route} from 'react-router-dom'
import {useAuth} from './context/AuthContext'
import Error404 from './components/Error404'
import {NetflixApp} from './components/NetflixApp'
import ErrorFallback from './components/ErrorFallback'
import {FictionById} from './components/FictionById'
import {Movies} from './components/Movies'
import {Series} from './components/Series'
import {News} from './components/News'
import {Bookmark} from './components/Bookmark'
import {Search} from './components/Search'

const AuthApp = () => {
  const {logout} = useAuth()

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route path="/" element={<NetflixApp logout={logout} />} />
        <Route path="/tv/:tvId" element={<FictionById logout={logout} />} />
        <Route
          path="/movie/:movieId"
          element={<FictionById logout={logout} />}
        />
        <Route path="/movies" element={<Movies logout={logout} />} />
        <Route path="/series" element={<Series logout={logout} />} />
        <Route path="/news" element={<News logout={logout} />} />
        <Route path="/list" element={<Bookmark logout={logout} />} />
        <Route path="/search/:query" element={<Search logout={logout} />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default AuthApp
//React.lazy requires a default export
