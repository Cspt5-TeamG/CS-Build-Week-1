import React from 'react'
import { useForm } from 'react-hook-form'

import { REGISTRATION_ENDPOINT } from '../config/constants'
import store from '../config/store'

const RegistrationForm = () => {
  const { handleSubmit, register, watch, errors } = useForm()

  const onSubmit = async values => {
    const response = await fetch(REGISTRATION_ENDPOINT, {
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
      <h2>Register</h2>
      <label>Username</label>
      <input
        name='username'
        ref={register({
          validate: value => value !== 'admin' || 'Username not available',
        })}
      />
      {errors.username && errors.username.message}

      <label>Password</label>
      <input name='password1' type='password' ref={register} />

      <label>Repeat Password</label>
      <input
        name='password2'
        type='password'
        ref={register({
          validate: value =>
            value === watch('password1') || 'Passwords do not match',
        })}
      />
      {errors.password2 && errors.password2.message}

      <button type='submit'>Submit</button>
    </form>
  )
}

export default RegistrationForm
