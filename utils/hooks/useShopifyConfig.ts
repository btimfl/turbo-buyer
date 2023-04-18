import { useEffect, useState } from 'react'
import cleanPhoneNumber from '../functions/cleanPhoneNumber'
import {
  INIT_SHOPIFY_CONFIG,
  ShopifyConfig,
} from '../providers/ShopifyConfigProvider'

export default function useShopifyConfig() {
  const [config, setConfig] = useState<ShopifyConfig>(INIT_SHOPIFY_CONFIG)

  const sanitiseAddress = (address: any) => {
    return {
      ...address,
      address_line1: address.address1,
      address_line2: address.address2,
      state: address.province,
      pin_code: address.zip,
    }
  }

  useEffect(() => {
    const handler = (message: MessageEvent) => {
      if (
        !message.data ||
        !message.data.type ||
        message.data.type.indexOf('TURBO') === -1
      ) {
        setConfig(INIT_SHOPIFY_CONFIG)
        return
      }

      console.log('Shopify Config >> ', message.data)

      if (message.data?.type === 'TURBO_INIT') {
        setConfig({
          clientLogo: message.data.uploadedLogoPath,
          requireOtp: message.data.requireOtp,
          // phone: INIT_SHOPIFY_CONFIG.phone,
          // addresses: INIT_SHOPIFY_CONFIG.addresses.map(sanitiseAddress),
          // turboAddressCount: INIT_SHOPIFY_CONFIG.turboAddressCount,
          // logged_in_customer_id: INIT_SHOPIFY_CONFIG.logged_in_customer_id,
          phone: cleanPhoneNumber(message.data.shopifyUser?.mobile),
          addresses: message.data.shopifyUser?.addresses.map(sanitiseAddress),
          turboAddressCount: message.data.shopifyUser?.turbo_add_present,
          logged_in_customer_id: message.data.shopifyUser?.logged_in_customer_id,
          cartItemsLength: message.data?.cartPayload?.item_count
        })
      }
    }

    window.addEventListener('message', handler)

    return () => window.removeEventListener('message', handler)
  })

  return config
}
