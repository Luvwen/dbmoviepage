import { Link as RouterLink } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
    Box,
    Button,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react'

import backgroundImage from '../../../assets/purple-background.jpg'
import { useAuth } from '@/components/auth'

interface FormValues {
    email: string
    password: string
}

export const Login: React.FC = () => {
    const auth = useAuth()

    const initialValues: FormValues = {
        email: '',
        password: '',
    }

    const validationErrors = {
        email: {
            required: '* Campo obligatorio',
            validEmail: 'Debes ingresar un formato de email válido ',
        },
        password: {
            required: '* Campo obligatorio',
            minLength: 'Mínimo 6 caracteres',
            maxLength: 'Máximo 20 caracteres',
        },
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
            .max(20, validationErrors.password.maxLength),
    })

    const onSubmit = () => {
        const email = values.email
        const password = values.password
        auth?.loginWithEmailAndPassword(email, password)
    }
    const { handleChange, handleSubmit, errors, values, touched, handleBlur } =
        useFormik({
            initialValues,
            validationSchema,
            onSubmit,
        })

    return (
        <Box width="100wv" height="100vh" backgroundImage={backgroundImage}>
            <Stack
                as="section"
                maxWidth={['80vw']}
                height={['100vh']}
                m={['0 auto']}
                alignItems="center"
                color="white"
                spacing={5}
                pt={['100px']}
            >
                <Heading fontSize={['2xl']} mb={['20px']}>
                    Accede a tu cuenta
                </Heading>
                <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <Stack>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="username@example.com"
                            />
                            {errors.email && touched.email && (
                                <Text color="red">{errors.email}</Text>
                            )}
                        </Stack>
                        <Stack>
                            <FormLabel htmlFor="password">Contraseña</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password && (
                                <Text color="red">{errors.password}</Text>
                            )}
                        </Stack>
                    </Stack>
                    <Stack alignItems="center" mt="25px">
                        <Button colorScheme="teal" type="submit" width="100%">
                            Login
                        </Button>
                    </Stack>
                </form>
                <Stack as="article" direction={['row']}>
                    <Text>¿Todavía no estas registrado?</Text>
                    <Link color="blue.500" as={RouterLink} to="/register">
                        Registro
                    </Link>
                </Stack>
            </Stack>
        </Box>
    )
}
