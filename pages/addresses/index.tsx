/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Text, Radio, RadioGroup, Flex, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center, useToast } from "@chakra-ui/react";
import styles from './addresses.module.scss';
import AddressCard from "../../components/AddressCard/AddressCard";
import { useRouter } from "next/router";
import { useContext, useEffect} from "react";
import { useFormik } from "formik";
import PageFooter from "../../components/PageFooter/PageFooter";
import { UserContext } from "../../utils/providers/UserProvider";
import { ShopifyConfigContext } from "../../utils/providers/ShopifyConfigProvider";
import { FaChevronRight } from "react-icons/fa";

export default function AddressList() {
    const { phone, addresses, setAddresses } = useContext(UserContext)
    const { addresses: shopifyAddresses } = useContext(ShopifyConfigContext)
    const toast = useToast()
    const router = useRouter()
    
    const { isOpen, onClose, onOpen } = useDisclosure();

    const handleRouteToParent = () => {
        window?.top?.postMessage({ type: "TURBO_ROUTE", address: JSON.stringify({})}, '*');
    }

    const formik = useFormik({
        initialValues: {
            selectedAddress: ''
        },
        onSubmit: () => { }
    })

    useEffect(() => {
        if (formik.values.selectedAddress) onOpen()
    }, [formik.values.selectedAddress])

    const ConfirmationModal = () => {
        return (
            <Modal isCentered={true} isOpen={isOpen} onClose={onClose} motionPreset="none">
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Are you sure?</ModalHeader>
                    <ModalCloseButton mt={1}/>
                    <ModalBody >
                    <Flex flexDir="row" w="100%" align="flex-start">
                        <Box flexGrow={1}>
                            <Text>Deliver to the following address:</Text>
                            <Text as="p" fontWeight="bold">{(addresses !== null ? addresses[+formik.values.selectedAddress] : shopifyAddresses[+formik.values.selectedAddress])?.name.trim()},</Text>
                            <Text fontSize="sm">{(addresses !== null ? addresses[+formik.values.selectedAddress] : shopifyAddresses[+formik.values.selectedAddress])?.address_line1}</Text>
                            <Text fontSize="sm" >{(addresses !== null ? addresses[+formik.values.selectedAddress] : shopifyAddresses[+formik.values.selectedAddress])?.address_line2}</Text>
                            <Text fontSize="sm">{(addresses !== null ? addresses[+formik.values.selectedAddress] : shopifyAddresses[+formik.values.selectedAddress])?.pin_code || ''}</Text>
                            {(addresses !== null ? addresses[+formik.values.selectedAddress] : shopifyAddresses[+formik.values.selectedAddress])?.mobile ? <Text mt={2} fontSize="xs">Mobile: +91 {(addresses !== null ? addresses[+formik.values.selectedAddress] : shopifyAddresses[+formik.values.selectedAddress])?.mobile}</Text> : null}
                        </Box>
                    </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' size="sm" mr={4} onClick={() => {onClose(); formik.setFieldValue('selectedAddress', '')}}>Cancel</Button>
                        <Button colorScheme='blue' onClick={() => {
                            onClose();
                            window?.top?.postMessage({ type: "TURBO_ROUTE", address: JSON.stringify((addresses !== null ? addresses[+formik.values.selectedAddress] : shopifyAddresses[+formik.values.selectedAddress]))}, '*');
                        }} size="sm">
                            Proceed
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

    if(!addresses || !addresses.length) return (
        <Flex className={styles.container} flexDir={`column`} h={'calc(100dvh - 3rem'} justifyContent={'space-between'}>
            <Box>
                <Flex className={styles.section} ps={4} pe={4} pt={2} pb={2} align={`center`} mb={2}>
                    <Box className={`${styles.sectionContent}`} flexGrow={1}>
                        <Text fontWeight={`bold`}>Your number <Text as="span" ms={4} fontWeight={`bold`}>{phone}</Text></Text>
                    </Box>
                    <Box onClick={() => {
                        router.replace('/profile')
                        return
                    }} cursor={'pointer'}>
                        <Text><FaChevronRight /></Text>
                    </Box>
                </Flex>
            </Box>  

            { shopifyAddresses?.length ? <Flex className={styles.pageTitle} mb={2} ps={4} pe={4}>
                    <Text fontWeight={`bold`}>Deliver to</Text>
            </Flex> : <></>}

            <Box flexGrow={1}>
                <Box>
                    <form>
                        <RadioGroup value={formik.values.selectedAddress}>
                            {shopifyAddresses?.length ? shopifyAddresses?.map((address, index) => {
                                return (
                                    <Box mb={2} key={index} p={4} className={`${styles.card} ${(address.address_id === formik.values.selectedAddress) ? styles.selectedCard : ''}`}>
                                        <Radio colorScheme='green' {...formik.getFieldProps('selectedAddress')} value={index.toString()} className={`${styles.radio}`}>
                                            <AddressCard key={index} index={index} isInForm={true} address={address} mobile={address.mobile} selected={index === +formik.values.selectedAddress} />
                                        </Radio>
                                    </Box>
                                );
                            }) : null}
                        </RadioGroup>
                    </form>
                </Box>
            </Box>

            {(!shopifyAddresses || !shopifyAddresses.length) ? <Center>
                <Text>No Addresses Found!</Text>
            </Center> : <></>}

            <Box className={styles.pageFooter}>
                { addresses === null ? (
                    <Box py={1} px={4}>
                        <Button onClick={() => {
                            // Mock a call to fetch addresses

                            if(true) {
                                const a = [ { "name": "Utkarsh Saxena", "address_line1": "709 Shahbad, Near Koharapeer", "address_line2": "", "city": "Bareilly", "district": "", "state": "Uttar Pradesh", "country": "IN", "pin_code": "243001" } ]
                                setAddresses(a)
                                localStorage?.setItem('addresses', encodeURIComponent(JSON.stringify(a)))
                                return
                            }
                            
                            toast({
                                title: `No Addresses found!`,
                                status: 'warning',
                                variant: 'left-accent',
                                position: 'top-right',
                                duration: 3000,
                                isClosable: true,
                            });
                            setAddresses([])
                            handleRouteToParent()
                        }} fontSize={`sm`} variant={`outline`} type="submit" w={`100%`} colorScheme={`black`} textTransform={`uppercase`}>
                            Fetch More Addresses
                        </Button>
                </Box>
                ): <></>}

                <Box py={1} px={4}>
                {/* <Link"> */}
                    <Button onClick={handleRouteToParent} fontSize={`sm`} variant={`outline`} type="submit" w={`100%`} colorScheme={`black`} textTransform={`uppercase`}>
                        Add new Address
                    </Button>
                {/* </Link> */}
                    <PageFooter />
                </Box>
            </Box>

            <ConfirmationModal />
        </Flex>
    )

    return (
        <>
            <Flex className={styles.container} flexDir={`column`}>
                <Box>
                    <Flex className={styles.section} ps={4} pe={4} pt={2} pb={2} align={`center`} mb={2}>
                        <Box className={`${styles.sectionContent}`} flexGrow={1}>
                            <Text fontWeight={`bold`}>Your number <Text as="span" ms={4} fontWeight={`bold`}>{phone}</Text></Text>
                        </Box>
                    </Flex>
                </Box>
                <Flex className={styles.pageTitle} mb={2} ps={4} pe={4}>
                    <Text fontWeight={`bold`}>Deliver to</Text>
                </Flex>
                <Box flexGrow={1}>
                    <Box>
                        <form>
                            <RadioGroup value={formik.values.selectedAddress}>
                                {addresses.length ? addresses.map((address, index) => {
                                    return (
                                        <Box mb={2} key={index} p={4} className={`${styles.card} ${(address.address_id === formik.values.selectedAddress) ? styles.selectedCard : ''}`}>
                                            <Radio colorScheme='green' {...formik.getFieldProps('selectedAddress')} value={index.toString()} className={`${styles.radio}`}>
                                                <AddressCard key={index} index={index} isInForm={true} address={address} mobile={address.mobile} selected={index === +formik.values.selectedAddress} />
                                            </Radio>
                                        </Box>
                                    );
                                }) : null}
                            </RadioGroup>
                        </form>
                    </Box>
                </Box>

                <Box py={2} px={4} className={styles.pageFooter}>
                    {/* <Link"> */}
                        <Button onClick={handleRouteToParent} fontSize={`sm`} variant={`outline`} type="submit" w={`100%`} colorScheme={`black`} textTransform={`uppercase`}>
                            Add new Address
                        </Button>
                    {/* </Link> */}
                    <PageFooter />
                </Box>

                <ConfirmationModal />
            </Flex>
        </>
    )
}