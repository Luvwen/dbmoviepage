import { Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    Box,
    Button,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react';
import backgroundImage from '../../../assets/purple-background.jpg';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { startRegisterWithEmailAndPassword } from '@/app/features/auth/thunks';
import { useMemo } from 'react';

export const Register = () => {
    const dispatch = useAppDispatch();
    const { status, errorMessage } = useAppSelector((state) => state.auth);
    const isCheckingAuthentication = useMemo(
        () => status === 'checking',
        [status]
    );
    const initialValues = {
        username: '',
        password: '',
        email: '',
        age: '',
    };

    const validationErrors = {
        username: {
            required: '* Campo obligatorio',
            minLength: 'Mínimo 4 caracteres',
            maxLength: 'Máximo 20 caracteres',
        },
        password: {
            required: '* Campo obligatorio',
            minLength: 'Mínimo 6 caracteres',
            maxLength: 'Máximo 20 caracteres',
        },
        email: {
            required: '* Campo obligatorio',
            validEmail: 'Debes ingresar un formato de email válido ',
        },
        age: {
            required: '* Campo obligatorio',
            min: 'Debes ser mayor de edad para poder registrarte',
            max: 'Debes estar vivo para poder registrarte',
        },
    };

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
            .max(99, validationErrors.age.max),
    });

    const onSubmit = () => {
        const email = values.email;
        const password = values.password;
        const userName = values.username;
        dispatch(startRegisterWithEmailAndPassword(email, password, userName));
    };

    const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
        useFormik({
            initialValues,
            validationSchema,
            onSubmit,
        });
    return (
        <Box backgroundImage={backgroundImage} height="100vh" width="100wv">
            <Stack
                alignItems="center"
                as="section"
                color="white"
                m={['0 auto']}
                maxWidth={['80vw']}
            >
                <Heading color="white" fontSize={['xl']} mt={['50px']}>
                    Crear una cuenta
                </Heading>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Stack spacing={['2']}>
                        <Stack mt={['10px']}>
                            <FormLabel htmlFor="username">Nombre *</FormLabel>
                            <Input
                                color={
                                    errors.username && touched.username
                                        ? 'red'
                                        : 'white'
                                }
                                name="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Santiago"
                                type="text"
                                value={values.username}
                            />
                            {errors.username && touched.username && (
                                <Text color="red">{errors.username}</Text>
                            )}
                        </Stack>
                        <Stack>
                            <FormLabel htmlFor="password">
                                Contraseña *
                            </FormLabel>
                            <Input
                                color={
                                    errors.password && touched.password
                                        ? 'red'
                                        : 'white'
                                }
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="password"
                                value={values.password}
                            />
                            {errors.password && touched.password && (
                                <Text color="red">{errors.password}</Text>
                            )}
                        </Stack>
                        <Stack>
                            <FormLabel htmlFor="email">Email *</FormLabel>
                            <Input
                                color={
                                    errors.email && touched.email
                                        ? 'red'
                                        : 'white'
                                }
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="username@example.com"
                                type="email"
                                value={values.email}
                            />
                            {errors.email && touched.email && (
                                <Text color="red">{errors.email}</Text>
                            )}
                        </Stack>
                        <Stack>
                            <FormLabel htmlFor="age">Edad *</FormLabel>
                            <Input
                                color={
                                    errors.age && touched.age ? 'red' : 'white'
                                }
                                name="age"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="number"
                                value={values.age}
                            />
                            {errors.age && touched.age && (
                                <Text color="red">{errors.age}</Text>
                            )}
                        </Stack>
                    </Stack>
                    <Stack color="red" pt="15px">
                        {errorMessage &&
                            errorMessage !== 'There is no user logged' && (
                                <Text>{errorMessage}</Text>
                            )}
                    </Stack>
                    <Stack>
                        <Button
                            colorScheme={'teal'}
                            disabled={isCheckingAuthentication}
                            margin="10px auto 0"
                            type="submit"
                            width="100%"
                        >
                            Crear cuenta
                        </Button>
                    </Stack>
                </form>
                <Stack as="article" direction={['row']}>
                    <Text>¿Ya estás registrado?</Text>
                    <Link as={RouterLink} color="blue.500" to="/login">
                        Login
                    </Link>
                </Stack>
            </Stack>
        </Box>
    );
};
