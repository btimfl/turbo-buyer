import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  ModalFooter,
  Button,
  Box,
  Text,
} from '@chakra-ui/react'
import { FormikProps } from 'formik'

type Props = {
  isOpen: boolean
  onClose: () => void
  turboAddresses: any[]
  shopifyAddresses: any[]
  selectedAddress: any
  formik: FormikProps<{ selectedAddress: string }>
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  turboAddresses,
  shopifyAddresses,
  selectedAddress,
  formik,
}: Props) {
  return (
    <Modal
      isCentered={true}
      isOpen={isOpen}
      onClose={onClose}
      motionPreset='none'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalCloseButton mt={1} />
        <ModalBody>
          {turboAddresses?.length || shopifyAddresses?.length ? (
            <Flex flexDir='row' w='100%' align='flex-start'>
              <Box flexGrow={1}>
                <Text>Deliver to the following address:</Text>
                <Text as='p' fontWeight='bold'>
                  {selectedAddress?.['name'].trim()},
                </Text>
                <Text fontSize='sm'>{selectedAddress?.['address_line1']}</Text>
                <Text fontSize='sm'>{selectedAddress?.['address_line2']}</Text>
                <Text fontSize='sm'>{selectedAddress?.['pin_code'] || ''}</Text>
                {selectedAddress?.['mobile'] ? (
                  <Text mt={2} fontSize='xs'>
                    Mobile: +91 {selectedAddress?.['mobile']}
                  </Text>
                ) : null}
              </Box>
            </Flex>
          ) : (
            <></>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            variant='ghost'
            size='sm'
            mr={4}
            onClick={() => {
              onClose()
              formik.setFieldValue('selectedAddress', '')
            }}
          >
            Cancel
          </Button>
          <Button
            colorScheme='blue'
            onClick={() => {
              onClose()
              window?.top?.postMessage(
                {
                  type: 'TURBO_ROUTE',
                  address: JSON.stringify(selectedAddress),
                },
                '*'
              )
            }}
            size='sm'
          >
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
