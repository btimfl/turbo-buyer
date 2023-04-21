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
    clientLogo,
    cartItemsLength,
  } = useContext(ShopifyConfigContext)
  const { setPhone, setAddresses } = useContext(UserContext)

  useEffect(() => {
    // CASE: IF TURBO_INIT HAS NOT YET BEEN CALLED
    if (clientLogo === null) return

    if (cartItemsLength === 0) {
      router.push('/empty')
      return
    }

    const {
      phone,
      verified: isVerified,
      addresses,
    } = LocalStorageHandler.getData()

    // CASE: SHOPIFY USER
    if (logged_in_customer_id) {
      const doesPhoneNumberExist = Boolean(_phone)
      const doesShopifyAddressExist = shopifyAddresses?.length
      const doesTurboAddressExist = turboAddressCount && +turboAddressCount > 0

      LocalStorageHandler.resetSession()

      if (doesPhoneNumberExist) {
        // CASE: IF SHOPIFY USER HAS VERIFIED HIS PHONE NUMBER ONCE
        if (phone && isVerified === 'true' && phone == _phone) {
          setPhone(phone)
          setAddresses(addresses)
          router.push('/addresses')
          return
        }

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

    // CASE: IF USER HAS VERIFIED HIMSELF
    if (phone && isVerified === 'true') {
      setPhone(phone)
      setAddresses(addresses)
      router.push('/addresses')
      return
    }

    // IF GUEST USER IS USING TURBO FOR THE FIRST TIME
    setPhone(phone || null)
    setAddresses([])
    router.push('/profile')
  }, [clientLogo, cartItemsLength])
}
