import React from 'react'
import {useState, forwardRef} from 'react'
import {imagePathOriginal, TYPE_MOVIE} from '../config'
import {HeaderSkeleton} from './skeletons/HeaderSkeleton'
import {
  useBookmark,
  useAddBookmark,
  useDeleteBookmark,
} from '../utils/hooksFiction'
import MuiAlert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Header = ({fiction, type = TYPE_MOVIE}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [mutateBookmarkError, setMutateBookmarkError] = useState()

  const title = type === TYPE_MOVIE ? fiction?.title : fiction?.name
  const imageUrl = `${imagePathOriginal}${fiction?.backdrop_path}`
  const banner = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    objectFit: 'contain',
    height: '28rem',
  }
  const data = useBookmark()

  const addMutation = useAddBookmark({
    onSuccess: () => {
      setSnackbarOpen(true)
      setMutateBookmarkError()
    },
    onError: error => {
      setSnackbarOpen(true)
      setMutateBookmarkError(error)
    },
  })

  const deleteMutation = useDeleteBookmark({
    onSuccess: () => {
      setSnackbarOpen(true)
      setMutateBookmarkError()
    },
    onError: error => {
      setSnackbarOpen(true)
      setMutateBookmarkError(error)
    },
  })

  const handleAddToListClick = () => {
    addMutation.mutate({
      type,
      id: fiction.id,
    })
  }

  const handleDeleteToListClick = () => {
    deleteMutation.mutate({
      type,
      id: fiction.id,
    })
  }
  const isInList = data?.bookmark[
    type === TYPE_MOVIE ? 'movies' : 'series'
  ]?.includes(fiction?.id)

  if (!fiction) {
    return <HeaderSkeleton></HeaderSkeleton>
  }

  return (
    <header style={banner} aria-label="banner">
      <div className="banner__content">
        <h1 className="banner__title">{title ?? '...'}</h1>
        <div className="banner__buttons">
          <a href={fiction.homepage} target="_blank" rel="noreferrer">
            {fiction.homepage ? (
              <button className="banner__button banner__button--white">
                Lecture
              </button>
            ) : null}
          </a>
          {isInList ? (
            <button
              className="banner__button banner__button--black"
              onClick={handleDeleteToListClick}
            >
              Supprimer de ma liste
            </button>
          ) : (
            <button
              className="banner__button banner__button--black"
              onClick={handleAddToListClick}
            >
              Ajouter à ma liste
            </button>
          )}
        </div>
        <h2 className="banner__text">{fiction?.overview ?? '...'}</h2>
      </div>
      <div className="banner--linearGradient"></div>
      {!mutateBookmarkError ? (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert severity="success">Liste modifiée avec succès</Alert>
        </Snackbar>
      ) : null}
      {mutateBookmarkError ? (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert severity="error">
            Problème lors de l'ajout : {mutateBookmarkError.message}
          </Alert>
        </Snackbar>
      ) : null}
    </header>
  )
}

export {Header}
