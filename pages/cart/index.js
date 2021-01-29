import { stopEvent } from '@ttrmz/react-utils'
import React from 'react'
import Link from 'next/link'
import { useCartContext } from '../../contexts/cartContext'
import CartItem from '../../components/cartItem'
import { withTranslation } from '../../i18n'
import styles from '../../styles/cart.module.scss'

function Cart({ t }) {
  const { cart, clearCart } = useCartContext()

  const handleClear = (event) => {
    stopEvent(event)
    clearCart()
  }

  const productsSum = cart.reduce((acc, curr) => acc + parseInt(curr.qty), 0)
  const priceSum = cart.reduce(
    (acc, curr) => acc + parseInt(curr.qty) * parseInt(curr.price),
    0,
  )

  return (
    <div className={styles.cartWrapper}>
      {cart.length > 0 ? (
        <>
          <div className={styles.cartSummary}>
            <div className={styles.cartItemsContainer}>
              {cart.map((product) => (
                <CartItem product={product} />
              ))}
            </div>
            <div className={styles.cartOverview}>
              <div className={styles.cartOverviewInfos}>
                <div>
                  Total {t('products')} <span> {productsSum} </span>
                </div>
                <div>
                  Total {t('checkout')} <span>{priceSum} €</span>
                </div>
              </div>

              <hr />

              <div className={styles.cartOverviewActions}>
                <button>
                  <Link href={'/checkout'}>{t('checkout')}</Link>
                </button>

                <button onClick={handleClear}>{t('clear')}</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.cartEmpty}>
          <Link href={'/plants/all'}>
            <>
              <span>😱</span>
              {t('empty_cart')}
            </>
          </Link>
        </div>
      )}
    </div>
  )
}

export default withTranslation('common')(Cart)
