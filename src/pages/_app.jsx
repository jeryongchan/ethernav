import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from 'next/app';
import PropTypes from 'prop-types';
import React from 'react';
import Head from 'next/head';
import '../utils/spinner.css';
import { theme } from '../lib/theme';
import AppWrapper from '../utils/AppContext';
import Header from '../components/Header';

const propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired, // eslint-disable-line
};

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        // console.log(pageProps);
        // const darkTheme = createTheme({
        //     palette: {
        //         mode: 'dark',
        //     },
        // });
        return (
            <CacheProvider value={createCache({ key: 'css' })}>
                <ThemeProvider theme={theme}>
                    {/* ThemeProvider makes the theme available down the React tree thanks to React context. */}
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <AppWrapper>
                        <Head>
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />


                        </Head>
                        <CssBaseline />
                        <Header {...pageProps} />
                        {/* <SearchBar {...pageProps} /> */}
                        <Component {...pageProps} />
                    </AppWrapper>
                </ThemeProvider>
            </CacheProvider>
        );
    }
}

MyApp.propTypes = propTypes;

export default MyApp;
