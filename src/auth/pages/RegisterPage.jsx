import {Link as RouterLink} from "react-router-dom"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import AuthLayout from "../layout/AuthLayout"
import useForm from "../../hooks/useForm"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { creatingUserWithEmailPassword } from "../../store/auth/thunks"

const formData = {
  email: '',
  password: '',
  displayName: '',
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener un @'],
  password: [(value) => value.length >= 6, 'El password debe de tener mas de 6 letras'],
  displayName: [(value) => value.length >= 1, 'El nombre es requerido'],
}

const RegisterPage = () => {
  const [formSubmited, setFormSubmited] = useState(false)
  const dispatch = useDispatch()
  const {errorMessage, status} = useSelector(state => state.auth)

  const {formState ,onInputChange, email, password, displayName, isFormValid, displayNameValid, emailValid, passwordValid} = useForm(formData, formValidations)

  const isCheckingAuthentication = useMemo(() =>  status === 'checking', [status]);
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmited(true)
    if (!isFormValid) return;
    dispatch(creatingUserWithEmailPassword(formState))
  }

  return (
    <AuthLayout title="Register">
        <form onSubmit={handleSubmit}>
          <Grid 
          container>

            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
              label='Full Name' 
              type="text" 
              placeholder="Your Full Name" 
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              helperText={displayNameValid}
              error={!!displayNameValid && formSubmited}
              />
            </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
              label='Email' 
              type="email" 
              placeholder="Correo@correo.com" 
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              helperText={emailValid}
              error={!!emailValid && formSubmited}
              />
            </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
              label='Password' 
              type="password" 
              placeholder="Password" 
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              helperText={passwordValid}
              error={!!passwordValid && formSubmited}
              />
            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
              <Grid item xs={12} display={errorMessage ? '' : 'none'}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
              
              <Grid item xs={12}>
                <Button disabled={isCheckingAuthentication} type="submit" variant="contained" fullWidth>Create an account</Button>
              </Grid>
              
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{mr: 1}}>
                Do you have an account?
              </Typography>
              <Link component={RouterLink} color='inherit' to='/auth/login'>
                Login
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage