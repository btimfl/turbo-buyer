import { Flex, ChakraProvider, Center, Spinner } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Navigation from '../components/Navigation/Navigation'
import '../styles/globals.css'
import styles from './../styles/app.module.scss'
import NProgress from 'nprogress'
import { useRouter } from 'next/router'
import 'nprogress/nprogress.css'
import Head from 'next/head'
import useRouteChange from '../utils/hooks/useRouteChange'
import { mulish, theme } from '../utils/configurations/chakraTheme'
import ShopifyConfigProvider from '../utils/providers/ShopifyConfigProvider'
import UserProvider from '../utils/providers/UserProvider'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from '../utils/ErrorBoundary'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  NProgress.settings.showSpinner = false

  const isRouteChanging = useRouteChange(router)

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <ChakraProvider theme={theme}>
        <ShopifyConfigProvider>
          <UserProvider>
            <Flex flexDir='row' className={mulish.className}>
              <Flex className={styles.container} flexDir='column' grow={1}>
                <Navigation />
                {isRouteChanging ? (
                  <Center h={`calc(100vh - 3rem)`}>
                    <Spinner />
                  </Center>
                ) : (
                  <ErrorBoundary>
                    <Component
                      {...pageProps}
                      className={styles.pageContainer}
                    />
                  </ErrorBoundary>
                )}
              </Flex>
            </Flex>
          </UserProvider>
        </ShopifyConfigProvider>
        <Toaster />
      </ChakraProvider>
    </>
  )
}
