class LocalStorageHandler {
  setPhone(phone: string, turboAddressCount: number) {
    localStorage?.setItem('phone', phone)
    localStorage?.setItem('turboAddressCount', turboAddressCount.toString())
  }

  setShopifyUser(phone: string) {
    localStorage?.setItem('phone', phone)
    localStorage?.setItem('verified', 'true')
  }

  markVerified(addresses: any) {
    localStorage?.setItem('verified', 'true')
    localStorage?.setItem('addresses', addresses)
  }

  markUnverified() {
    localStorage?.removeItem('verified')
    localStorage?.removeItem('addresses')
  }

  resetSession() {
    localStorage?.removeItem('phone')
    localStorage?.removeItem('verified')
    localStorage?.removeItem('addresses')
    localStorage?.removeItem('turboAddressCount')
  }

  addTurboAddresses(addresses: any) {
    localStorage?.setItem('addresses', addresses)
  }

  getData(): {
    phone: string | null
    verified: string | null
    addresses: any
    turboAddressCount: number | null
  } {
    try {
      const turboAddressCount = localStorage?.getItem('turboAddressCount')
  
      return {
        phone: localStorage?.getItem('phone'),
        verified: localStorage?.getItem('verified'),
        addresses: JSON.parse(
          decodeURIComponent(localStorage?.getItem('addresses') || '[]')
        ),
        turboAddressCount: turboAddressCount ? +turboAddressCount : null,
      }
    }
  }
}

export default new LocalStorageHandler()
