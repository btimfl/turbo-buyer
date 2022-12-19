import { CheckCircleIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Radio, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Address } from '../../apis/get';
import styles from './AddressCard.module.scss';

interface Props {
    address: Address | undefined | null;
    selected?: boolean;
    isInForm: boolean;
}

export default function AddressCard({ address, selected, isInForm }: Props) {
    const router = useRouter();
    if (!address) return <></>;

    const handleAddressClick = () => {
        router.push({
            pathname: '/edit-address',
            query: {
                address_id: address.address_id,
            }
        }, 'edit-address');
    }

    return (
        <Box>
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
                            <Text className={styles.editCardLink} lineHeight={1} as="span" onClick={handleAddressClick}>Edit</Text>
                        </Flex>
                    </>
                    }
                    <Box mt={2}>
                        <Text mb={2} fontSize={`xs`}>{`${address.address_line1 + ', ' + (address.address_line2 ? address.address_line2 + ', ' : '') + address.city + ', ' + (address.district ? address.district + ', ' : '') + address.state + ' - ' + address.pincode}`}</Text>
                        <Text fontSize={`xs`}>Mobile: {`${address.mobile}`}</Text>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}