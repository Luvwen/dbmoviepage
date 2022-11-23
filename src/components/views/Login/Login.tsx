import { useMemo } from 'react';
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
import { startLoginWithEmailPassword } from '@/app/features/auth/thunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

interface FormValues {
    email: string;
    password: string;
}

export const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const { status, errorMessage } = useAppSelector((state) => state.auth);
    const isCheckingAuthentication = useMemo(
        () => status === 'checking',
        [status]
    );
    const initialValues: FormValues = {
        email: '',
        password: '',
    };

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
    };

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
    });

    const onSubmit = () => {
        const email = values.email;
        const password = values.password;
        dispatch(startLoginWithEmailPassword(email, password));
    };
    const { handleChange, handleSubmit, errors, values, touched, handleBlur } =
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
                height={['100vh']}
                m={['0 auto']}
                maxWidth={['80vw']}
                pt={['100px']}
                spacing={5}
            >
                <Heading fontSize={['2xl']} mb={['20px']}>
                    Accede a tu cuenta
                </Heading>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Stack spacing={3}>
                        <Stack>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                id="email"
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
                            <FormLabel htmlFor="password">Contraseña</FormLabel>
                            <Input
                                id="password"
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
                    </Stack>
                    {errorMessage &&
                        errorMessage !== 'logout' &&
                        errorMessage !== 'There is no user logged' && (
                            <Text color="red" mb="-15px" mt="10px">
                                {errorMessage}
                            </Text>
                        )}
                    <Stack alignItems="center" mt="25px">
                        <Button
                            colorScheme="teal"
                            disabled={isCheckingAuthentication}
                            type="submit"
                            width="100%"
                        >
                            Login
                        </Button>
                    </Stack>
                </form>
                <Stack as="article" direction={['row']}>
                    <Text>¿Todavía no estas registrado?</Text>
                    <Link as={RouterLink} color="blue.500" to="/register">
                        Registro
                    </Link>
                </Stack>
            </Stack>
        </Box>
    );
};
