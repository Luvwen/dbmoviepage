import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { useAuth } from '../../auth/auth'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text
} from '@chakra-ui/react'

import backgroundImage from '../../../assets/purple-background.jpg'
export const Register = () => {
  const auth = useAuth()
  const initialValues = {
    username: '',
    password: '',
    email: '',
    age: ''
  }

  const validationErrors = {
    username: {
      required: '* Campo obligatorio',
      minLength: 'Mínimo 4 caracteres',
      maxLength: 'Máximo 20 caracteres'
    },
    password: {
      required: '* Campo obligatorio',
      minLength: 'Mínimo 6 caracteres',
      maxLength: 'Máximo 20 caracteres'
    },
    email: {
      required: '* Campo obligatorio',
      validEmail: 'Debes ingresar un formato de email válido '
    },
    age: {
      required: '* Campo obligatorio',
      min: 'Debes ser mayor de edad para poder registrarte',
      max: 'Debes estar vivo para poder registrarte'
    }
  }

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required(validationErrors.username.required)
      .min(4, validationErrors.username.minLength)
      .max(20, validationErrors.username.maxLength),
    password: yup
      .string()
      .required(validationErrors.password.required)
      .min(6, validationErrors.password.minLength)
      .max(20, validationErrors.password.maxLength),
    email: yup
      .string()
      .email(validationErrors.email.validEmail)
      .required(validationErrors.email.required),
    age: yup
      .number()
      .required(validationErrors.age.required)
      .positive()
      .integer()
      .min(18, validationErrors.age.min)
      .max(99, validationErrors.age.max)
  })

  const onSubmit = () => {
    const email = values.email
    const password = values.password

    auth.registerWithEmailAndPassword(email, password)
  }

  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit
    })

  return (
    <Box width='100wv' height='100vh' backgroundImage={backgroundImage}>
      <Stack
        as='section'
        maxWidth={['80vw']}
        m={['0 auto']}
        alignItems='center'
        color='white'
      >
        <Heading fontSize={['xl']} mt={['50px']} color='white'>
          Crear una cuenta
        </Heading>
        <FormControl onSubmit={handleSubmit}>
          <Stack spacing={['2']}>
            <Stack mt={['10px']}>
              <FormLabel htmlFor='username'>Nombre *</FormLabel>
              <Input
                type='text'
                name='username'
                placeholder='Santiago'
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                color={errors.username && touched.username ? 'red' : 'white'}
              />
              {errors.username && touched.username && (
                <Text color='red'>{errors.username}</Text>
              )}
            </Stack>
            <Stack>
              <FormLabel htmlFor='password'>Contraseña *</FormLabel>
              <Input
                type='password'
                name='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                color={errors.password && touched.password ? 'red' : 'white'}
              />
              {errors.password && touched.password && (
                <Text color='red'>{errors.password}</Text>
              )}
            </Stack>
            <Stack>
              <FormLabel htmlFor='email'>Email *</FormLabel>
              <Input
                type='email'
                name='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                color={errors.email && touched.email ? 'red' : 'white'}
                placeholder='username@example.com'
              />
              {errors.email && touched.email && (
                <Text color='red'>{errors.email}</Text>
              )}
            </Stack>
            <Stack>
              <FormLabel htmlFor='age'>Edad *</FormLabel>
              <Input
                type='number'
                name='age'
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                color={errors.age && touched.age ? 'red' : 'white'}
              />
              {errors.age && touched.age && (
                <Text color='red'>{errors.age}</Text>
              )}
            </Stack>
          </Stack>
          <Stack>
            <Button
              margin='25px auto 0'
              colorScheme={'teal'}
              type='submit'
              onClick={handleSubmit}
              width='100%'
            >
              Crear cuenta
            </Button>
          </Stack>
        </FormControl>
        <Stack as='article' direction={['row']}>
          <Text>¿Ya estás registrado?</Text>
          <Link color='blue.500' href='/login'>
            Login
          </Link>
        </Stack>
      </Stack>
    </Box>
  )
}
