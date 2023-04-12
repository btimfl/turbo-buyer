import { CheckCircleIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Radio, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import styles from './AddressCard.module.scss';
import { Address } from "./../../utils/interfaces";
import { useContext } from 'react';
import { UserContext } from '../../utils/providers/UserProvider';

interface Props {
    address: Address | undefined | null;
    mobile?: string;
    selected?: boolean;
    isInForm: boolean;
    index: number;
}

export default function AddressCard({ address, mobile, selected, isInForm, index }: Props) {
    const { phone } = useContext(UserContext); 
    const router = useRouter();
    if (!address) return <></>;

    const handleAddressClick = () => {
        router.push({
            pathname: '/edit-address',
            query: {
                addressIndex: index,
            }
        }, 'edit-address');
    }

    return (
        <Box w={`100%`}>
            <Flex align={'flex-start'} gap={'0.5rem'}>
                <Flex grow={1} flexDir={'column'}>
                    {!isInForm ? (
                        <Flex flexDir={`row`} gap={`4`} align={`flex-start`}>
                            <Text lineHeight={1} as="span" className={styles.selectedAddress}>
                                <CheckCircleIcon color={'chakra-colors-green-400'} />
                            </Text>
                            <Text className={styles.cardName} flexGrow={1} lineHeight={1}>
                                <Text as="span" fontSize={'md'} fontWeight={700}>{address.name}</Text>
                                <Text as="span" className={styles.cardChip}>{address.address_type}</Text>
                            </Text>
                        </Flex>
                    ) : <>
                        <Flex flexDir={`row`} align={`center`}>
                            <Text as="span" className={styles.cardName} flexGrow={1} lineHeight={1}>
                                <Text as="span" fontSize={'md'}>{address.name}</Text>
                                <Text as="span" className={styles.cardChip}>{address.address_type}</Text>
                            </Text>
                            {/* <Text className={styles.editCardLink} lineHeight={1} as="span" onClick={handleAddressClick}>Edit</Text> */}
                        </Flex>
                    </>
                    }
                    <Box mt={2}>
                        <Text mb={2} fontSize={`sm`}>{`${address.address_line1 + ', ' + (address.address_line2 ? address.address_line2 + ', ' : '') + address.city + ', ' + (address.district ? address.district + ', ' : '') + address.state + ' - ' + address.pin_code}`}</Text>
                        {/* <Text fontSize={`xs`}>Mobile: {`${phone}`}</Text> */}
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}