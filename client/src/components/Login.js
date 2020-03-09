import React from 'react'
import { useForm } from 'react-hook-form'

import { LOGIN_ENDPOINT } from '../config/constants'
import store from '../config/store'

const LoginForm = () => {
  const { handleSubmit, register } = useForm()

  const onSubmit = async values => {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (data.key) {
      store.dispatch({ type: 'LOGIN', payload: data.key })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2>Login</h2>

      <label>Username</label>
      <input
        name='username'
        ref={register({
          validate: value => value !== 'admin' || 'Username not available',
        })}
      />

      <label>Password</label>
      <input name='password' type='password' ref={register} />

      <button type='submit'>Submit</button>
    </form>
  )
}

export default LoginForm
