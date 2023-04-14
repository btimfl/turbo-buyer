/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Text, Radio, RadioGroup, Flex, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Center, useToast } from "@chakra-ui/react";
import styles from './addresses.module.scss';
import AddressCard from "../../components/AddressCard/AddressCard";
import { useRouter } from "next/router";
import { useContext, useEffect, useState} from "react";
import { useFormik } from "formik";
import PageFooter from "../../components/PageFooter/PageFooter";
import { UserContext } from "../../utils/providers/UserProvider";
import { ShopifyConfigContext } from "../../utils/providers/ShopifyConfigProvider";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import LocalStorageHandler from "../../utils/LocalStorageHandler";

export default function AddressList() {
    const { phone, addresses, setAddresses } = useContext(UserContext)
    const { addresses: shopifyAddresses, } = useContext(ShopifyConfigContext)
    const [selectedAddress, setSelectedAddress] = useState<any>(null);
    const [ isTurboAddressVisible, setIsTurboAddressVisible ] = useState<boolean>(!(shopifyAddresses?.length > 0))

    const router = useRouter()
    
    const { isOpen, onClose, onOpen } = useDisclosure();

    const turboAddressCount = localStorage?.getItem('turboAddressCount');
    const doesTurboAddressExist = turboAddressCount ? +turboAddressCount > 0 : false;

    const handleRouteToParent = () => {
        window?.top?.postMessage({ type: "TURBO_ROUTE", address: JSON.stringify({
            mobile: phone,
        })}, '*');
    }

    const formik = useFormik({
        initialValues: {
            selectedAddress: ''
        },
        onSubmit: () => { }
    })

    useEffect(() => {
        if (formik.values.selectedAddress) {
            if(shopifyAddresses?.length && +formik.values.selectedAddress < shopifyAddresses?.length) setSelectedAddress(shopifyAddresses[+formik.values.selectedAddress]);
            else setSelectedAddress(addresses?.[+formik.values.selectedAddress - shopifyAddresses?.length ?? 0])
            onOpen()
        }
    }, [formik.values.selectedAddress])

    const ConfirmationModal = () => {
        return (
            <Modal isCentered={true} isOpen={isOpen} onClose={onClose} motionPreset="none">
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Are you sure?</ModalHeader>
                    <ModalCloseButton mt={1}/>
                    <ModalBody >
                    { (addresses?.length || shopifyAddresses?.length) ? 
                    <Flex flexDir="row" w="100%" align="flex-start">
                    <Box flexGrow={1}>
                        <Text>Deliver to the following address:</Text>
                        <Text as="p" fontWeight="bold">{selectedAddress?.['name'].trim()},</Text>
                        <Text fontSize="sm">{selectedAddress?.['address_line1']}</Text>
                        <Text fontSize="sm" >{selectedAddress?.['address_line2']}</Text>
                        <Text fontSize="sm">{selectedAddress?.['pin_code'] || ''}</Text>
                        {selectedAddress?.['mobile'] ? <Text mt={2} fontSize="xs">Mobile: +91 {selectedAddress?.['mobile']}</Text> : null}
                    </Box>
                </Flex> : <></>}
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' size="sm" mr={4} onClick={() => {onClose(); formik.setFieldValue('selectedAddress', '')}}>Cancel</Button>
                        <Button colorScheme='blue' onClick={() => {
                            onClose();
                            window?.top?.postMessage(
                                { type: "TURBO_ROUTE", address: JSON.stringify(selectedAddress)}, '*');
                        }} size="sm">
                            Proceed
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

    if((!addresses || !addresses?.length) && (!shopifyAddresses || !shopifyAddresses?.length)) return (
        <Flex className={styles.container} flexDir={`column`}>
            <Box>
                <Flex className={styles.section} ps={4} pe={4} pt={2} pb={2} align={`center`} mb={2}>
                    <Box className={`${styles.sectionContent}`} flexGrow={1}>
                        <Text fontWeight={`bold`}>Your number <Text as="span" ms={4} fontWeight={`bold`}>{phone || 'Unavailable'}</Text></Text>
                    </Box>
                    <Box onClick={() => {
                        router.replace('/profile')
                        return
                    }} cursor={'pointer'}>
                        <Flex alignItems={'center'} gap={'0.25rem'} color="var(--turbo-colors-link)">Change<FaChevronRight /></Flex>
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
                    <Flex className={styles.section} ps={4} pe={4} pt={2} pb={2} align={`center`} mb={2}>
                        <Box className={`${styles.sectionContent}`} flexGrow={1}>
                        <Text fontWeight={`bold`}>Your number <Text as="span" ms={4} fontWeight={`bold`}>{phone || 'Unavailable'}</Text></Text>
                        </Box>
                        <Box onClick={() => {
                            router.replace('/profile')
                            return
                        }} cursor={'pointer'}>
                            <Flex alignItems={'center'} gap={'0.25rem'} color="var(--turbo-colors-link)">Change<FaChevronRight /></Flex>
                        </Box>
                    </Flex>
                </Box>
                <Flex className={styles.pageTitle} mb={2} ps={4} pe={4}>
                    <Text fontWeight={`bold`}>Deliver to</Text>
                </Flex>
                <Flex flexGrow={1} alignItems='center' flexDir={'column'}>
                    <form style={{ width: '100%' }}>
                        <RadioGroup value={formik.values.selectedAddress}>
                            {shopifyAddresses?.length ? shopifyAddresses.map((address, index) => {
                                return (
                                    <Box mb={2} key={index} p={4} className={`${styles.card} ${(address.address_id === formik.values.selectedAddress) ? styles.selectedCard : ''}`}>
                                        <Radio colorScheme='green' {...formik.getFieldProps('selectedAddress')} value={index.toString()} className={`${styles.radio}`}>
                                            <AddressCard key={index} index={index} isInForm={true} address={address} mobile={address.mobile} selected={index === +formik.values.selectedAddress} />
                                        </Radio>
                                    </Box>
                                );
                            }) : null}
                            {isTurboAddressVisible ? addresses?.map((address, index) => {
                                return (
                                    <Box mb={2} key={index} p={4} className={`${styles.card} ${(address.address_id === formik.values.selectedAddress) ? styles.selectedCard : ''}`}>
                                        <Radio colorScheme='green' {...formik.getFieldProps('selectedAddress')} value={(index + shopifyAddresses?.length ?? 0).toString()} className={`${styles.radio}`}>
                                            <AddressCard key={index} index={index} isInForm={true} address={address} mobile={address.mobile} selected={(index + shopifyAddresses?.length ?? 0) === +formik.values.selectedAddress} />
                                        </Radio>
                                    </Box>
                                );
                            }) : null}
                        </RadioGroup>
                    </form>

                    {doesTurboAddressExist && !isTurboAddressVisible ? (
                        <Flex alignItems='center' gap={1} color={'var(--turbo-colors-link)'} cursor='pointer' onClick={() => {
                            // // Mock a call to fetch addresses
    
                            // if(true) {
                            //     // toast({
                            //     //     title: `Found 1 new address!`,
                            //     //     status: 'success',
                            //     //     variant: 'left-accent',
                            //     //     position: 'top-right',
                            //     //     duration: 3000,
                            //     //     isClosable: true,
                            //     // });
                            //     const a = [ { "name": "Raghav", "address_line1": "New Address Line 1", "address_line2": "New Address Line 2", "city": "New Delhi", "district": "", "state": "Delhi", "country": "IN", "pin_code": "110034" } ]
                            //     setAddresses(a)
                            //     LocalStorageHandler.addTurboAddresses(encodeURIComponent(JSON.stringify(a)))
                            //     // localStorage?.setItem('addresses', encodeURIComponent(JSON.stringify(a)))
                            //     return
                            // }
                            
                            // // toast({
                            // //     title: `No addresses found!`,
                            // //     status: 'warning',
                            // //     variant: 'left-accent',
                            // //     position: 'top-right',
                            // //     duration: 3000,
                            // //     isClosable: true,
                            // // });
                            // setAddresses([])
                            // handleRouteToParent()
                            setIsTurboAddressVisible(true)
                        }}>
                            <FaChevronDown />
                            <Text as='span'>Load More</Text>
                        </Flex>
                    ): <></>}
                </Flex>

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