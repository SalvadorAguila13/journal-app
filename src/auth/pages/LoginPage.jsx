import { Google } from "@mui/icons-material"
import {Link as RouterLink} from "react-router-dom"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import AuthLayout from "../layout/AuthLayout"
import useForm from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { startGoogleSingIn, startLoginWithEmailPassword } from "../../store/auth/thunks"
import { useMemo } from "react"

const formData = {
  email: '',
  password: ''
}

const LoginPage = () => {

  const dispatch = useDispatch()
  const {status, errorMessage} = useSelector(state => state.auth)
  
  const {onInputChange, email, password} = useForm(formData)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(startLoginWithEmailPassword({email, password}))
  }

  const handleLoginGoogle = () => {
    dispatch(startGoogleSingIn())
  }

  const isAuthenticating = useMemo( () => status === 'checking', [status])
  
  return (
    <AuthLayout title="Login">
        <form onSubmit={handleSubmit}>
          <Grid 
          container>

            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
              label='Email' 
              type="email" 
              placeholder="Correo@correo.com" 
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
              label='Password' 
              type="password" 
              placeholder="Password" 
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              />
            </Grid>

            <Grid container display={errorMessage ? '' : 'none'} sx={{mt: 1}}>
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
              <Grid item xs={12} sm={6}>
                <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth>Login</Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button disabled={isAuthenticating} onClick={handleLoginGoogle} variant="contained" fullWidth>
                  <Google/> 
                  <Typography sx={{ml:1}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={RouterLink} color='inherit' to='/auth/register'>
                Create an account
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  )
}

export default LoginPage