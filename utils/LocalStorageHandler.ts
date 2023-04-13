class LocalStorageHandler {
  setPhone(phone: string) {
    localStorage?.setItem('phone', phone)
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

  addTurboAddresses(addresses: any) {
    localStorage?.setItem('addresses', addresses)
  }

  getData(): { phone: string | null; verified: string | null; addresses: any } {
    return {
      phone: localStorage?.getItem('phone'),
      verified: localStorage?.getItem('verified'),
      addresses: JSON.parse(
        decodeURIComponent(localStorage?.getItem('addresses') ?? '[]')
      ),
    }
  }
}

export default new LocalStorageHandler()
