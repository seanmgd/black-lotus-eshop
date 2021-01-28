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

const Navbar = ({ t }) => {
  const router = useRouter()
  const [session] = useSession()
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
                  {route.name ? (
                    t(route.name)
                  ) : (
                    <>
                      <FontAwesomeIcon icon={route.icon} />
                      {/*<div className={styles.sumCart}>0</div>*/}
                    </>
                  )}
                </a>
              </Link>
            ))}
          </div>
          <div className={styles.rightNav}>
            <span>
              {session && (
                <a href="#" onClick={handleSignout} className="btn-signin">
                  {t('logout')}
                </a>
              )}
              {!session && (
                <a href="#" onClick={handleSignin} className="btn-signin">
                  {t('login')}
                </a>
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
