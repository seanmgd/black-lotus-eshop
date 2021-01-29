import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/navbar.module.scss'
import style from '../styles/burger.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { withTranslation, i18n } from '../i18n'
import Image from 'next/image'
import Burger from './burger'
import { useSession, signIn, signOut } from 'next-auth/client'
import { useCartContext } from '../contexts/cartContext'
import { useUserContext } from '../contexts/userContext'

const Navbar = ({ t }) => {
  const router = useRouter()
  const [session] = useSession()
  const { user } = useUserContext()
  const authenticated = user.token
  const { cart } = useCartContext()
  const productsSum = cart.reduce((acc, curr) => acc + parseInt(curr.qty), 0)

  const handleSignin = (e) => {
    e.preventDefault()
    signIn()
  }
  const handleSignout = (e) => {
    e.preventDefault()
    signOut()
  }
  const ROUTES = [
    {
      name: 'home',
      path: '/',
    },
    {
      name: 'plants',
      path: '/plants/all',
    },
    {
      name: 'blog',
      path: '/blog',
    },
    {
      name: 'concept',
      path: '/concept',
    },
    {
      path: '/cart',
      icon: faShoppingCart,
    },
  ]

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.leftNav}>
            <Link href="/">
              <a>
                <Image
                  src="/lotus.png"
                  alt="Picture of the author"
                  width={60}
                  height={40}
                />
              </a>
            </Link>
          </div>
          <div className={styles.centerNav}>
            {ROUTES.map((route) => (
              <Link href={route.path} key={route.path}>
                <a
                  key={route.name}
                  className={[
                    styles.navItem,
                    router.pathname === route.path ? styles.active : '',
                  ].join(' ')}
                >
                  {route.name
                    ? t(route.name)
                    : cart.length !== 0 && (
                        <>
                          <FontAwesomeIcon icon={route.icon} />
                          <span className={styles.sumCart}>{productsSum}</span>
                        </>
                      )}
                </a>
              </Link>
            ))}
          </div>
          <div className={styles.rightNav}>
            <span>
              {(session || authenticated) && (
                <Link href={'/logout'}>{t('logout')}</Link>
              )}
              {!session && !authenticated && (
                <Link href={'/authentication'}>{t('login')}</Link>
              )}
            </span>
            <span
              onClick={() =>
                i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')
              }
            >
              {i18n.language === 'en' ? 'FR' : 'EN'}
            </span>
          </div>
        </div>
      </div>
      <Burger style={style} />
    </>
  )
}

export default withTranslation('common')(Navbar)
