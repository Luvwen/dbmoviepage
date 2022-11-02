import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { useAuth } from '../../auth/auth'

export const Login = () => {
  const auth = useAuth()

  const initialValues = {
    email: '',
    password: ''
  }

  const validationErrors = {
    email: {
      required: '* Campo obligatorio',
      validEmail: 'Debes ingresar un formato de email válido '
    },
    password: {
      required: '* Campo obligatorio',
      minLength: 'Mínimo 6 caracteres',
      maxLength: 'Máximo 20 caracteres'
    }
  }

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(validationErrors.email.validEmail)
      .required(validationErrors.email.required),
    password: yup
      .string()
      .required(validationErrors.password.required)
      .min(6, validationErrors.password.minLength)
      .max(20, validationErrors.password.maxLength)
  })

  const onSubmit = () => {
    const email = values.email
    const password = values.password
    auth.loginWithEmailAndPassword(email, password)
  }

  const { handleChange, handleSubmit, errors, values, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit
    })

  return (
    <div className='login-screen'>
      <h1 className='login-screen__title'>Accede a tu cuenta</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='username@example.com'
          />
          {errors.email && touched.email && <div>{errors.email}</div>}
        </div>
        <div>
          <label htmlFor='password'>Contraseña</label>
          <input
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && <div>{errors.password}</div>}
        </div>
        <button type='submit'>Login</button>
      </form>
      <article className='login-container'>
        <p>¿Todavía no estas registrado?</p>
        <Link className='register-button' to='/register'>
          Registro
        </Link>
      </article>
    </div>
  )
}
