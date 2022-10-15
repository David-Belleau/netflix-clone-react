import {React, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useNavigateFiction} from '../context/HistoryFictionContext'
import {TYPE_MOVIE, TYPE_TV, imagePath400} from '../config'
import {margin10} from 'utils/helper'
import {styled, alpha} from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import NotificationsIcon from '@mui/icons-material/Notifications'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'

const StyledMenu = styled(props => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({theme}) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0 0 0 0, rgba(0, 0, 0, 0.05) 0 0 0 1px, rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}))

const MenuHistory = ({className}) => {
  const {series, movies} = useNavigateFiction()
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={className}>
      <div className="nav__heading--block">
        <Typography style={margin10} variant="h6" onClick={handleClick}>
          Dernières visites
        </Typography>
      </div>
      <div className="nav__icon">
        <NotificationsIcon onClick={handleClick} />
      </div>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <VisibilityIcon />
          Dernières visites
        </MenuItem>
        {series.map((serie, index) => (
          <MenuItem key={index} onClick={handleClose} disableRipple>
            <MenuHistoryCard fiction={serie} type={TYPE_TV} wideImage={true} />
          </MenuItem>
        ))}
        <Divider sx={{my: 0.5}} />
        {movies.map((movie, index) => (
          <MenuItem key={index} onClick={handleClose} disableRipple>
            <MenuHistoryCard
              fiction={movie}
              type={TYPE_MOVIE}
              wideImage={true}
            />
          </MenuItem>
        ))}
        {series.length === 0 && movies.length === 0 ? (
          <MenuItem onClick={handleClose} disableRipple>
            <DoNotDisturbIcon />
            Pas d'historique
          </MenuItem>
        ) : null}
      </StyledMenu>
    </div>
  )
}

const MenuHistoryCard = ({fiction, type, wideImage = true}) => {
  const navigate = useNavigate()

  const buildImagePath = data => {
    const image = wideImage ? data?.backdrop_path : data?.poster_path
    return image ? `${imagePath400}${image}` : null
  }

  const title = (fiction?.name ?? fiction.original_title).substring(0, 20)
  const description = fiction?.overview.substring(0, 30) + ' ...'

  const handleClick = () => {
    navigate(`/${type}/${fiction.id}`)
  }

  return (
    <Card sx={{display: 'flex'}}>
      <a href={fiction.homepage} target="_blank" rel="noreferrer">
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <CardContent sx={{flex: '1 0 auto'}}>
            <Typography component="div" variant="h5" style={{width: '15.6rem'}}>
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              style={{width: '15.6rem'}}
            >
              {description}
            </Typography>
          </CardContent>
        </Box>
      </a>

      <a href={fiction.homepage} target="_blank" rel="noreferrer">
        <CardMedia
          onClick={handleClick}
          component="img"
          sx={{width: 200}}
          image={buildImagePath(fiction)}
          alt={title}
        />
      </a>
    </Card>
  )
}

export {MenuHistory}
