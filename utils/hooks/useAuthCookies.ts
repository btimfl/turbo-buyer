import { NextRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import LocalStorageHandler from '../models/LocalStorageHandler'
import { ShopifyConfigContext } from '../providers/ShopifyConfigProvider'
import { UserContext } from '../providers/UserProvider'

export default function useAuthCookies(router: NextRouter) {
  const {
    phone: fromShopifyPhone,
    logged_in_customer_id: loggedInCustomerId,
    addresses: fromShopifySA,
    turboAddressCount: fromShopifyTAC,
    clientLogo,
    cartItemsLength,
  } = useContext(ShopifyConfigContext)
  const { setPhone, setAddresses } = useContext(UserContext)

  useEffect(() => {
    // CASE: IF TURBO_INIT HAS NOT YET BEEN CALLED
    if (clientLogo === null) return

    // CASE: IF CART IS EMPTY
    if (cartItemsLength === 0) {
      router.push('/empty')
      return
    }

    if (loggedInCustomerId)
      handleShopifyUser(
        fromShopifyPhone,
        fromShopifySA,
        fromShopifyTAC,
        setPhone,
        setAddresses,
        router
      )
    else handleGuestUser(setPhone, setAddresses, router)
  }, [clientLogo, cartItemsLength])
}

function handleShopifyUser(
  fromShopifyPhone: string | null,
  fromShopifySA: any[],
  fromShopifyTAC: number | null,
  inAppSetPhone: Function,
  inAppSetTA: Function,
  router: NextRouter
) {
  // This block is only executed if there is a shopify user logged in.
  // When that happens, the phone number, addresses, TAC, etc. are set from the Shopify Config received,
  // And as such, must be treated as the source of truth over data stored in local
  const {
    phone: inLocalPhone,
    verified: inLocalVerified,
    addresses: inLocalTA,
  } = LocalStorageHandler.getData()

  if (Boolean(fromShopifyPhone)) {
    // If the user has logged in for turbo using the same number as is in his Shopify account
    if (fromShopifyPhone == inLocalPhone && inLocalVerified === 'true') {
      inAppSetPhone(inLocalPhone)
      inAppSetTA(inLocalTA)
      LocalStorageHandler.setPhone(
        inLocalPhone!,
        fromShopifyTAC ? +fromShopifyTAC : 0
      )
      LocalStorageHandler.markVerified(
        encodeURIComponent(JSON.stringify(inLocalTA))
      ) // --> seems redundant
      router.push('/addresses')
    } else {
      LocalStorageHandler.resetSession()
      inAppSetPhone(fromShopifyPhone)
      LocalStorageHandler.setPhone(
        fromShopifyPhone!,
        fromShopifyTAC ? +fromShopifyTAC : 0
      )
      if (!fromShopifyTAC) LocalStorageHandler.markVerified([])
      else if (!fromShopifySA || !fromShopifySA.length) {
        router.push('/profile')
        return
      }
      router.push('/addresses')
    }
  } else {
    LocalStorageHandler.resetSession()
    if (fromShopifySA?.length) router.push('/addresses')
    else router.push('/profile')
  }
}

function handleGuestUser(
  inAppSetPhone: Function,
  inAppSetTA: Function,
  router: NextRouter
) {
  const {
    phone: inLocalPhone,
    verified: inLocalVerified,
    addresses: inLocalTA,
  } = LocalStorageHandler.getData()

  if (inLocalPhone && inLocalVerified === 'true') {
    inAppSetPhone(inLocalPhone)
    inAppSetTA(inLocalTA)
    router.push('/addresses')
  } else {
    inAppSetPhone(inLocalPhone || null)
    inAppSetTA([])
    router.push('/profile')
  }
}
