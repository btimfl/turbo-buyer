import { Center, Flex, Text } from '@chakra-ui/react'
export default function Empty() {
  
  return (
    <Center h={'calc(100dvh - 3rem)'}>
        <Flex flexDir={`column`} align="center">
            <Text>You have no Items in your cart.</Text>
            <Text>Please try again after adding some items</Text>
        </Flex>
    </Center>
  )
}
