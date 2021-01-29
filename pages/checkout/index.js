import React from 'react'
import { withTranslation } from '../../i18n'
import { useCartContext } from '../../contexts/cartContext'
import styles from '../../styles/checkout.module.scss'
import CheckoutDetails from '../../components/CheckoutDetails'
import PaypalButton from '../../components/PaypalButton'

function Index({ t }) {
  const { cart } = useCartContext()
  const priceSum = cart.reduce(
    (acc, curr) => acc + parseInt(curr.qty) * parseInt(curr.price),
    0,
  )
  const totalSum = priceSum + 10

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutShippingDetails}>
        <PaypalButton total={totalSum} />
      </div>
      <div className={styles.checkoutInfoDetails}>
        <div className={styles.checkoutOrderDetails}>
          {cart.map((product) => (
            <CheckoutDetails
              productName={product.name}
              productPrice={product.price * product.qty}
              productQty={product.qty}
            />
          ))}
          <CheckoutDetails>
            <span>{t('shipping')}</span>
            <span>
              10 € <br />
              <br /> {t('shipping_estimated')}
            </span>
          </CheckoutDetails>
          <CheckoutDetails>
            <span>Total</span>
            <span>{totalSum} €</span>
          </CheckoutDetails>
        </div>
        <div className={styles.checkoutCouponDetails}>
          <span>{t('coupon')}</span>
          <div className={styles.checkoutInputCoupon}>
            <input type="text" />
            <button className={styles.checkoutButtonCoupon}>
              {t('apply')}
            </button>
          </div>
        </div>
        <div className={styles.checkoutSecurityDetails}>
          <p>{t('security')}</p>
        </div>
      </div>
    </div>
  )
}

export default withTranslation('common')(Index)
