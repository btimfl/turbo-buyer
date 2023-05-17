import { Center, Flex, Text } from '@chakra-ui/react'
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <Center h={'calc(100dvh - 3rem)'}>
            <Flex flexDir={`column`} align='center'>
              <Text>Something went wrong</Text>
              <Text>
                If you are using incognito mode, please disable{' '}
                <Text align="center" fontStyle={'italic'}>Block third party cookies</Text>
              </Text>
            </Flex>
          </Center>
        </>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
