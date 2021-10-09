import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
const RegisterScreen = ({ location, history }) => {
  const useStyles = makeStyles((theme) => ({
 
  }));
  const classes = useStyles();

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)


  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler} noValidate autoComplete="off">
      <Grid container >
      <Grid item xs={12}>
     <TextField style={{ color: 'black', width: '100%', marginTop: 21 }}
 id="outlined-basic" label="Name" variant="outlined"                  size='large'
         type='name'
         value={name}
         onChange={(e) => setName(e.target.value)}
 />
 </Grid>
       
 <Grid item xs={12}>
     <TextField style={{ color: 'black', width: '100%', marginTop: 21 }}
 id="outlined-basic" label="Email Address" variant="outlined"                  size='large'
         type='email'
         value={email}
            onChange={(e) => setEmail(e.target.value)}      
 />
 </Grid>
 <Grid item xs={12}>

 <TextField style={{ color: 'black', width: '100%', marginTop: 21 }}
 id="outlined-basic" label="Password" variant="outlined"                  size='large'
         type='password'
         value={password}
         onChange={(e) => setPassword(e.target.value)}   
 />
 </Grid>
 <Grid item xs={12}>

<TextField style={{ color: 'black', width: '100%', marginTop: 21 }}
id="outlined-basic" label="Confirm Password" variant="outlined"                  size='large'
        type='password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}/>
</Grid>
       

        
        </Grid>

        <Button style={{  width: '100%', marginTop: 27 }} type='submit' variant='primary'>
          Register
        </Button>
      </form>

      <Row className='padmar'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
