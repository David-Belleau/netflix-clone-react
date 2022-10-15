import {React, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {ResponsiveAppBar} from '../utils/helper'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import SearchIcon from '@mui/icons-material/Search'
import {styled, alpha} from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'

const Search = styled('div')(({theme}) => ({
  marginRight: '0.6rem',
  marginLeft: 'auto',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const NavBar = () => {
  const navigate = useNavigate()
  const [appBarStyle, setAppBarStyle] = useState({
    background: 'transparent',
    boxShadow: 'none',
  })
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onScroll = e => {
      if (e.target.documentElement.scrollTop >= 100) {
        setAppBarStyle({
          background: '#111',
          transition: 'background .5s ease-out',
          boxShadow: 'none',
        })
      } else {
        setAppBarStyle({
          background: 'transparent',
          transition: 'background .5s ease-out',
          boxShadow: 'none',
        })
      }
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      navigate(`/search/${query}`)
    }
  }

  return (
    <AppBar style={appBarStyle}>
      <Toolbar>
        <ResponsiveAppBar>
          <Search style={{width: '9.5rem'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onKeyDown={handleKeyPress}
              onChange={e => setQuery(e.target.value)}
              value={query}
              placeholder="Rechercher"
              inputProps={{'aria-label': 'search'}}
            />
          </Search>
        </ResponsiveAppBar>
      </Toolbar>
    </AppBar>
  )
}

export {NavBar}
