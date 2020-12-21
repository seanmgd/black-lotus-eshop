import React from 'react'
import styles from '../styles/burger.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { i18n, withTranslation } from '../i18n'

const Burger = ({ t }) => {
  const router = useRouter()
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
      name: 'cart',
      path: '/cart',
    },
  ]

  const [open, setOpen] = React.useState(false)

  return (
    <div className={styles.burgerContainer}>
      <div className={styles.navLogo}>
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
      <div
        className={[styles.burger, open ? styles.opened : ''].join(' ')}
        onClick={() => setOpen(!open)}
      >
        <div />
        <div />
        <div />
      </div>
      <div
        className={[styles.burgerContent, open ? styles.opened : ''].join(' ')}
      >
        <div>
          {ROUTES.map((route) => (
            <li key={route.name}>
              <Link href={route.path} key={route.name}>
                <a
                  className={
                    router.pathname === route.path ? styles.active : ''
                  }
                  onClick={() => setOpen(false)}
                >
                  {t(route.name)}
                  {/*{route.name === 'cart' && cart.length !== 0 && (*/}
                  {/*  <div className={styles.sumCart}>2</div>*/}
                  {/*)}*/}
                </a>
              </Link>
            </li>
          ))}
        </div>
        <div className={styles.burgerLang}>
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
  )
}
export default withTranslation('common')(Burger)
