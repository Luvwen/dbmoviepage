/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

type renderWithProviders = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Ui: ReactElement<any, string | React.JSXElementConstructor<any>>
) => void;

const renderWithProviders: renderWithProviders = (ui) => {
    return render(
        <BrowserRouter>
            <Provider store={store}>
                <ChakraProvider>{ui}</ChakraProvider>
            </Provider>
        </BrowserRouter>
    );
};

export default renderWithProviders;
