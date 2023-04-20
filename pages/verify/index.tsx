import {
  Flex,
  FormControl,
  HStack,
  PinInput,
  PinInputField,
  FormErrorMessage,
  Center,
  Text,
} from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import { useState, ChangeEvent, useContext } from 'react'
import { fetchAddressWithOtp } from '../../apis/get'
import { sendOTP } from '../../apis/post'
import * as Yup from 'yup'
import useOTPTimer from '../../utils/hooks/useOTPTimer'
import { getFormDefaultsForOTP } from '../../utils/functions/otp'
import { UserContext } from '../../utils/providers/UserProvider'
import styles from './verify.module.scss'
import LocalStorageHandler from '../../utils/models/LocalStorageHandler'
import NotificationHandler from '../../utils/models/NotificationHandler'

export default function EnterOTP() {
  const router = useRouter()
  const {
    query: { id, phone },
  } = router

  const [otpRequestId, setOtpRequestId] = useState<string>(String(id) ?? '')
  const OTP_DIGITS = 6

  const { setAddresses } = useContext(UserContext)
  const { timer, setTimer } = useOTPTimer()
  const [isOtpInvalid, setIsOtpInvalid] = useState<boolean | undefined>(
    undefined
  )

  const { inputs, initialValues, validation } =
    getFormDefaultsForOTP(OTP_DIGITS)

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    values: any,
    handleChange: Function,
    submitForm: Function
  ) => {
    handleChange(e)
    const _inputs = inputs.filter((input) => input !== e.target.name)
    const otp =
      (e.target.value ?? '') +
      _inputs.reduce((acc, curr) => acc + (values[curr] ?? ''), '')
    if (otp.length === OTP_DIGITS) {
      setTimeout(() => submitForm(), 0)
    }
  }

  const handleResendOTP = async () => {
    try {
      const res = await sendOTP(phone ? String(phone) : '')

      if (res.ok === false) {
        NotificationHandler.error(res.error)
        return
      }

      setOtpRequestId(res.otp_request_id)
      setTimer(30)
    } catch (err) {
      NotificationHandler.error(String(err))
    }
  }

  return (
    <Center className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(validation)}
        validateOnMount={true}
        onSubmit={async (values) => {
          const otp = inputs.reduce((acc, curr) => acc + values[curr] ?? '', '')
          try {
            const data = await fetchAddressWithOtp(
              otp,
              otpRequestId,
              phone ? String(phone) : ''
            )

            if (data.ok === false) {
              NotificationHandler.error(data.error)
              setIsOtpInvalid(true)
              return
            }

            if (data.address_list) {
              setIsOtpInvalid(false)
              setAddresses(data.address_list)
              LocalStorageHandler.markVerified(
                encodeURIComponent(JSON.stringify(data.address_list))
              )
              router.push('/addresses')
            } else {
              setIsOtpInvalid(true)
            }
          } catch (err) {
            NotificationHandler.error(String(err))
          }
        }}
      >
        {({ values, isSubmitting, handleBlur, handleChange, submitForm }) => (
          <Flex flexDir={`column`} justifyContent={`space-between`} h={`100%`}>
            <Form>
              <Text as='h2' mb={4} textAlign={`center`} fontSize={`20px`}>
                Verify your mobile number
              </Text>
              <FormControl isInvalid={isOtpInvalid}>
                <Text color={`gray.500`} textAlign={`center`}>
                  Enter the OTP we just sent on <br />
                </Text>
                <Flex align={`center`} justify={`center`} gap={`0.5rem`}>
                  {phone}
                  <Text
                    as='span'
                    onClick={() => router.replace('/profile')}
                    className={styles.changeNumber}
                    verticalAlign={`middle`}
                  >
                    Change
                  </Text>
                </Flex>
                <HStack justifyContent={`center`} mt={4} mb={4}>
                  <PinInput otp isDisabled={isSubmitting} placeholder=''>
                    {inputs.map((name) => {
                      return (
                        <PinInputField
                          key={name}
                          maxLength={1}
                          name={name}
                          autoFocus={name === 'digit1'}
                          value={values[name]}
                          onBlur={handleBlur}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleOnChange(e, values, handleChange, submitForm)
                          }
                        />
                      )
                    })}
                  </PinInput>
                </HStack>
                <FormErrorMessage>
                  <Flex mb={4} justifyContent={`center`}>
                    Invalid OTP. Please try again.
                  </Flex>
                </FormErrorMessage>
              </FormControl>

              <Center>
                <Text
                  hidden={timer > 0}
                  onClick={handleResendOTP}
                  className={styles.resendLink}
                >
                  Resend OTP
                </Text>
              </Center>
              {timer > 0 && (
                <>
                  <Text as='span' color={`gray.500`}>
                    <>
                      Didn’t receive the OTP? Resend in{' '}
                      <Text
                        as='span'
                        fontWeight={`bold`}
                        color={`var(--turbo-colors-text)`}
                      >
                        <>{timer} seconds</>
                      </Text>
                    </>
                  </Text>
                </>
              )}
            </Form>
          </Flex>
        )}
      </Formik>
    </Center>
  )
}
