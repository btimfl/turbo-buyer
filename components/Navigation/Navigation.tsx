import { ArrowBackIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { IconButton, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import imageLoader from '../../utils/configurations/imageLoader'
import { ShopifyConfigContext } from '../../utils/providers/ShopifyConfigProvider'
import styles from './Navigation.module.scss'

export default function Navigation() {
  const router = useRouter()

  const { clientLogo } = useContext(ShopifyConfigContext)

  const handleClose = () => {
    router.push('/')
    window?.top!.postMessage({ type: 'TURBO_EXIT', data: 'close event' }, '*')
  }

  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <IconButton
          aria-label='close'
          icon={<SmallCloseIcon />}
          background={'transparent'}
          _hover={{ bg: 'transparent' }}
          onClick={handleClose}
        />
        <Text as='span' fontSize='sm' fontWeight='bold'>
          {router.pathname === '/empty' ? 'EMPTY CART' : ''}
          {router.pathname === '/addresses' ? 'ADDRESSES' : ''}
          {router.pathname === '/profile' ? 'PROFILE' : ''}
        </Text>
      </div>
      <div className={styles.attribution}>
        {clientLogo && (
          <Image
            loader={imageLoader}
            src={clientLogo}
            alt='Logo'
            width='70'
            height='50'
            priority
            style={{ height: 40, width: 'auto', objectFit: 'contain' }}
          />
        )}
      </div>
    </div>
  )
}
