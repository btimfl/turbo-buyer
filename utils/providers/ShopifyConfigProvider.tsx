import React from 'react'
import { ReactNode } from 'react'
import useShopifyConfig from '../hooks/useShopifyConfig'

export type ShopifyConfig = {
  requireOtp: boolean | null
  clientLogo: string | null
  phone: string | null
  addresses: any[]
  turboAddressCount: number | null
  logged_in_customer_id: string | null | undefined
}

export const INIT_SHOPIFY_CONFIG: ShopifyConfig = {
  requireOtp: true,
  clientLogo: null,
  // phone: '9654723413',
  // addresses: [
  //   {
  //     address_line1: 'New Address Line 1',
  //     address_line2: 'New Address Line 2',
  //     state: 'Delhi',
  //     pin_code: '',
  //     address1: 'New Address Line 1',
  //     address2: 'New Address Line 2',
  //     city: 'New Delhi',
  //     company: 'Unicommerce',
  //     country: 'India',
  //     country_code: 'IN',
  //     country_name: 'India',
  //     customer_id: 6905921339681,
  //     default: true,
  //     first_name: 'Raghav',
  //     id: 9201848189217,
  //     last_name: 'Kanwal',
  //     name: 'Raghav Kanwal',
  //     phone: '',
  //     province: 'Delhi',
  //     province_code: 'DL',
  //     zip: '',
  //   },
  //   {
  //     address_line1: '1 Rue des Carrieres',
  //     address_line2: 'Suite 1234',
  //     state: 'Quebec',
  //     pin_code: 'G1R 4P5',
  //     address1: '1 Rue des Carrieres',
  //     address2: 'Suite 1234',
  //     city: 'Montreal',
  //     company: 'Fancy Co.',
  //     country: 'Canada',
  //     country_code: 'CA',
  //     country_name: 'Canada',
  //     customer_id: 6905921339681,
  //     default: false,
  //     first_name: 'Samuel',
  //     id: 9205984854305,
  //     last_name: 'de Champlain',
  //     name: 'Samuel de Champlain',
  //     phone: '819-555-5555',
  //     province: 'Quebec',
  //     province_code: 'QC',
  //     zip: 'G1R 4P5',
  //   },
  // ],
  phone: '',
  addresses: [],
  turboAddressCount: null,
  logged_in_customer_id: '1',
}

export const ShopifyConfigContext =
  React.createContext<ShopifyConfig>(INIT_SHOPIFY_CONFIG)

export default function ShopifyConfigProvider({
  children,
}: {
  children: ReactNode
}) {
  const shopifyConfig = useShopifyConfig()

  return (
    <ShopifyConfigContext.Provider value={shopifyConfig}>
      {children}
    </ShopifyConfigContext.Provider>
  )
}
