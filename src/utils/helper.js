import {React, useState} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import {MenuHistory} from '../components/MenuHistory'
import {TYPE_TV, TYPE_MOVIE} from '../config'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '@mui/material/Menu'

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomType = () => {
  return [TYPE_TV, TYPE_MOVIE][getRandomIntInclusive(0, 1)]
}

const getRandomMovie = () => {
  const moviesIds = [718930, 616037, 628878, 718789, 756999, 438148]

  return moviesIds[getRandomIntInclusive(0, moviesIds.length - 1)]
}

const getRandomSerie = () => {
  const tvIds = [92782, 92830, 66732, 71790, 1416, 2734]

  return tvIds[getRandomIntInclusive(0, tvIds.length - 1)]
}

const getRandomId = (type = TYPE_MOVIE) => {
  return type === TYPE_TV ? getRandomSerie() : getRandomMovie()
}

const margin10 = {margin: 10}

const MenuNetflix = () => {
  return (
    <>
      <Link to="/">
        <Typography style={margin10} variant="h6">
          Accueil
        </Typography>
      </Link>
      <Link to="/series">
        <Typography style={margin10} variant="h6">
          Séries
        </Typography>
      </Link>
      <Link to="/movies">
        <Typography style={margin10} variant="h6">
          Films
        </Typography>
      </Link>
      <Link to="/news">
        <Typography style={margin10} variant="h6">
          Nouveautés les plus regardées
        </Typography>
      </Link>
      <Link to="/list">
        <Typography style={margin10} variant="h6">
          Ma liste
        </Typography>
      </Link>
    </>
  )
}

const IconsHistoryAvatar = () => {
  const {logout} = useAuth()

  return (
    <>
      <MenuHistory className="nav__div" />

      <div className="nav__heading--block">
        <Typography
          style={{margin: 10, cursor: 'pointer'}}
          variant="h6"
          onClick={logout}
        >
          Déconnexion
        </Typography>
      </div>

      <div className="nav__icon">
        <img
          role="button"
          aria-label="logout"
          style={{cursor: 'pointer'}}
          className="nav__avatar"
          src="/images/avatar.png"
          alt="Avatar"
          onClick={logout}
        />
      </div>
    </>
  )
}

const ResponsiveAppBar = ({children}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{display: {md: 'none'}, color: 'white'}}
      >
        <MenuIcon />
      </IconButton>

      <Link to="/">
        <img
          className="nav__img"
          src="/images/netflix_logo.png"
          alt="Logo de Netflix"
        />
      </Link>

      <div className="nav__menu">
        <MenuNetflix />
      </div>

      {children}

      <div className="nav__icons">
        <IconsHistoryAvatar />
      </div>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuNetflix />
        <IconsHistoryAvatar />
      </Menu>
    </>
  )
}

const imageError = {
  backgroundImage: `url('./images/snow_car.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
}

export {
  getRandomIntInclusive,
  getRandomType,
  getRandomMovie,
  getRandomSerie,
  getRandomId,
  margin10,
  MenuNetflix,
  IconsHistoryAvatar,
  ResponsiveAppBar,
  imageError,
}
