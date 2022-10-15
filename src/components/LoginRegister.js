import React from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { makeStyles } from '@mui/styles'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Input from '@mui/material/Input'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '20.6rem',
    [theme.breakpoints.down('md')]: {
      minWidth: '0',
    },
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  dialog: {
    opacity: '0.9',
  },
}))

const FormLogin = ({ create = false, login, register, logout }) => {
  const [checked, setChecked] = useState(false)
  const [username, setUsername] = useState('')
  const classes = useStyles()
  const label = create ? 'Inscrivez-vous' : 'Connexion'

  const [passwordValues, setPasswordValues] = useState({
    password: '',
    showPassword: false,
  })
  const { password, showPassword } = passwordValues

  const handlePasswordChange = prop => e => {
    setPasswordValues({ ...passwordValues, [prop]: e.target.value })
  }
  const handleClickShowPassword = () => {
    setPasswordValues({ ...passwordValues, showPassword: !showPassword })
  }
  const handleMouseDownPassword = e => {
    e.preventDefault()
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <FormControl variant="standard">
        <InputLabel htmlFor="email" color="secondary">
          E-mail
        </InputLabel>
        <Input
          id="email"
          type="email"
          variant="filled"
          color="secondary"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="textPassword" color="secondary">
          Mot de passe
        </InputLabel>
        <Input
          id="textPassword"
          type={showPassword ? 'text' : 'password'}
          label="Mot de passe"
          variant="filled"
          color="secondary"
          value={password}
          onChange={handlePasswordChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityIcon style={{ color: 'white' }} />
                  : <VisibilityOffIcon style={{ color: 'white' }} />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      {create ? (
        <>
          <Button
            style={{
              margin: '1.2rem 0 0.3rem 0',
              backgroundColor: 'red',
              padding: '0.7rem 0',
            }}
            variant="contained"
            onClick={() => register({ username, password })}
          >
            {label}
          </Button>
          <small>Cette page est protégée par Google reCAPTCHA</small>
        </>
      ) : (
        <>
          <Button
            style={{
              margin: '1.2rem 0 0.3rem 0',
              backgroundColor: 'red',
              padding: '0.7rem 0',
            }}
            variant="contained"
            onClick={() => login({ username, password })}
          >
            {label}
          </Button>
          <div>
            {' '}
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedA"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    color="primary"
                  />
                }
                label={
                  <Typography component={'span'} style={{ fontSize: '0.8rem' }}>
                    Se souvenir de moi
                  </Typography>
                }
              />
            </FormGroup>
          </div>
        </>
      )}
    </form>
  )
}

const PopupLogin = ({ open, handleClose, signup = false, status }) => {
  const { login, logout, register, authError: error } = useAuth()
  const classes = useStyles()
  const [create, setCreate] = useState(signup)

  const handleSignUp = () => {
    setCreate(true)
  }
  const handleSignIn = () => {
    setCreate(false)
  }

  const label = create ? 'Inscrivez-vous' : 'Connexion'

  const spinner =
    status === 'fetching ' ? <CircularProgress color="secondary" /> : <></>

  return (
    <>
      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{label}</DialogTitle>
        <DialogContent>
          <FormLogin
            create={create}
            login={login}
            register={register}
            logout={logout}
          />
          {error ? (
            <Alert severity="error">Erreur : {error.message}</Alert>
          ) : null}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'flex-start' }}>
          {!create ? (
            <Button onClick={handleSignUp} style={{ color: 'red' }}>
              Nouveau sur Netflix ? {spinner}
            </Button>
          ) : (
            <Button onClick={handleSignIn} style={{ color: 'red' }} autoFocus>
              Vous posséder déjà un compte ? {spinner}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export { PopupLogin as LoginRegister }
