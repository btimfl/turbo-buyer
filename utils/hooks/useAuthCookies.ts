import { NextRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import LocalStorageHandler from '../models/LocalStorageHandler'
import { ShopifyConfigContext } from '../providers/ShopifyConfigProvider'
import { UserContext } from '../providers/UserProvider'

export default function useAuthCookies(router: NextRouter) {
  const {
    phone: _phone,
    logged_in_customer_id,
    addresses: shopifyAddresses,
    turboAddressCount,
  } = useContext(ShopifyConfigContext)
  const { setPhone, setAddresses } = useContext(UserContext)

  useEffect(() => {
    // User is a verified shopify user
    if (logged_in_customer_id) {
      const doesPhoneNumberExist = Boolean(_phone)
      const doesShopifyAddressExist = shopifyAddresses?.length
      const doesTurboAddressExist = turboAddressCount && +turboAddressCount > 0

      LocalStorageHandler.resetSession()

      if (doesPhoneNumberExist) {
        setPhone(_phone)
        LocalStorageHandler.setPhone(_phone!, +turboAddressCount!)
        if (doesTurboAddressExist) router.push('/profile')
        else {
          LocalStorageHandler.markVerified([])
          router.push('/addresses')
        }
      } else {
        if (doesShopifyAddressExist) router.push('/addresses')
        else router.push('/profile')
      }

      return
    }

    // if (_phone) {
    // LocalStorageHandler.setShopifyUser(_phone)
    // localStorage?.setItem('phone', _phone)
    // localStorage?.setItem('verified', 'true')
    // setPhone(_phone)
    // router.push('/addresses')
    // return
    // }

    const {
      phone,
      verified: isVerified,
      addresses,
    } = LocalStorageHandler.getData()

    // const phone = localStorage?.getItem('phone')
    // const isVerified = localStorage?.getItem('verified')
    // const addresses = JSON.parse(
    //   decodeURIComponent(localStorage?.getItem('addresses') ?? '[]')
    // )

    if (phone && isVerified === 'true') {
      setPhone(phone)
      setAddresses(addresses)
      router.push('/addresses')
      return
    }

    setPhone(null)
    setAddresses([])
    router.push('/profile')
  }, [])
}
