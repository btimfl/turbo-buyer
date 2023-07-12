/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Text,
  Radio,
  RadioGroup,
  Flex,
  useDisclosure,
  Center,
} from '@chakra-ui/react'
import styles from './addresses.module.scss'
import AddressCard from '../../components/AddressCard/AddressCard'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import PageFooter from '../../components/PageFooter/PageFooter'
import { UserContext } from '../../utils/providers/UserProvider'
import { ShopifyConfigContext } from '../../utils/providers/ShopifyConfigProvider'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import LocalStorageHandler from '../../utils/models/LocalStorageHandler'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function AddressList() {
  const { phone, addresses } = useContext(UserContext)
  const { addresses: shopifyAddresses } = useContext(ShopifyConfigContext)

  const [selectedAddress, setSelectedAddress] = useState<any>(null)
  const [showLoadMore, setShowLoadMore] = useState<boolean>(false)

  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      selectedAddress: '',
    },
    onSubmit: () => {},
  })

  useEffect(() => {
    const { turboAddressCount } = LocalStorageHandler.getData()
    if (turboAddressCount && +turboAddressCount > 0 && !addresses)
      setShowLoadMore(true)
    else setShowLoadMore(false)
  }, [])

  useEffect(() => {
    if (formik.values.selectedAddress) {
      if (
        shopifyAddresses?.length &&
        +formik.values.selectedAddress < shopifyAddresses?.length
      )
        setSelectedAddress(shopifyAddresses[+formik.values.selectedAddress])
      else
        setSelectedAddress(
          addresses?.[
            +formik.values.selectedAddress - (shopifyAddresses?.length ?? 0)
          ]
        )
    }
  }, [formik.values.selectedAddress])

  const handleRouteToParent = () => {
    window?.top?.postMessage(
      {
        type: 'TURBO_ROUTE',
        address: JSON.stringify({
          mobile: phone,
        }),
      },
      '*'
    )
  }

  const submitAddress = () => {
    // console.log(selectedAddress)
    window?.top?.postMessage(
      {
        type: 'TURBO_ROUTE',
        address: JSON.stringify({ ...selectedAddress, mobile: phone }),
      },
      '*'
    )
  }

  if (
    (!addresses || !addresses?.length) &&
    (!shopifyAddresses || !shopifyAddresses?.length)
  )
    return (
      <Flex className={styles.container} flexDir={`column`}>
        <Box>
          <Flex
            className={styles.section}
            ps={4}
            pe={4}
            pt={2}
            pb={2}
            align={`center`}
            mb={2}
          >
            <Box className={`${styles.sectionContent}`} flexGrow={1}>
              <Text fontWeight={`bold`}>
                Your number{' '}
                <Text as='span' ms={4} fontWeight={`bold`}>
                  {phone || 'Unavailable'}
                </Text>
              </Text>
            </Box>
            <Box
              onClick={() => {
                router.replace('/profile')
                return
              }}
              cursor={'pointer'}
            >
              <Flex
                alignItems={'center'}
                gap={'0.25rem'}
                color='var(--turbo-colors-link)'
              >
                Change
                <FaChevronRight />
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Center h={'70dvh'}>
          <Text>No Addresses Found!</Text>
        </Center>
      </Flex>
    )

  return (
    <>
      <Flex className={styles.container} flexDir={`column`}>
        <Box>
          <Flex
            className={styles.section}
            ps={4}
            pe={4}
            pt={2}
            pb={2}
            align={`center`}
            mb={2}
          >
            <Box className={`${styles.sectionContent}`} flexGrow={1}>
              <Text fontWeight={`bold`}>
                Your number{' '}
                <Text as='span' ms={4} fontWeight={`bold`}>
                  {phone || 'Unavailable'}
                </Text>
              </Text>
            </Box>
            <Box
              onClick={() => {
                router.replace('/profile')
                return
              }}
              cursor={'pointer'}
            >
              <Flex
                alignItems={'center'}
                gap={'0.25rem'}
                color='var(--turbo-colors-link)'
              >
                Change
                <FaChevronRight />
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Flex className={styles.pageTitle} mb={2} ps={4} pe={4}>
          <Text fontWeight={`bold`}>Deliver to</Text>
        </Flex>
        <Flex flexGrow={1} alignItems='center' flexDir={'column'}>
          <form style={{ width: '100%' }}>
            <RadioGroup value={formik.values.selectedAddress}>
              {shopifyAddresses?.length
                ? shopifyAddresses.map((address, index) => {
                    return (
                      <Box
                        mb={2}
                        key={index}
                        p={4}
                        className={`${styles.card} ${
                          address.address_id === formik.values.selectedAddress
                            ? styles.selectedCard
                            : ''
                        }`}
                      >
                        <Radio
                          colorScheme='green'
                          {...formik.getFieldProps('selectedAddress')}
                          value={index.toString()}
                          className={`${styles.radio}`}
                        >
                          <AddressCard
                            key={index}
                            index={index}
                            isInForm={true}
                            address={address}
                            mobile={address.mobile}
                            selected={index === +formik.values.selectedAddress}
                          />
                        </Radio>
                      </Box>
                    )
                  })
                : null}
              {addresses?.map((address, index) => {
                return (
                  <Box
                    mb={2}
                    key={index}
                    p={4}
                    className={`${styles.card} ${
                      address.address_id === formik.values.selectedAddress
                        ? styles.selectedCard
                        : ''
                    }`}
                  >
                    <Radio
                      colorScheme='green'
                      {...formik.getFieldProps('selectedAddress')}
                      value={(
                        index + (shopifyAddresses?.length ?? 0)
                      ).toString()}
                      className={`${styles.radio}`}
                    >
                      <AddressCard
                        key={index}
                        index={index}
                        isInForm={true}
                        address={address}
                        mobile={address.mobile}
                        selected={
                          index + (shopifyAddresses?.length ?? 0) ===
                          +formik.values.selectedAddress
                        }
                      />
                    </Radio>
                  </Box>
                )
              })}
            </RadioGroup>
          </form>

          {showLoadMore ? (
            <Flex
              alignItems='center'
              gap={1}
              color={'var(--turbo-colors-link)'}
              cursor='pointer'
              onClick={() => {
                router.push('/profile')
              }}
            >
              <FaChevronDown />
              <Text as='span'>Load More</Text>
            </Flex>
          ) : (
            <></>
          )}
        </Flex>

        <Box py={2} px={4} className={styles.pageFooter}>
          <Button
            onClick={submitAddress}
            isDisabled={!formik.values.selectedAddress}
            w={`100%`}
            bg={`black`}
            color={`white`}
            _hover={{ background: `black` }}
            mb={2}
          >
            <Text as='span' fontSize='sm' textTransform={`uppercase`}>
              Proceed
              <ChevronRightIcon ms={2} fontSize={`lg`} />
            </Text>
          </Button>
          <Button
            onClick={handleRouteToParent}
            fontSize={`sm`}
            variant={`outline`}
            type='submit'
            w={`100%`}
            colorScheme={`black`}
            textTransform={`uppercase`}
          >
            Add new Address
          </Button>
          <PageFooter />
        </Box>
      </Flex>
    </>
  )
}
