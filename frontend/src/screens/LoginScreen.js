import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
 
}));
const LoginScreen = ({ location, history }) => {
  const classes = useStyles();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler} noValidate autoComplete="off">
      <Grid container >
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
 id="outlined-basic" label="Password" variant="outlined"   size='large'    type='password'
   value={password}
   onChange={(e) => setPassword(e.target.value)}
 />
 </Grid>
 </Grid>

        <Button style={{  width: '100%', marginTop: 27 }} type='submit' variant='primary'>
          Sign In
        </Button>
      </form>

      <Row className='padmar'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
